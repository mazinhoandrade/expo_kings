import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/_lib/auth";
import ListGame from "@/components/game/listGame";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/");

  return (
    <div>
      {session?.user.admin && (
        <Link href="/game/addgame">
          <Button className="my-4 w-full">Novo Jogo</Button>
        </Link>
      )}
      <ListGame authorization={session?.user.admin as boolean} />
    </div>
  );
}
