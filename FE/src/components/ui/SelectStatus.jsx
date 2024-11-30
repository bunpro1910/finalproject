'use client'
import React, { useEffect, useState } from 'react'
import { FormLabel, InputLabel, MenuItem, Select } from '@mui/material'
import FacultyService from '@/services/CategoryService'
import StatusService from '@/services/StatusService'

export default function SelectStatus({defaultValue}) {
    const [data, setData] = useState()
 
    useEffect(() => {
    
        StatusService.getStatus().then(x => { setData(x.data)}).catch(() => {
        })
        return () => {
        }
    }, [])
    if(!data) 
    return (
       <>
        <FormLabel id="faculty" >Select Status</FormLabel>
       </>
    )
    return (
       <>
        <FormLabel htmlFor="status" >Select Status</FormLabel>
        <Select
            labelId="status"
            id="status"
            name='statusid'
            label="Status"
            defaultValue={defaultValue?defaultValue:data?data[0].id:null}
        >
            {data && data.map((item, i) => {
                return <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
            })}

        </Select>
        </>
    )
}
