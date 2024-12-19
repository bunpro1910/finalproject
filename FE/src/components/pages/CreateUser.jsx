
'use client'
import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, MenuItem, Select } from '@mui/material';
import SelectRole from '../ui/SelectRole';
import UserService from '@/services/UserService';
import { toast } from 'react-toastify';
import SelectFac from '../ui/SelectCate';


export default function CreateUser() {
  
  const onSubmit = (e)=>{
    e.preventDefault()
    const formdata= new FormData(e.target)
    UserService.createUser(formdata).then(x=>{
      toast.success('add success')
      
    }).catch(err=>{
      toast.error('add failed')
    })
  }
  return (
    <form onSubmit={onSubmit}>


      <Grid container spacing={3} >
        <Grid item xs={12} md={6} className='flex !flex-col' >
          <FormLabel htmlFor="fullname" required>
            Full name
          </FormLabel>
          <OutlinedInput
            id="fullname"
            name="fullname"
            type="text"
            placeholder="enter user fullname"
            autoComplete="fullname"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} className='flex !flex-col'>
          <FormLabel htmlFor="email" required>
            Email
          </FormLabel>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            placeholder="enter user email"
            autoComplete="email"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} className='flex !flex-col'>
        <SelectRole />
        </Grid>
        <Grid item xs={6} md={3} className='flex !flex-col'>
          <Button type='submit' variant='contained' className='bg-primary'>Create</Button>
        </Grid>
        <Grid item xs={6} md={3} className='flex !flex-col'>
          <Button href='/admin/user' type='button' variant='contained' color='error' className='bg-error'>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  )
}
