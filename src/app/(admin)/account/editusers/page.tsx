import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/_lib/auth";
import EditUsers from "@/components/account/editUsers";

export default async function Account() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/");

  if (!session.user.admin) redirect("/account");
  return <EditUsers />;
}
