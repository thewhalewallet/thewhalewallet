import '@/styles/globals.css';
import '@/styles/login.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '@rainbow-me/rainbowkit/styles.css';

import { DynamicContextProvider, DynamicWidget} from '@dynamic-labs/sdk-react';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

//
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

      <DynamicContextProvider
        settings={{
          appLogoUrl:
            'public/theWaleWalletLogo.jpeg',
          appName: 'The Whale Wallet',
          environmentId: '18fa6c3f-9025-4c9b-8f5b-02eff904aa72'
        }}
      >

      <DynamicWidget /> 
      </DynamicContextProvider>
    </>
  );
}