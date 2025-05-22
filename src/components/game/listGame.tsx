import { Pencil } from 'lucide-react'
import React from 'react'

import { GameWithPlayer } from '@/app/types/game'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Button } from '../ui/button'
  interface Props {
    games: GameWithPlayer[]
  }
const ListGame = ({games}:Props) => {

  return (
    <Table>

  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Data Jogo</TableHead>
      <TableHead>Qtd Players</TableHead>
      <TableHead>Ver +</TableHead>
      <TableHead className="text-right">Ações</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
     {games.length > 0 && games?.map((game) => (
      <TableRow key={game.id}>
      <TableCell>{new Date(game.date).toLocaleDateString("pt-BR")}</TableCell>
      <TableCell>{game.playerCount}</TableCell>
      <TableCell><Button>Ver +</Button></TableCell>
      <TableCell className="flex gap-2 justify-end">
        <Button><Pencil /></Button>
        <Button variant="destructive">Deletar</Button>
      </TableCell>
      </TableRow>
    ))}
    
  </TableBody>
</Table>
  )
}

export default ListGame