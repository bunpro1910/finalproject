
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
import { useRouter } from 'next/navigation';

export default function Changepassword() {
    const router = useRouter()
    const [user, setUser] = useState()
    const onSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        UserService.changepass(user?.id, formdata).then(x => {
            router.back()
            toast.success('Update success')
            
        }).catch(err => {
            toast.error('Update failed')
        })
    }
    useEffect(() => {
        AuthService.profile().then(x => [
            setUser(x.data)
        ])
    }, [])
    if (!user) return
    return (
        <form onSubmit={onSubmit} className='mx-[200px]  py-[200px]'>
            <Grid container spacing={3} >
                <Grid item xs={12} md={6} className='flex !flex-col' >
                    <FormLabel htmlFor="oldpasword" required>
                        Old pass password
                    </FormLabel>
                    <OutlinedInput
                        id="oldpassword"
                        name="oldpassword"
                        type="password"
                        placeholder="enter Old password"
                        autoComplete="oldpassword"
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6} className='flex !flex-col'>
                    <FormLabel htmlFor="name" required>
                        New password
                    </FormLabel>
                    <OutlinedInput
                        id="newpassword"
                        name="newpassword"
                        type="password"
                        placeholder="enter new password"
                        autoComplete="newpassword"
                        required
                
                    />
                </Grid>
                <Grid item xs={12} md={6} className='flex !flex-col'>
                    <FormLabel htmlFor="name" required>
                        Confirm New password
                    </FormLabel>
                    <OutlinedInput
                        id="confirmpassword"
                        name="confirmpassword"
                        type="password"
                        placeholder="enter confir new mpassword"
                        autoComplete="confirmpassword"
                        required
                    />
                </Grid>
                

                <Grid item xs={6} md={3} className='flex !flex-col'>
                    <Button type='submit' variant='contained' className='bg-primary'>Update</Button>
                </Grid>
                <Grid item xs={6} md={3} className='flex !flex-col'>
                    <Button href='/profile' type='button' variant='contained' color='error' className='bg-error'>Cancel</Button>
                </Grid>
            </Grid>
        </form >
    )
}
