"use client";
import { usePathname } from "next/navigation";
import React from 'react'


const Header = () => {
  const pathname = usePathname();
    
  return (
    <div className="bg-black py-2 flex items-center gap-2 uppercase">
      <div className="pl-2"></div> 
      <div className="w-full text-center">{pathname?.slice(1, pathname?.length).split("/")[1]} </div>
    </div>
  )
}

export default Header;