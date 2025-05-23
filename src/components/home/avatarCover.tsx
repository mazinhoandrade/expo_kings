import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'

import {AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props {
    image: string,
    name: string
}
const AvatarCover = ({image, name}: Props) => {
  return (
    <Avatar className='flex flex-col items-center'>
    <AvatarImage src={image} className='w-10 h-10 rounded-full' />
    <AvatarFallback>{name}</AvatarFallback>
    <p className='text-black font-bold capitalize text-md'>{name.split(' ')[0]}</p>
   </Avatar>
  )
}

export default AvatarCover