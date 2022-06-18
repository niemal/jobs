/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      }
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig