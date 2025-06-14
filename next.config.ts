import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

const withNextInt = createNextIntlPlugin()
export default withNextInt(nextConfig);
