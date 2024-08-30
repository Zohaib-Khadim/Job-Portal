import React from 'react'
import {LuUserPlus} from "react-icons/lu"
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";
const HowItWorks = () => {
  return (
    <>
    <div className='bg-yellow-500 mt-10 pb-7'>
        <h1 className='font-bold text-2xl text-center pt-5'>
        How does it work?
        </h1>
        <div className="container">
            <div className="card bg-white text-black mx-16 ps-8 pt-7 pb-5  rounded mt-12 hover:bg-black hover:text-white">
                <div className="icon rounded-full border w-11 h-11 bg-black">
                    <LuUserPlus className='text-white tex-center ps-3 pt-2 w-8 h-8'/>
                </div>
                <h4 className='font-bold mt-3 '>Create an Account</h4>
                <p className=' mt-3 text-gray-500'>Sign up for a free account as a job seeker or employer. Set up your
            profile in minutes to start posting jobs or applying for jobs.
            Customize your profile to highlight your skills or requirements.</p>
            </div>
            <div className="card bg-white text-black mx-16 ps-8 pt-7 pb-5 mt-6 rounded hover:bg-black hover:text-white">
                <div className="icon rounded-full border w-11 h-11 bg-black">
                    <VscTasklist className='text-white tex-center ps-2 pt-2 w-7 h-7'/>
                </div>
                <h4 className='font-bold mt-3'>Post or Browse Jobs</h4>
                <p className='mt-3 text-gray-500'>Employers can post detailed job descriptions, and job seekers can
            browse a comprehensive list of available positions. Utilize filters
            to find jobs that match your skills and preferences.</p>
            </div>
            <div className="card bg-white text-black mx-16 ps-8 pt-7 pb-5 mt-6 rounded hover:bg-black hover:text-white">
                <div className="icon rounded-full border w-11 h-11 bg-black">
                    <BiSolidLike className='text-white tex-center ps-2 pt-2 w-7 h-7'/>
                </div>
                <h4 className='font-bold mt-3'>Hire or Get Hired</h4>
                <p className='mt-3 text-gray-500'>Employers can shortlist candidates and extend job offers. Job
            seekers can review job offers and accept positions that align with
            their career goals.</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default HowItWorks