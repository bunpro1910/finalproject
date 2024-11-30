'use client'
import React, { useEffect, useState } from 'react'
import { FormLabel, InputLabel, MenuItem, Select } from '@mui/material'

import ContributionService from '@/services/ProductService'

export default function SelectContribution({defaultValue}) {
    const [data, setData] = useState()
 
    useEffect(() => {
    
        ContributionService.getContribution().then(x => { setData(x.data)}).catch(() => {
        })
        return () => {
        }
    }, [])
    if(!data) 
    return (
       <>
        <FormLabel id="contribution" >Select Contribution</FormLabel>
       </>
    )
    return (
       <>
        <FormLabel htmlFor="contribution" >Select Contribution</FormLabel>
        <Select
            labelId="contribution"
            id="contributionid"
            name='contributionid'
            label="contributionid"
            defaultValue={defaultValue?defaultValue:data?data[0].id:null}
        >
            {data && data.map((item, i) => {
                return <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
            })}

        </Select>
        </>
    )
}
