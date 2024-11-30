


import { useState, useEffect, useReducer } from 'react'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';

import axios from 'axios'
import OrderService from '@/services/OrderService';
function CartDetail({product,setProduct}) {
    
    

    const [data,setdata] = useState()

    let [total, settotal] = useState(0)

    useEffect(() => {
        OrderService.getCart().then(x=>setdata(x.data))

    }, [])
    if (!data) return <>don't have cart</>
    setProduct(data.cart)
    return (

        <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Your cart</span>
                <span class="badge badge-secondary badge-pill" style={{color:"black"}}>({data.orderItems?.length})</span>
            </h4>
            <ul class="list-group mb-3">
                {data.orderItems?.length > 0 ? data.orderItems.map((item, i) => {
                     total+=item.product.price *item.quantity
                    return (
                       <>
                        <li class="flex justify-between gap-32">
                            <div className='flex'>
                            <img className='w-10 mr-10' src={"/"+item.product.image} alt=""/>
                                <div>
                                <h6 class="my-0">{item.product.name}</h6>
                                <small class="text-muted">{item.quantity}</small>
                                </div>
                               
                            </div>
                 
                            <span class="text-muted">{item.product.price *item.quantity} VND</span>
                        </li>
            
                       </>

                    )
                }) : "don't have any product"}


                <li class="list-group-item  justify-content-between">
                    <span>Total (VND)</span>
                    <strong>{total}</strong>
                </li>
            </ul>

        </div>
    );
}

export default CartDetail;
