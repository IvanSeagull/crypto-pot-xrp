'use client';
import React, { FC, useState } from 'react';

import styles from './styles.module.scss';

import CoinContainer from '../../../global/coinContainer';
import SecondaryButton from '../../../global/Buttons/SecondaryButton';
import { useReadContract, useWriteContract } from 'wagmi';
import { abi, address } from '../../../../utils/contract';
import { toast } from 'react-toastify';

interface BalanceItemProps {
  type: string;
  amount: number;
  iconUrl: string;
  name: string;
  tokenAddress: string;
}
const BalanceItem: FC<BalanceItemProps> = ({ type, amount, name, iconUrl, tokenAddress }) => {
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();

  const balanceResult = useReadContract({
    address: address,
    abi: abi,
    functionName: 'getBalance',
  });

  const withdraw = async () => {
    setIsWithdrawLoading(true);
    try {
      await writeContractAsync({
        address: address,
        abi: abi,
        functionName: 'withdraw',
      });
    } catch (error) {
      console.log(error);
      toast.error('Error withdrawing');
    }
    setIsWithdrawLoading(false);
  };

  console.log(balanceResult.data);

  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: type === 'Primary' ? '#FAFAFA' : '#F2F2F2',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.coin}>
        <CoinContainer title={name} icon={iconUrl} size={24} />
      </div>
      <p className={styles.amount}>{Number(balanceResult.data) / 10 ** 18}</p>

      <div className={styles.button}>
        <SecondaryButton onClick={withdraw} isLoading={isWithdrawLoading} isActive={isHovered} />
      </div>
    </div>
  );
};

export default BalanceItem;
