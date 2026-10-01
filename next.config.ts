import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Streamee-landing',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
