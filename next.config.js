/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { theme: "DEFAULT", currency: "IND" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "IND" },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" },
 
  ]
  }
};

module.exports = nextConfig;
