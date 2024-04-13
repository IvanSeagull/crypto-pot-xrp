'use client';
import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import AuthButton from './AuthButton';

const Navbar = () => {
  const { address } = useAccount();
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="mainWrapper">
          <div className={styles.content}>
            <div className={styles.left}>
              <Link href="/">
                <div className={styles.logoCon}>
                  <img src="/logo.svg" className={styles.logo} />
                </div>
              </Link>
            </div>
            <div>
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
