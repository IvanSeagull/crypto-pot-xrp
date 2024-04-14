'use client';
import React from 'react';

import styles from './styles.module.scss';
import Balances from '../../components/Dashboard/Balances';
import LastDonations from '../../components/Dashboard/LastDonations';

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {/* <Balances /> */}
        <LastDonations />
      </div>
    </div>
  );
};

export default Dashboard;
