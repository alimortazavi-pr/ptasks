/** @type {import('next').NextConfig} */

//PWA
const withPWA = require("next-pwa");

const nextConfig = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
