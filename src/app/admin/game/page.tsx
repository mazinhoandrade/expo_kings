

import Link from "next/link";

import { getUserAdmin } from "@/app/_data/get-users-player";
import ListGame from "@/components/game/listGame";
import { Button } from "@/components/ui/button";




export default async function Page() {
  const authorization = await getUserAdmin();
    return (
      <div>
        {authorization && 
        <Link href="/admin/game/addgame">
        <Button className="my-4 w-full">Novo Jogo</Button>
        </Link>
        }
        <ListGame authorization={authorization} />
      </div>
    );
  }
  