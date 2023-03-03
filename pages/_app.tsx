import '@/styles/globals.css';
import '@/styles/login.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { DynamicContextProvider, DynamicWidget} from '@dynamic-labs/sdk-react';

//
export default function App({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}