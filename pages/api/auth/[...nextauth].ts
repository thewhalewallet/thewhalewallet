import NextAuth, { Session, User } from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID as string,
    //   clientSecret: process.env.APPLE_SECRET as string,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>',
    // }),

  ],
  callbacks: {
    session: async ({session, token, user}: { session: Session; token: JWT; user: User;}) => {
      return Promise.resolve(session);
    }
  },
});
