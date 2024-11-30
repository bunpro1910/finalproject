

'use client'
import { useState, useEffect, useReducer, Redirect } from 'react'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';

import Cartdetail from './Cartdetail'
import axios from 'axios'
import { toast } from 'react-toastify';


import OrderService from '@/services/OrderService';
import { MenuItem, Select, TextField } from '@mui/material';

function Checkout() {


    const [data, setdata] = useState();
    let [user, setuser] = useState(JSON.parse(localStorage.getItem('user')))
    let [city, setcity] = useState('')
    const [product, setProduct] = useState(null)
    let [district, setdistrict] = useState('')
    let [address, setaddress] = useState('')
    let [ward, setward] = useState('')
    const handleClick = async () => {
        try {
            //accounttest paypal
            //username sb-9g7hi25402313@personal.example.com
            //pass n0H1}N-1
            const response = await axios.post('/api/user/payal', { product: product, amount: 0, description: "pay for nothing" });
            window.location.replace(response.data.link)

        } catch (error) {
            console.error(error);
        }
    };
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
                                    <TextField id="fullname" type='text' name='fullname' label="Fullname" variant="outlined" onChange={(e) => { user.fullname = e.target.value; setuser({ ...user }) }} value={user.fullname} required />
                                </div>
                                <div class="flex flex-col">
                                    <label for="email">Email <span class="text-muted"></span></label>
                                    <TextField id='email' type='text' name='email' label="Email" variant="outlined" onChange={(e) => { user.gmail = e.target.value; setuser({ ...user }) }} value={user.gmail} placeholder="you@example.com" />
                                </div>
                            </div>
                        </div>

                        <div className='flex'>

                        </div>
                        <div className='flex'>
                            <div class="mb-3 flex flex-row gap-10">
                                <div className='flex flex-col'>
                                    <label for="phone">Phone Number <span class="text-muted"></span></label>
                                    <TextField type="text" id='phone' name='phone' label="Phone" variant="outlined" value={user.phone_number} onChange={(e) => { user.phone_number = e.target.value; setuser({ ...user }) }} placeholder="Phone" />
                                </div>
                                <div class="flex flex-col">
                                    <label for="address">Address</label>
                                    <TextField type="text"  label="Address" variant="outlined" value={user.address} onChange={(e) => { user.address = e.target.value; setuser({ ...user }) }} placeholder="address" />
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
                            <button type="button" onClick={handleClick} class="ml-4 text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2">
                                <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
                                Check out with PayPal
                            </button>
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
