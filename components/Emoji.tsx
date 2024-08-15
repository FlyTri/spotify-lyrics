import { Noto_Color_Emoji } from "next/font/google";

const NotoColorEmoji = Noto_Color_Emoji({ subsets: ["emoji"], weight: "400" });

export default function Emoji({ emoji }: { emoji: string }) {
  return <span className={NotoColorEmoji.className}>{emoji}</span>;
}
