import axios from "axios"
import IContact from "../types/IContact";
import IUser from "../types/IUser";

export function addContact({ user, contact } : { user: string, contact: IContact}) {
    return axios.post("/api/db/contacts", { user: user, contact: contact });
}

export async function getContacts({user} : { user: string }) {
    return axios.get(`/api/db/contacts?user=${user}`);
}

export async function getUser({email} : { email: string }): Promise<IUser> {
    return await axios.post('/api/db/lookup/user', { 
        user: {
            email: email
        }}
    ).then ( async (res) => {
        return await axios.get(`/api/db/users/${res.data._id}`)
        .then((res) => {
            return res.data;
        });
    })
    .catch((err) => {
        console.log(err);
        return null;
    });
}