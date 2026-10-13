import { LucideIcon } from "lucide-react";


interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}


export default function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
}: DashboardCardProps) {


  return (

    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
        hover:bg-white/10
        transition
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p
            className="
              text-sm
              text-gray-400
            "
          >
            {title}
          </p>


          <h2
            className="
              text-3xl
              font-bold
              text-white
              mt-2
            "
          >
            {value}
          </h2>


          <p
            className="
              text-xs
              text-gray-500
              mt-2
            "
          >
            {description}
          </p>


        </div>


        <div
          className="
            p-3
            rounded-xl
            bg-purple-500/20
            text-purple-400
          "
        >

          <Icon size={26}/>

        </div>


      </div>


    </div>

  );

}