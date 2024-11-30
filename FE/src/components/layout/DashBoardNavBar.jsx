import React from 'react'
import NavItem from '../ui/NavItem'
import { FaHome, FaListAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaRegCalendarTimes } from "react-icons/fa";
import { MdOutlineViewTimeline } from "react-icons/md";

export default function DashBoardNavBar() {
    const navitem = [
        {
        icon: <FaHome />,
        title: 'Dashboard',
        path: '/admin'
    },{
        icon: <FaBook />,
        title: 'Manager Category',
        path: '/admin/category'
    },
    {
        icon: <FaUser />,
        title: 'Manager User',
        path:'/admin/user'
    },
    {
        icon: <FaListAlt />,
        title: 'Manager Product',
        path:'/admin/product'
    },
   
    
    ]
    return (
        <div className=' sticky min-h-[100vh] w-[300px] bg-main-gray'>

            <ul className=''>

                {navitem.map(item => {
                    return (
                        <li className='hover:bg-white-gray text-white p-4'>
                            <NavItem icon={item.icon} title={item.title} path={item.path} />
                        </li>
                    )
                    

                })}

            </ul>
        </div>
    )
}
