
'use client'

import { useState, useEffect, useReducer } from 'react'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';

import axios from 'axios'
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OrderService from '@/services/OrderService';

function CartCard({ item,showcart,setshowcart,reloadCart }) {

    const [price,setprice] = useState(item.quantity)

    let handle_delete = (proid, cartid) => async (e) => {
        let result = await OrderService.deleteCart(item.id)
        if (result.data) {
            reloadCart()
            toast.success("delete success")
        } else {
            toast.error(result.data.message)
        }
    }
    const handleClose = (e) => {
        setshowcart(false)
    }
 
    const handleupdatecart =async (quantity)  => {
        const formData =  new FormData()
        const additionalData = {
            quantity: quantity, // Example variable
            orderitemid: item.id, // Another variable
        };
    
        for (const [key, value] of Object.entries(additionalData)) {
            formData.append(key, value);
        }
    
        let result = await OrderService.updatecart(item.id,formData)
        if (result.data) {
            reloadCart()
            toast.success("update success")
       
        } else {
            toast.error(result.data.message)
        }
    }
    const gotodetail = (id) => (e) => {
        window.location.href = `/productdetail/${id}`
        setshowcart(false)
    }
    useEffect(() => {
    }, [])


    return (



        <div className='group flex relative cart-card px-1 hover:bg-slate-200'>
            <div className='block'>
                <div className="flex flex-row my-3 items-center">
                    <div className='relative'>
                        <img src={"/"+item.product.image} className="w-16 block" alt="" />
                        <span className="bg-red-300 py-1 px-2 rounded-full absolute " style={{ right: `-10px`, top: "-10px" }}>{item.quantity}</span>
                    </div>
                    <p className="ml-4 mr-32 hover:cursor-pointer" onClick={gotodetail(item.id)}>{item.product.name}</p>
                    <p className="mr-10 ml-auto flex flex-row">{item.product.price * item.quantity} <span> &#8363;</span></p>

                </div>
            </div>
            <form className="flex items-center w-10 mr-10 ml-auto">
                <input className="w-12 h-12 border-slate-700 border-2 rounded-xl text-center" type="number" name="" onChange={(e) => { setprice( e.target.value);handleupdatecart(e.target.value)}} value={price} />
            </form>
            <span role='button' onClick={handle_delete(item.id, item.cartid)} className="text-md absolute right-0 p-1 hover:cursor-pointer rounded-full hover:bg-red-400 " style={{ top: "-3px" }}>X</span>
        </div>



        // <div className="container">
        // <Link to='/home'>back to home</Link>
        // <table class="table">
        //     <thead>
        //         <tr>
        //             <th scope="col">NO</th>
        //             <th scope="col">Image</th>
        //             <th scope="col">Name</th>
        //             <th scope="col">Quantity in storage</th>
        //             <th scope="col">Price</th>
        //             <th scope="col">Order Quantity </th>
        //             <th scope="col">Delete</th>
        //             <th scope="col">Total</th>
        //         </tr>
        //     </thead>
        //     <tbody>

        //     </tbody>


        // </table>
        // <div className='total-bar'>

        //     <p className='total-title'>Total</p>
        //     <p className="total-value">{total} VND</p>

        // </div>
        // <div className='total-bar'>

        //     <Link to='/checkout'>checkout</Link>

        // </div>
        // </div>
    );
}

export default CartCard;
