'use client'
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import FacultyService from '@/services/CategoryService';
import SubmissionService from '@/services/SubmissionService';
ChartJS.register(ArcElement, Tooltip, Legend);
export default function ChartCommentCo() {
    const [submission, setSubmission] = useState()
    useEffect(() => {
        SubmissionService.getSubmission().then(x => setSubmission(x.data)).catch(e => { })
    }, [])
    if (!submission) return

    let name = ['contribution have comments',`contribution haven't comments`]

    let commented = submission.reduce((init, item) => {
        if(item.comment.length>0){
            init+=1
        }
        return init
    }, 0)
    let nocommented = submission.reduce((init, item) => {
        if(item.comment.length==0){
            init+=1
        }
        return init
    }, 0)
    let data= [commented,nocommented]
    let color = ['green','red']
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
 
    return (
        <>
            <div>Chart of Number Commnet in Contribution</div>
            <Pie data={datachart} width={350} style={{ margin: 'auto' }} options={{ responsive: false }} height={350} />
        </>

    )
}
