import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { db } from "./prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const LIMITE_USER = 30;

      const usersExists = await db.user.findUnique({
        where: {
          email: user.email as string,
        },
      });

      if (usersExists) {
        return true;
      }

      const usersCount = await db.user.count();
      if (usersCount >= LIMITE_USER) {
        return false;
      }

      return true;
    },

    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id,
      } as {
        id: string;
        name: string;
        email: string;
        image: string;
        admin: boolean;
      };
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
