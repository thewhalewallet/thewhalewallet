import PlaidInit from './PlaidInit';
import IUser from '../types/IUser';

export default function PlaidDisplay({user}: {user: IUser}) {

    if (user._id !== undefined) {
        return (
            <div>
                <PlaidInit user_id={user._id }/>
            </div>
        );
    }
    return (
        <div>
            <p>loading</p>
        </div>
    );


}
