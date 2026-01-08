/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/claude-ai-research',
  assetPrefix: '/claude-ai-research/',
  trailingSlash: true,
  images: {
    domains: ['logo.clearbit.com', 'cdn.brandfolder.io'],
    unoptimized: true,
  },
}

module.exports = nextConfig
