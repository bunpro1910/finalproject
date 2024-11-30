import React from 'react'
import NavItem from '../ui/NavItem'
import { FaHome, FaListAlt } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

export default function CoorNavBar() {
    const navitem = [{
        icon: <FaHome />,
        title: 'Dashboard',
        path: '/'
    },{
        icon: <FaListAlt />,
        title: 'View Contribution',
        path: '/coordinator/contribution'
    },{
        icon: <FaChartPie/>,
        title: 'Statistical',
        path: '/coordinator/statistical'
    },
    ,{
        icon: <FaUser />,
        title: 'Manager User',
        path: '/coordinator/user'
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
