/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json'
    });
    return config;
  }
};

export default nextConfig;