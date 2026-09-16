/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow production verification without overwriting the running dev cache.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'hitude.com' },
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;
