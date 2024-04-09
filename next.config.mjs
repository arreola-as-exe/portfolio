/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hoori.com.mx',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'nocodb.kua',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '172.24.0.3',
        port: '8080',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'kua-nocodb-nocodb-1', 
        port: '8080',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**', 
        port: '8080',
      },
      {
        protocol: 'http',
        hostname: '**', 
      }
    ],
  },
};

export default nextConfig;
