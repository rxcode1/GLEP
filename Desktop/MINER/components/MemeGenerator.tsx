"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function MemeGenerator() {
  const [caption, setCaption] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (caption.trim()) {
      setGenerated(true);
    }
  };

  const handleShare = async (platform: string) => {
    const text = `Don't Stop Now. ${caption} - The Diamonds Are Closer Than You Think.`;
    const url = window.location.href;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(`${text} ${url}`);
        alert("Link copied to clipboard!");
        break;
    }
  };

  const downloadMeme = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#2f261f");
    gradient.addColorStop(1, "#1a1512");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw meme visual
    ctx.fillStyle = "#5c4a32";
    ctx.fillRect(100, 200, 600, 300);

    // Miner
    ctx.fillStyle = "#7a6340";
    ctx.beginPath();
    ctx.arc(400, 450, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(385, 450, 30, 50);

    // Pickaxe
    ctx.strokeStyle = "#8B6F47";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(500, 420);
    ctx.lineTo(500, 480);
    ctx.stroke();

    // Diamonds
    ctx.font = "40px Arial";
    ctx.fillText("💎", 150, 250);
    ctx.fillText("💎", 650, 280);
    ctx.fillText("💎", 200, 300);

    // Caption
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 32px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Don't Stop Now.", canvas.width / 2, 100);
    ctx.fillStyle = "#ffffff";
    ctx.font = "28px Arial";
    const words = caption.split(" ");
    let line = "";
    let y = 150;
    for (let word of words) {
      const testLine = line + word + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 700 && line) {
        ctx.fillText(line, canvas.width / 2, y);
        line = word + " ";
        y += 35;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "meme-miner.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <section className="relative py-32 bg-gradient-to-b from-dirt-800 to-dirt-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gold-400 mb-4 text-shadow-lg">
            Create Your Own Meme
          </h2>
          <p className="text-xl text-gray-300 text-shadow">
            Add your caption and share your motivation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-dirt-800/50 backdrop-blur-sm border-2 border-dirt-600 rounded-lg p-8"
        >
          {/* Meme Preview */}
          <div className="relative mb-6 h-64 bg-gradient-to-b from-dirt-700 to-dirt-600 rounded-lg overflow-hidden">
            {/* Miner and pickaxe */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="w-16 h-16 bg-dirt-500 rounded-full mb-2"></div>
              <div className="w-12 h-20 bg-dirt-400 rounded-t-full mx-auto"></div>
            </div>
            <div className="absolute bottom-8 right-1/3 w-2 h-12 bg-dirt-600 rotate-45"></div>
            <div className="absolute bottom-12 right-1/3 w-8 h-2 bg-gray-400 rotate-45"></div>

            {/* Diamonds */}
            <div className="absolute top-4 left-1/4 text-3xl opacity-60">💎</div>
            <div className="absolute top-8 right-1/4 text-2xl opacity-40">💎</div>

            {/* Caption overlay */}
            <div className="absolute top-4 left-0 right-0 text-center px-4">
              <p className="text-lg font-bold text-gold-400 mb-2">Don't Stop Now.</p>
              {caption && (
                <p className="text-base text-white font-semibold">{caption}</p>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">
              Your Caption
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
                setGenerated(false);
              }}
              placeholder="e.g., One more swing..."
              className="w-full px-4 py-3 bg-dirt-700 border-2 border-dirt-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerate}
              disabled={!caption.trim()}
              className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-dirt-900 font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Generate Meme
            </motion.button>

            {generated && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadMeme}
                  className="px-6 py-3 bg-diamond-600 hover:bg-diamond-500 text-white font-bold rounded-lg transition-colors"
                >
                  Download
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare("twitter")}
                  className="px-6 py-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold rounded-lg transition-colors"
                >
                  Share on Twitter
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare("facebook")}
                  className="px-6 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold rounded-lg transition-colors"
                >
                  Share on Facebook
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare("copy")}
                  className="px-6 py-3 bg-dirt-700 hover:bg-dirt-600 text-white font-bold rounded-lg transition-colors"
                >
                  Copy Link
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

