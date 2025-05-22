import { ShieldCheck } from 'lucide-react';
import React from 'react'

import { PlayerStats } from '@/app/types/user';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


interface Props {
    player: PlayerStats
}
const CardPlayer = ({player}:Props) => {
  const position: string = player?.position.toString();
  const positionColors: Record<string, string> = {
    GOLEIRO: 'bg-blue-500',
    ALA: 'bg-green-500',
    PIVO: 'bg-red-500',
    FIXO: 'bg-yellow-500',
    CORINGA: 'bg-purple-500'
  };

  return (
    <div className="relative w-full h-72 rounded-lg overflow-hidden shadow-2xl transform transition-all hover:scale-105">
      {/* Fundo do card */}
      <div className={`absolute inset-0 ${positionColors[position]} opacity-90`}></div>
      
      {/* Padrão de design */}
      <div className="absolute inset-0 bg-black opacity-10 bg-opacity-20"></div>
      
      {/* Borda superior */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 to-yellow-200"></div>
      
      {/* Foto do jogador */}
      <div className="absolute bottom-4 right-1 w-auto h-32 rounded-full flex items-center justify-center overflow-hidden">
        {player?.image && (
        <Avatar className='w-full h-full'>
          <AvatarImage src={player?.image} className='w-full h-full' />
          <AvatarFallback className=''>?</AvatarFallback>
        </Avatar>
        ) }
      </div>
      
      {/* Nome e posição */}
      <div className="absolute top-4 left-4 text-white">
        <h2 className="text-2xl font-bold uppercase tracking-wide">{player?.name}</h2>
        <p className="text-sm opacity-80">{position}</p>

        <div className='font-bold'>
            <div>Gols : {player.totalGols}</div>
            <div>Assists : {player.totalAssistances}</div>
            <div>Defesas : {player.totalDefenses}</div>
            <div>Capa : {player.totalTopcover}</div>
        </div>
      </div>
      
      {/* Overall rating */}
      <div className="absolute top-4 right-1 w-14 h-14 bg-black rounded-full flex items-center justify-center border-2 border-yellow-400">
        <span className="text-yellow-400 font-bold text-2xl">{(player.totalTopcover)}</span>
      </div>
      
      {/* Nacionalidade */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-20 rounded-full px-3 py-1 backdrop-blur-sm">
        <span className="text-black font-semibold text-xs">BRA</span>
      </div>
      
      {/* Detalhes de posição */}
      {player.monthlypayment &&
      <div className={`absolute bottom-16 left-4 ${positionColors[player?.position as string]} px-3 py-1 rounded-full`}>
        <span className="text-white font-bold text-xs uppercase"><p className='flex items-center'>Mensalista <ShieldCheck className=""/></p></span>
      </div>
      }
    </div>
  );
};


export default CardPlayer