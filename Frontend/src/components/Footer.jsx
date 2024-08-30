import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {FaSquareXTwitter,FaSquareInstagram,FaYoutube,FaLinkedin} from "react-icons/fa6"


const Footer = () => {
  const {isAuthenticated} = useSelector(state =>state.user)
  return (
    <>
    <footer className='bg-black  pt-5 px-20 pb-5 text-white grid lg:grid-cols-4 md:grid-cols-2 sm:grid-1  gap-'>
      <div className='mt-4 md:mx-auto sm:mx-auto'>
        <img className='border mt-10  w-20 ' src="../../public/logo.png"  alt="logo" />
      </div>
      <div className='md:mx-auto  sm:mx-auto mt-4'>
        <h4 className='font-bold text-xl'>Support</h4>
        <ul className='mt-4'>
          <li>Multan,Pakistan</li>
          <li>zaibimalik7994@gmail.com</li>
          <li>+92 3026660865</li>
        </ul>
      </div>
      <div className='md:mt-3 sm:mt-3 md:mx-auto sm:mx-auto'>
        <h4 className='font-bold text-xl'>Quick Links</h4>
        <ul className='mt-4'>
            <li>
              <Link className=' hover:text-yellow-500' to={"/"}>
                  Home
              </Link>
            </li>
            <li>
              <Link className=' hover:text-yellow-500' to={"/jobs"}>
                  Jobs
              </Link>
              </li>
              {
                isAuthenticated && (
                  <li>
                    <Link className=' hover:text-yellow-500' to={"/dashboard"}>
                  DashBoard
              </Link>
                  </li>
                )
              }
        </ul>
      </div>
      <div className='md:mt-3 sm:mt-3 md:mx-auto sm:mx-auto'>
        <h4 className='font-bold text-xl'>Follow Us</h4>
        <ul className='mt-4'>
          <li >
            <Link className='flex hover:text-yellow-500' >
            <span className='pt-1'><FaSquareXTwitter/></span>
            <span className='ps-2'>Twitter (X)</span>
            </Link>
          </li>
          <li>
            <Link className='flex hover:text-yellow-500'>
            <span className='pt-1'><FaSquareInstagram/></span>
            <span className='ps-2'>Instagram</span>
            </Link>
          </li>
          <li>
            <Link className='flex hover:text-yellow-500'>
            <span className='pt-1'><FaYoutube/></span>
            <span className='ps-2'>YouTube</span>
            </Link>
          </li>
          <li>
            <Link className='flex hover:text-yellow-500'>
            <span className='pt-1'><FaLinkedin/></span>
            <span className='ps-2'>LinkedIn</span>
            </Link>
          </li>
        </ul>
      </div>
    
    </footer>
    <hr className='border'/>
    <div className='bg-black text-gray-600   text-center py-3'>
              &copy;CopyRight 2024.All Rights are Reserved by Muhammad Zohaib.
    </div>
    <hr className='border'/>
    </>
  )
}

export default Footer