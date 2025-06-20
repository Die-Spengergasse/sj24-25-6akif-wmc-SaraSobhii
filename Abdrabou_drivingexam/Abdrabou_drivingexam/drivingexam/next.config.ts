import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ['img.f-online.at'], // damit next/image die Bilder laden darf
  },
};

export default nextConfig;
