import React from 'react';

import styles from './styles.module.scss';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useAccount, useDisconnect } from 'wagmi';
import { toast } from 'react-toastify';

export const AuthButton = () => {
  const { address } = useAccount();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const menuRef = React.useRef<any>();
  const popupState = React.useRef(isPopupOpen);

  const { disconnect } = useDisconnect();

  const handleCopy = () => {
    navigator.clipboard.writeText(address as string);
    toast.success('Address copied', {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  React.useEffect(() => {
    popupState.current = isPopupOpen;
  }, [isPopupOpen]);

  const openPopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current.contains(e.target)) {
        setIsPopupOpen(false);
      }
    };
    const keyPressHandler = (event: KeyboardEvent) => {
      if (event.code === 'Escape' && popupState.current === true) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', keyPressHandler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', keyPressHandler);
    };
  }, []);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            ref={menuRef}
            className={styles.wrapper}
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}>
            {(() => {
              if (!connected) {
                return (
                  <button className={styles.connectButton} onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className={styles.accountButton} onClick={openPopup} type="button">
                    {chain.unsupported && (
                      <img style={{ marginRight: -8 }} src="/assets/icons/warning.svg" />
                    )}
                    <section className={styles.details}>
                      <p className={styles.walletAddress}>{account.displayName}</p>
                    </section>
                    <div className={styles.avaCon}></div>

                    {isPopupOpen && (
                      <section className={styles.popup}>
                        <button onClick={() => {}} className={styles.item}>
                          <img src="/assets/icons/navbar/user.svg" />
                          <p>Profile</p>
                        </button>
                        <button onClick={() => handleCopy()} className={styles.item}>
                          <img src="/assets/icons/navbar/copy.svg" />

                          <p>Copy address</p>
                        </button>
                        <button onClick={() => openChainModal()} className={styles.item}>
                          {chain.unsupported ? (
                            <>
                              <img className={styles.chainIcon} src="/assets/icons/warning.svg" />
                              <p>Unsupported</p>
                            </>
                          ) : (
                            <>
                              <img className={styles.chainIcon} src={chain.iconUrl} />
                              <p>{chain.name}</p>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            disconnect();
                          }}
                          className={styles.item}>
                          <img src="/assets/icons/navbar/logout.svg" />

                          <p>Log out</p>
                        </button>
                      </section>
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
export default AuthButton;
