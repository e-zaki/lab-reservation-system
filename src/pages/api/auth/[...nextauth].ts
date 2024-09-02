// src/pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Retrieve the user from the database
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        });

        // Validate the password
        if (user && credentials?.password) {
          const isValid = await compare(credentials.password, user.password);
          if (isValid) {
            return { id: user.id, name: user.name, email: user.email, role: user.role };
          }
        }

        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',  // Redirect here if the user is not authenticated
    error: '/auth/error',    // Redirect here on authentication error
    verifyRequest: '/auth/verify-request',  // Redirect here after email verification
    newUser: '/' // Redirect here after successful sign-up or sign-in
  }  
});
