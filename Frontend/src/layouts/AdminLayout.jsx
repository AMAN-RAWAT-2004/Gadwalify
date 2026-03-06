import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../Admin/AdminSidebar'

const AdminLayout = () => {
  return (
    <div className='flex  flex-row min-h-screen'>
      <div className=' bg-gray-900 p-4 justify-center items-center w-1/5'>

      <AdminSidebar/>
      </div>

       <div className="grow p-6 bg-white overflow-auto">
            <Outlet/>
        </div>
     
    </div>
  )
}

export default AdminLayout
