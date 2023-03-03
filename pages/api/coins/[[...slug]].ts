import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const url = 'https://api.coingecko.com/api/v3';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const slug = req.query.slug as string[];
  const endpoint = slug.join('/');
  const response = await axios.get(`${url}/${endpoint}`);
  res.status(200).json(response.data);
}
