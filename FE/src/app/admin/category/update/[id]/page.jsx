

import React from 'react'

import UpdateFaculty from '@/components/pages/UpdateCategory'

export default function  page({params}) {
  return (
    <div> <UpdateFaculty id={params.id}/></div>
  )
}
