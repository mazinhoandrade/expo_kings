import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";


export async function PATCH(
    req: Request, 
    { params }: { params: { id: string } 
}) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ status: 401 });
    }

    const { id } = await Promise.resolve(params);
    if (!id) {
      return NextResponse.json({ status: 400 });
    }

    try {
     const { name, position, birthday } = await req.json();
     await db.user.update({
      where: { id },
      data: {
        name,
        position,
        birthday,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 500 });
  }
}

export async function DELETE( 
  req: Request,
  { params }: { params: { id: string } 
}) {
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
  await db.user.delete({
    where: { id },
  });

  return NextResponse.json({ status: 200 });
} catch (error: any) {
  return NextResponse.json({ status: 500 });
}
}