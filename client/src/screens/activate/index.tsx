import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

import TextInput from '../../components/global/Inputs/TextInput';
import MainButton from '../../components/global/Buttons/MainButton';
import { useWriteContract } from 'wagmi';
import { abi, address } from '../../utils/contract';
import ActivateButton from './ActivateButton';

const Activate = () => {
  const [username, setUsername] = useState('');

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

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

            {isMounted && <ActivateButton />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activate;
