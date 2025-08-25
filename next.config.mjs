// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn1.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn2.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn3.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "files.cdn-files-a.com",
      },
      {
        protocol: "https",
        hostname: "productimages.hepsiburada.net",
      },
      {
        protocol: "https",
        hostname: "akbanklab.com",
      },
    ],
  },
};

export default nextConfig;
