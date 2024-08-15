import type { Metadata } from "next";
import Loading from "@/components/Loading";

import "@/styles/global.css";

export const metadata: Metadata = {
  title: "Spotly",
  description: "Xem lời bài hát ngay trên trình duyệt của bạn",
  manifest: "/manifest.json",
  keywords: ["Spotly", "Spotify Lyrics"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        style={{
          color: "var(--text-color)",
          backgroundColor: "var(--background-color)",
          margin: 0,
          padding: 0,
          userSelect: "none",
        }}
      >
        <Loading />
        {children}
      </body>
    </html>
  );
}
