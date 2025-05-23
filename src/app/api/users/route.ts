import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    const user = await db.user.findUnique({
      where: { email: session?.user?.email as string },
    });
  
    if (!session || !session.user || !user?.admin) {
      return NextResponse.json({ status: 401 });
    }
  
    const updates: { id: string; monthlypayment: boolean }[] = await req.json();
  
    if (!Array.isArray(updates)) {
      return NextResponse.json({ status: 400, message: "Formato inválido" });
    }
  
    try {
      await Promise.all(
        updates.map((update) =>
          db.user.update({
            where: { id: update.id },
            data: { monthlypayment: update.monthlypayment },
          })
        )
      );
  
      return NextResponse.json({ status: 200 });
    } catch (error) {
      console.error("Erro ao atualizar usuários:", error);
      return NextResponse.json({ status: 500 });
    }
  }
  