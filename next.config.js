/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    const DEFAULT_BACKEND_BASE_URL = "https://zkdelx-backend.vercel.app";
    const URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? DEFAULT_BACKEND_BASE_URL;
    return [
      {
        source: "/api/:path*",
        destination: URL + "/:path*",
      },
      {
        source: "/api/:path*/:myAccount",
        destination: URL + "/:path*/:myAccount",
      },
      {
        source: "/api/:path*/:param1/:param2/:param3",
        destination: URL + "/:path*/:param1/:param2/:param3",
      },
      {
        source: "/api/:path*/:param1/:param2/:param3/:param4",
        destination: URL + "/:path*/:param1/:param2/:param3/:param4",
      },
    ];
  },
}
