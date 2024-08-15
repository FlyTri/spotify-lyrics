"use client";

import { useEffect } from "react";

import "@/styles/loading.css";

export default function Loading() {
  useEffect(() => document.querySelector(".loader-screen")?.remove(), []);

  return (
    <>
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
      </div>
    </>
  );
}
