import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
// Not sure why this is needed, but it is.
// eslint-disable-next-line import/no-extraneous-dependencies
import { usePlaidLink } from 'react-plaid-link';

interface LinkProps {
  link_token: string;
  user_id: string;
}
const PlaidLink: React.FC<LinkProps> = (props: LinkProps) => {
  const onSuccess = React.useCallback(async (public_token: string, metadata: any) => {
    // send public_token to server to exchange for access_token and store in db
    await axios.post('/api/plaid/set_access_token', { 
      public_token: public_token,
      user_id: props.user_id,
     }).catch((error) => {
      console.log(`axios.post() failed: ${error}`);
    });
  }, []);
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.link_token,
    onSuccess: onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <div className='flex flex-row justify-center'>

    <button
      className="whaleButton"
      onClick={() => {
        open();
      }}
      disabled={!ready}
      >
      Add Bank Account
    </button>
      </div>
  );
};

export default PlaidLink;
