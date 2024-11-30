

import React from 'react'

import ProductDetail from '@/components/pages/Productdetail'

export default function  page({params}) {
  return (
    <div> <ProductDetail id={params.id}/></div>
  )
}
