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
        }),
      ),
    );

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar usuários:", error);
    return NextResponse.json({ status: 500 });
  }
}

export async function GET() {
  const currentMonth = new Date().getMonth();

  try {
    // Fetch users with non-null birthdays
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        position: true,
        monthlypayment: true,
        birthday: true,
      },
      where: {
        birthday: {
          not: null,
        },
      },
    });

    // Filter users whose birthday month matches current month
    const usersWithBirthdayThisMonth = users.filter((user) => {
      return user.birthday?.getMonth() === currentMonth;
    });

    // Sort by day of the month
    const sortedUsers = usersWithBirthdayThisMonth.sort((a, b) => {
      return (a.birthday?.getDate() ?? 0) - (b.birthday?.getDate() ?? 0);
    });

    // Converter datas para formato brasileiro antes de retornar
    const usersFormat = sortedUsers.map((user) => ({
      ...user,
      // Formatar data no padrão DD/MM/YYYY
      birthday: user.birthday
        ? user.birthday.toLocaleDateString("pt-BR", {
            day: "numeric",
            timeZone: "UTC",
          })
        : null,
    }));

    return NextResponse.json(usersFormat);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
