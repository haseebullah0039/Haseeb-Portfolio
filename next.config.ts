import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["react-icons", "motion"],
    // Fewer parallel build workers so `next build` fits on low-memory machines.
    cpus: 2,
  },
};

export default nextConfig;
