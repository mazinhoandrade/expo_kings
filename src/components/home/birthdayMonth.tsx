import { ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { getUserBrithdayMonth } from '@/app/_data/get-users-player'

import { Card } from '../ui/card'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

const BirthdayMonth = async () => {
  const usersBrithday = await getUserBrithdayMonth();
  return (
    <>
    <h1 className='text-xl font-bold text-center mx-3 mt-5 capitalize'>aniversariante(s) do mês 🎉</h1>
    <ScrollArea className="my-2 w-full lg:px-2">
    <ScrollBar orientation="horizontal" className="invisible" />
    <div className='py-5 flex w-max space-x-2 gap-2'>
        {usersBrithday.length > 0 && usersBrithday?.map((user) => (
          <Card className={`w-auto relative px-2 ${user.monthlypayment && 'border-2 border-blue-500'}`} key={user.id}>
             <Image className='rounded-2xl' src={user.image} alt="" objectFit='cover' width={150} height={150}/>
             <span className='absolute top-[-10px] right-[-10px] bg-yellow-500 p-2 rounded-full w-10 h-10 text-center font-bold'>{user.birthday.toLocaleDateString('pt-BR', {
               day: 'numeric',
               timeZone: 'UTC',
             })}</span>
             <div className='flex flex-col items-center justify-center'>
              <h1 className='text-lg font-bold flex items-center gap-1 capitalize'>{user.name.toString().split(' ')[0]} {user.monthlypayment && <ShieldCheck className="text-blue-500"/>}</h1>
              <p className='text-sm capitalize'>{user.position}</p>
             </div>
          </Card>
        ))}
    </div>
    </ScrollArea>
         {usersBrithday.length === 0 && (
            <h1 className='text-sm text-center'>Nenhum aniversariante no mês</h1>
        )}
    </>
  )
}

export default BirthdayMonth