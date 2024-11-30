import React from 'react'
import TableCustom from '../ui/TableCustom'
import { Button } from '@mui/material'

import ProductTable from './ProductTable'

export default function Contribution() {
  return (
    <div>
        <Button href='/admin/product/create' variant='outlined' color='primary'>Create new Product</Button>
        <ProductTable />
    </div>
  )
}
