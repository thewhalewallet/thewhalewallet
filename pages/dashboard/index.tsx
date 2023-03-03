import DashWallet from '@/components/DashWallet';
import Navbar from '@/components/Navbar';
import { useSession } from "next-auth/react";
import Spinner from '@/components/Spinner';
export default function Dashboard() {
    const { data: session, status } = useSession();

    if (status !== "authenticated") {
        return (
            <div className="hero min-h-screen bg-base-100">
                <div className="hero-content text-center">
                    <Spinner />;
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar {...session}/>
            <div className="hero min-h-screen bg-base-100">
                <div className="hero-content text-center">
                    <DashWallet {...session} />
                </div>
            </div>
        </div>
    );
}

