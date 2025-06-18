import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/InhumanoidsClub.github.io',
  assetPrefix: '/InhumanoidsClub.github.io/',
}

export default nextConfig
