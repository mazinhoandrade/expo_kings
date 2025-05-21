"use client";

import { Search, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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

interface Props {
  handleSelecionar: (name: string) => void;
}

const SheetAddExercises = ({ handleSelecionar }: Props) => {
  const [open, setOpen] = useState(false);

  const [players, setPlayers] = useState<User[]>([]);

  const getExercise = async () => {
    const data = await getListUsers();
    setPlayers(data);
  };

  useEffect(() => {
    getExercise();
  }, []);

  const handleSelectExercise = (name: string) => {
    handleSelecionar(name);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="hover:bg-zinc-750 w-full py-5 text-lg text-white focus:outline-none">
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
            placeholder="Procurar por nome"
            className="p-2 "
          />
          <Search className="absolute right-3 top-2" />
        </div>
        <div className="mx-2">
        <h2 className="text-md  text-gray-200">Lista de Exercicios</h2>
        <ul className="mt-2 max-h-full space-y-2 overflow-y-auto scroll-smooth pb-24">
          {players.length > 0 &&
            players.map((ex) => (
              <li
                className="cursor-pointer"
                onClick={() => handleSelectExercise(ex.name)}
                key={ex.name}
              >
                <div className="flex items-center justify-between border-b border-zinc-600 py-2">
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
                  {ex.monthlypayment && 
                  <p title="mensalista" ><ShieldCheck className="text-blue-500"/></p>
                  }
                  
                </div>
              </li>
            ))}
          {players.length === 0 && (
            <p className="text-center text-sm text-zinc-800">
              Nenhum player cadastrado
            </p>
          )}
        </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetAddExercises;
