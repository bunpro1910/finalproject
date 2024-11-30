
'use client'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { toast } from 'react-toastify'

import numeral from 'numeral'


import Link from 'next/link'
import ProductService from '@/services/ProductService'
import SearchBar from '../layout/Searchbar'
import OrderService from '@/services/OrderService'
function ProductDetail({id}) {
   

    const [product, setproduct] = useState({ id: "", quantity: 1 })
    
    const[data,setData] = useState();
    let addCart = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
    
        
        let result = await OrderService.addCart(formdata)
        if (result.data) {
            toast.success(`Add Cart sucessfully`)
        } else {
            toast.error(result.data.message)
        }

    }

    useEffect(() => {
        ProductService.getProductById(id).then((product) => {setData(product.data)})
    }, [])
    if(!data){
        return "no product found"
    }
   
    return (
        <>
            <SearchBar />
            <div class="container mt-5">
                {/* <div className='mb-10'>
                    <Link className='p-2 mx-2' to='/home'>Home</Link>
                    <Link className='p-2 mx-2' to={`/productdetail?id=${data.product[0].id}`}>{data.product[0].name}</Link>
                </div>
                <div className=' w-full flex justify-center '>
                    <div className='shadow rounded-2xl flex flex-wrap w-4/5 p-4'>
                        <div className='mx-10'>
                            <img src={data.product[0].image} className=' max-w-xs ' alt="" />
                        </div>
                        <div className='ml-5 '>
                            <Link to={'/search?name=' + data.product[0].category_name}>
                                <span class="badge bg-blue-600 me-1 p-2">{data.product[0].category_name}</span>
                            </Link>
                            <h1 className='text-2xl mt-3 font-semibold'>{data.product[0].name}</h1>
                            <h1 className='text-xl mt-3'>Brand</h1>
                            <h1 className='text-2xl mt-0 font-semibold'>Price</h1>
                        </div>
                    </div>

                </div> */}
                <div className='w-full flex justify-center '>
                    <div class=" shadow w-4/5 p-4 justify-center flex flex-wrap rounded-2xl !py-20">

                        <div class="col-md-6 mb-4 ">
                            <img style={{ maxWidth: 300 + "px" }} src={"/"+data.image} class="img-fluid mr-auto ml-auto" alt="" />
                        </div>
                        <div class="col-md-6 mb-4">

                            <div class="p-4">
                                <div class="mb-3">
                                    <Link href={'/search?name=' + data.category.name}>
                                        <span class="badge bg-blue-600 p-1">{data.category.name}</span>
                                    </Link>

                                </div>

                                <p class="uppercase text-2xl font-bold mb-2 ">

                                    <h1>{data.name}</h1>

                                </p>

                                <p className='mb-4'>{numeral(data.price).format('0,0')} <span> &#8363;</span></p>

                                <form class="flex justify-content-left" onSubmit={addCart}>
                                    <input type="hidden" name="productid"value={id} />
                                    <div class="form-outline me-1" >
                                        <input type="number" name="quantity" onChange={(e) => { product.quantity = e.target.value; setproduct({ ...product }) }} value={product.quantity} class="form-control" />
                                    </div>
                                    <button class="bg-blue-500 hover:bg-blue-400 p-2 rounded-md ms-1 flex items-center" type='submit'>
                                        Add to cart<i className="ml-2"  >  <AiOutlineShoppingCart /></i>
                                    </button>
                                </form>
                            </div>

                        </div>
                        <hr />
                        <div className="text-left flex flex-wrap mx-10 border-t-2 border-black w-full">
                            <div className='xl:w-1/2 md:w-1/2 sx:w-full xl:pr-20 md:pr-0 xs:pr-0'>
                                <h4 className="p-3 border-2 w-fit !border-t-0 border-black rounded-b-xl bg-green-500 transition-all duration-500 hover:bg-slate-700 hover:text-white">Detail</h4>
                                <div className='w-full mt-4'>
                                    <p className='flex justify-between ml-3 mt-2'><span>Name</span><span>{data.name}</span></p>
                                    <p className='flex justify-between ml-3 mt-2'><span>Price</span><span>{data.price}VND</span></p>
                                    <p className='flex justify-between ml-3 mt-2'><span>Category</span><span>{data.category.name}</span></p>
                                 
                                </div>
                            </div>
                            <div class="xl:w-1/2 md:w-1/2 sx:w-full">
                                <h4 className="p-3 border-2 w-fit !border-t-0 border-black rounded-b-xl bg-blue-500 transition-all duration-500 hover:bg-slate-700 hover:text-white">Description</h4>

                                <p className="mt-4 text-xl font-semibold">{data.description}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ProductDetail;
