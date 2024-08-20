"use client";

import axios from "axios";
import Image from "next/image";
import "./page.css";
import { useEffect, useRef } from "react";
import Emoji from "@/components/Emoji";

export default function Test() {
  const idRef = useRef<HTMLInputElement | null>(null);
  const secretRef = useRef<HTMLInputElement | null>(null);
  const loginBtnRef = useRef<HTMLButtonElement | null>(null);
  const controller = useRef<AbortController | null>(null);

  useEffect(() => {
    const savedID = localStorage.getItem("client_id") ?? "";
    const savedSecret = localStorage.getItem("client_secret") ?? "";

    const check = (clientId: string, clientSecret: string) => {
      if (!clientId || !clientSecret) return false;

      controller.current = new AbortController();
      return axios
        .post(
          "https://accounts.spotify.com/api/token?grant_type=client_credentials",
          {},
          {
            headers: {
              Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
              "Content-Type": "application/x-www-form-urlencoded",
            },
            signal: controller.current.signal,
          }
        )
        .then((response) => response.status === 200)
        .catch(() => false);
    };

    const checkInput = async () => {
      if (controller.current) controller.current.abort();

      const id = idRef.current?.value ?? "";
      const secret = secretRef.current?.value ?? "";
      const valid = await check(id, secret);

      if (loginBtnRef.current) loginBtnRef.current.disabled = !valid;
    };

    const onLoginClick = (event: Event) => {
      event.preventDefault();
      localStorage.removeItem("token");

      const id = idRef.current?.value ?? "";
      const secret = secretRef.current?.value ?? "";

      localStorage.setItem("client_id", id);
      localStorage.setItem("client_secret", secret);

      const options = new URLSearchParams({
        response_type: "code",
        client_id: id,
        redirect_uri: `${location.origin}/callback`,
        scope: "user-read-currently-playing",
        show_dialog: "true",
      });

      const width = 500;
      const height = 700;
      const left = (screen.width - width) / 2;
      const top = (screen.height - height) / 2;
      const popup = window.open(
        `https://accounts.spotify.com/authorize?${options}`,
        "Đăng nhập Spotify",
        `width=${width},height=${height},top=${top},left=${left}`
      )!;

      const interval = setInterval(() => {
        if (popup.closed) {
          clearInterval(interval);
          if (localStorage.getItem("token")) location.href = "/";
        }
      }, 250);
    };

    const currentIdRef = idRef.current;
    const currentSecretRef = secretRef.current;
    const currentLoginBtnRef = loginBtnRef.current;

    if (currentIdRef && currentSecretRef) {
      currentIdRef.value = savedID;
      currentSecretRef.value = savedSecret;

      currentIdRef.addEventListener("input", checkInput);
      currentSecretRef.addEventListener("input", checkInput);
      currentLoginBtnRef?.addEventListener("click", onLoginClick);

      checkInput();
    }

    return () => {
      currentIdRef?.removeEventListener("input", checkInput);
      currentSecretRef?.removeEventListener("input", checkInput);
      currentLoginBtnRef?.removeEventListener("click", onLoginClick);

      if (controller.current) controller.current.abort();
    };
  }, []);

  return (
    <div className="login-container">
      <Image src="icon.svg" width={120} height={120} alt="Logo" />
      <h2>Đăng nhập</h2>
      <p>
        Chào mừng trở lại <Emoji emoji="😊" />
      </p>
      <form>
        <div className="field">
          <label htmlFor="id">Client ID</label>
          <input id="id" name="id" ref={idRef} autoComplete="off" required />
        </div>
        <div className="field">
          <label htmlFor="secret">Client Secret</label>
          <input
            id="secret"
            type="password"
            name="secret"
            ref={secretRef}
            required
          />
        </div>
        <div className="help">
          <a
            href="https://github.com/FlyTri/spotly?tab=readme-ov-file#client-id-client-secret"
            target="_blank"
          >
            Cần trợ giúp?
          </a>
        </div>
        <button
          type="submit"
          className="login-button"
          ref={loginBtnRef}
          onClick={({ target }) =>
            (target as HTMLButtonElement).classList.add("clicked")
          }
          disabled
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
