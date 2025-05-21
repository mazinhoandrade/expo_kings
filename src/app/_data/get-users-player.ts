"use server"

import { getServerSession } from "next-auth"

import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"

export const getListUsers = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []
  return db.user.findMany({
    orderBy: {
      createdAt: "asc",
    },
  })
}
