import React, { FC } from 'react';

import styles from './styles.module.scss';
// import { tailspin } from 'ldrs';
// tailspin.register();

interface SecondaryButtonProps {
  isActive?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({
  isActive = false,
  onClick,
  isLoading = false,
  isDisabled = false,
}) => {
  return (
    <button
      disabled={isDisabled || isLoading}
      onClick={() => onClick?.()}
      className={styles.wrapper}
      style={{
        backgroundColor: isActive && !isLoading ? '#EBCBFF' : 'transparent',
      }}>
      {isLoading && <>{/* <l-tailspin size="16" stroke="2" speed="0.9" color="#000" /> */}</>}
      <p className={styles.title}>Withdraw</p>
    </button>
  );
};

export default SecondaryButton;
