import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com", pathname: "/images/**" },
    ],
  },
  // Pin Turbopack to this repo so the parent ~/package-lock.json is not treated as root
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      { source: "/platform", destination: "/platform-overview", permanent: true },
      { source: "/platform/:path*", destination: "/platform-overview", permanent: true },
      { source: "/product-configurator", destination: "/cpq-configurator", permanent: true },
      { source: "/product-configurator/:path*", destination: "/cpq-configurator", permanent: true },
      { source: "/pricing/eur", destination: "/pricing?currency=eur", permanent: true },
      { source: "/pricing/gbp", destination: "/pricing?currency=gbp", permanent: true },
      { source: "/pricing/inr", destination: "/pricing?currency=inr", permanent: true },
      { source: "/all-blogs", destination: "/blog", permanent: true },
      { source: "/categories/:slug", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
