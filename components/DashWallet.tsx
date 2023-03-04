import DynWallet from "@/components/DynWallet";
import Navbar from "@/components/Navbar";
import axios from "axios";
import useSWR from 'swr'
import { Session } from "next-auth";
import Spinner from "./Spinner";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function DashWallet(session: Session) {

    const { data, error, isLoading } = useSWR(`/api/users/${session.user?.email}`, fetcher);

    console.log(data);
    
    return (
        <div>
            <DynWallet />



        </div>


    )
}