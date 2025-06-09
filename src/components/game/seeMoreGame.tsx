"use client";
import React from "react";

import { PlayerInput } from "@/app/types/playerStatistics";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  date: string;
  players: PlayerInput[];
}

const SeeMoreGame = ({ date, players }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ver +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dados do jogo - {date}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Nome</TableHead>
                <TableHead>Gols</TableHead>
                <TableHead>Assist</TableHead>
                <TableHead>Defesas</TableHead>
                <TableHead>Capa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.userId}>
                  <TableCell className="font-medium">
                    {player.name.split(" ")[0]}
                  </TableCell>
                  <TableCell>{player.gols}</TableCell>
                  <TableCell>{player.assistances}</TableCell>
                  <TableCell>{player.defenses}</TableCell>
                  <TableCell>{player.topcover ? "Sim" : "Não"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SeeMoreGame;
