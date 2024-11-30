import React from 'react'
import ChartFaculty from '../ui/ChartFaculty'
import ChartComment from '../ui/ChartComment'
import ChartContribution from '../ui/ChartContribution'
import ChartFacultybyacademicyear from '../ui/ChartFacultybyacademicyear'

export default function Statistical() {
  return (
    <div>
      <div className='flex justify-center'>
        <div className=' gap-20 grid grid-cols-2 justify-center'>
          <div className='max-w-[450px]'>
            <ChartContribution />
          </div>
          <div className='max-w-[450px]'>
            <ChartFaculty />
          </div>
          <div className='max-w-[450px]'>
            <ChartFacultybyacademicyear />
          </div>

          <div className='max-w-[450px]'>
            <ChartComment />
          </div>
        </div>
      </div>

    </div>
  )
}
