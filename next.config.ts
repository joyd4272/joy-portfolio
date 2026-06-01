import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Case studies that ship as standalone static HTML builds (not the React
  // image-stack template under /work/[slug]) get rewritten to the index.html
  // inside their /public/work/<slug>/ folder. This lets them keep clean URLs.
  async rewrites() {
    return [
      { source: "/work/book-it", destination: "/work/book-it/index.html" },
      { source: "/work/ott-news", destination: "/work/ott-news/index.html" },
      { source: "/work/hmi", destination: "/work/hmi/index.html" },
    ];
  },
};

export default nextConfig;
