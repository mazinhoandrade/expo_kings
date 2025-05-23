

import Link from "next/link";

import { getGames } from "@/app/_data/get-games";
import { getUserAdmin } from "@/app/_data/get-users-player";
import ListGame from "@/components/game/listGame";
import { Button } from "@/components/ui/button";




export default async function Page() {
  const games = await getGames();
  const authorization = await getUserAdmin();
    return (
      <div>
        {authorization && 
        <Link href="/admin/game/addgame">
        <Button className="my-4 w-full">Novo Jogo</Button>
        </Link>
        }
        <ListGame games={games} authorization={authorization} />
      </div>
    );
  }
  