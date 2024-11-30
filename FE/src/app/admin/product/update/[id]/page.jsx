

import React from 'react'
import UpdateProduct from '../../../../../components/pages/UpdateProduct'

export default function  page({params}) {
  return (
    <div> <UpdateProduct id={params.id}/></div>
  )
}
