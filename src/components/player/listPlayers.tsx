"use client";
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react'

import { getListPlayers } from '@/app/_data/get-users-player';
import { PlayerStats } from '@/app/types/user';

import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import CardPlayer from './cardPlayer';

const ListPlayers = () => {

  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  
  const getPlayers = async () => {
    const data = await getListPlayers();
    setPlayers(data);
    setLoading(false);
  };

  const handleSearch = async (e: string) => {
    setSearch(e);
    const playerFilter = players.filter((play) =>
      play.name.toLowerCase().includes(e.toLowerCase()),
    );
    if (e === "") {
      getPlayers();
    } 
    setPlayers(playerFilter);
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <div className='mt-2'>
        <div className="relative">
    <Input
      type="text"
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Procurar por nome"
      className="p-2 "
    />
    <Search className="absolute right-3 top-1" />
  </div>
  {loading && (
    <div className="grid xs:grid-cols-2  md:grid-cols-3 gap-3 mt-3 ">
      <Skeleton className="w-full h-64" />
      <Skeleton className="w-full h-64" />
    </div>
  )}
  <div className='grid xs:grid-cols-2  md:grid-cols-3 gap-3 mt-3'>
    {!loading && players.length > 0 && players.map((player) => (
        <CardPlayer key={player.id} player={player} />
    ))}
  </div>
  {!loading && players.length === 0 && (
    <div className="flex items-center justify-center h-40">
      <h1 className="text-2xl font-bold">Nenhum jogador encontrado</h1>
    </div>
  )}

  

  
  </div>
  )
}

export default ListPlayers