'use client'
import FacultyService from '@/services/CategoryService'
import React, { useEffect, useState } from 'react'
import Time from '../ui/Time'
import Link from 'next/link'
import './style.css'
// import NavBE from '../layout/NavBE'


export default function IndexMM() {
  const [faculty, setFaculty] = useState()
  useEffect(() => {
    FacultyService.getFaculty().then(x => setFaculty(x.data)).catch(e => {

    })
  }, [])
  return (
    <>
      <div className="container">
        {/* <NavBE/> */}
        <header>
          <div className="header-right">
            <button className="year-button">Current Year</button>
            {/* <button className="download-button">Download All Faculty</button> */}
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
              <th>Name</th>
              <th>Total submited</th>
              {/* <th>Closure Date</th>
              <th>Final Closure Date</th> */}
              <th>Create Date</th>
              <th>Marketing Coordinator</th>
              <th>View Detail</th>
            </tr>
          </thead>
          <tbody>
            {faculty && faculty.map(x => {
              return <>
                <tr className=''>
                  <td>{x.name}</td>
                  <td>{x.contribution.length}</td>
                  {/* <td>{<Time string={x.closureDate} />}</td>
                  <td>{<Time string={x.finalclosureDate} />}</td> */}
                  <td>{<Time string={x.createdAt} />}</td>
                  <td>{x.user?.find(x=>x.roleId==3)?.email}</td>
                  <td><Link href={`/Manager/Details/${x.id}`} className='bg-primary p-4 text-white'>View Detail</Link></td>
                </tr>
              </>
            })}
          </tbody>
        </table>

      </div>
    </>
  )
}
