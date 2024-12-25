"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ButtonState {
  button1: boolean;
  button2: boolean;
  button3: boolean;
  button4: boolean;
}

export default function Page3() {
  const router = useRouter();
  const [showQuestion, setShowQuestion] = useState(false);
  const [clickedButtons, setClickedButtons] = useState<ButtonState>({
    button1: false,
    button2: false,
    button3: false,
    button4: false,
  });

  const wrongAnswers = [
    "PS5 PRO max deluxe edition",
    "A Lidl shopping bag in Aldi",
    "Raclette with too many toppings",
    "Slay together, slay together, slay together",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuestion(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (Object.values(clickedButtons).every((value) => value)) {
      const timer = setTimeout(() => {
        router.push("/page4");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [clickedButtons, router]);

  const handleClick = (buttonKey: keyof ButtonState) => {
    setClickedButtons((prev) => ({
      ...prev,
      [buttonKey]: true,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-8 text-white">
      {!showQuestion ? (
        <div className="text-3xl font-bold animate-pulse">
          So what IS the present?
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center">
            What&apos;s red, yellow, blue, and green and causes{" "}
            <span className="text-5xl text-red-600 font-extrabold italic transform -rotate-3 inline-block animate-pulse">
              DESTRUCTION
            </span>
            ?
          </h1>

          <div className="grid grid-cols-1 gap-4 w-full max-w-md">
            {(["button1", "button2", "button3", "button4"] as const).map(
              (buttonKey, index) => (
                <button
                  key={buttonKey}
                  onClick={() => handleClick(buttonKey)}
                  disabled={clickedButtons[buttonKey]}
                  className={`
                   p-4 rounded-lg text-lg font-semibold transition-all duration-300
                   border-2 border-white shadow-lg
                   ${
                     clickedButtons[buttonKey]
                       ? "bg-red-600 scale-95 transform rotate-12"
                       : "bg-pink-400 hover:bg-pink-500"
                   }
                 `}
                >
                  {clickedButtons[buttonKey] ? (
                    <span className="text-4xl">❌</span>
                  ) : (
                    wrongAnswers[index]
                  )}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
