

'use client'
import { useState, useEffect, useReducer, Redirect } from 'react'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';

import Cartdetail from './Cartdetail'
import axios from 'axios'
import { toast } from 'react-toastify';


import OrderService from '@/services/OrderService';
import { MenuItem, Select, TextField } from '@mui/material';
import AuthService from '@/services/AuthService';

function Checkout() {


    const [data, setdata] = useState();
    let [user, setuser] = useState()
    let [city, setcity] = useState('')
    const [product, setProduct] = useState(null)
    let [district, setdistrict] = useState('')
    let [address, setaddress] = useState('')
    let [ward, setward] = useState('')

    const handleClickmomo = async () => {
        const formdata = new FormData()
        const additionalData = {
            address: address + ", " + ward + ", " + district + ", " + city ,
            fullname:user.fullname,
            phone:user.phone_number,

            // Example variable
        };
    
        for (const [key, value] of Object.entries(additionalData)) {
            formdata.append(key, value);
        }
        const response = await OrderService.checkOutmomo(formdata)

        window.location.replace(response.data.link)
    }
    let handlesubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        const additionalData = {
            address: address + ", " + ward + ", " + district + ", " + city , // Example variable
        };
    
        for (const [key, value] of Object.entries(additionalData)) {
            formdata.append(key, value);
        }
    
        // Log or send the FormData
        let result = await OrderService.checkOut(formdata)
        if (result.data) {
            toast.success("checkout success")
            window.location.href = '/history'
        } else {
            toast.error("checkout falied")
        }
    }
    useEffect(() => {

        OrderService.gettinhthanh().then(x => { setdata(x.data) })
        AuthService.profile().then(x=>setuser(x.data))
    }, [])
    if (!data) return <>...loading</>


    return (
        <>
            <div class="container checkoutform">

                <div class="mb-5   text-center">
                    <h2>Checkout form</h2>
                    <p class="lead"></p>
                </div>
                <div class="flex gap-10 ">
                    <Cartdetail product={product} setProduct={setProduct} />
                    <form class="w-full bg-slate-700 p-4 rounded-xl shadow text-white xl:ml-10 md:ml-10 sm:ml-0" onSubmit={handlesubmit}>
                        <h4 class="mb-3">Billing address</h4>
                        <div class="flex">
                            <div class="mb-3 flex flex-row gap-10">
                                <div className='flex flex-col'>
                                    <label for="firstName">Full Name</label>
                                    <TextField id="fullname" type='text' name='fullname' label="Fullname" variant="outlined" onChange={(e) => { user.fullname = e.target.value; setuser({ ...user }) }} value={user?.fullname} required />
                                </div>
                                <div class="flex flex-col">
                                    <label for="email">Email <span class="text-muted"></span></label>
                                    <TextField id='email' type='text' name='email' label="Email" variant="outlined" onChange={(e) => { user.gmail = e.target.value; setuser({ ...user }) }} value={user?.gmail} placeholder="you@example.com" />
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div class="mb-3 flex flex-row gap-10">
                                <div className='flex flex-col'>
                                    <label for="phone">Phone Number <span class="text-muted"></span></label>
                                    <TextField type="text" id='phone' name='phone' label="Phone" variant="outlined" value={user?.phone_number} onChange={(e) => { user.phone_number = e.target.value; setuser({ ...user }) }} placeholder="Phone" />
                                </div>
                                <div class="flex flex-col">
                                    <label for="address">Address</label>
                                    <TextField type="text"  label="Address" variant="outlined" value={user?.address} onChange={(e) => { user.address = e.target.value; setuser({ ...user }) }} placeholder="address" />
                                </div>
                            </div>
                        </div>


                        <div class="flex flex-row gap-10">
                            <div class="flex flex-col   ">
                                <label for="country">City</label>
                                <Select defaultValue={"choose"} class="" id="country" onChange={(e) => { setcity(e.target.value); setdistrict(''); setward('') }} required>
                                    <MenuItem value="choose"  >Choose...</MenuItem>
                                    {data.map((item, i) => {
                                        return (<MenuItem value={item.Name}>{item.Name}</MenuItem>)
                                    })}
                                </Select>
                            </div>
                            <div class="flex flex-col">
                                <label for="state">District</label>
                                <Select defaultValue={"choose"} class="form-control" id="district" onChange={(e) => { setdistrict(e.target.value); setward('') }} required >
                                    <MenuItem value="choose">Choose...</MenuItem>
                                    {city != '' ? data.filter(item => item.Name == city)[0].Districts.map((dis, i) => {
                                        return (
                                            <MenuItem value={dis.Name}>{dis.Name}</MenuItem>
                                        )
                                    }) : ""}
                                </Select>
                            </div>
                            <div class="flex flex-col">
                                <label for="state">Ward</label>
                                <Select defaultValue={"choose"} class="form-control" id="watd" onChange={(e) => { setward(e.target.value) }} required >
                                    <MenuItem value="choose">Choose...</MenuItem>
                                    {city != '' && district != "" ? data.filter(item => item.Name == city)[0].Districts.filter(item => item.Name == district)[0].Wards.map((ward, i) => {
                                        return (
                                            <MenuItem value={ward.Name}>{ward.Name}</MenuItem>
                                        )
                                    }) : ""}
                                </Select>
                            </div>
                        </div>

                        <hr class="mb-4" />

                        <div className='flex'>
                            <button class="btn btn-primary bg-blue-600 h-10 hover:bg-blue-700 p-2" type="submit">Continue to checkout</button>
                           
                            <button type="button" onClick={handleClickmomo} class="ml-4 text-gray-900 bg-[#f9b5c3] hover:bg-[#f9b5c3]/90 focus:ring-4 focus:ring-[#f9b5c3]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#f9b5c3]/50 mr-2 mb-2">
                                <img src="logo-momo.svg" className='max-w-[26px] mr-3' alt="" />
                                Check out with Momo
                            </button>
                        </div>
                    </form>
                </div>



            </div>
        </>

    );
}

export default Checkout;
