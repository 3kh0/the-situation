"use client";

import type React from "react";
import { useState, useEffect } from "react";

interface props {
  theme: boolean;
}

const titles = [
  "GTA 6",
  "ChatGPT",
  "Minecraft",
  "Minecraft Movie",
  "Redditor",
  "Assassin Creed",
  "Genshin Impact",
  "Fortnite",
  "Chess.com",
  "Twitch",
  "Rock",
  "Tesla Stock",
  "Drunk Driver",
  "SSSniperwolf",
  "Nikocado Avocado",
  "Thanksgiving",
  "TikTok Time Traveler",
  "Dream",
  "Ava Kris Tyson",
  "Drake vs Kendrick Lamar",
  "Titanic Submarine",
  "New Alien Information",
  "Pokimane Editor",
  "Statue",
  "Dr Disrespect",
  "Exploding Toilet",
  "YandereDev",
  "Total Eclipse Conspiracy",
  "Tinder",
  "Rizz Academy",
  "Lil Tay",
  "Roblox IKEA",
  "Breakdancing Dad Drama",
  "Game Awards",
  "IShowSpeed",
  "MrBeast",
  "Bomb Threat Prank",
  "Crazy Sports",
  "Tiger King",
  "Kanye West",
  "Elon Musk",
  "Airplane Freakout",
  "Honey",
];

const Header: React.FC<props> = ({ theme }) => {
  const [current, setcurrent] = useState("penguinz0");
  const [display, setdisplay] = useState("penguinz0");
  const [deleting, setdeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (deleting) {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setdisplay(display.slice(0, -1));
        }, 50);
      } else {
        setdeleting(false);
        setcurrent(titles[Math.floor(Math.random() * titles.length)]);
      }
    } else {
      if (display !== current) {
        timeout = setTimeout(() => {
          setdisplay(current.slice(0, display.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setdeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [display, current, deleting]);

  return (
    <div className="title-container text-center">
      <h1
        className={`title ${
          theme ? "text-white" : "text-[#0f0f0f]"
        } text-3xl font-bold mb-4`}
      >
        The {display}
        <span className="animate-pulse">|</span> situation is crazy
      </h1>
      <p
        className={`${theme ? "text-gray-600" : "text-gray-800"} text-sm mb-4`}
      >
        Yes these are real video titles
      </p>
    </div>
  );
};

export default Header;
