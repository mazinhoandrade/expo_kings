"use client";

import { Search, ShieldCheck, Volleyball } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { getListUsers } from "@/app/_data/get-users-player";
import { User } from "@/app/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface Props {
  handleSelecionar: (user: { name: string; id: string }) => void;
}

const SheetAddPlayer = ({ handleSelecionar }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState<Omit<User, "statistics">[]>([]);
  const [allPlayers, setAllPlayers] = useState<Omit<User, "statistics">[]>([]);

  const getPlayers = async () => {
    setLoading(true);
    const data = await getListUsers();
    setPlayers(data);
    setAllPlayers(data);
    setLoading(false);
  };

  useEffect(() => {
    getPlayers();
  }, []);

  // Função debounce simples
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };


// Busca otimizada com debounce
  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);

        if (value.trim() === "") {
          setPlayers(allPlayers);
          return;
        }

        const filtered = allPlayers.filter((p) =>
          p.name.toLowerCase().includes(value.toLowerCase())
        );
        setPlayers(filtered);
      }, 300),
    [allPlayers]
  );

  const handleSelectPlayer = (name: string, id: string) => {
    handleSelecionar({ id, name });
    // setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="w-full py-5 text-lg focus:outline-none">
          + Adicionar Jogador
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Procurar Jogador</SheetTitle>
        </SheetHeader>
        <div className="relative px-2">
          <Input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={search}
            placeholder="Procurar por nome"
            className="p-2"
          />
          <Search className="absolute top-2 right-3" />
        </div>
        <div className="mx-2">
          <h2 className="text-md text-gray-200">Lista de jogadores</h2>
          <ul className="mt-2 space-y-2">
            <ScrollArea className="my-2 h-screen pb-10 lg:px-2">
              <ScrollBar orientation="vertical" className="invisible" />
              {loading && (
                <Volleyball size={50} className="mx-auto mt-4 animate-bounce" />
              )}
              {!loading &&
                players.length > 0 &&
                players.map((ex) => (
                  <li
                    className="cursor-pointer"
                    onClick={() => handleSelectPlayer(ex.name, ex.id)}
                    key={ex.id}
                  >
                    <div
                      title={ex.name}
                      className="flex items-center justify-between border-b border-zinc-600 py-2"
                    >
                      <div className="mr-2 w-1/6">
                        {" "}
                        <Image
                          src={ex.image}
                          alt={ex.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="w-4/5 text-left text-sm">{ex.name}</div>
                      {ex.monthlypayment && (
                        <p title="mensalista">
                          <ShieldCheck className="text-blue-500" />
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              {!loading && players.length === 0 && (
                <p className="text-center text-sm text-zinc-800">
                  Nenhum player cadastrado
                </p>
              )}
            </ScrollArea>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetAddPlayer;
