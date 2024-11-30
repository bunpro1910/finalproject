import React from 'react'
import './footer.css'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
<footer className="footer">
  <div className="container">
    <div className="row">
      <div className="footer-col">
        <h4>Contact Information</h4>
        <ul>
          <li>Support Email: abc@gmail.com</li>
          <li>Adress: 40 Cong Hoa st, Ho Chi Minh City, Viet</li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Additional Resource</h4>
        <ul>
          <li><a href="#">About the magazing</a></li>
          <li><a href="#">Term and conditions</a></li>

        </ul>
      </div>
      <div className="footer-col">
        <h4>Social Media</h4>
        <div className="social-links">
          <a href="#" style={{ display: 'inline-block', width: '35px', height: '35px' }}><FaFacebook style={{ width: '100%', height: '100%' }} /></a>
          <a href="#" style={{ display: 'inline-block', width: '35px', height: '35px' }}><FaXTwitter style={{ width: '100%', height: '100%' }} /></a>
          <a href="#" style={{ display: 'inline-block', width: '35px', height: '35px' }}><FaInstagram style={{ width: '100%', height: '100%' }} /></a>
        </div>
      </div>
      <div className='footer-col'>
        <div className="copyright-notice">
          <h4>Legal and Compliance</h4>
          <p>
            &copy; {new Date().getFullYear()} Greenwich university. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>
    </>
  )
}
