"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { Download, Copy } from "lucide-react";
import html2canvas from "html2canvas-pro";
import Header from "./components/Header";
import Footer from "./components/Footer";

const makeList = (count: number) => {
  return Array.from({ length: count }, (_, i) => `/img/${i + 1}.png`);
};

const imgs = makeList(8); // dumb way of doing it

export default function Home() {
  const [situation, setSituation] = useState("situation");
  const [views, setviews] = useState("100K");
  const [upload, setupload] = useState("30 minutes");
  const [duration, setDuration] = useState("4:20");
  const [theme, settheme] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const [imgsrc, setimgsrc] = useState(() => {
    const randomIndex = Math.floor(Math.random() * imgs.length);
    return imgs[randomIndex];
  });

  const cycle = () => {
    const currentIndex = imgs.indexOf(imgsrc);
    const nextIndex = (currentIndex + 1) % imgs.length;
    setimgsrc(imgs[nextIndex]);
  };

  const fileIn = useRef<HTMLInputElement>(null);

  const previewRef = useRef<HTMLDivElement>(null);

  const imgOverride = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setimgsrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const copy = async () => {
    if (!previewRef.current) return;

    setCopySuccess(true);
    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: theme ? "#0f0f0f" : "#f9f9f9",
    });

    canvas.toBlob((blob) => {
      if (blob) {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(
          () => {
            console.log("Image copied to clipboard");
            setTimeout(() => setCopySuccess(false), 2000);
          },
          (err) => {
            console.error("Failed to copy image: ", err);
            setCopySuccess(false);
          }
        );
      }
    }, "image/png");
  };

  const download = async () => {
    if (!previewRef.current) return;

    setDownloadSuccess(true);
    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: theme ? "#0f0f0f" : "#f9f9f9",
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `the-${situation}-situation.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  return (
    <main
      className={`min-h-screen p-8 transition-colors duration-300 ${
        theme ? "bg-[#0f0f0f] text-white" : "bg-[#f9f9f9] text-[#0f0f0f]"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <Header theme={theme} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`rounded-lg overflow-hidden shadow-md ${
              theme ? "bg-[#0f0f0f]" : "bg-white"
            }`}
          >
            <div ref={previewRef} className="p-4">
              <div className="relative w-full">
                <div className="relative w-full rounded-xl overflow-hidden ">
                  {imgsrc && (
                    <Image
                      src={imgsrc || "/placeholder.svg"}
                      alt="Video thumbnail"
                      width={640}
                      height={360}
                      className="w-full object-cover aspect-video cursor-pointer"
                      onClick={cycle}
                    />
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-1.5 py-0.5 rounded text-sm font-medium">
                    {duration}
                  </div>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-medium mb-1 line-clamp-2">
                      The {situation} situation is crazy
                    </h2>
                    <div
                      className={`text-sm ${
                        theme ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <span>
                        {views} {views === "1" ? "view" : "views"}
                      </span>
                      <span className="mx-1">•</span>
                      <span>{upload} ago</span>
                    </div>
                  </div>
                  <button
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="More options"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      focusable="false"
                      aria-hidden="true"
                      className="w-6 h-6 fill-current text-gray-600 dark:text-gray-400"
                    >
                      <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`rounded-lg p-6 shadow-md ${
              theme ? "bg-[#1a1a1a]" : "bg-white"
            }`}
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="situation" className="block font-medium mb-2">
                  Situation:
                </label>
                <div className="flex items-center">
                  <span
                    className={`px-2 ${
                      theme ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    The
                  </span>
                  <input
                    type="text"
                    id="situation"
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    className={`flex-1 px-3 py-2 rounded-md border ${
                      theme
                        ? "bg-[#2a2a2a] border-gray-700 text-white"
                        : "bg-white border-gray-300 text-black"
                    }`}
                    placeholder="situation"
                  />
                  <span
                    className={`px-2 ${
                      theme ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    situation is crazy
                  </span>
                </div>
              </div>
              <div>
                <label htmlFor="views" className="block font-medium mb-2">
                  View Count:
                </label>
                <input
                  type="text"
                  id="views"
                  value={views}
                  onChange={(e) => setviews(e.target.value)}
                  className={`w-full px-3 py-2 rounded-md border ${
                    theme
                      ? "bg-[#2a2a2a] border-gray-700 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                  placeholder="621K"
                />
              </div>
              <div>
                <label htmlFor="upload" className="block font-medium mb-2">
                  Upload Time:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="uploadNumber"
                    value={upload.split(" ")[0]}
                    onChange={(e) => {
                      const [, unit] = upload.split(" ");
                      setupload(`${e.target.value} ${unit}`);
                    }}
                    className={`w-20 px-3 py-2 rounded-md border ${
                      theme
                        ? "bg-[#2a2a2a] border-gray-700 text-white"
                        : "bg-white border-gray-300 text-black"
                    }`}
                    min="1"
                  />
                  <select
                    id="uploadUnit"
                    value={upload.split(" ")[1]}
                    onChange={(e) => {
                      const [number] = upload.split(" ");
                      setupload(`${number} ${e.target.value}`);
                    }}
                    className={`px-3 py-2 rounded-md border ${
                      theme
                        ? "bg-[#2a2a2a] border-gray-700 text-white"
                        : "bg-white border-gray-300 text-black"
                    }`}
                  >
                    <option value="seconds">seconds ago</option>
                    <option value="minutes">minutes ago</option>
                    <option value="hours">hours ago</option>
                    <option value="days">days ago</option>
                    <option value="weeks">weeks ago</option>
                    <option value="months">months ago</option>
                    <option value="years">years ago</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="duration" className="block font-medium mb-2">
                  Duration:
                </label>
                <input
                  type="text"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className={`w-full px-3 py-2 rounded-md border ${
                    theme
                      ? "bg-[#2a2a2a] border-gray-700 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                  placeholder="9:45"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Theme:</label>
                <div
                  className={`flex rounded-md overflow-hidden border ${
                    theme ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => settheme(true)}
                    className={`flex-1 py-2 px-4 ${
                      theme
                        ? "bg-red-600 text-white"
                        : "bg-transparent text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => settheme(false)}
                    className={`flex-1 py-2 px-4 ${
                      !theme
                        ? "bg-red-600 text-white"
                        : "bg-transparent text-white hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    Light
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="imgOverride" className="block font-medium mb-2">
                  Override Thumbnail:{" "}
                  <span className="text-sm text-gray-500">(optional)</span>
                </label>
                <input
                  type="file"
                  id="imgOverride"
                  ref={fileIn}
                  onChange={imgOverride}
                  accept="image/*"
                  className={`w-full px-3 py-2 rounded-md border ${
                    theme
                      ? "bg-[#2a2a2a] border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded file:px-2 file:py-1 file:mr-2"
                      : "bg-white border-gray-300 text-black file:bg-gray-200 file:text-gray-700 file:border-0 file:rounded file:px-2 file:py-1 file:mr-2"
                  }`}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copy}
                  className={`w-full py-3 px-4 font-medium rounded-md flex items-center justify-center gap-2 transition-colors ${
                    copySuccess
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-600 hover:bg-gray-700"
                  } text-white`}
                >
                  {copySuccess ? (
                    "Copied!"
                  ) : (
                    <>
                      <Copy size={18} />
                      Copy
                    </>
                  )}
                </button>
                <button
                  onClick={download}
                  className={`w-full py-3 px-4 font-medium rounded-md flex items-center justify-center gap-2 transition-colors ${
                    downloadSuccess
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white`}
                >
                  {downloadSuccess ? (
                    "Downloaded!"
                  ) : (
                    <>
                      <Download size={18} />
                      Download
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer theme={theme} />
    </main>
  );
}
