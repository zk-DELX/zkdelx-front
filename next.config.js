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
      {
        source: "/api/canceloffer",
        destination: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/canceloffer",
      },
      {
        source: "/api/acceptoffer",
        destination: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/acceptoffer",
      },
      {
        source: "/api/deleteoffer",
        destination: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/deleteoffer",
      },
      {
        source: "/api/expireoffer",
        destination: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/expireoffer",
      },
      {
        source: "/api/completeOffer",
        destination: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/completeOffer",
      },
    ];
  },
}
