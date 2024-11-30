/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:3333/api/:path*' // Proxy to Backend
          },
          {
            source: '/uploads/:path*',
            destination: 'http://localhost:3333/uploads/:path*' // Proxy to Backend
          }
        ]
      }
};

export default nextConfig;
