"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useCallback } from "react";

import {
  LayoutDashboard,
  Bot,
  History,
  Star,
  User,
  Settings,
  LogOut,
  Rocket,
  Gauge,
  X,
} from "lucide-react";


const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "AI Toolbox",
    icon: Bot,
    href: "/dashboard/tools",
  },
  {
    title: "History",
    icon: History,
    href: "/dashboard/history",
  },
  {
    title: "Favorites",
    icon: Star,
    href: "/dashboard/favorites",
  },
  {
    title: "Profile",
    icon: User,
    href: "/dashboard/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];


interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}


export default function Sidebar({
  mobileOpen = false,
  onClose,
}: SidebarProps) {


  const pathname = usePathname();
  const router = useRouter();

  const supabase = createClient();


  const [
    credits,
    setCredits
  ] = useState(0);


  const [
    plan,
    setPlan
  ] = useState("Free");


  const [
    resetIn,
    setResetIn
  ] = useState("—");



  function updateCountdown(
    resetAt:string
  ){

    const resetTime =
      new Date(resetAt).getTime();


    const difference =
      resetTime - Date.now();


    if(difference <= 0){

      setResetIn(
        "Resetting..."
      );

      return;

    }


    const totalSeconds =
      Math.floor(
        difference / 1000
      );


    const days =
      Math.floor(
        totalSeconds / 86400
      );


    const hours =
      Math.floor(
        (totalSeconds % 86400) / 3600
      );


    const minutes =
      Math.floor(
        (totalSeconds % 3600) / 60
      );


    const seconds =
      totalSeconds % 60;



    if(days > 0){

      setResetIn(
        `${days}d ${hours}h`
      );

    }
    else if(hours > 0){

      setResetIn(
        `${hours}h ${minutes}m`
      );

    }
    else if(minutes > 0){

      setResetIn(
        `${minutes}m ${seconds}s`
      );

    }
    else{

      setResetIn(
        `${seconds}s`
      );

    }

  }





  const loadCredits = useCallback(
    async()=>{

      try{


        const response =
          await fetch(
            "/api/dashboard",
            {
              cache:"no-store",
            }
          );



        const data =
          await response.json();



        if(!data.success){
          return;
        }



        const statistics =
          data.statistics;



        setCredits(
          Number(
            statistics?.creditsRemaining ?? 0
          )
        );



        setPlan(
          statistics?.currentPlan || "Free"
        );



        if(
          statistics?.creditsResetAt
        ){

          updateCountdown(
            statistics.creditsResetAt
          );

        }
        else{

          setResetIn("—");

        }



      }
      catch(error){

        console.error(
          "Credit loading error:",
          error
        );

      }


    },
    []
  );
  
  useEffect(()=>{


    // Initial load
    loadCredits();



    // Instant update from AI tools
    window.addEventListener(
      "credits-updated",
      loadCredits
    );



    // Backup refresh every 15 seconds
    const interval =
      setInterval(()=>{

        loadCredits();

      },15000);



    return ()=>{


      window.removeEventListener(
        "credits-updated",
        loadCredits
      );


      clearInterval(interval);


    };


  },[
    loadCredits
  ]);






  async function handleLogout(){

    try{


      const {
        data:{
          user
        },
      } =
      await supabase.auth.getUser();



      if(user){

        await supabase
          .from("profiles")
          .update({

            is_online:false,

            last_activity:
              new Date()
              .toISOString(),

          })
          .eq(
            "id",
            user.id
          );

      }



      await supabase.auth.signOut();



      router.replace(
        "/login"
      );


      router.refresh();



    }
    catch(error){

      console.error(
        "Logout Error:",
        error
      );

    }

  }





  function handleNavigation(){

    onClose?.();

  }




  const normalizedPlan =
    plan.toLowerCase();



  const monthlyCreditLimit =
    normalizedPlan === "business"
      ? 10000
      : normalizedPlan === "pro"
      ? 2000
      : 100;



  const creditPercentage =
    Math.min(
      (credits / monthlyCreditLimit) * 100,
      100
    );




  return (

    <>


      {
        mobileOpen && (

          <button
            type="button"
            onClick={onClose}
            className="
            fixed inset-0 z-40
            bg-black/60
            backdrop-blur-sm
            md:hidden
            "
          />

        )
      }





      <aside
        className={`
        fixed inset-y-0 left-0 z-50
        flex h-screen w-64 flex-col
        border-r border-white/10
        bg-[#0B1220]
        transition-transform duration-300

        md:static
        md:translate-x-0

        ${
          mobileOpen
          ? "translate-x-0"
          : "-translate-x-full"
        }

        `}
      >





        {/* Logo */}

        <div className="
        flex items-start justify-between
        px-6 py-8
        ">


          <div>


            <h1 className="
            text-2xl font-bold text-white
            ">
              RYNOVIX
            </h1>


            <p className="
            mt-1 text-sm text-gray-400
            ">
              AI Creator Platform
            </p>


          </div>



          <button
          onClick={onClose}
          className="
          rounded-lg p-2
          text-gray-400
          md:hidden
          "
          >

            <X size={20}/>

          </button>


        </div>





        {/* Menu */}

        <nav className="
        flex-1 space-y-2
        overflow-y-auto
        px-4
        ">


        {
          menuItems.map((item)=>{


            const Icon =
              item.icon;



            const active =
              pathname === item.href ||
              (
                item.href ===
                "/dashboard/tools"
                &&
                pathname.startsWith(
                  "/dashboard/tools/"
                )
              );



            return (

              <Link
              key={item.title}
              href={item.href}
              onClick={handleNavigation}
              className={`
              flex items-center gap-3
              rounded-xl px-4 py-3
              transition

              ${
                active
                ?
                "bg-blue-600 text-white"
                :
                "text-gray-400 hover:bg-white/5 hover:text-white"
              }

              `}
              >


                <Icon size={20}/>


                <span>
                  {item.title}
                </span>


              </Link>

            );


          })
        }


        </nav>





        {/* Credits */}

        <div className="
        px-4 pb-3
        ">


          <div className="
          rounded-xl
          border border-blue-500/20
          bg-[#101C38]
          p-3
          ">



            <div className="
            flex items-center gap-2
            ">


              <div className="
              flex h-8 w-8
              items-center justify-center
              rounded-lg
              bg-blue-500/15
              ">

                <Gauge
                size={16}
                className="text-blue-400"
                />

              </div>



              <div>

                <h3 className="
                text-sm font-semibold text-white
                ">
                  AI Credits
                </h3>


                <p className="
                text-[10px] text-slate-400
                ">
                  Monthly Usage
                </p>


              </div>


            </div>





            <div className="mt-3">


              <div className="
              mb-1 flex justify-between
              ">


                <span className="
                text-xs text-slate-400
                ">
                  Credits
                </span>


                <span className="
                text-xs font-semibold text-white
                ">

                {credits.toLocaleString()}
                {" / "}
                {monthlyCreditLimit.toLocaleString()}

                </span>


              </div>





              <div className="
              h-1.5 rounded-full bg-white/10
              overflow-hidden
              ">


                <div
                className="
                h-full rounded-full
                bg-blue-500
                transition-all duration-300
                "
                style={{
                  width:`${creditPercentage}%`
                }}
                />


              </div>


            </div>





            <div className="
            mt-2 grid grid-cols-2 gap-2
            ">


              <div className="
              rounded-lg bg-white/5 p-2
              ">

                <p className="
                text-[10px] text-slate-400
                ">
                  Reset In
                </p>


                <p className="
                text-xs font-semibold text-white
                ">
                  {resetIn}
                </p>


              </div>




              <div className="
              rounded-lg bg-white/5 p-2
              ">


                <p className="
                text-[10px] text-slate-400
                ">
                  Plan
                </p>


                <p className="
                text-xs font-bold text-green-400
                ">
                  {plan.toUpperCase()}
                </p>


              </div>


            </div>





            <Link
            href="/dashboard/billing"
            onClick={handleNavigation}
            className="
            mt-2 flex items-center
            justify-center gap-2
            rounded-lg bg-blue-600
            py-2 text-xs font-semibold
            text-white
            "
            >

              <Rocket size={13}/>

              Upgrade Now

            </Link>



          </div>


        </div>





        {/* Logout */}

        <div className="
        border-t border-white/10 p-4
        ">


          <button
          onClick={handleLogout}
          className="
          flex w-full items-center gap-3
          rounded-xl px-4 py-3
          text-red-400
          hover:bg-red-500/10
          "
          >


            <LogOut size={20}/>

            Logout


          </button>


        </div>



      </aside>


    </>

  );


}