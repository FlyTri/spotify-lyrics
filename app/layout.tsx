import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
