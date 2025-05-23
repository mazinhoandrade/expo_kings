"use client";

import { CirclePlus, House, LogOut, UserPen, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import SignInDialog from "./sign-in-dialog";

export const NavMobile = () => {
  const { data } = useSession();
  const handleLogoutClick = () => {
    signOut();
  };
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

        <Link href="/admin/players">
          <button className={`${handleLinkClick("admin/players")}`}>
            <span className="text-2xl">
              <Users />
            </span>
            <span className="text-xs">Jogadores</span>
          </button>
        </Link>

        <Link href="/admin/game">
          <button
            disabled={!data?.user}
            className={`${handleLinkClick("admin/game")} ${!data?.user ? "opacity-50" : ""} `}
          >
            <span className="text-2xl">
              <CirclePlus />
            </span>
            <span className="text-xs">Jogos</span>
          </button>
        </Link>

        <Link href="/admin/account">
          <button
            disabled={!data?.user}
            className={`${handleLinkClick("admin/account")} ${
              !data?.user ? "opacity-50" : ""
            }`}
          >
            <span className="text-2xl">
              <UserPen />
            </span>
            <span className="text-xs">Conta</span>
          </button>
        </Link>

        {data?.user && (
          <div
            className="flex flex-col items-center"
            onClick={handleLogoutClick}
          >
            <span className="text-2xl">
              <LogOut />
            </span>
            <span className="text-xs">Sair</span>
          </div>
        )}
        {!data?.user && <SignInDialog />}
      </div>
    </nav>
  );
};
