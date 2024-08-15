"use client";

import Emoji from "@/components/Emoji";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator)
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          console.log("Service Worker registered");
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
  }, []);

  return (
    <>
      <Emoji emoji="👋" />
    </>
  );
}
