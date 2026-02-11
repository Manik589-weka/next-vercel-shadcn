import path from "node:path";
import type { NextConfig } from "next";

const projectRoot = path.resolve(process.cwd());

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ui.shadcn.com", pathname: "/**" },
      { protocol: "https", hostname: "github.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
    ],
  },
  // Force module resolution from this project so tailwindcss and other deps
  // resolve from WEKA-SANITY-NEXTJS/node_modules (not a parent directory).
  turbopack: {
    root: projectRoot,
  },
  webpack: (config) => {
    // Always use this project root so tailwindcss (and deps) never resolve from a parent path.
    config.context = projectRoot;
    config.resolve = config.resolve ?? {};
    const nodeModules = path.join(projectRoot, "node_modules");
    config.resolve.modules = [
      nodeModules,
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : ["node_modules"]),
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: path.join(nodeModules, "tailwindcss"),
      "@tailwindcss/postcss": path.join(nodeModules, "@tailwindcss/postcss"),
    };
    return config;
  },
};

export default nextConfig;
