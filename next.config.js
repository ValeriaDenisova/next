/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "front-school.minio.ktsdev.ru",
      },
    ],
  },
};

module.exports = nextConfig;
