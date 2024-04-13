'use client';
import React, { FC, useState } from 'react';

import styles from './styles.module.scss';

export enum MainButtonIcon {
  NONE = 'none',
  BAG = 'bag',
  LOADING = 'loading',
}

interface MainButtonProps {
  onClick?: () => void;
  title: string;
  loadingTitle?: string;
  icon?: MainButtonIcon;
  isLoading?: boolean;
}

const MainButton: FC<MainButtonProps> = ({
  onClick,
  title,
  icon = MainButtonIcon.NONE,
  isLoading = false,
  loadingTitle,
}) => {
  return (
    <div onClick={() => onClick?.()} className={isLoading ? styles.loadingWrapper : styles.wrapper}>
      {icon === MainButtonIcon.BAG && (
        <img
          style={{
            width: 16,
            height: 16,
          }}
          src="/logo.svg"
          alt="bag"
          className={styles.bag}
        />
      )}
      <p className={styles.title}>{isLoading ? loadingTitle : title}</p>
    </div>
  );
};

export default MainButton;
