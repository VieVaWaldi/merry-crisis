"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page2() {
  const [phase, setPhase] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const router = useRouter();

  const texts = [
    "That didn't help anyone",
    "how about u get the present",
    "Its in my room, behind the door!",
    "Did u get it?",
    "Did you really get it?",
  ];

  useEffect(() => {
    if (phase < 3) {
      const timer = setTimeout(() => {
        setPhase((p) => p + 1);
        if (phase === 2) setShowButton(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleButton = () => {
    setButtonClicked(true);

    setTimeout(() => {
      setButtonClicked(false);
      if (phase === 3) {
        setPhase(4);
      } else if (phase === 4) {
        router.push("/page3");
      }
    }, 500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 gap-8">
      <h1 className="text-4xl text-center text-pink-800">{texts[phase]}</h1>
      {(showButton || phase >= 3) && (
        <button
          onClick={handleButton}
          className={`px-8 py-4 bg-pink-400 text-white rounded-full text-xl 
            hover:bg-pink-500 hover:shadow-2xl hover:scale-110
            transition-all duration-500 transform motion-safe:hover:-translate-y-1
            ${
              buttonClicked
                ? "scale-150 bg-pink-600 animate-ping shadow-xl shadow-pink-500/50 animate-pulse"
                : "scale-100 animate-bounce"
            }`}
        >
          {phase === 3 ? "Yes" : phase === 4 ? "Yes really!" : "Got it"}
        </button>
      )}
    </div>
  );
}
