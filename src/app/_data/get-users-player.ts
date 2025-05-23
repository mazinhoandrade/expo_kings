"use server"

import { getServerSession } from "next-auth"

import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"
import { PlayerStats, User } from "../types/user"

export const getListUsers = async (): Promise<Omit<User, "statistics">[]> => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "asc",
    },
  })
  return users as Omit<User, "statistics">[]
}

export const getUser = async (): Promise<Omit<User, "statistics">> => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return {} as User
  const user = await db.user.findUnique({
    where: { email: session?.user?.email as string },
  })
  return user as Omit<User, "statistics">
}

export const getUserAdmin = async (): Promise<boolean> => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return false
  const user = await db.user.findUnique({
    where: { email: session?.user?.email as string },
  })
  const admin = user?.admin?true:false
  return admin;
}

export const getListPlayers = async (): Promise<PlayerStats[]> => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      birthday: true,
      monthlypayment: true,
      position: true,
      statistics: {
        select: {
          gols: true,
          assistances: true,
          topcover: true,
          defenses: true,
        },
      },
    },
    where: {
      statistics: {
        some: {},
      },
    },
  })
  return users.map(user => ({
    id: user.id,
    name: user.name,
    image: user.image,
    birthday: user.birthday,
    monthlypayment: user.monthlypayment,
    position: user.position,
    totalGols: user.statistics.reduce((sum, stat) => sum + stat.gols, 0),
    totalAssistances: user.statistics.reduce((sum, stat) => sum + stat.assistances, 0),
    totalTopcover: user.statistics.reduce((sum, stat) => sum + stat.topcover, 0),
    totalDefenses: user.statistics.reduce((sum, stat) => sum + stat.defenses, 0),
    gamesPlayed: user.statistics.length,
  }));
}