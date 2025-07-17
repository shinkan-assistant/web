/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // プロトコルは 'http' または 'https'
        hostname: 'lh3.googleusercontent.com', // 許可するホスト名
        port: '', // ポートがなければ空文字列
        pathname: '/a/**', // 必要に応じてパスも指定可能。ここでは'/a/'以下の任意のパスを許可
      },
    ]
  }
};

export default nextConfig;
