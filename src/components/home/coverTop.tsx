import Image from 'next/image'
import React from 'react'

import { getTopCover } from '@/app/_data/get-games';

import AvatarCover from './avatarCover';

const CoverTop = async () => {
  const topPLayers = await getTopCover();
  const player = 
  topPLayers?.filter(p => p.position !== 'GOLEIRO')
  .concat(topPLayers?.find(p => p.position === 'GOLEIRO') || []);
  return (
    <>
    <h1 className='text-xl font-bold text-center mx-3 mt-5'>Melhores da Semana</h1>
    <div className='relative'>
        <Image className='w-full' src="/salão.png" alt="" objectFit='cover' width={1000} height={500}/>

 
        <div className='absolute top-0 flex flex-col w-full space-y-2'>
  {/* Jogador 0 - Centralizado no topo */}
  {player?.[0] && (
    <div className='flex justify-center'>
      <AvatarCover image={player[0].image as string} name={player[0].name as string} />
    </div>
  )}

  {/* Jogadores 1 e 2 - Lado a lado */}
  <div className='flex justify-between'>
    <div className='w-1/2 flex justify-center'>
      {player?.[1] && (
        <AvatarCover image={player[1].image as string} name={player[1].name as string} />
      )}
    </div>
    <div className='w-1/2 flex justify-center'>
      {player?.[2] && (
        <AvatarCover image={player[2].image as string} name={player[2].name as string} />
      )}
    </div>
  </div>

  {/* Jogador 3 - Centralizado com margem top */}
  {player?.[3] && (
    <div className='flex justify-center'>
      <AvatarCover image={player[3].image as string} name={player[3].name as string} />
    </div>
  )}

  {/* Jogador 4 - Centralizado com margem top */}
  {player?.[4] && (
    <div className='flex justify-center'>
      <AvatarCover image={player[4].image as string} name={player[4].name as string} />
    </div>
  )}
</div>

    </div>
    </>
  )
}

export default CoverTop