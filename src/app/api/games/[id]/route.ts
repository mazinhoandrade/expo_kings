import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(_: Request, { params }: Params) {
    const session = await getServerSession(authOptions);

    const user = await db.user.findUnique({
      where: { email: session?.user?.email as string },
    });
  
    if (!session || !session.user || !user?.admin) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

  const gameId = params.id;

  try {
    await db.game.delete({
      where: { id: gameId },
    });

    return NextResponse.json({ message: "Jogo deletado com sucesso!" }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao deletar jogo:", error);
    return NextResponse.json({ message: "Erro ao deletar jogo", error: error.message }, { status: 500 });
  }
}
