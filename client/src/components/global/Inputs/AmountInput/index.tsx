import React, { FC } from 'react';

import styles from './styles.module.scss';
import { useAccount, useBalance } from 'wagmi';

interface AmountInputProps {
  onClick: () => void;
  amount: string;
  setAmount: (value: string) => void;
}

const AmountInput: FC<AmountInputProps> = ({ onClick, amount, setAmount }) => {
  const { address } = useAccount();
  const data = useBalance({
    address,
  });
  console.log(data.data?.formatted);
  return (
    <div className={styles.wrapper}>
      <input
        placeholder="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={styles.input}
        inputMode="decimal"
        type="text"
        onKeyPress={(e) => {
          if (!/^[0-9.]$/.test(e.key)) {
            e.preventDefault();
          }
        }}
        pattern="^[0-9]*[.,]?[0-9]*$"
        minLength={1}
        maxLength={79}
      />
    </div>
  );
};

export default AmountInput;
