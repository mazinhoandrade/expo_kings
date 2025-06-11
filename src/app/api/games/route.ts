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
    return NextResponse.json({ status: 401 });
  }
  try {
    const body = await req.json();
    const { description, date, players }: GameInput = body;

    if (!players || players.length === 0) {
      return NextResponse.json({ status: 400 });
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
    return NextResponse.json({ status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ status: 401 });
  }
  try {
    const games = await db.game.findFirst({
      orderBy: {
        date: "desc",
      },
      select: {
        id: true,
        date: true,
        players: {
          where: {
            topcover: 1,
          },
          select: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                position: true,
                monthlypayment: true,
              },
            },
          },
        },
      },
    });
    const topCoverPlayers = games?.players.map((p) => p.user) || []; //
    return NextResponse.json(topCoverPlayers, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 500 });
  }
}
