import { DynamicContextProvider, DynamicWidget} from '@dynamic-labs/sdk-react';

export default function DynWallet() {
    return (
        <DynamicContextProvider
            settings={{
                appLogoUrl:
                    'https://pasteboard.co/bilDMbPIERqf.png',
                appName: 'The Whale Wallet',
                environmentId: '18fa6c3f-9025-4c9b-8f5b-02eff904aa72'
            }}
        >
            <DynamicWidget />
        </DynamicContextProvider>
    );
}