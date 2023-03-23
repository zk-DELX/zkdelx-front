/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/storeoffer",
        destination: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/storeoffer",
      },
    ];
  },
}
