import { env } from './src/env.mjs';

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    unoptimized: !env.NEXT_PUBLIC_IMAGE_DOMAIN,
    domains: [env.NEXT_PUBLIC_IMAGE_DOMAIN ?? 'image.tmdb.org'],
    imageSizes: [48, 64, 96],
    deviceSizes: [128, 256, 512, 1200],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false, // Change to true if you want a permanent redirect (301)
      },
    ];
  },
};


export default config;
