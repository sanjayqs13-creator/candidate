import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "google-spreadsheet",
      "google-auth-library",
    ],
  },
};

export default nextConfig;