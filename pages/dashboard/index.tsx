import DashWallet from '@/components/DashWallet';
import Navbar from '@/components/Navbar';
import { useSession } from "next-auth/react";

export default function Dashboard() {
    const { data: session, status } = useSession();

    if (status !== "authenticated") {
        
    }

    return (
        <div>
            <Navbar session={session} />
            <div className="hero min-h-screen bg-base-100">
                <div className="hero-content text-center">
                    <DashWallet id={""} session={session} />
                </div>
            </div>
        </div>
    );
}

