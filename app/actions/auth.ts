"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}

export async function updatePassword(password: string) {
  const supabase = await createClient();

  const {
    error,
  } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Password updated successfully.",
  };
}