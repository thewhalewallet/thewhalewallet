import PlaidInit from './PlaidInit';
import IUser from '../types/IUser';

export default function PlaidDisplay({user}: {user: IUser}) {
    
    return (
        <div>
            <PlaidInit userId={user._id}/>
            <p>
                {user._id}
                {user.email}
                {user.plaid_access_token}
            </p>
        </div>
    );
}
