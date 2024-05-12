module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  eslint: {
    dirs: ["app", "lib", "components"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
};
