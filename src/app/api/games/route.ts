import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";

// Tipos auxiliares
type PlayerInput = {
  userId: string;
  gols: number;
  assistances: number;
  defenses: number;
  topcover: number; // 1 ou 0
};

type GameInput = {
  description: string;
  date: string;
  players: PlayerInput[];
};

// POST /api/games
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const user = await db.user.findUnique({
    where: { email: session?.user?.email as string },
  });

  if (!session || !session.user || !user?.admin) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { description, date, players }: GameInput = body;

    if (!players || players.length === 0) {
      return NextResponse.json({ message: "Jogadores obrigatórios" }, { status: 400 });
    }

    const game = await db.game.create({
      data: {
        description,
        date: new Date(date),
        players: {
          create: players.map((p) => ({
            user: {
              connect: { id: p.userId },
            },
            gols: p.gols,
            assistances: p.assistances,
            defenses: p.defenses,
            topcover: p.topcover,
          })),
        },
      },
      include: {
        players: true,
      },
    });

    return NextResponse.json(game, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar jogo:", error);
    return NextResponse.json({ message: "Erro interno", error: error.message }, { status: 500 });
  }
}
