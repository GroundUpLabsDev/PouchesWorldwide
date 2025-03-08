/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['146.190.245.42', '146.190.245.42:1337', 'localhost'],
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during the build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during the build
  },
  reactStrictMode: false, // Disable React's Strict Mode (optional)
  experimental: {
    appDir: true, // Enable app directory support if you're using it
    serverComponentsExternalPackages: [], // Add any server-side external packages if needed
  },
  // Optionally disable automatic static optimization to allow CSR components.
  optimizeCss: true, 
  staticPageGenerationTimeout: 120, // Adjust timeout for static page generation if needed
};

export default nextConfig;
