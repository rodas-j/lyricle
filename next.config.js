
const securityHeaders = [{
  key: 'X-Frame-Options',
  value: 'SAMEORIGIN'
}]

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
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
