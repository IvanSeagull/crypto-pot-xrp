'use client';
import React, { useEffect } from 'react';

import styles from './styles.module.scss';
import BalanceItem from './BalanceItem';
const data = [
  {
    name: 'XRP',
    amount: 0.0003,
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
  },
];

const Balances = () => {
  return (
    <div className={styles.bank}>
      <div className={styles.header}>
        <h3 className={styles.title}>Balances</h3>
      </div>
      <div className={styles.listCon}>
        <div className="mainWrapper">
          <div className={styles.list}>
            {data.length > 0 &&
              data.map((item: any, index) => (
                <BalanceItem
                  key={index}
                  type={index % 2 == 0 ? 'Primary' : 'Secondary'}
                  name={item.name}
                  iconUrl={item.iconUrl}
                  tokenAddress={item.address}
                  amount={0}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balances;
