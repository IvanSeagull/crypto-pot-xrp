import React, { FC } from 'react';

import styles from './styles.module.scss';

interface TextInputProps {
  placeholder?: string;
  fontSize?: number;
  height?: number;
  moreStyles?: any;
  value?: string;
  setValue?: (txt: string) => void;
}

const TextInput: FC<TextInputProps> = ({
  placeholder,
  fontSize = 24,
  height = 60,
  moreStyles,
  value,
  setValue,
}) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        height,
        ...moreStyles,
      }}>
      <input
        placeholder={placeholder}
        type="text"
        className={styles.input}
        style={{
          fontSize,
        }}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
