'use client';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import CoinContainer from '../../global/coinContainer';
import AmountInput from '../../global/Inputs/AmountInput';
import TextInput from '../../global/Inputs/TextInput';
import MainButton, { MainButtonIcon } from '../../global/Buttons/MainButton';
import { useAccount, useWriteContract } from 'wagmi';
import { abi, address } from '../../../utils/contract';
import { toast } from 'react-toastify';

const def = {
  name: 'XRP',
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
  symbol: 'XRP',
};

interface DonateConProps {
  wallet: string;
}

const DonateCon: React.FC<DonateConProps> = ({ wallet }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();

  const donate = async () => {
    setIsLoading(true);
    try {
      await writeContractAsync({
        address: address,
        abi: abi,
        functionName: 'donate',
        value: BigInt(Number(amount) * 10 ** 18),
        args: [wallet, message],
      });
    } catch (e) {
      toast.error('Error donating');
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <CoinContainer title={def.name} icon={def.icon} size={30} />
        <AmountInput amount={amount} setAmount={setAmount} />
        <TextInput
          placeholder="Enter message"
          fontSize={18}
          value={message}
          setValue={setMessage}
        />
        <MainButton
          icon={MainButtonIcon.BAG}
          isLoading={isLoading}
          title={'Send donation'}
          loadingTitle={'Sending...'}
          onClick={() => {
            donate();
          }}
        />
      </div>
    </>
  );
};

export default DonateCon;
