import Navbar from '@/components/Navbar';
import { DynamicContextProvider, useDynamicContext } from '@dynamic-labs/sdk-react';

export default function Dashboard() {

    return (
        <div>
        <DynamicContextProvider
            settings={{
                appLogoUrl:
                    'https://pasteboard.co/bilDMbPIERqf.png',
                appName: 'The Whale Wallet',
                environmentId: '488307e9-c2a6-4270-a7ac-2fa4915752f1',
                multiWallet: true,
                shadowDOMEnabled: true,
            }}
        >
            <Navbar />
            <div className="hero min-h-screen bg-base-100">
                <div className="hero-content text-center">
                    <h1>tealda</h1>

                </div>
            </div>
        </DynamicContextProvider>
        </div>
    );
}

