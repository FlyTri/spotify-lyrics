import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
  reactStrictMode: false,
  swcMinify: true,
  output: "export",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
});
