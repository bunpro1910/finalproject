
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

import DeadlineService from '@/services/OrderService';
import AuthService from '@/services/AuthService';

export default function Profile() {

    const [user, setUser] = useState()
    const onSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        UserService.updateUser(user.id, formdata).then(x => {
            toast.success('Update success')
        }).catch(err => {
            toast.error('Update failed')
        })
    }
    useEffect(() => {
        AuthService.profile().then(x => [
            UserService.getUserById(x.data.id).then(z=>{
                setUser(z.data)
            })
        ])
    }, [])
    if (!user) return
    return (
        <form onSubmit={onSubmit} className='mx-[200px] py-[200px]'>
            <input type="hidden" name="password" value={user?.password} />
            <input type="hidden" name="facultyid" value={user?.faculty[0]?.id} />
            <input type="hidden" name="role" value={user?.role?.id} />
            <Grid container spacing={3} >
                <Grid item xs={12} md={6} className='flex !flex-col' >
                    <FormLabel htmlFor="name" required>
                        Full Name
                    </FormLabel>
                    <OutlinedInput
                        id="fullname"
                        name="fullname"
                        type="text"
                        placeholder="enter name"
                        autoComplete="fullname"
                        required
                        defaultValue={user?.fullName}
                    />
                </Grid>
                <Grid item xs={12} md={6} className='flex !flex-col' >
                    <FormLabel htmlFor="name" required>
                        Gmail
                    </FormLabel>
                    <OutlinedInput
                        id="email"
                        name="email"
                        type="text"
                        placeholder="enter name"
                        autoComplete="name"
                        required
                        defaultValue={user?.email}
                    />
                </Grid> 
                <Grid item xs={12} md={6} className='flex !flex-col'>
                    <FormLabel htmlFor="name" required>
                        Faculty
                    </FormLabel>
                    <OutlinedInput
                        id="name"
                        name="faculty"
                        type="text"
                        placeholder="enter name"
                        autoComplete="name"
                        readOnly
                        defaultValue={user?.faculty[0]?.name}
                    />
                </Grid>
                <Grid item xs={12} md={6} className='flex !flex-col'>
                    <FormLabel htmlFor="name" required>
                        Role
                    </FormLabel>
                    <OutlinedInput
                        id="name"
                        name="name"
                        type="text"
                        placeholder="enter name"
                        autoComplete="name"
                        readOnly
                        defaultValue={user?.role?.name}
                    />
                </Grid>
                <Grid item xs={6} md={3} className='flex !flex-col'>
                    <Button href='/profile/changepass' type='submit' variant='contained' className='bg-primary'>Change password</Button>
                </Grid>
                <Grid item xs={6} md={3} className='flex !flex-col'>
                    <Button type='submit' variant='contained' className='bg-primary'>Update</Button>
                </Grid>
                <Grid item xs={6} md={3} className='flex !flex-col'>
                    <Button href='/coordinator/index' type='button' variant='contained' color='error' className='bg-error'>Cancel</Button>
                </Grid>
            </Grid>
        </form >
    )
}
