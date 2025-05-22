
import { getGames } from "@/app/_data/get-games";
import ListGame from "@/components/game/listGame";




export default async function Page() {
  const games = await getGames();
  console.log(games[0].players);
    return (
      <div>
        <h1>Games</h1>
        <ListGame games={games} />
      </div>
    );
  }
  