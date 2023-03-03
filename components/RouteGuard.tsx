
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function RouteGuard({ children }: { children: any }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return null;
    }

    if (status === 'unauthenticated') {
        router.push('/login');
        return null;
    }

    return children;
}
