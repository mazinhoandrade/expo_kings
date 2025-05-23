"use client"
import { ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { User } from '@/app/types/user'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type Props = {
    authorization: boolean,
    admin: Omit<User, 'statistics'>
}

const positions = ["GOLEIRO","ALA","PIVO", "FIXO", "CORINGA"];
const EditAccount = ({authorization, admin}:Props) => {
  
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(admin.name);
  const [position, setPosition] = useState<string>(admin?.position);
  const [date, setDate] = useState<Date | undefined>(admin?.birthday);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!name || !position || !date) {
      toast.error("Preencha todos os campos!");
      setLoading(false);
      return;  
    }
    const res = await fetch(`/api/users/${admin.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        position,
        birthday: date,
      }),
    });

    if (res.ok) {
      toast.success("Perfil atualizado com sucesso!");
      window.location.reload();
    } else {
      const data = await res.json();
      toast.error(data.message);
      setLoading(false);
    }
  };

  return (
    <div className='space-y-2'>
        <Card>
        <div className="flex justify-between px-3">
             <Image className='rounded-full' src={admin.image} alt={admin.name} width={105} height={105} quality={100}  />
            <div className='ml-2 space-y-1 w-full'>
                <h1 className='text-2xl font-bold flex items-center'>{admin.name} {admin.monthlypayment && <ShieldCheck className="text-blue-500"/>}</h1>
                <p>Posição: <span className='capitalize'>{admin.position}</span></p>
                {admin.monthlypayment &&       
                <p className='bg-blue-900 rounded-md p-1 w-fit text-sm'>Mensalista</p>
                }
            </div>
        </div>
        </Card>
        <h1 className='text-xl'>Editar Perfil</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-2'>
            <Label>Nome:</Label>
            <Input type="text" name="name" placeholder={admin.name} onChange={(e) => setName(e.target.value)} />
            <Label>Aniversário:</Label>
            <Input type="date" name="date" value={date?.toISOString().split('T')[0]} onChange={(e) => setDate(new Date(e.target.value))} />
            {/* <SelectDate value={date} onChange={setDate} /> */}
            <Label>Posição:</Label>
            <Select
            defaultValue={admin.position.toString()}
            onValueChange={(value) =>{
            setPosition(value)
            }}
            >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tempo de Descanso: DESATIVADO" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((option) => (
                <SelectItem  value={option.toString()} key={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button disabled={loading} type='submit'>Salvar</Button>
        </form>
        {admin.admin &&
          <Button variant={'outline'} className='mt-2 w-full' onClick={() => window.location.reload()}>Editar Players</Button>
        }
    </div>
  )
}

export default EditAccount;