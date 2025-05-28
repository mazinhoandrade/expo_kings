import { redirect } from "next/navigation";

import { getUserAdmin } from "@/app/_data/get-users-player";
import EditUsers from "@/components/account/editUsers";

export default async function Account() {
  const authorization = await getUserAdmin();

  if (!authorization) redirect("/admin/account");
  return <EditUsers />;
}
