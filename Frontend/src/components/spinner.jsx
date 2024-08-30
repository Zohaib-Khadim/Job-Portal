import React from 'react'
import {ClipLoader} from "react-spinners"
const Spinner = () => {
  return (
    <>
    <div className='flex justify-center items-center h-[63vh]'>
      <ClipLoader size={150} aria-label="Loading Spinner" data-testid="loader"/>
    </div>
    </>
  )
}

export default Spinner