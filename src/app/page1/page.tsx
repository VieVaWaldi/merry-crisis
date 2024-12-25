"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const snarkyResponses = [
  "No, but why would I tell you?",
  "It's no fun if you're just guessing",
  "Nice try, but nope!",
  "Getting warmer... just kidding",
  "Maybe... actually no",
  "Keep dreaming!",
];

export default function Page1() {
  const [clickCount, setClickCount] = useState(0);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const friends = [
    { name: "Khuri", image: "/images/khuri.png" },
    { name: "Razy", image: "/images/razy.png" },
    { name: "Dari", image: "/images/dari.png" },
    { name: "Alec", image: "/images/alec.png" },
    { name: "Julia", image: "/images/julia.png" },
    { name: "Hubi", image: "/images/hubi.png" },
  ];

  const handleImageClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setMessage(
      snarkyResponses[Math.floor(Math.random() * snarkyResponses.length)]
    );

    if (newCount >= 5) {
      setTimeout(() => {
        router.push("/page2");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-pink-100">
      <h1 className="text-4xl text-center font-bold text-pink-800 pt-8 mb-12">
        Who is the wichtel?
      </h1>

      <div className="flex-grow flex flex-col items-center gap-8 overflow-y-auto p-4">
        {friends.map((friend, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              onClick={handleImageClick}
              className="w-64 h-64 rounded-full overflow-hidden border-8 border-pink-200 hover:border-pink-300 transition-all duration-300 transform hover:scale-105 mb-4"
            >
              <Image
                src={friend.image}
                alt={friend.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </button>
            <p className="text-2xl text-pink-700 font-semibold">
              {friend.name}
            </p>
          </div>
        ))}
      </div>

      <div className="text-2xl text-white text-center p-8 bg-pink-600 fixed bottom-0 w-full">
        {message}
      </div>
    </div>
  );
}
