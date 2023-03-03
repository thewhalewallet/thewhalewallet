import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
export default function Navbar({ session }: { session: any }) {
    const router = useRouter();
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1" onClick={() => {
                router.push("/dashboard")
            }}>
                <a className="btn btn-ghost normal-case text-xl">WhaleWallet</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-max rounded-full">
                            {
                                session.user.image ? (
                                    <Image className="object-scale-down" src={session.user.image} alt='' width={512} height={512} />
                                ) : ( // just in case
                                    <Image className="object-scale-down" src="/logo.jpeg" alt='' width={512} height={512} />
                                )
                            }
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        {
                            session ? (
                                <li onClick={() => signOut()}><a>Logout</a></li>
                            ) : (
                                <li onClick={() => signIn()}><a>Login</a></li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}


