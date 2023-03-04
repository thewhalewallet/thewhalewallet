import axios from "axios"
import IContact from "../types/IContact";
import IUser from "../types/IUser";

export async function getUserIdByEmail({user_email} : { user_email: string }) : Promise<string> {
    return await axios.post(`/api/db/lookup/user`, {
        user: {
            email: user_email,
        }
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
    });
}

export function addContact({ user, contact } : { user: string, contact: IContact}) {
    return axios.post("/api/db/contacts", { user: user, contact: contact });
}

export async function getContacts({user_id} : { user_id: string }) {
    return await axios.get(`/api/db/users/${user_id}`)
    .then((res) => {
        return res.data.contacts;
    }).catch((err) => {
        console.log(err);
    });
}



export async function getUserByEmail({user_email} : { user_email: string }): Promise<IUser> {
    let user_id = await getUserIdByEmail({user_email: user_email});
    return await axios.get(`/api/db/users/${user_id}`).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
    });
}