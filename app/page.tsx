"use client";

import { useRef } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";

import Emoji from "@/components/Emoji";

import Kuroshiro from "kuroshiro";
import Analyzer from "@/utils/analyzer";

import "./page.css";
import "react-toastify/ReactToastify.min.css";

export default function Home() {
  const kuroshiroRef = useRef<Kuroshiro | null>(null);

  async function initKuroshiro() {
    const kuroshiro = new Kuroshiro();

    await kuroshiro.init(new Analyzer()).then(() => {
      kuroshiroRef.current = kuroshiro;
    });
  }

  const handleClick = async () => {
    if (kuroshiroRef.current) {
      alert(
        await kuroshiroRef.current.convert(prompt("Input: ") ?? "", {
          to: "romaji",
          mode: "spaced",
        })
      );
    } else {
      toast
        .promise(initKuroshiro, {
          pending: "Building dictionaries...",
          success: "Success",
          error: {
            render({ data }) {
              return `Build failed: ${data}`;
            },
          },
        })
        .then(handleClick)
        .catch(() => null);
    }
  };

  return (
    <>
      <div className="sticky-header">
        <div className="title">Tên bài hát</div>
        <div className="artists">Tên nghệ sĩ</div>
      </div>

      <div className="content-container">
        <div className="content">
          <p className="lyrics highlight">
            <Emoji emoji="😍"></Emoji>Lời bài hát sẽ xuất hiện ở đây
          </p>
        </div>
      </div>

      <div className="popup-msg"></div>

      <div className="bottom-container">
        <div className="bottom">
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
          <button className="control-button fullscreen">
            <Image
              className="fullscreen-icon"
              src="icons/fullscreen.svg"
              width={16}
              height={16}
              alt=""
            />
            <Image
              className="compress-icon"
              src="icons/compress.svg"
              width={16}
              height={16}
              alt=""
              hidden
            />
          </button>
          <button className="control-button convert disabled">
            <Image src="icons/hiragana.svg" width={16} height={16} alt="" />
          </button>
          <button className="control-button c-down">
            <Image src="icons/down.svg" width={16} height={16} alt="" />
          </button>
          <div className="count-container">
            <span className="count">-</span>
          </div>
          <button className="control-button c-up">
            <Image src="icons/up.svg" width={16} height={16} alt="" />
          </button>
          <button className="control-button download">
            <Image src="icons/download.svg" width={16} height={16} alt="" />
          </button>
          <button className="control-button logout">
            <Image src="icons/logout.svg" width={16} height={16} alt="" />
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
    </>
  );
}
