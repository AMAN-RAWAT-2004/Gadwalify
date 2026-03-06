import React, { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers } from "../redux/slices/authSlice";

const UserManagment = () => {
const navigate=useNavigate();
const dispatch=useDispatch()
const {user,error,loading}=useSelector((state)=>state.auth)
const {users}=useSelector((state)=>state.auth)


useEffect(()=>{
  if(user&&user.data.role!=="admin"){
    navigate("/")
  }
},[user,navigate])

useEffect(()=>{
  if(user&&user.data.role==="admin"){
    dispatch(fetchAllUsers())
  }
},[dispatch,user])


        
  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <h2 className="text-4xl text-center font-bold mb-6 ">Total Users</h2>
      {loading && <p>Loading ...</p>}
      {error && <p>Error: {error}</p>}
      
      

      {/* USER LISTS MANAGMENT  */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                    <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user)=>(
                            <tr key={user._id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                    {user.name }
                                </td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">{user.role}</td>

                                


                            </tr>
                        ))
                    }
                </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagment;
