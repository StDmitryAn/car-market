import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const user = users.find((user: any) => user.email === credentials?.email);

                if (user && bcrypt.compareSync(credentials!.password, user.passwordHash)) {
                    return { id: user.id, name: user.name, email: user.email };
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            return session;
        },
        async redirect() {
            return '/add';
        }
    },

    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax', // или strict
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            },
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
