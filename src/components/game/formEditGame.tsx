"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useReducer, useState } from "react";
import { toast } from "sonner";

import { GameEdit } from "@/app/types/game";
import { PlayerInput } from "@/app/types/playerStatistics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { playerReducer } from "@/reducers/playerReducer";

import DialogApp from "../dialogApp";
import PlayerItem from "./playerItem";
import SheetAddPlayer from "./sheetAddPlayer";

interface Props {
  game: GameEdit;
}
const FormEditGame = ({ game }: Props) => {
  const router = useRouter();
  const [description, setDescription] = useState(game?.description);
  const [date, setDate] = useState<Date>(game.date);
  const [players, dispatch] = useReducer(playerReducer, game?.players as []);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (players.length === 0) {
      toast.error("Nenhum jogador adicionado!");
      return;
    }
    const res = await fetch(`/api/games/${game.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        date: date ? date : new Date(),
        players: players.map((p) => ({
          userId: p.userId,
          gols: p.gols,
          assistances: p.assistances,
          defenses: p.defenses,
          topcover: p.topcover ? 1 : 0,
        })),
      }),
    });

    if (res.ok) {
      toast.success("Jogo cadastrado com sucesso!");
      reset();
      setDescription("");
      router.replace("/game");
    } else {
      const data = await res.json();
      toast.error(data.message);
      setLoading(false);
    }
  };

  const addPlayer = (name: string, userId: string) => {
    dispatch({ type: "ADD_PLAYER", payload: { name, userId } });
  };

  const removePlayer = (userId: string) => {
    dispatch({ type: "REMOVE_PLAYER", payload: { userId } });
  };

  const updateField = (
    userId: string,
    field: keyof PlayerInput,
    value: string | boolean,
  ) => {
    dispatch({ type: "UPDATE_FIELD", payload: { userId, field, value } });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const handleCancelGame = () => {
    reset();
    setDescription("");
    router.replace("/game");
  };

  return (
    <div>
      {loading && (
        <div className="bg-opacity-20 fixed inset-0 z-10 flex items-center justify-center bg-black/70">
          <div className="mx-auto mt-4 animate-bounce text-4xl">⚽</div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
        />
        <Input
          type="date"
          name="date"
          value={date?.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
        />

        {/* <SelectDate value={date} onChange={setDate} /> */}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Gols</TableHead>
              <TableHead>Assists</TableHead>
              <TableHead>Defesas</TableHead>
              <TableHead>Capa</TableHead>
              <TableHead>Excluir</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <PlayerItem
                key={player.userId}
                player={player}
                handleChange={(userId, field, value) =>
                  updateField(userId, field, value)
                }
                removePlayer={(userId) => removePlayer(userId)}
              />
            ))}
          </TableBody>
        </Table>

        <SheetAddPlayer
          handleSelecionar={(player) => addPlayer(player.name, player.id)}
        />

        <Button
          type="submit"
          disabled={players.length <= 0 || loading}
          className="hover:bg-zinc-750 w-full bg-zinc-800 text-sm text-white focus:outline-none"
        >
          Salvar Jogo
        </Button>
      </form>

      <div className="flex flex-col py-3">
        <DialogApp
          label="Cancelar Jogo"
          onClick={handleCancelGame}
          disabled={players.length <= 0 || loading}
        />
      </div>
    </div>
  );
};

export default FormEditGame;
