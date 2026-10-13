"use client";


interface AdminTableProps {
  title: string;
  children: React.ReactNode;
}



export default function AdminTable({
  title,
  children,
}: AdminTableProps) {


  return (

    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-black/30
        p-5
      "
    >

      <h2
        className="
          mb-5
          text-lg
          font-semibold
          text-white
        "
      >
        {title}
      </h2>


      {children}


    </div>

  );

}