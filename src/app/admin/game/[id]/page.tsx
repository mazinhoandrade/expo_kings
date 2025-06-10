import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import React from "react";

import { getGame } from "@/app/_data/get-games";
import { authOptions } from "@/app/_lib/auth";
import { GameEdit } from "@/app/types/game";
import FormEditGame from "@/components/game/formEditGame";

interface Props {
  params: {
    id: string;
  };
}
const Page = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/");

  if (!session.user.admin) {
    redirect("/admin/game");
  }

  const { id } = await Promise.resolve(params);
  const game = await getGame(id);
  return <FormEditGame game={game as GameEdit} />;
};

export default Page;
