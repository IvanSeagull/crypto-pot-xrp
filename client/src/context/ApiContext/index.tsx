'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useChainId, useWatchContractEvent } from 'wagmi';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { getUser, getUserByWallet } from '../../utils/api/ApiController';
import { useRouter as rt } from 'next/router';

interface UserData {
  username: string;
  address: string;
}

interface ApiContextProps {
  user: UserData;
  setUser: (user: UserData) => void;
}

const ApiContext = createContext<ApiContextProps>({
  user: {} as UserData,
  setUser: () => {},
});

interface ApiContextProviderProps {
  children: React.ReactNode;
}

const ApiContextProvider: React.FC<ApiContextProviderProps> = ({ children }) => {
  const { address } = useAccount();
  const [user, setUser] = useState<UserData>({} as UserData);
  const navigate = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const router = rt();

  console.log(router.pathname);

  useEffect(() => {
    if (!isMounted) return;
    if (!address) return;
    getUserByWallet(address).then((res) => {
      const { username, wallet } = res.data;
      const user: UserData = {
        username,
        address: wallet,
      };

      setUser(user);
      if (!username) {
        navigate.push('/activate');
      }
    });
  }, [address, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    if (!user.username) {
      navigate.push('/activate');
    }
  }, [router.pathname]);
  return <ApiContext.Provider value={{ user, setUser }}>{children}</ApiContext.Provider>;
};

const useApi = () => {
  return useContext(ApiContext);
};
export default ApiContextProvider;
export { useApi };
