'use client'
import FacultyService from '@/services/CategoryService'
import React, { useEffect, useState } from 'react'
import Time from '../ui/Time'
import Link from 'next/link'
import SubmissionService from '@/services/SubmissionService'

export default function GuestIndex() {
  const [submission, setSubmission] = useState()
  useEffect(() => {
    SubmissionService.getSubmission().then(x => setSubmission(x.data)).catch(e => {

    })
  }, [])
  if (!submission) return
  return (
    <>

      <div className="container">
        <header>
          <div className="header-right">
            <button className="year-button">Current Year</button>
          </div>
        </header>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <div className="scroll-box student-names">
          </div>
          <div className="scroll-box faculty">
          </div>
          <select name="sort-by">
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>

        <table className='gap-y-2'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              {/* <th>Closure Date</th>
              <th>Final Closure Date</th> */}
              <th>Create Date</th>
              <th>Upload By</th>
            </tr>
          </thead>
          <tbody>
            {submission && submission.map(x => {
              return <>
                <tr className=''>
                  <td>{x.title}</td>
                  <td>{x.content}</td>
                  {/* <td>{<Time string={x.closureDate} />}</td>
                  <td>{<Time string={x.finalclosureDate} />}</td> */}
                  <td>{<Time string={x.createdAt} />}</td>
                  <td>{x.user.fullName}</td>
                </tr>
              </>
            })}
          </tbody>
        </table>

      </div>
    </>
  )
}
