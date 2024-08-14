import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  skipWaiting: true,
});

export default withPWA({
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
});
