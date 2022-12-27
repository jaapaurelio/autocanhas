module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: ["cdn.sanity.io"]
  },
  eslint: {
    dirs: ['app', 'lib', 'components'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
};
