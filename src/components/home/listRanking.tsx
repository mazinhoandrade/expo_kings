"use client"
 
import { Volleyball } from "lucide-react"
import * as React from "react"

import { getListPlayers } from "@/app/_data/get-users-player"
import { PlayerStats } from "@/app/types/user"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const statistics = [
  {
    name: "Gols",
    value: "totalGols",
  },
  {
    name: "Assistências",
    value: "totalAssistances",
  },
  {
    name: "Capas",
    value: "totalTopcover",
  },
  {
    name: "Desfesas",
    value: "totalDefenses",
  },
]
const ListRanking = () => {
  const [ranking, setRanking] = React.useState<PlayerStats[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [statistic, setStatistic] = React.useState();

  const getRanking = async () => {
    const data = await getListPlayers();
    setRanking(data);
    setLoading(false);
  };
  React.useEffect(() => {
    getRanking();
  }, []);


  const handleSearch = async (e: string) => {
    setSearch(e);
    const playerFilter = ranking.filter((play) =>
      play.name.toLowerCase().includes(e.toLowerCase()),
    );
    if (e === "") {
      getRanking();
    }
    setRanking(playerFilter);
  };
  const handleSelectStatistic = (e: string) => {
    const playerFilter = [...ranking].sort((a, b) => b[e] - a[e]);   
    setRanking(playerFilter);
  }
  
  return (
    <>
    <h1 className='text-xl font-bold text-center mx-3 mt-5 capitalize'>classificação dos jogadores 🔥</h1>
    
    <div className="w-full py-4">

      <div className="flex items-center px-2 gap-1 py-4">
        <Input
          placeholder="Pesquisar por nome"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
       <Select onValueChange={(value) =>handleSelectStatistic(value) }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por:" />
            </SelectTrigger>
            <SelectContent>
              {statistics.map((option) => (
                <SelectItem  value={option.value.toString()} key={option.name}>
                  {option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
      </div>

      <div className="rounded-md border mx-2">
       
       <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Nome</TableHead>
                   <TableHead>Gols</TableHead>
                   <TableHead>Assists</TableHead>
                   <TableHead>Defesas</TableHead>
                   <TableHead>Capa</TableHead>
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
                 {!loading && ranking.length > 0 && ranking.map(player => (
                   <TableRow key={player.id} className={`capitalize text-xs`}>
                   <TableCell>{player.name.split(" ")[0]}</TableCell>
                   <TableCell>{player.totalGols}</TableCell>
                   <TableCell>{player.totalAssistances}</TableCell>
                   <TableCell>{player.totalDefenses}</TableCell>
                   <TableCell>{player.totalTopcover}</TableCell>
                   </TableRow>
                 ))}
                 {!loading && ranking.length === 0 && (
                   <TableRow>
                     <TableCell colSpan={5} className="h-24 text-center">
                       Nenhum jogador encontrado.
                     </TableCell>
                   </TableRow>
                 )}
               </TableBody>
             </Table>
          
      </div>
    </div>
  
    </>
  )
}

export default ListRanking