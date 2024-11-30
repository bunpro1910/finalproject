'use client'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import instance from '@/data/Instance';
import { InputLabel, MenuItem, Select } from '@mui/material';
import SelectRole from '../ui/SelectRole';
import '../layout/footer.css'
import AuthService from '@/services/AuthService';
import { toast } from 'react-toastify';
import { redirect, useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter()
  const onSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target)
    AuthService.login(formdata).then(x => {
      localStorage.setItem('token', x.data.token);
      toast.success(`Login success`)
      setTimeout(async () => {
        
       AuthService.profile().then(x=>{
        const role= x.data.roleId
        console.log(x.data)
        switch (role) {
          case 1:
            window.location = 'http://localhost:3000/admin'
            break
          case 2:
            window.location = 'http://localhost:3000/home'
            break
    
        }
       })
   
      

      }, 2000)
    }).catch(e => {
    })
  }
  return (
    <div className='login-bg h-screen w-full relative'>
      <div className=' absolute top-40 w-full flex justify-center'>
        <div className='w-[400px] bg-white rounded-md p-5'>
          <h1 className='flex justify-center font-bold text-3xl'>Login Form</h1>

          <form action="" className='mt-5 flex flex-col gap-4' onSubmit={onSubmit}>
            <TextField id="email" type='email' name='email' label="Email" variant="outlined" />
            <TextField id="password" type='password' name='password' label="Password" variant="outlined" />

            <button type='button' className='text-pink-500'>Forgot password?</button>
            <button type='submit' className='login'>
              Login
            </button>
          </form>
          <h2 className='flex justify-center gap-2 mt-5'>

          </h2>
        </div>
      </div>
    </div>
  )
}
