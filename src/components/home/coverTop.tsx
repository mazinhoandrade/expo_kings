"use client";
import Image from "next/image";
import React from "react";

import { User } from "@/app/types/user";

import AvatarCover from "./avatarCover";

const CoverTop = () => {
  const [player, setPlayer] = React.useState<
    Pick<User, "id" | "name" | "image" | "position" | "monthlypayment">[]
  >([]);
  const [looding, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await fetch("/api/games");
      const data = await res.json();
      const players = data
        ?.filter((p) => p.position !== "GOLEIRO")
        .concat(data?.find((p) => p.position === "GOLEIRO") || []);
      setPlayer(players);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <h1 className="mx-3 mt-5 text-center text-xl font-bold">
        Melhores da Semana ⚽
      </h1>
      <div className="relative">
        <Image
          className="w-full"
          src="/salão.png"
          alt=""
          objectFit="cover"
          width={1000}
          height={500}
        />

        <div className="absolute top-0 flex w-full flex-col space-y-2">
          {looding && (
            <div className="relative top-16 mx-auto mt-4 animate-bounce text-4xl">
              ⚽
            </div>
          )}
          {/* Jogador 0 - Centralizado no topo */}
          {!looding && player.length > 0 && player?.[0] && (
            <div className="flex justify-center">
              <AvatarCover
                image={player[0].image as string}
                name={player[0].name as string}
                isMonthly={player[0].monthlypayment}
              />
            </div>
          )}

          {/* Jogadores 1 e 2 - Lado a lado */}
          <div className="flex justify-between">
            <div className="flex w-1/2 justify-center">
              {player?.[1] && (
                <AvatarCover
                  image={player[1].image as string}
                  name={player[1].name as string}
                  isMonthly={player[0].monthlypayment}
                />
              )}
            </div>
            <div className="flex w-1/2 justify-center">
              {player?.[2] && (
                <AvatarCover
                  image={player[2].image as string}
                  name={player[2].name as string}
                  isMonthly={player[0].monthlypayment}
                />
              )}
            </div>
          </div>

          {/* Jogador 3 - Centralizado com margem top */}
          {player?.[3] && (
            <div className="flex justify-center">
              <AvatarCover
                image={player[3].image as string}
                name={player[3].name as string}
                isMonthly={player[0].monthlypayment}
              />
            </div>
          )}

          {/* Jogador 4 - Centralizado com margem top */}
          {player?.[4] && (
            <div className="flex justify-center">
              <AvatarCover
                image={player[4].image as string}
                name={player[4].name as string}
                isMonthly={player[0].monthlypayment}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CoverTop;
