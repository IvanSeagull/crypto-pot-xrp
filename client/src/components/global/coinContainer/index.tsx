'use client';
import React, { FC } from 'react';
import styles from './styles.module.scss';

interface CoinContainerProps {
  icon: string;
  title: string;
  size?: number;
  onClick?: () => void;
}

const CoinContainer: FC<CoinContainerProps> = ({ icon, title, size = 32, onClick }) => {
  return (
    <div
      onClick={() => onClick?.()}
      className={styles.wrapper}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: onClick ? '#fff' : 'transparent',
        padding: onClick ? '5px' : '0',
        borderRadius: onClick ? '5px' : '0',
      }}>
      <img
        className={styles.icon}
        src={icon}
        alt={title}
        style={{
          width: size,
          height: size,
        }}
      />
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default CoinContainer;
