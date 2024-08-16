"use client";

import { useEffect, useRef } from "react";

import "@/styles/loading.css";

export default function Loading() {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const screen = document.querySelector(".loader-screen")!;
    const load = () => screen!.remove();

    if (screen) {
      if (document.readyState === "complete") load();
      else window.addEventListener("load", load);
    }

    return () => window.removeEventListener("load", load);
  }, []);

  return (
    <div
      className="loader-screen"
      style={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--discord-color)",
        width: "100%",
        height: "100%",
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="dots" style={{ animation: "load 5s infinite" }}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p
        className="loading-status"
        style={{
          fontFamily: "SpotifyMix, system-ui",
          fontSize: "20px",
          marginTop: "20px",
        }}
      >
        Loading
      </p>
    </div>
  );
}
