import type { NextConfig } from 'next';
const config: NextConfig = {
  async redirects() {
    return [{ source: '/:path*', has: [{ type: 'host', value: 'www.cardpulse.com' }], destination: 'https://cardpulse.com/:path*', permanent: true }];
  },
};
export default config;
