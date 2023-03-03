import '@/styles/globals.css';
import '@/styles/login.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import RouteGuard from '@/components/RouteGuard';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* <RouteGuard> */}
        <Component {...pageProps} />
      {/* </RouteGuard> */}
    </SessionProvider>
  );
}