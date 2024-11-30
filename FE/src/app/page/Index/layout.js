import React from 'react'
import Index from './page'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function Layout({ children }) {
  return (
      <>
        <Navbar/> 
        <Index/>
        <Footer/>
      </>
  );
}

