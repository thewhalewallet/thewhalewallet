import '@/styles/globals.css';
import '@/styles/login.css';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react';
import type { AppProps } from 'next/app';
import React from 'react';
import { OnLinkSuccessCallback } from '@/components/utils/DynCallbacks.sercice';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className=''>
        <DynamicContextProvider
            settings={{
                appLogoUrl:
                    'https://pasteboard.co/bilDMbPIERqf.png',
                appName: 'The Whale Wallet',
                environmentId: '488307e9-c2a6-4270-a7ac-2fa4915752f1',
                multiWallet: true,
                shadowDOMEnabled: true,
                eventsCallbacks: {
                    onLinkSuccess: (args) => {
                        const call = async () => {
                            await OnLinkSuccessCallback(args);
                        }
                        call();
                    }
                  }
                
            }}   
        >
        <Component {...pageProps} />
     </DynamicContextProvider>
     </div>
  );
}