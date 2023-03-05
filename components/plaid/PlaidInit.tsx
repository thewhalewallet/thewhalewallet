import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import PlaidLink from './PlaidLink';

interface CreateLinkResponse {
  link_token: string;
}

export default function PlaidInit({ user_id } : { user_id: string }) {
  const [linkToken, setLinkToken] = useState<string>('');
  const generateToken = async () => {
    const res: AxiosResponse<CreateLinkResponse> = await axios.post('/api/plaid/create_link_token', {
      user_id: user_id,
    });
    setLinkToken(res.data.link_token);
  };

  useEffect(() => {
    generateToken().catch((error) => {
      console.log(`generateToken() failed: ${error}`);
    });
  }, []);

  const linkProps = {
    link_token: linkToken,
    user_id: user_id,
  };
  
  return linkToken != null ? <PlaidLink linkProps={linkProps}/> : <div></div>;
}
