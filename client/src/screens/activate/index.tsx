'use client';
import React, { useState } from 'react';

import styles from './styles.module.scss';

import TextInput from '../../components/global/Inputs/TextInput';
import MainButton from '../../components/global/Buttons/MainButton';

const Activate = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const activate = async () => {
    setIsLoading(true);
    // Call API to activate account
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.con}>
        <div className="mainWrapper">
          <div className={styles.content}>
            <h2 className={styles.title}>Activate account</h2>
            <p className={styles.desc}>
              To receive donations you need to activate your account. Enter your username and
              confirm transaction
            </p>
            <TextInput
              value={username}
              setValue={setUsername}
              moreStyles={{ marginBottom: 24 }}
              placeholder="Username"
              fontSize={18}
            />
            <MainButton
              isLoading={isLoading}
              onClick={() => {
                activate();
              }}
              title="Activate"
              loadingTitle="Activating..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activate;
