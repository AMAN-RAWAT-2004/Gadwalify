import React from 'react'
import { FiSearch } from "react-icons/fi";
import { TbBrowserShare } from "react-icons/tb";
const Search = () => {
  return (
    <search>
      <div className='flex flex-row justify-between items-center bg-[#2A2A2A] w-120 h-12 gap-2 border-none active:border-white rounded-full px-4 py-1'>
        <FiSearch className='text-3xl text-gray-100'/>
      <input type="text" placeholder='What do you want to play?' className='text-white bg-transparent w-full focus:outline-none focus:ring-0 focus:border-transparent border-r  border-r-gray-400'/>
        <TbBrowserShare className='text-3xl text-gray-100'/>
      </div>
    </search>
  )
}

export default Search
