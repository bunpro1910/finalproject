import Login from "@/components/pages/Login";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Image from "next/image";
import Home from "@/components/pages/Home";


export default function page() {
  return (
    <div>
        <Navbar/>
        <Home />
        <Footer/>
    </div>
  );
}
