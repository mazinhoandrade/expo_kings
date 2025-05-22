
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import FormGame from "@/components/game/formGame";

import NotFoundAdmin from "../../not-found";



export default async function AddGame() {
    const session = await getServerSession(authOptions);
      if (!session?.user) {
        return NotFoundAdmin();
    }
   
    const user = await db.user.findUnique({
        where: { email: session?.user?.email as string },
    });
      if (!user?.admin) {
        redirect("/");
      }

    return (<FormGame />);
  }
  