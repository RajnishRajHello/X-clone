import type { NextConfig } from "next";
// import { hostname } from "os";

const hostnames = [
  "avatars.githubusercontent.com",
  "lh3.googleusercontent.com",
];

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname: hostname,
      pathname: "/**",
    })),
  },
};

export default nextConfig;
