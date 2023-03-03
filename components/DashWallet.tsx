import DynWallet from "@/components/DynWallet";
import Navbar from "@/components/Navbar";
import axios from "axios";
import useSWR from 'swr'
import { Spinner } from "@dynamic-labs/sdk-react/src/lib/components";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function DashWallet({id, session}: {id: string, session: any}){

    const { data, error, isLoading } = useSWR(`/api/wallet/${id}`, fetcher);

    return (
        <DynWallet />
    )
}