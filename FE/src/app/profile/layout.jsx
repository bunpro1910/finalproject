'use client'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import AuthService from '@/services/AuthService'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function layout({ children }) {
    const [user, setUser] = useState()
    const router = useRouter()
    useEffect(() => {
        AuthService.profile().then(x => setUser(x.data)).catch(e => router.push('/login'))
    },[])
    if (user) {
        if (!user) {
            router.push('/login')
        }
    }
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>

    )
}
