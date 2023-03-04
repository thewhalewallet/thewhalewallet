import Image from 'next/image';
import { useRouter } from 'next/router';
import { DynamicWidget } from '@dynamic-labs/sdk-react';
export default function Navbar() {
    const router = useRouter();
    return (
        <div className="navbar bg-base-100">
            <div className="flex-none">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-max rounded-full">
                            <Image className="object-scale-down" src="/logo.jpeg" alt='' width={512} height={512} />
                        </div>
                    </label>
            </div>
            <div className="flex-1" onClick={() => {
                router.push("/")
            }}>
                <a className="btn btn-ghost normal-case text-xl text-sky-700">WhaleWallet</a>
            </div>
            <div className="flex-none">
                <DynamicWidget />
            </div>
        </div>
    );
}



