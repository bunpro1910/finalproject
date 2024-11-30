'use client'
import React, { useEffect, useState } from 'react'
import { FormLabel, InputLabel, MenuItem, Select } from '@mui/material'

import CategoryService from '@/services/CategoryService'

export default function SelectCate({defaultValue}) {
    const [data, setData] = useState()
 
    useEffect(() => {
    
        CategoryService.getCategory().then(x => { setData(x.data)}).catch(() => {
        })
        return () => {
        }
    }, [])
    if(!data) 
    return (
       <>
        <FormLabel id="categoryid" >Select Category</FormLabel>
       </>
    )
    return (
       <>
        <FormLabel htmlFor="categoryid" >Select Category</FormLabel>
        <Select
            labelId="categoryid"
            id="categoryid"
            name='categoryid'
            label="categoryid"
            defaultValue={defaultValue?defaultValue:data?data[0].id:null}
        >
            {data && data.map((item, i) => {
                return <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
            })}

        </Select>
        </>
    )
}
