
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
import SelectMc from '../ui/SelectMc';
import CategoryService from '@/services/CategoryService';



export default function UpdateFaculty({id}) {
  const [category,setCategory] = useState()
  const onSubmit = (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target)
    CategoryService.updateCategory(id,formdata).then(x => {
      toast.success('Update success')

    }).catch(err => {
      console.log(err)
      toast.error('Update failed')
    })
  }
  useEffect(()=>{
    CategoryService.getCategoryById(id).then(x=>[
      setCategory(x.data)
    ])
  },[])
  if(!category) return
  console.log(category)
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={3} >
        <Grid item xs={12} md={6} className='flex !flex-col' >
          <FormLabel htmlFor="name" required>
            Name
          </FormLabel>
          <OutlinedInput
            id="name"
            name="name"
            type="text"
            placeholder="enter name"
            autoComplete="name"
            required
            defaultValue={category?.name||""}
          />
        </Grid>
        {/* <Grid item xs={12} md={6} className='flex !flex-col'>
          <FormLabel htmlFor="name" required>
            Closure Date
          </FormLabel>
          <OutlinedInput
            id="closuredate"
            name="closuredate"
            type="datetime-local"
            placeholder="Select closure date"
          
            required
          />
        </Grid>
        <Grid item xs={12} md={6} className='flex !flex-col'>
          <FormLabel htmlFor="finalclosuredate" required>
            Final Closure Date
          </FormLabel>
          <OutlinedInput
            id="finalclosuredate"
            name="finalclosuredate"
            type="datetime-local"
            placeholder="Select final closure date"
    
            required
          />
        </Grid> */}
         <Grid item xs={12} md={6} className='flex !flex-col'>
         <FormLabel htmlFor="name" >
            Description
          </FormLabel>
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="enter descritopm"
            autoComplete="name"
            required
            cols={20}
            defaultValue={category?.description}
            rows={10}
            >
            </textarea>
        </Grid>
        
        <Grid item xs={6} md={3} className='flex !flex-col'>
          <Button type='submit' variant='contained' className='bg-primary'>Update</Button>
        </Grid>
        <Grid item xs={6} md={3} className='flex !flex-col'>
          <Button href='/admin/category' type='button' variant='contained' color='error' className='bg-error'>Cancel</Button>
        </Grid>
      </Grid>
    </form >
  )
}
