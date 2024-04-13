'use client';
import React from 'react';

import styles from './styles.module.scss';

const PageWrapper = ({ children }: any) => {
  return (
    <div className={styles.wrapper}>
      <div className="container">{children}</div>
    </div>
  );
};

export default PageWrapper;
