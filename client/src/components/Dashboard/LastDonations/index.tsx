'use client';
import React, { useEffect } from 'react';
import styles from './style.module.scss';
import LastDonationItem from './LastDonationItem';
import { useAccount } from 'wagmi';
import { getTransactions } from '../../../utils/api/ApiController';

const LastDonations = () => {
  const { address } = useAccount();
  const [transactions, setTransactions] = React.useState<any[]>([]);
  useEffect(() => {
    if (address)
      getTransactions(address).then((res) => {
        setTransactions(res.data);
      });
  }, [address]);
  return (
    <div className={styles.lastDonations}>
      <h3 className={styles.title}>Last Donations</h3>
      <div className={styles.list}>
        {transactions.map((transaction, index) => (
          <LastDonationItem
            key={index}
            amount={transaction.amount}
            sender={transaction.sender}
            message={transaction.message}
            txHash={transaction.txHash}
            date={transaction.date}
            coin={transaction.coin}
            chain={transaction.chain}
            senderUser={transaction.senderUser}
          />
        ))}
      </div>
    </div>
  );
};

export default LastDonations;
