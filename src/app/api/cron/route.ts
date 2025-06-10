import { NextResponse } from "next/server";

import { db } from "@/app/_lib/prisma";

export async function GET(request: Request) {
  const secret = request.headers.get("authorization");

  if (secret !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  await db.user.updateMany({
    where: {
      subscriptionExpiresAt: { lt: now },
      monthlypayment: true,
    },
    data: {
      monthlypayment: false,
    },
  });

  return NextResponse.json({ status: 200 });
}
