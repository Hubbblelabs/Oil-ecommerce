import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Cache Components (PPR + 'use cache' directive support)
  // See: node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
