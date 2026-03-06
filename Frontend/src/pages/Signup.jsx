import React from 'react'
import { FaSpotify } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/slices/authSlice';
import { useState } from 'react';
const Signup = () => {
        const [email,setEmail]=useState('')
        const [name,setName]=useState('')
        const [password,setPassword]=useState('')
        const [error,setError]=useState('')
        const dispatch=useDispatch()
        const navigate=useNavigate()
        const {loading}=useSelector((state)=>state.auth)
        
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await dispatch(registerUser({ name, email, password })).unwrap();
        navigate("/");
      } catch (err) {
        // console.error(err);
        setError(err)
      }
    };
  return (
    <section className='py-10 overflow-y-hidden'>
     <div className='flex flex-col justify-center items-center gap-5  text-white'>
      
        <div className='flex flex-col justify-center gap-2 items-center'>
        <FaSpotify className='text-4xl'/>
        
        
          <h1 className='font-bold text-center w-80 leading-tight text-5xl '>Sign up to start listening</h1>
        
      </div>
      <div className='flex flex-col justify-center items-center gap-10'>
        <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col gap-4' >
            {error && (
  <p className="text-red-500 text-xs text-center font-medium">
    *{error}
  </p>
)}
            <div className='flex flex-col gap-2'>
                <label className='font-semibold text-xs' >Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='p-3 w-75 border border-[#7C7C7C] rounded-sm text-sm font-semibold ' placeholder='Aegon Targaryen' required/>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='font-semibold text-xs' >Email address</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='p-3 w-75 border border-[#7C7C7C] rounded-sm text-sm font-semibold' placeholder='name@domain.com' required/>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='font-semibold text-xs' >Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='p-3 w-75 border border-[#7C7C7C] rounded-sm text-sm font-semibold' placeholder='1@#2$%3^&' required/>
            </div>
            <div className='flex flex-col mt-2 '>
                <input type="submit" className='py-2 w-75 hover:bg-[#3BE477] transition-all duration-300 hover:cursor-pointer text-black rounded-3xl bg-[#14d959] text-lg  font-semibold' value={loading?"loading...":"Sign up"}/>
            </div>

        </form>
        <div className=' flex flex-col justify-center gap-3 items-center '>
            <p className='text-sm text-[#9C9C9C]'>Already have an account?</p>
            <Link to='/login' className='text-sm font-bold  '>Log in</Link>

        </div>
      </div>
            <div className='w-75 mt-9'>
                <p className='text-[10px] text-center text-[#9C9C9C]'>This site is protected by reCAPTCHA and the Google
 <span className='underline'> Privacy Policy</span> and <span className='underline'>Terms of Service</span>  apply.</p>
            </div>
    </div>
</section>
  )
}

export default Signup
