import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await axios.get(`https://app.dynamic.xyz/api/v0/users/${req.body.uuid}/wallets`, {
        headers: {
            Authorization: `Bearer ${process.env.DYN_KEY}`
        }
    })
    .then((response) => {
        res.status(200).json(response.data);
    }).catch((error) => {
        res.status(500).json({error: error});
    })
    
}