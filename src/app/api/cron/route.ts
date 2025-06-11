import { NextResponse } from "next/server";

import { db } from "@/app/_lib/prisma";
import { sendEmail } from "@/lib/mailer";

export async function GET(request: Request) {
  const secret = request.headers.get("authorization");

  if (secret !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  // Busca usuários com assinatura expirada
  const expiredUsers = await db.user.findMany({
    where: {
      subscriptionExpiresAt: { lt: now },
      monthlypayment: true,
    },
  });

  for (const user of expiredUsers) {
    // Atualiza o status da assinatura
    await db.user.update({
      where: { id: user.id },
      data: { monthlypayment: false },
    });

    // Envia e-mail de notificação
    await sendEmail({
      to: user.email,
      subject: "Sua Mensalidade Expirou",
      html: `<p>Olá Meu Crack ${user.name || ""}, Sua Mensalidade expirou. Renove para continuar aproveitando os recursos do nosso baba.</p>`,
    });
  }

  return NextResponse.json({ status: 200 });
}
