import { UserContext } from '@/pages';
import axios from 'axios';
import React from 'react';
// Not sure why this is needed, but it is.
// eslint-disable-next-line import/no-extraneous-dependencies
import { usePlaidLink } from 'react-plaid-link';

interface LinkProps {
  link_token: string;
  user_id: string;
}

export function PlaidLink({ linkProps }: { linkProps: LinkProps }) {

  const { refreshLoggedUser } = React.useContext(UserContext);

  const setAccessToken = async (public_token: string) => {
    console.log(linkProps.user_id);
    return await axios.post('/api/plaid/set_access_token', {
      public_token: public_token,
      user_id: linkProps.user_id,
    })
  };
  

  const onSuccess = React.useCallback(async (public_token: string, metadata: any) => {
    // send public_token to server to exchange for access_token and store in db
    setAccessToken(public_token).then(() => {
        refreshLoggedUser(); // will fetch the user from the db and update the context
     }) 
     .catch((error) => {
      console.log(`axios.post() failed: ${error}`);
    });
  }, []);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkProps.link_token,
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
