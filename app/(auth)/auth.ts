import { compare } from "bcrypt-ts";
import NextAuth, { User, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUser } from "@/db/queries";

import { authConfig } from "./auth.config";

interface ExtendedSession extends Session {
  user: User;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Authorization attempt with credentials:', {
          email: credentials?.email ? 'provided' : 'missing',
          password: credentials?.password ? 'provided' : 'missing'
        });

        if (!credentials?.email || !credentials?.password) {
          console.error('Missing email or password');
          return null;
        }

        try {
          console.log('Looking up user:', credentials.email);
          const users = await getUser(credentials.email as string);
          
          if (users.length === 0) {
            console.error('No user found with email:', credentials.email);
            return null;
          }

          const user = users[0];
          console.log('User found, verifying password...');
          
          const isValidPassword = await compare(credentials.password as string, user.password!);
          
          if (!isValidPassword) {
            console.error('Invalid password for user:', credentials.email);
            return null;
          }
          
          console.log('Password verified, user authorized:', user.id);
          
          // Return only the necessary user data
          return {
            id: user.id,
            email: user.email,
            name: user.email.split('@')[0]
          };

          return {
            id: user.id,
            email: user.email,
            name: user.email.split('@')[0], // Optional: Set a default name from email
          };
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: any;
    }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
