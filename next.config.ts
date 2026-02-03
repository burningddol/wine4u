import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gangnam.wine',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gangnam.wine',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nas.ayoungfbc.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
