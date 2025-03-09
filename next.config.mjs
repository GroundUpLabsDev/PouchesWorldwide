/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "146.190.245.42",
      "146.190.245.42:1337",
      "localhost",
      "pouchesworldwide.com",
      "www.pouchesworldwide.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  reactStrictMode: false, // Disable React Strict Mode
  webpack(config, { dev }) {
    if (dev) {
      config.stats = "errors-warnings"; // Show only minimal errors/warnings
      config.ignoreWarnings = [(warning) => true]; // Ignore all warnings
      config.devtool = false; // Disable source maps in dev mode
    }
    return config;
  },
  devIndicators: {
    buildActivity: false, // Disable build activity indicator
    autoPrerender: false, // Hide static route icon
    errorBoundary: false, // Disable React error overlay
  },
  productionBrowserSourceMaps: false, // Do not generate source maps in production
  poweredByHeader: false, // Hide "Powered by Next.js" header
  async redirects() {
    return [
      {
        source: "/error",
        destination: "/",
        permanent: false,
      },
    ];
  },
  compiler: {
    removeConsole: {
      exclude: ["error"], // Remove console logs but keep errors
    },
  },
};

export default nextConfig;
