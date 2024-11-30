import React from 'react'
import TableCustom from '../ui/TableCustom'
import { Button } from '@mui/material'
import UserTable from './UserTable'

export default function User() {
  return (
    <div>
        <Button href='/admin/user/create' variant='outlined' color='primary' >Create new User</Button>
        <UserTable />
    </div>
  )
}
