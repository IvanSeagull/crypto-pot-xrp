'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useChainId, useWatchContractEvent } from 'wagmi';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { getUser, getUserByWallet } from '../../utils/api/ApiController';

interface UserData {
  username: string;
  address: string;
}

interface ApiContextProps {
  user: UserData;
}

const ApiContext = createContext<ApiContextProps>({
  user: {} as UserData,
});

interface ApiContextProviderProps {
  children: React.ReactNode;
}

const ApiContextProvider: React.FC<ApiContextProviderProps> = ({ children }) => {
  const { address } = useAccount();
  const [user, setUser] = useState<UserData>({} as UserData);

  useEffect(() => {
    if (!address) return;
    getUserByWallet(address).then((res) => {
      const { username, wallet } = res.data;
      const user: UserData = {
        username,
        address: wallet,
      };

      setUser(user);
    });
  }, [address]);
  return <ApiContext.Provider value={{ user }}>{children}</ApiContext.Provider>;
};

const useApi = () => {
  return useContext(ApiContext);
};
export default ApiContextProvider;
export { useApi };
