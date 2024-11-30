
'use client'
import React, { useState } from 'react'
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
import FacultyService from '@/services/CategoryService';
import ContributionService from '@/services/ProductService';
import SelectFac from '../ui/SelectCate';
import SelectAcadmicyear from '../ui/SelectAcadmicyear';
import SelectStatus from '../ui/SelectStatus';
import ProductService from '@/services/ProductService';
import SelectCate from '../ui/SelectCate';


export default function CreateProduct() {

  const onSubmit = (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target)
    ProductService.createProduct(formdata).then(x => {
      toast.success('add success')
    }).catch(err => {
      toast.error('add failed')
    })
  }

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
          />
        </Grid>
       
        <Grid item xs={12} md={6} className='flex !flex-col'>
        <FormLabel htmlFor="price" required>
            Price
          </FormLabel>
          <OutlinedInput
            id="price"
            name="price"
            type="number"
            placeholder="enter price"
            autoComplete="price"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} className='flex !flex-col'>
          <SelectCate />
        </Grid>
        <Grid item xs={12} md={6} className='flex !flex-col'>
          <FormLabel htmlFor="image" required>
          File
          </FormLabel>
          <OutlinedInput
            id="image"
            name="image"
            type="file"
            placeholder="enter image"
            autoComplete="image"
            required
          />
        </Grid>
        <Grid item xs={12} md={12} className='flex !flex-col'>
          <FormLabel htmlFor="description" >Description</FormLabel>
          <textarea name="description" id="" cols="10" rows="5"></textarea>
        </Grid>

        <Grid item xs={6} md={3} className='flex !flex-col'>

          <Button type='submit' variant='contained' className='bg-primary'>Create</Button>
        </Grid>
        <Grid item xs={6} md={3} className='flex !flex-col'>
          <Button href='/admin/product' type='button' variant='contained' color='error' className='bg-error'>Cancel</Button>
        </Grid>
      </Grid>
    </form >
  )
}
