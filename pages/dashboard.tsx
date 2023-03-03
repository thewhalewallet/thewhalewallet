import DynWallet from "@/components/DynWallet";

export default function Dashboard(){

    return (
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content text-center">
                <DynWallet />
                <h1> Wallets </h1>
                
            </div>
        </div>     
    )
}