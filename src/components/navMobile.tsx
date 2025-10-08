"use client";

import { CirclePlus, House, UserPen, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const NavMobile = () => {
  const { data } = useSession();

  const pathname = usePathname();

  const handleLinkClick = (active: string = "") => {
    return pathname?.slice(1, pathname?.length) === active
      ? "bg-zinc-800  p-2 rounded-lg p flex flex-col items-center"
      : "p p-2 flex flex-col items-center ";
  };

  return (
    <nav className="fixed inset-x-0 right-0 bottom-0 left-0 z-40 border-t dark:bg-zinc-900">
      <div className="flex items-center justify-around p-2">
        <Link href="/" className={` ${handleLinkClick("")}`}>
          <span className="text-2xl">
            <House />
          </span>
          <span className="text-xs">Início</span>
        </Link>

        <Link href="/players">
          <button className={`${handleLinkClick("players")}`}>
            <span className="text-2xl">
              <Users />
            </span>
            <span className="text-xs">Jogadores</span>
          </button>
        </Link>

        <Link href="/game">
          <button
            className={handleLinkClick("game")}
          >
            <span className="text-2xl">
              <CirclePlus />
            </span>
            <span className="text-xs">Jogos</span>
          </button>
        </Link>

        <Link href="/account">
          <button
            className={handleLinkClick("account")}
          >
            {data?.user && (
              <span className="text-2xl">
                <Image
                  src={data?.user?.image || ""}
                  width={30}
                  height={30}
                  className="bg-primary rounded-xl p-0.5"
                  alt={data?.user?.name || ""}
                />
              </span>
            )}
            {!data?.user && (
              <span className="text-2xl">
                <UserPen />
              </span>
            )}
            <span className="text-xs">Conta</span>
          </button>
        </Link>
      </div>
    </nav>
  );
};
