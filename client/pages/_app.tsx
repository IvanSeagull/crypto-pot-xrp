import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { Chain, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import MainLayout from '../src/layout/Mainlayout';
import { ToastContainer } from 'react-toastify';
import ApiContextProvider from '../src/context/ApiContext';
import { usePathname } from 'next/navigation';

const xrpl = {
  id: 1440002,
  name: 'XRPL EVM',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'XRP', symbol: 'XRP', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc-evm-sidechain.xrpl.org'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://evm-sidechain.xrpl.org' },
  },
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: 'Crypto pot',
  projectId: 'YOUR_PROJECT_ID',
  chains: [xrpl],
  ssr: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <ApiContextProvider>
            {pathname && !pathname.startsWith('/alert') ? (
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            ) : (
              <Component {...pageProps} />
            )}
          </ApiContextProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
      <ToastContainer />
    </WagmiProvider>
  );
}

export default MyApp;
