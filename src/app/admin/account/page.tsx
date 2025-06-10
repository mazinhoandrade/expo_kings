import { redirect } from "next/navigation";
//import { User } from "next-auth";
import { getServerSession } from "next-auth/next";

//import { getUser, getUserAdmin } from "@/app/_data/get-users-player";
import { authOptions } from "@/app/_lib/auth";
import { User } from "@/app/types/user";
import EditAccount from "@/components/account/editAccount";

export default async function Account() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/");

  return <EditAccount User={session?.user as User} />;
}
