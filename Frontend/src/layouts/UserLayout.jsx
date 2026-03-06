import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const UserLayout = () => {
  return (
    <div className="bg-black text-white h-screen flex gap-1 flex-col">

      {/* HEADER */}
      <Header />

      {/* MAIN AREA */}
      <div className="flex gap-4 flex-1 overflow-y-hidden px-2">

        {/* SIDEBAR */}
        <div className=" w-2/7 rounded-lg bg-[#121212] h-full ">
          <Sidebar />
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 bg-[#121212] rounded-lg overflow-y-auto">
          <Outlet />
        </main>

      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default UserLayout;