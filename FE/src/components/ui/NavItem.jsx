import Link from 'next/link'
import React from 'react'

export default function NavItem({ icon, title,path }) {
    return (
        <Link href={`${path}`} className='flex gap-4 items-center'>
            <i className='text-2xl'>{icon}</i>
            <h1 className='text-md capitalize'>{title}</h1>
        </Link>
    )
}
