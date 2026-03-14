/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "front-school.minio.ktsdev.ru",
      },
      {
        protocol: "https",
        hostname: "img.spoonacular.com",
        pathname: "/recipes/**",
      },
    ],
  },
};

module.exports = nextConfig;
