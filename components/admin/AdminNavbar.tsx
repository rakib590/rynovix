"use client";

import {
  Search,
  Bell,
  Moon,
  UserCircle,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";


export default function AdminNavbar() {

  const router = useRouter();

  const [open, setOpen] = useState(false);


  const handleLogout = async () => {

    const supabase = createClient();

    await supabase.auth.signOut();

    router.replace("/login");

    router.refresh();

  };


  return (

    <header
      className="
        h-20
        border-b
        border-white/10
        bg-black/40
        backdrop-blur-xl
        flex
        items-center
        justify-between
        px-6
      "
    >


      {/* Left Side */}

      <div>

        <h1
          className="
            text-xl
            font-semibold
            text-white
          "
        >
          Admin Dashboard
        </h1>


        <p
          className="
            text-sm
            text-gray-400
          "
        >
          Manage your RYNOVIX platform
        </p>

      </div>



      {/* Center Search */}

      <div
        className="
          hidden
          md:flex
          items-center
          gap-3
          w-[350px]
          bg-white/5
          border
          border-white/10
          rounded-xl
          px-4
          py-2
        "
      >

        <Search
          size={18}
          className="text-gray-400"
        />


        <input
          placeholder="Search anything..."
          className="
            bg-transparent
            outline-none
            text-sm
            text-white
            w-full
            placeholder:text-gray-500
          "
        />


      </div>




      {/* Right Side */}

      <div
        className="
          flex
          items-center
          gap-4
          relative
        "
      >


        {/* Notification */}

        <button
          className="
            relative
            p-2
            rounded-xl
            hover:bg-white/10
            text-gray-300
          "
        >

          <Bell size={20}/>


          <span
            className="
              absolute
              top-1
              right-1
              w-2
              h-2
              rounded-full
              bg-red-500
            "
          />

        </button>




        {/* Theme */}

        <button
          className="
            p-2
            rounded-xl
            hover:bg-white/10
            text-gray-300
          "
        >

          <Moon size={20}/>

        </button>





        {/* Profile */}

        <button
          onClick={() => setOpen(!open)}
          className="
            flex
            items-center
            gap-2
            px-3
            py-2
            rounded-xl
            hover:bg-white/10
          "
        >

          <UserCircle
            size={32}
            className="text-purple-400"
          />


          <div
            className="
              hidden
              sm:block
              text-left
            "
          >

            <p
              className="
                text-sm
                text-white
                font-medium
              "
            >
              Admin
            </p>


            <p
              className="
                text-xs
                text-gray-400
              "
            >
              Super Admin
            </p>


          </div>


          <ChevronDown
            size={16}
            className="text-gray-400"
          />


        </button>




        {/* Profile Dropdown */}

        {open && (

          <div
            className="
              absolute
              right-0
              top-14
              w-52
              rounded-xl
              border
              border-white/10
              bg-[#111111]
              shadow-xl
              overflow-hidden
              z-50
            "
          >


            <button
              className="
                w-full
                px-4
                py-3
                text-left
                text-sm
                text-gray-300
                hover:bg-white/10
              "
            >
              Profile Settings
            </button>



            <button
              onClick={handleLogout}
              className="
                w-full
                px-4
                py-3
                text-left
                text-sm
                text-red-400
                hover:bg-red-500/10
              "
            >
              Logout
            </button>


          </div>

        )}



      </div>



    </header>

  );

}