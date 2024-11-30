

import React from 'react'

import UpdateFaculty from '@/components/pages/UpdateCategory'
import UpdateUser from '@/components/pages/UpdateUser'

export default function  page({params}) {
  return (
    <div> <UpdateUser id={params.id}/></div>
  )
}
