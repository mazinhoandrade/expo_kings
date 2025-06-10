import { getServerSession } from "next-auth/next";

import BirthdayMonth from "@/components/home/birthdayMonth";
import CoverTop from "@/components/home/coverTop";
import Header from "@/components/home/header";
import InscriptionAlert from "@/components/home/inscriptionAlert";
import ListRanking from "@/components/home/listRanking";

import { authOptions } from "./_lib/auth";
import { User } from "./types/user";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header />
      <div className="mb-16">
        {session?.user && !session?.user.monthlypayment && (
          <InscriptionAlert User={session?.user as User} />
        )}
        <CoverTop />
        <BirthdayMonth />
        <ListRanking />
      </div>
    </>
  );
}
