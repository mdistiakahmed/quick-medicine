import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['www.admin.drug-international.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.admin.drug-international.com',
        port: '',
        pathname: '/uploads/product_images/**',
      },
    ],
  },
};

export default nextConfig;
