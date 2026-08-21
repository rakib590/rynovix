"use client";

import { logoutAction } from "@/app/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Logout
      </button>
    </form>
  );
}