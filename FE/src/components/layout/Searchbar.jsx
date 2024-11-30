
'use client'
import { useState, useEffect, useRef, Fragment } from 'react'
import axios from 'axios'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'
import { BsFillMicFill } from 'react-icons/bs';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { redirect } from 'next/navigation'

import ProductService from '@/services/ProductService'
import Cart from '../pages/Cart'
import Link from 'next/link'


function SearchBar() {

    const [isFixed, setIsFixed] = useState(false)
    const [search, setSearch] = useState('')
    // let navigate = useNavigate()
    const [showCart, setShowCart] = useState(false)



    const [data, setData] = useState();


    const handleChange = (event, value) => {
        console.log(value)

        window.location.href = ('/productdetail/' + value.id)

    }
    const handleSearch = (e) => {
        e.preventDefault()
        navigate('/search?proname=' + search)
    }


    useEffect(() => {
        ProductService.getProduct().then(x => setData(x.data))
        const handleScroll = () => {
            if (window.pageYOffset > 150) {
                setIsFixed(true)
            } else {
                setIsFixed(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])
    if (!data) {
        return
    }

    return (
        <>
            <div className='h-50px'>


                <div className={`w-full mt-4 items-center   bg-white flex flex-wrap p-2 ${isFixed ? 'fixed top-0 z-50 !mt-0 shadow' : ''}`}>

                    <div className={`ml-20 transition-all duration-1000 ${isFixed ? "w-16 slidein h-10" : " w-72 slideout h-10"}`}>

                        <div className='text-3xl font-bold uppercase'>
                            {!isFixed ? "Shoes shop" : "Shoes"}
                        </div>
                    </div>

                    {<div className='ml-4 border-solid border-slate-300 border-2  rounded-md hover:bg-slate-100'>

                        {/* <button onClick={(e) => { setShowcate(!showcate) }} type="" className='flex items-center '><AiOutlineMenu className="mr-4" /> Category List</button>
                    {showcate ? <Category setShowcate={setShowcate} /> : ""} */}
                    </div>}
                    <form className='w-3/6 form-control rounded-xl ml-6 flex items-center ' onSubmit={handleSearch}>
                        <div className='flex h-[50px]  w-full'>
                            <label for="" className='text-2xl mx-1 flex items-center'><AiOutlineSearch /></label>
                            {!data ? <>...loading</> :
                                data.length == 0 ? "don't have any product" :
                                    <Autocomplete
                                        onChange={handleChange}
                                        disablePortal
                                        options={data}
                                        size="small"

                                        sx={{ display: 'flex', width: '100%', }}
                                        freeSolo
                                        getOptionLabel={(option) => option.name}
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={`${option.image}`}
                                                    alt=""
                                                />
                                                {option.label} {option.name} (category {option.category.name})
                                            </Box>
                                        )}
                                        renderInput={(params) => <TextField   {...params} onChange={(e) => { setSearch(e.target.value) }} value={search} label="Search" />}
                                    />}
                        </div>
                        <div className=''>
                            <input type="submit" name="" className='mx-2 p-2 rounded-md text-white bg-blue-300 hover:bg-blue-400' value="Search" />
                        </div>
                    </form>
                    <div className='flex gap-4 ml-4 text-white'>
                        <button className='p-2 rounded-md bg-blue-500 hover:bg-blue-400' onClick={(e) => setShowCart(true)}>Cart</button>
                        <Link className='p-2 rounded-md bg-blue-500 hover:bg-blue-400' href="/history">History</Link>
                    </div>
                </div>
            </div>
            <Cart showcart={showCart} setshowcart={setShowCart} />
        </>
    );
}

export default SearchBar;