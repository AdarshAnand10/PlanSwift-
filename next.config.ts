
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    allowedDevOrigins: [
      'https://6000-firebase-studio-1750315138400.cluster-sumfw3zmzzhzkx4mpvz3ogth4y.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
