import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jepitrnhqplwrwcqdshv.supabase.co",
      },
    ],
  },
};

export default nextConfig;