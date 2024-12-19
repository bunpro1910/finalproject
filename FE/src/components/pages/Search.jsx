'use client'
import ProductService from '@/services/ProductService';
import React, { useEffect, useState } from 'react'
import Productcard from '../layout/Productcard';

export default function Search({ name })  {
    const [product, setProduct] = useState([]);
    useEffect(()=>{
        ProductService.getProductwithname(name.toLowerCase()).then(x=>setProduct(x.data))
    },[name])
    
    return (
        <div className='px-[200px] grid grid-cols-4 gap-5 py-[100px]'>
         
            {product.length==0?"don't have any products":
            product.map(x=>
                <Productcard product={x}/>
            )
            }
        </div>
    )
}
