/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@movirra/ui"],
  images: {
    // Add your CloudFront / CDN domain here when media lands (Phase 11).
    remotePatterns: [],
  },
};

export default nextConfig;
