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
      const LIMITE_USER = parseInt(process.env.SIGNUP_LIMIT as string);

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
      const dbUser = await db.user.findUnique({
        where: {
          id: user.id as string,
        },
        select: {
          id: true,
          name: true,
          email: true,
          birthday: true,
          position: true,
          image: true,
          admin: true,
          subscriptionExpiresAt: true,
          monthlypayment: true,
        },
      });
      session.user = {
        ...session.user,
        id: dbUser?.id,
        admin: dbUser?.admin,
        name: dbUser?.name,
        image: dbUser?.image,
        birthday: dbUser?.birthday,
        position: dbUser?.position,
        email: dbUser?.email,
        subscriptionExpiresAt: dbUser?.subscriptionExpiresAt,
        monthlypayment: dbUser?.monthlypayment,
      };
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
