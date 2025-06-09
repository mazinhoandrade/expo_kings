import { redirect } from "next/navigation";
//import { User } from "next-auth";
import { getServerSession } from "next-auth/next";

//import { getUser, getUserAdmin } from "@/app/_data/get-users-player";
import { authOptions } from "@/app/_lib/auth";
import { User } from "@/app/types/user";
import EditAccount from "@/components/account/editAccount";

export default async function Account() {
  const session = await getServerSession(authOptions);
  const { user } = session as { user: User };
  if (!user) {
    redirect("/");
  }

  //const admin = await getUser();
  return <EditAccount User={user} />;
}
