
'use client'
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, MenuItem, Select } from '@mui/material';
import SelectRole from '../ui/SelectRole';
import UserService from '@/services/UserService';
import { toast } from 'react-toastify';


export default function UpdateUser({ id }) {
  const [user, setUser] = useState()
  const onSubmit = (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target)
    UserService.updateUser(id,formdata).then(x => {
      toast.success('update success')

    }).catch(err => {
      toast.error('update failed')
    })
  }
  useEffect(() => {
    UserService.getUserById(id).then(x => [
      setUser(x.data)
    ])
  }, [])
  if (!user) return

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
            defaultValue={user?.fullName}
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
            defaultValue={user?.email}
          />
        </Grid>
        <Grid item xs={12} md={6} className='flex !flex-col'>
          <FormLabel htmlFor="password" required>
            Password
          </FormLabel>
          <OutlinedInput
            id="password"
            name="password"
            type="password"

            placeholder="enter user password"
            autoComplete="password"
            required
            defaultValue={user?.password}
          />
        </Grid>
        <Grid item xs={12} md={6} className='flex !flex-col'>
          <SelectRole defaultValue={user?.roleId}/>
        </Grid>
        <Grid item xs={6} md={3} className='flex !flex-col'>
          <Button type='submit' variant='contained' className='bg-primary'>Update</Button>
        </Grid>
        <Grid item xs={6} md={3} className='flex !flex-col'>
          <Button href='/admin/user' type='button' variant='contained' color='error' className='bg-error'>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  )
}
