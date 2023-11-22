/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "nextui.org",
      },
      //(https:///images/hero-card-complete.jpeg)
    ],
  },
};

module.exports = nextConfig;
