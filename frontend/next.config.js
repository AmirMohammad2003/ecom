/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return process.env.NODE_ENV !== "production"
      ? {
          afterFiles: [
            {
              source: "/v1/:path*/",
              destination: `${process.env.API_URL}/v1/:path*/`,
            },
          ],
        }
      : [];
  },
};

module.exports = nextConfig;
