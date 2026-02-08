import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Experimental Features for 2026
   *
   * 1. Partial Prerendering (PPR) - 'incremental' mode
   *    - Combines static shell with dynamic content
   *    - Opt-in per route with: export const experimental_ppr = true
   *    - Static parts are served immediately, dynamic parts stream in
   *
   * 2. React Compiler
   *    - Automatically optimizes React components
   *    - Eliminates need for manual useMemo/useCallback in most cases
   *    - Requires: pnpm add -D babel-plugin-react-compiler
   */
  experimental: {
    // Partial Prerendering (PPR)
    // NOTE: Requires Next.js canary. Disabled by default on stable.
    // Enable by running on canary and setting NEXT_ENABLE_PPR=true.
    // Routes must opt-in with: export const experimental_ppr = true
    ppr: process.env['NEXT_ENABLE_PPR'] === 'true' ? 'incremental' : false,

    // Enable React Compiler for automatic optimizations
    // This replaces manual memoization in most cases
    reactCompiler: true,

    // Alternative: Opt-in mode (only components with "use memo" directive)
    // reactCompiler: {
    //   compilationMode: 'annotation',
    // },
  },

  /**
   * Image Optimization
   * Add domains for external images (e.g., ENS avatars, NFT metadata)
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ipfs.io',
      },
      {
        protocol: 'https',
        hostname: 'metadata.ens.domains',
      },
      {
        protocol: 'https',
        hostname: '**.arweave.net',
      },
    ],
  },

  /**
   * Webpack Configuration
   * Handle Web3 library compatibility
   */
  webpack: (config) => {
    // Required for some Web3 libraries that use Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },

  /**
   * TypeScript
   * Strict mode is enabled by default in tsconfig.json
   */
  typescript: {
    // Set to true to ignore build errors (not recommended for production)
    ignoreBuildErrors: false,
  },

  /**
   * ESLint
   * Run during builds
   */
  eslint: {
    // Set to true to ignore ESLint errors during build (not recommended)
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
