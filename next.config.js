/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack (config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  }
}


module.exports = nextConfig
