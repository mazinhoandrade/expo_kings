import type { NextConfig } from "next";
//import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["https://googleusercontent.com"],
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
