"use client";

import type React from "react";

interface props {
  theme: boolean;
}
const Footer: React.FC<props> = ({ theme }) => {
  return (
    <footer
      className={`flex flex-col items-center justify-center w-full h-16 mt-4 rounded-xl border border-gray-600 ${
        theme ? "text-white" : "text-black"
      }`}
    >
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-sm">Made with 💚 by </p>
        <a
          href="https://3kh0.net"
          className={`ml-1 font-semibold underline ${
            theme ? "text-white" : "text-black"
          }`}
        >
          3kh0
        </a>
        .
      </div>
    </footer>
  );
};
export default Footer;
