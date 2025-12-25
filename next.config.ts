import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'musicfile.api.box',
      },
      {
        protocol: 'https',
        hostname: '*.suno.ai',
      },
      {
        protocol: 'https',
        hostname: '*.sunoapi.org',
      },
    ],
  },
};

export default nextConfig;
