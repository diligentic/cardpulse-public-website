import type { NextConfig } from 'next';
const config: NextConfig = {
  async redirects() {
    return [{ source: '/:path*', has: [{ type: 'host', value: 'www.dovvy.ca' }], destination: 'https://dovvy.ca/:path*', permanent: true }];
  },
};
export default config;
