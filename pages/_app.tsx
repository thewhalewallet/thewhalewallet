import React from 'react';
import '@/styles/globals.css';
import '@/styles/login.css';
import type { AppProps } from 'next/app';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react';
import { useEffect } from 'react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
     <Component {...pageProps} />
  );
}