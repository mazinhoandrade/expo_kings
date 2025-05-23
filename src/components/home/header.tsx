import Image from 'next/image';
import React from 'react'

const Header = () => {
  return (
    <div className="relative bg-black py-2 flex items-center justify-center h-44">
        <Image className='absolute top-0 shadow-md' src="/logo.png" alt="" width={200} height={200}/>
    </div>
  )
}

export default Header;