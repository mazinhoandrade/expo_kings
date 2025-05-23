
"use client"

import { Pencil } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getGames } from '@/app/_data/get-games'
import { GameWithPlayer } from '@/app/types/game'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import DialogApp from '../dialogApp'
import { Button } from '../ui/button'
  interface Props {
    authorization: boolean
  }
const ListGame = ({authorization}:Props) => {
const [loading, setLoading] = useState(true);
const [games, setGames] = useState<GameWithPlayer[]>([]);

const getGamesPlayers = async () => {
  const data = await getGames(); 
  setGames(data);
  setLoading(false);
};

useEffect(() => {
  getGamesPlayers();
}, []);
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await fetch(`/api/games/${id}`, {
        method: 'DELETE',
      })
      toast.success('Jogo deletado com sucesso!')
      getGamesPlayers();
    } catch (error) {
      console.error(error)
      toast.error('Erro ao deletar jogo')
      setLoading(false);
    }
  }

  return (
    <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Data Jogo</TableHead>
      <TableHead>Qtd Players</TableHead>
      <TableHead>Ver +</TableHead>
      {authorization &&
      <TableHead className="text-right">Ações</TableHead>
      }
    </TableRow>
  </TableHeader>
  <TableBody>
  {loading && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                    <div className="animate-bounce mx-auto mt-4 text-4xl">⚽</div>
                    </TableCell>
                  </TableRow>
                )}
     {!loading && games.length > 0 && games?.map((game) => (
      <TableRow key={game.id}>
      <TableCell>{new Date(game.date).toLocaleDateString("pt-BR")}</TableCell>
      <TableCell>{game.playerCount}</TableCell>
      <TableCell><Button>Ver +</Button></TableCell>
      {authorization &&
      <TableCell className="flex gap-2 justify-end">
        <Button><Pencil /></Button>
        <DialogApp disabled={loading} label="Excluir" onClick={() => handleDelete(game.id)} />
      </TableCell>
      }
      </TableRow>
    ))}
    {!loading && games.length === 0 && (
                       <TableRow>
                         <TableCell colSpan={5} className="h-24 text-center">
                           Nenhum jogador encontrado.
                         </TableCell>
                       </TableRow>
                     )}
  </TableBody>
</Table>
  )
}

export default ListGame