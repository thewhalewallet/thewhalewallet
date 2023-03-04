import axios from "axios"
import IContact from "../types/Contact";

export function addContact({ user, contact } : { user: string, contact: IContact}) {
    return axios.post("/api/db/contacts", { user: user, contact: contact });
}

export async function getContacts({user} : { user: string }) {
    return axios.get(`/api/db/contacts?user=${user}`);
}