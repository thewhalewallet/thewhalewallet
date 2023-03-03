import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const url = 'https://api.coingecko.com/api/v3';

interface CoinReq extends NextApiRequest {
  body: {
    coins: string[];
  };
}

interface CoinRes extends NextApiResponse {
  body: {
    [id: string]: {
      symbol: string;
      name: number;
      value: number;
    }
  };
}

export default async function handler(
  req: CoinReq,
  res: CoinRes,
) {

  const coins = req.body.coins;

  if (!coins || coins.length === 0) {
    return res.status(400).json({ error: 'Missing coins' });
  }

  try {
    res.body = {};
    for (const coin of coins) {
      const coinData = await axios.get(`${url}/coins/${coin}`);
      const coinPrice = await axios.get(`${url}/simple/price?ids=${coin}&vs_currencies=usd`);
      
      res.body[coin] = {
        symbol: coinData.data.symbol,
        name: coinData.data.name,
        value: coinPrice.data[coin].usd,
      };
    }

    res.status(200).json(res.body);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ error: (err as Error)});
  }
}
