"use client";

import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";


interface AdminLayoutProps {
  children: ReactNode;
}


export default function AdminLayout({
  children,
}: AdminLayoutProps) {


  return (

    <div
      className="
        min-h-screen
        bg-[#050505]
        text-white
        flex
      "
    >

      {/* Sidebar */}

      <AdminSidebar />


      {/* Main Area */}

      <div
        className="
          flex-1
          flex
          flex-col
        "
      >

        {/* Navbar */}

        <AdminNavbar />


        {/* Page Content */}

        <main
          className="
            flex-1
            p-6
            overflow-y-auto
          "
        >

          {children}

        </main>


      </div>


    </div>

  );
}