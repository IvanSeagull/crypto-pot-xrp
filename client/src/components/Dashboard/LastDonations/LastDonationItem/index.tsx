import React, { FC } from 'react';

import styles from './styles.module.scss';

import Link from 'next/link';
import { timeAgo } from '../../../../utils/formater';
import CoinContainer from '../../../global/coinContainer';
import UserContainer from '../../../global/userContainer';

const iconUrl = 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png';
interface DonationItemProps {
  amount: number;
  message: string;
  date: Date;
  sender: string;
  txHash: string;
  coin: any;
  chain: any;
  senderUser: any;
}

const DonationItem: FC<DonationItemProps> = ({
  amount,
  message,
  date,
  sender,
  coin,
  chain,
  senderUser,
  txHash,
}) => {
  return (
    <div className="mainWrapper">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.row}>
            <p className={styles.amount}>{amount.toFixed(8)}</p>
            <CoinContainer icon={iconUrl} title={'XRP'} size={24} />
          </div>
          <CoinContainer icon={iconUrl} title={'XRPL'} size={24} />
        </div>
        <p className={styles.message}>{message}</p>
        <div className={styles.footer}>
          <UserContainer wallet={sender} username={senderUser?.username || ''} size={28} />
          <Link
            legacyBehavior
            href={`https://evm-sidechain.xrpl.org/tx/${txHash}`}
            className={styles.row}>
            <a target="_blank" rel="noopener noreferrer" className={styles.row}>
              <p className={styles.date}>{timeAgo(date)}</p>
              <img className={styles.icon} src="/assets/external-link.svg" alt="heart" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationItem;
