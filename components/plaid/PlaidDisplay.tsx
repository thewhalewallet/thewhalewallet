import PlaidInit from './PlaidInit';
import IUser from '../types/IUser';

export default function PlaidDisplay({user}: {user: IUser}) {

    if (user._id !== undefined) {
        return <PlaidInit user_id={user._id }/>
    }
    return <p>loading</p>
}
