"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dirt-900/80 backdrop-blur-sm border-b border-dirt-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-end items-center gap-4">
        {/* Community Button */}
        <motion.a
          href="https://x.com/i/communities/1994499479601647853"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-dirt-700 hover:bg-dirt-600 text-gray-200 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
        >
          <span>Community</span>
        </motion.a>

        {/* X (Twitter) Logo */}
        <motion.a
          href="https://x.com/TheMinersol"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="text-2xl"
          aria-label="Follow on X"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-gray-200 hover:text-white transition-colors"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </motion.a>
      </div>
    </header>
  );
}

