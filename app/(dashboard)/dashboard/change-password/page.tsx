"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/settings/security/password");
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="text-sm text-gray-400">
        Redirecting to Change Password...
      </p>
    </div>
  );
}