'use client'
import instance from '@/data/Instance'
import AcademicyearService from '@/services/AcademicyearService'
import UserService from '@/services/UserService'
import { FormLabel, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function SelectAcadmicyear({ defaultValue }) {
    const [data, setData] = useState()

    useEffect(() => {

        AcademicyearService.getAcademicyear().then(x => { setData(x.data) }).catch(() => {
            
        })
        return () => {
        }
    }, [])
    if (!data)
        return (
            <>
                <FormLabel id="academicyear" >Select Academic Year</FormLabel>
            </>
        )
    return (
        <>
            <FormLabel htmlFor="academicyear" >Select Academic Year</FormLabel>
            <Select
                labelId="academicyear"
                id="academicyearId"
                name='academicyear'
                label="Academic Year"
                defaultValue={defaultValue ? defaultValue : data ? data[0]?.id : null}
            >
                {data && data.map((item, i) => {
                    return <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                })}

            </Select>
        </>
    )
}
