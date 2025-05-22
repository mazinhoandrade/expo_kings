
import { getGames } from "@/app/_data/get-games";
import { Game } from "@/app/types/game";




export default async function Page() {
  const games = await getGames();
    return (
      <div>
        {games.map((game) => (
          <div className="text-white text-3xl" key={game.id}>{game.id}</div>
        ))}
      </div>
    );
  }
  