'use client'
import DashBoardNavBar from "@/components/layout/DashBoardNavBar";
import TopDashBoard from "@/components/layout/TopDashBoard";
import Navbar from "@/components/layout/Navbar";
import { useEffect, useState } from "react";
import AuthService from "@/services/AuthService";
import { redirect, useRouter } from "next/navigation";

export default function RootLayout({ children }) {
    const [user, setUser] = useState()
    const router = useRouter()
    useEffect(() => {
        AuthService.profile().then(x => setUser(x.data)).catch(e => router.push('/login'))
    },[])
    if (user) {
        if (user?.roleId !== 1) {
            router.push('/login')
        }
    }
    return (
        <>
            <Navbar />
            <div className="flex ">
                <TopDashBoard />
                <DashBoardNavBar />
                <div className="w-full">
                    <div className="p-10">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
