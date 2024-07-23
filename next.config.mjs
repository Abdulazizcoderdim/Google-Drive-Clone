/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*' },
      { protocol: 'http', hostname: '*' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
    ],
  },
}

export default nextConfig
