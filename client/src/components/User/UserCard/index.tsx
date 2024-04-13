import React, { FC } from 'react';

import styles from './styles.module.scss';
import { formatAddress } from '../../../utils/formater';

interface UserCardProps {
  username: string;
  wallet: string;
}

const UserCard: FC<UserCardProps> = ({ username, wallet }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avaCon}></div>
      <p className={styles.username}>@{username}</p>
      <p className={styles.address}>{formatAddress(wallet)}</p>
    </div>
  );
};

export default UserCard;
