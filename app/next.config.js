const withInterceptStdout = require('next-intercept-stdout');
const nextConfig = withInterceptStdout(
  {
    reactStrictMode: true,
    images: {
      domains: ['avatars.slack-edge.com'], // ここに外部画像ホストを追加
    },
  },
  (text) => (text.includes('Duplicate atom key') ? '' : text)
);

module.exports = nextConfig;