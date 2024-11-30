'use client'
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import FacultyService from '@/services/CategoryService';
import AcademicyearService from '@/services/AcademicyearService';
import { FormLabel, MenuItem, Select } from '@mui/material';
ChartJS.register(ArcElement, Tooltip, Legend);
export default function ChartFaculty() {
    const [falculty, setFaculty] = useState()
    const [academicyear, setAcademicyear] = useState()
    const [academicyearId, setAcademicyearId] = useState()
    useEffect(() => {
        FacultyService.getFacultyByAcademic(academicyearId).then(x => setFaculty(x.data)).catch(e => { })
        AcademicyearService.getAcademicyear().then(x => {
            setAcademicyear(x.data)
            if(!academicyearId){
                setAcademicyearId(x.data[0]?.id)
            }
        }).catch(e => { })
    }, [academicyearId])
    if (!falculty) return

    let name = falculty.reduce((init, item) => {
        init.push(item.name)
        return init
    }, [])
    let data = falculty.reduce((init, item) => {
        init.push(item.contribution?.length)
        return init
    }, [])

    let color = falculty.reduce((init, item) => {
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        init.push("#" + randomColor)
        return init
    }, [])
    let bordercolor = color.reduce((init, item) => {

        init.push("#000000")
        return init
    }, [])
    const datachart = {
        labels: name,
        datasets: [
            {
                label: 'Total',
                data: data,
                backgroundColor: color,
                borderColor: bordercolor,
                borderWidth: 1,
            }
        ]
    };
    if (!falculty) return
    return (
        <>
            <div>Chart of Persent Contribution in Faculty</div>
            <div className='flex flex-col'>
                <FormLabel htmlFor="academicyear" >Select Academic Year</FormLabel>
                <Select
                    labelId="academicyear"
                    id="academicyearId"
                    name='academicyear'
                    label="Academic Year"
                    onChange={(e) => setAcademicyearId(e.target.value)}
                    value={academicyearId}
                >
                    {academicyear && academicyear.map((item, i) => {
                        return <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                    })}

                </Select>
            </div>
            <Pie data={datachart} width={350} style={{ margin: 'auto' }} options={{ responsive: false }} height={350} />
        </>

    )
}
