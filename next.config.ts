import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static PNGs only (no image pipeline needed) and no Vercel optimisation quota.
  images: { unoptimized: true },
  // Lint runs as its own CI step; keeping it out of the build saves memory on small machines.
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    cpus: 1,
    webpackMemoryOptimizations: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
