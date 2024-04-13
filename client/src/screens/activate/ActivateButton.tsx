import React, { useState } from 'react';
import MainButton from '../../components/global/Buttons/MainButton';
import { useWriteContract } from 'wagmi';
import { abi, address } from '../../utils/contract';

const ActivateButton = () => {
  const { writeContractAsync } = useWriteContract();

  const [isLoading, setIsLoading] = useState(false);

  const activate = async () => {
    setIsLoading(true);
    await writeContractAsync({
      abi,
      address,
      functionName: 'selfActivate',
      args: ['seagull'],
    });
    setIsLoading(false);
  };

  return (
    <MainButton
      isLoading={isLoading}
      onClick={() => {
        activate();
      }}
      title="Activate"
      loadingTitle="Activating..."
    />
  );
};

export default ActivateButton;
