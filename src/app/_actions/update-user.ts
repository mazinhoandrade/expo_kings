"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"

import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"

interface CreateBookingParams {
  userId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Unauthenticated")
  }
  await db.user.update({
    where: {
      id: params.userId,
    },
    data: params.date,
  })
  revalidatePath("/admin/account")
}
