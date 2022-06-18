#!/bin/bash
if [ ! -d "./pages/jobs" ]; then
    mkdir "./pages/jobs"
fi

mv ./pages/* ./pages/jobs 2> /dev/null

cat <<EOF > next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: "/jobs",
}

module.exports = nextConfig
EOF

cat <<EOF > config.json
{
    "siteUrl": "https://niemal.dev/jobs"
}
EOF