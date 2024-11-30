'use client'
import instance from '@/data/Instance';
import AuthService from '@/services/AuthService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {
  const [user, setUser] = useState()
  const [path, setPath] = useState()
  const router = useRouter()
  useEffect(() => {

    AuthService.profile().then(x => {
      setUser(x.data)

      switch (x.data.roleId) {
        case 1:
          setPath('admin')
          break
        case 2:
          setPath('Manager/Index')

          break
        case 3:
          setPath('coordinator/index')
          break
        case 4:
          setPath('Student/index')

          break
        case 5:
          setPath('guest/index')
          break
      }

    }).catch(e => console.log(e))
    return () => {

    }
  }, [path])
  return (
    <>

      <ToastContainer />
        <div className='border-y-2 px-8 py-3 flex justify-between items-center'>
    <div className='flex items-center space-x-8'>
      <img src="/home/images/logo.png" alt="Logo" className='max-w-[180px]' />
      <Link href='/home' className='text-black hover:border-red-300 font-bold text-xl'>Home</Link>
     
    </div>
    <div className='flex items-center'>
    {!user ? (
      <div>
        <Link href='/login' className='text-2xl font-bold'>Login</Link>
      </div>
    ) : (
      <div className='flex items-center gap-4'>
        <Link href='/profile' className='text-xl font-bold'>{user.fullName}</Link>
        <button onClick={(e) => { localStorage.removeItem('token'); setUser(); router.push('/login') }} className='text-xl font-bold'>Logout</button>
      </div>
    )}
  </div>
</div>

    </>
  )
}
