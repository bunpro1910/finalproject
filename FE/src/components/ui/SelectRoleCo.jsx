'use client'
import instance from '@/data/Instance'
import { FormLabel, InputLabel, MenuItem, Select } from '@mui/material'
import React,{useEffect, useState} from 'react'

export default function SelectRoleCo({defaultValue}) {
    const [data, setData] = useState()
    useEffect(() => {
    
        instance.get('/role/co').then(x => { setData(x.data) }).catch(() => {
    
        })
        return () => {
    
        }
    }, [])
    return (
       <>
        <FormLabel id="role" >Select Role</FormLabel>
        <Select
            labelId="role"
            id="roleid"
            name='role'
            defaultValue= {defaultValue?defaultValue:4}
            label="role"
            
        >
            {data && data.map((item, i) => {
                return <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
            })}

        </Select>
        </>
    )
}
