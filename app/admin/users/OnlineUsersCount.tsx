"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function OnlineUsersCount() {

  const [count, setCount] = useState(0);

  useEffect(() => {

    const supabase = createClient();

    let mounted = true;

    const loadCount = async () => {

      const {
        count,
        error,
      } = await supabase
        .from("profiles")
        .select(
          "*",
          {
            count: "exact",
            head: true,
          }
        )
        .eq(
          "is_online",
          true
        );

      if (error) {
        console.error(
          "ONLINE COUNT ERROR:",
          error
        );
        return;
      }

      if (mounted) {
        setCount(count ?? 0);
      }

    };

    loadCount();

    const channel = supabase
      .channel("online-users-count")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
        },
        () => {
          loadCount();
        }
      )
      .subscribe();

    return () => {

      mounted = false;

      supabase.removeChannel(channel);

    };

  }, []);

  return (

    <div
      className="
      rounded-2xl
      border
      border-green-500/20
      bg-black/30
      p-5
      "
    >

      <p
        className="
        text-sm
        text-gray-400
        "
      >
        Online Users
      </p>

      <h2
        className="
        mt-3
        text-3xl
        font-bold
        text-green-400
        "
      >
        {count}
      </h2>

    </div>

  );

}