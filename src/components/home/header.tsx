import Image from 'next/image';
import React from 'react'

const Header = () => {
  return (
    <div className="relative bg-black py-2 flex items-center justify-center h-34">
        <Image className='absolute top-0' src="/logo.png" alt="" width={150} height={150}/>
    </div>
  )
}

export default Header;