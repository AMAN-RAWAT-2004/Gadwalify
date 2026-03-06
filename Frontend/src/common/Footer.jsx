import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const user=useSelector((state)=>state.auth?.user)
    const navigate=useNavigate();
    const handleSignup=()=>{
        navigate('/signup')
    }
  return (
    <div className=" p-2 w-full ">
      <div className=' h-18 flex flex-row justify-between items-center rounded-lg bg-[linear-gradient(to_right,#A237A2,#865BC0,#5F89E6)] w-full '>
        <div className='flex flex-col p-4 gap-1'>
            <p className='text-sm font-semibold text-white'>Preview of Gadwalify</p>
            <p className='text-sm font-semibold text-white'>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>

        </div>
        {
          user ?(''): (<div className='w-100 flex justify-end px-5'>
            <button onClick={handleSignup}  className='px-7 text-black py-3 bg-white rounded-4xl text-16px transform hover:scale-110 transition duration-300 font-bold'>Sign up free</button>

        </div>)
        }
        

      </div>
    </div>
  )
}

export default Footer
