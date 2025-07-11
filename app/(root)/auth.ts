// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: string;
    }
  }
  
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (user && user.password) {
          const isMatch = compareSync(credentials.password as string, user.password);
          // if password is correct, return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }) {
      // set user is from token 
      if (token && token.sub) {
        session.user.id = token.sub as string;
        session.user.role = token.role;
        session.user.name = token.name;
      }

      // if there is update set the user name 
      if (trigger === 'update' && user) {
        session.user.name = user.name;
      }
      return session;
    },
    async jwt({ token, user }) {
      // assign user fields to token
      if (user) {
        token.role = user.role;

        // if user has no name then use the email
        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0];
          // update database to reflect the token name 
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }
      return token;
    },
  },
  events: {
    async signIn({ user }) {
      // Note: This is a simplified approach. In a real app, you'd want to handle this
      // in middleware or a more appropriate place
      console.log('User signed in:', user.email);
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
