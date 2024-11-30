
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

import numeral from 'numeral';

function Productcard({product,catename}) {
    const navigateProductdetail =(proid)=>(e)=>{
        window.location.href = `/productdetail/${proid}`
    }
    useEffect(() => {
        // add any useEffect code here
    }, []);
    
    return (
        <>
            <div className="bg-slate-300 p-3 text-md rounded-md cursor-pointer " onClick={navigateProductdetail(product.id)}>
              <div className='flex justify-center'>
              <img className="rounded-md hover:scale-105 ease-in-out duration-500 w-full p-2" src={product.image} alt="" />
              </div>
                <h1 className='mt-10'>{product.category.name}</h1>
                <h1 className=''>{product.name}</h1>
                <h1 className='text-blue-500 mt-4 numeral'>{ numeral(product.price).format('0,0')}<span> &#8363;</span></h1>
            </div>
        </>


    );
}

export default Productcard;
