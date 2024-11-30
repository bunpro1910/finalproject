'use client'
import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import FacultyService from '@/services/CategoryService';
import { FormLabel, MenuItem, Select } from '@mui/material';
import Academicyear from '../pages/Academicyear';
import AcademicyearService from '@/services/AcademicyearService';
import Contribution from '../pages/Product';
import ContributionService from '@/services/ProductService';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

export default function ChartFacultybyacademicyear() {
    const [falculty, setFaculty] = useState()
    const [contribution, setContribution] = useState()
    const [academicyear, setAcademicyear] = useState()
    const [facultyId, setFacultyId] = useState()
    useEffect(() => {
        ContributionService.getContributionByFacultyId(facultyId).then(x => setContribution(x.data)).catch(e => { })
        AcademicyearService.getAcademicyear().then(x => setAcademicyear(x.data)).catch(e => { })
        FacultyService.getFaculty().then(x => {
            setFaculty(x.data)
            if(!facultyId){
                setFacultyId(x.data[0]?.id)
            }
        }).catch(e => { })
    }, [facultyId])
    if (!contribution) return
    if (!falculty) return
    if (!academicyear) return
    console.log(contribution)
    let name = academicyear.reduce((init, item) => {
        init.push(item.name)
        return init
    }, [])
    let data = academicyear.reduce((init, item) => {
        let count = 0
        contribution.map((x, i) => {
            if (x.academicyearId == item.id) {
                count += 1
            }
        })
        init.push(count)
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
            <div>Chart of Number Contribution in Faculty</div>
            <div className='flex flex-col'>
                <FormLabel htmlFor="faculty" >Select Academic Year</FormLabel>
                <Select
                    labelId="faculty"
                    id="faculty"
                    name='faculty'
                    label="Faculty"
                    onChange={(e) => setFacultyId(e.target.value)}
                    value={facultyId}
                >
                    {falculty && falculty.map((item, i) => {
                        return <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                    })}

                </Select>
            </div>
            {/* options={{ responsive: false }}  */}
            <Bar style={{ margin: 'auto' }} width={550} options={options} data={datachart} height={350} />;
        </>

    )
}
