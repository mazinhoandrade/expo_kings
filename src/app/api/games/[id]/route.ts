import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  const user = await db.user.findUnique({
    where: { email: session?.user?.email as string },
  });

  if (!session || !session.user || !user?.admin) {
    return NextResponse.json({ status: 401 });
  }
  const { id } = await Promise.resolve(params);
  if (!id) {
    return NextResponse.json({ status: 400 });
  }
  try {
    const body = await req.json();
    const { description, date, players } = body;
    const [existingGame, existingPlayers] = await Promise.all([
      db.game.findUnique({
        where: { id: params.id },
        select: { id: true },
      }),
      db.playerStatistics.findMany({
        where: { gameId: params.id },
        select: { userId: true },
      }),
    ]);

    if (!existingGame) {
      return NextResponse.json({ status: 404 });
    }
    // 4. Preparação de Dados para Upsert
    const existingPlayerIds = existingPlayers.map((p) => p.userId);
    const newPlayers = players.filter(
      (p) => !existingPlayerIds.includes(p.userId),
    );
    const updatedPlayers = players.filter((p) =>
      existingPlayerIds.includes(p.userId),
    );

    // 5. Transação Atômica Otimizada
    await db.$transaction([
      // Atualiza o jogo principal
      db.game.update({
        where: { id: params.id },
        data: {
          description,
          date: date || undefined, // Mantém o existente se não fornecido
          updatedAt: new Date(),
        },
      }),

      // Atualiza estatísticas existentes (UPDATE)
      ...updatedPlayers.map((player) =>
        db.playerStatistics.updateMany({
          where: {
            gameId: params.id,
            userId: player.userId,
          },
          data: {
            gols: player.gols,
            assistances: player.assistances,
            defenses: player.defenses,
            topcover: player.topcover ? 1 : 0,
            updatedAt: new Date(),
          },
        }),
      ),

      // Cria novas estatísticas (CREATE)
      db.playerStatistics.createMany({
        data: newPlayers.map((player) => ({
          gameId: params.id,
          userId: player.userId,
          gols: player.gols,
          assistances: player.assistances,
          defenses: player.defenses,
          topcover: player.topcover ? 1 : 0,
        })),
        skipDuplicates: true,
      }),
    ]);

    // await db.game.update({
    //   where: {
    //     id: params.id,
    //   },
    //   data: {
    //     description,
    //     date: gameDate,
    //     players: {
    //       deleteMany: {},
    //       create: players.map((player) => ({
    //         userId: player.userId,
    //         gols: player.gols || 0,
    //         assistances: player.assistances || 0,
    //         defenses: player.defenses || 0,
    //         topcover: player.topcover,
    //       })),
    //     },
    //   },
    //   include: {
    //     players: true,
    //   },
    // });

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  const user = await db.user.findUnique({
    where: { email: session?.user?.email as string },
  });

  if (!session || !session.user || !user?.admin) {
    return NextResponse.json({ status: 401 });
  }

  const { id } = await Promise.resolve(params);
  if (!id) {
    return NextResponse.json({ status: 400 });
  }
  try {
    await db.game.delete({
      where: { id },
    });

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 500 });
  }
}
