"use server"

import { getServerSession } from "next-auth"

import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"
import { GameWithPlayer } from "../types/game";




export async function getGames(): Promise<GameWithPlayer[]> {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []
  try {
    const games = await db.game.findMany({
      include: {
        players: {
          include: {
            user:{
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      },
      orderBy: {
        date: 'desc',
      },
    });

    const gamesWithPlayer = games.map((game) => ({
      ...game,
      playerCount: game.players.length,
    }));

    return  gamesWithPlayer;
  } catch (error) {
    console.error('Error fetching games with player count:', error);
    throw new Error('Failed to fetch games with player count');
  } finally {
    await db.$disconnect();
  }
}