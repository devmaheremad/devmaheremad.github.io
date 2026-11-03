import type { NextConfig } from "next";

// Static export: the whole site is plain HTML/CSS/JS, so it can be hosted for free (GitHub Pages or Netlify).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
