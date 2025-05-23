import { getUser, getUserAdmin } from "@/app/_data/get-users-player";
import EditUsers from "@/components/account/editUsers";

export default async function  Account() {
    const authorization = await getUserAdmin();
    const admin = await getUser();
    return (
      <EditUsers/>
    );
  }