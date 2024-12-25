"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Page4() {
  const [phase, setPhase] = useState(0);
  const [coverBoxes, setCoverBoxes] = useState(Array(12).fill(true));
  const [showDrawCard, setShowDrawCard] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showFinalReveal, setShowFinalReveal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 3000),
      setTimeout(() => setPhase(2), 6000),
      setTimeout(() => {
        setPhase(3);
        setShowDrawCard(true);
        setShowImage(true);
      }, 9000),
    ];
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const handleCardClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    const remainingBoxes = coverBoxes.filter((box) => box).length;
    if (remainingBoxes > 0) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * coverBoxes.length);
      } while (!coverBoxes[randomIndex]);

      const newBoxes = [...coverBoxes];
      newBoxes[randomIndex] = false;
      setCoverBoxes(newBoxes);

      if (remainingBoxes === 1) {
        setTimeout(() => setShowFinalReveal(true), 500);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 gap-8 text-white">
      <audio ref={audioRef} src="/song/yay.mp3" />

      {phase < 3 && (
        <div
          className={`transition-opacity duration-1000 ${
            phase === 2 ? "opacity-0" : "opacity-100"
          }`}
        >
          {phase === 0 && (
            <h1 className="text-4xl font-bold text-center">
              i made this in 2 hours, so yeah it sucks
            </h1>
          )}
          {phase === 1 && (
            <h1 className="text-4xl font-bold text-center">
              i guess you know what the game is
            </h1>
          )}
        </div>
      )}

      {showFinalReveal ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/images/alec.png"
              alt="Alec"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <h1 className="text-8xl font-bold text-center text-white z-10 animate-bounce">
            It&apos;s ALEC!
          </h1>
        </div>
      ) : (
        showImage && (
          <div className="relative w-full h-96 mb-16">
            <div className="absolute inset-0">
              <Image
                src="/images/alec.png"
                alt="Alec"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-0">
              {coverBoxes.map((isVisible, i) => (
                <div
                  key={i}
                  className={`bg-pink-500 transition-opacity duration-500 ${
                    isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                />
              ))}
            </div>

            {showDrawCard && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-24 h-32"
                style={{ top: "105%" }}
              >
                <button
                  onClick={handleCardClick}
                  className="w-full h-full transition-transform hover:scale-105"
                >
                  <Image
                    src="/uno.jpg"
                    alt="Draw 4 card"
                    fill
                    sizes="96px"
                    style={{ borderRadius: "18px" }} // This is the key addition
                    className={`object-contain transition-opacity duration-500 ${
                      coverBoxes.every((box) => !box)
                        ? "opacity-0"
                        : "opacity-100"
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
