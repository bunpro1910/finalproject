import React from 'react'
import TableCustom from '../ui/TableCustom'
import { Button } from '@mui/material'
import FacultyTable from './CategoryTable'

export default function Category() {
  return (
    <div>
        <Button href='/admin/category/create' variant='outlined' color='primary'>Create new Category</Button>
        <FacultyTable />
    </div>
  )
}
