"use client";

import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import Emoji from "@/components/Emoji";

//import Kuroshiro from "kuroshiro";
import Kuromoji from "kuromoji";

import "react-toastify/ReactToastify.min.css";

export default function Home() {
  const tokenizerRef =
    useRef<Kuromoji.Tokenizer<Kuromoji.IpadicFeatures> | null>(null);

  function initKuromoji(): Promise<
    Kuromoji.Tokenizer<Kuromoji.IpadicFeatures>
  > {
    return new Promise((resolve, reject) => {
      Kuromoji.builder({ dicPath: `dict/` }).build((error, tokenizer) => {
        if (error) reject(error);
        else resolve(tokenizer);
      });
    });
  }

  const handleClick = () => {
    if (tokenizerRef.current) {
      alert(
        JSON.stringify(tokenizerRef.current.tokenize(prompt("Input: ") ?? ""))
      );
    } else {
      toast
        .promise(initKuromoji, {
          pending: "Building dictionaries...",
          success: "Success",
          error: {
            render({ data }) {
              return `Build failed: ${data}`;
            },
          },
        })
        .then((analyzer) => {
          tokenizerRef.current = analyzer;

          alert(JSON.stringify(analyzer.tokenize(prompt("Input: ") ?? "")));
        })
        .catch(() => null);
    }
  };

  return (
    <>
      <button onClick={handleClick}>Click</button>
      <Emoji emoji="👋" />
      <ToastContainer position="bottom-right" />
    </>
  );
}
