import { useState } from "react";
import { FaTwitter, FaFacebook } from "react-icons/fa";

export default function ShareButton({ completedCycles, points }) {
  const generateMessage = () => {
    return `ポモドーロタイマーで ${completedCycles} サイクル達成！🎯 獲得ポイント: ${points} 💯 #ポモドーロ #集中`;
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(generateMessage())}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://your-app-url.com&quote=${encodeURIComponent(generateMessage())}`;

  return (
    <div className="flex space-x-4 mt-4">
      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600"
      >
        <FaTwitter /> <span>Xでシェア</span>
      </a>
    </div>
  );
}