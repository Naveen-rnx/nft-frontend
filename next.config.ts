import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  webpack: (config) => {
    config.externals.push(
      "pino-pretty",
      "lokijs",
      "encoding",
      "@coinbase/cdp-sdk",
      "@x402/core/client",
      "@x402/evm/exact/client",
      "@x402/evm/upto/client",
      "@x402/svm/exact/client",
      "@x402/evm",
      "@solana/kit",
      "@react-native-async-storage/async-storage"
    );
    return config;
  },
};

export default nextConfig;