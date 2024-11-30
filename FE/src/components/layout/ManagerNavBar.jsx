import React from 'react'
import NavItem from '../ui/NavItem'
import { FaHome, FaListAlt } from "react-icons/fa";
import '../pages/style.css'
import Link from 'next/link';
import { FaChartPie } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";

export default function ManagerNavBar() {
    const navitem = [
        {
            icon: <FaChartPie />,
            title: 'Statistical',
            path: '/Manager/statistical',
        },
        {
            icon: <FaBook />,
            title: 'Faculty',
            path: '/Manager/Index',
        },
    ];

    return (
        <div className='flex'>
            {/* Your existing navigation */}
            <div className='sticky min-h-[100vh] w-[250px] bg-main-gray'>
                {/* <div className="image" style={{ width: '250px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <img src="/home/images/logo.png" className="img-circle elevation-2" alt="User Image" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} /> 
                </div> */}
                <ul className=''>
                    {navitem.map((item, index) => (
                        <li key={index} className='hover:bg-white-gray text-white p-4'>
                            <NavItem icon={item.icon} title={item.title} path={item.path} />
                        </li>
                    ))}
                </ul>
                
            </div>
            
        </div>
        
    );
}