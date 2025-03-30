/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore build errors
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during builds
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // For static exports (optional, remove if not needed)
  output: 'standalone',
  // Enable experimental features (optional)
  experimental: {
    // Enable React Server Components
    serverComponents: true,
    // Enable concurrent features
    concurrentFeatures: true,
  }
}

module.exports = nextConfig 