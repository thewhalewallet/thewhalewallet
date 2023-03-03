import '@/styles/globals.css';
import '@/styles/login.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { DynamicContextProvider, DynamicWidget} from '@dynamic-labs/sdk-react';



export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
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