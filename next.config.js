/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/jobs",
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
