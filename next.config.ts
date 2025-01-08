// import type {NextConfig} from "next";
// import withBundleAnalyzer from "@next/bundle-analyzer";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   // swcMinify: true,
//   experimental: {
//     optimizeCss: true,
//     nextScriptWorkers: true,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//     domains: ["example.com", "another-domain.com"],
//     formats: ["image/webp", "image/avif"],
//   },

//   ...withBundleAnalyzer({
//     enabled: process.env.ANALYZE === "true",
//   }),

//   compress: true,

//   webpack: (config, {isServer}) => {
//     if (!isServer) {
//       config.resolve.fallback = {fs: false};
//     }
//     return config;
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

// Create the bundle analyzer wrapper
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    nextScriptWorkers: true,
    middlewarePrefetch: 'flexible',
  },
  // output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["example.com", "another-domain.com"],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60, 
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", 
  },
  compress: true,
  compiler: {
    emotion: true,
  },
  transpilePackages: ['@chakra-ui/react', '@chakra-ui/next-js', '@emotion/react'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
};

// Apply the bundle analyzer wrapper to the config
export default withBundleAnalyzer(nextConfig);
