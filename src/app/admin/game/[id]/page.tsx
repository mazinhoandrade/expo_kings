import { redirect } from "next/navigation";
import React from "react";

import { getGame } from "@/app/_data/get-games";
import { getUserAdmin } from "@/app/_data/get-users-player";
import { GameEdit } from "@/app/types/game";
import FormEditGame from "@/components/game/formEditGame";

interface Props {
  params: {
    id: string;
  };
}
const Page = async ({ params }: Props) => {
  const authorization = await getUserAdmin();
  if (!authorization) {
    redirect("/admin/game");
  }

  const { id } = await Promise.resolve(params);
  const game = await getGame(id);
  return <FormEditGame game={game as GameEdit} />;
};

export default Page;
