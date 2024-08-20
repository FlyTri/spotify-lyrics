"use client";

import { useEffect } from "react";

export default function ButtonAnimation() {
  function init() {
    document.addEventListener("click", (event) => {
      const button = (event.target as HTMLElement)?.closest(
        '[class*="button"], button'
      );

      if (button) button.classList.add("clicked");
    });

    document.addEventListener("animationend", (event) => {
      const button = (event.target as HTMLElement)?.closest(
        '[class*="button"], button'
      );

      if (button) button.classList.remove("clicked");
    });
  }

  useEffect(() => {
    if (document.readyState === "complete") init();
    else window.addEventListener("load", init);
  }, []);

  return null;
}
