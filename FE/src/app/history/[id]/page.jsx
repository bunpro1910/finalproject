

import React from 'react'

import CartTable from '@/components/pages/CartTable'

export default function  page({params}) {
  return (
    <div> <CartTable id={params.id}/></div>
  )
}
