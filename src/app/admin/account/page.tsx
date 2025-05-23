import { getUser, getUserAdmin } from "@/app/_data/get-users-player";
import EditAccount from "@/components/account/editAccount";

export default async function  Account() {
    const authorization = await getUserAdmin();
    const admin = await getUser();
    return (
      <EditAccount authorization={authorization} admin={admin}/>
    );
  }
  