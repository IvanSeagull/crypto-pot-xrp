import React, { FC } from 'react';

import styles from './styles.module.scss';
import Link from 'next/link';
import { formatAddress } from '../../../utils/formater';

interface UserContainerProps {
  icon?: string;
  username?: string;
  wallet?: string;
  size?: number;
}

const UserContainer: FC<UserContainerProps> = ({ icon, username, wallet = '', size = 32 }) => {
  return (
    <Link href={`/user/${username}`}>
      <div className={styles.wrapper}>
        <div
          className={styles.avaCon}
          style={{
            width: size,
            height: size,
          }}></div>
        {username && username.length > 0 ? (
          <div>
            <p className={styles.username}>{username}</p>
            <p className={styles.wallet}>{formatAddress(wallet)}</p>
          </div>
        ) : (
          <div>
            <p className={styles.username}>{formatAddress(wallet)}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default UserContainer;
