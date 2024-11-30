'use client'

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

import Seachbar from './Searchbar'
import Link from 'next/link';
import CategoryService from '@/services/CategoryService';
import Productcard from './Productcard';
function Allcate() {
    
    const[data,setData] = useState();
    useEffect(() => {
        CategoryService.getCategory().then(x=>setData(x.data));
    }, []);
    
    if(!data){
        return
    }
    console.log(data)
    return (
        <>
           
            <div className="w-full flex items-center flex-col mt-10">
                {data.length>0 ? data.map((item, i) => {
                    return (<>
                        <div className="flex w-4/5 flex-col p-4 mt-4 bg-slate-700 rounded-md">
                            <div className="w-full flex border-b-2 pb-2 border-white text-white">
                                {item.name}

                                <p className="mr-0 ml-auto"><Link href={`/search?name=${item.name}`}>view all</Link></p>
                            </div>
                            <div className="w-full  mt-10 ">
                                <div className=" grid gap-4  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-b-2 pb-4 ">
                                    {item.products.map((item, i) => {
                                        return (
                                            <Productcard key={i} product={item}/>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </>

                    )
                }) : ""}
            </div>

        </>


    );
}

export default Allcate;
