"use server"

import { getServerSession } from "next-auth"

import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"
import { Game } from "../types/game"

export const getGames = async (): Promise<Omit<Game, "player">[]> => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []
  const games = await db.game.findMany({
    orderBy: {
      createdAt: "asc",
  }})
  return games as Omit<Game, "player">[]
}