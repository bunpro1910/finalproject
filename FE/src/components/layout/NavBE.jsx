"use client" 
import React from 'react'
import './header.css'
import Link from 'next/link';
 
export default function NavBE() {
  return (
    <div className='containerFE'>
        <div className='titleFE'> <Link href='/home' className='text-black hover:border-red-300'>Home</Link></div>
    <div className='menuFE'>
    
      <div className='searchFE'>
        <MdSearch />
        <input type="text" placeholder="Search..." className='inputFE'/>
      </div>
    </div>
  </div>
  )
}
