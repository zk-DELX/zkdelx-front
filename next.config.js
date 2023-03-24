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
        source: "/api/calceloffer",
        destination: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/calceloffer",
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
        source: "/api/confirmoffer",
        destination: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/confirmoffer",
      },
    ];
  },
}
