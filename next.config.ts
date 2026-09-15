import type { NextConfig } from 'next';
// Keep the existing nginx/Coolify hosting: no Node server is needed at runtime.
const config: NextConfig = { output: 'export', images: { unoptimized: true }, poweredByHeader: false };
export default config;
