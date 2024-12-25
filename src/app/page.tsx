"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState("");
  // const [isTimeReached, setIsTimeReached] = useState(false);
  const [showParty, setShowParty] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [textParty, setTextParty] = useState(false);
  const [audio] = useState(
    typeof Audio !== "undefined" ? new Audio("/song/yay.mp3") : null
  );

  useEffect(() => {
    const handleInteraction = () => setHasInteracted(true);
    document.addEventListener("click", handleInteraction);
    return () => document.removeEventListener("click", handleInteraction);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = new Date();
      targetTime.setHours(17, 40, 0, 0);
      // targetTime.setHours(20, 00, 0, 0);
      const now = new Date();
      const difference = targetTime.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("00:00:00");
        // setIsTimeReached(true);
        setTimeout(() => {
          setShowParty(true);
          if (hasInteracted && audio) {
            audio.play().catch(() => console.log("Audio playback failed"));
          }
          setTextParty(true);
          setTimeout(() => router.push("/page1"), 3000);
        }, 1000);
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [router, hasInteracted, audio]);

  const PartyPoppers = () => {
    const poppers = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));

    return (
      <div className="fixed inset-0 pointer-events-none">
        {poppers.map((popper, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{
              x: `${popper.x}vw`,
              y: "100vh",
              opacity: 0,
            }}
            animate={{
              y: `${popper.y}vh`,
              opacity: 1,
              rotate: [0, 360],
            }}
            transition={{
              duration: 1,
              delay: popper.delay,
              rotate: { duration: 2, repeat: Infinity },
            }}
          >
            🎉
          </motion.div>
        ))}
      </div>
    );
  };

  interface PartyTextProps {
    text: string;
    className: string;
  }

  const PartyText = ({ text, className }: PartyTextProps) => (
    <div className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 1 }}
          animate={textParty ? { opacity: 0 } : {}}
          transition={{ delay: i * 0.1 }}
        >
          {char}
        </motion.span>
      ))}
      {text.split("").map((_, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ left: `${(i / text.length) * 100}%` }}
          initial={{ opacity: 0 }}
          animate={textParty ? { opacity: 1 } : {}}
          transition={{ delay: i * 0.1 }}
        >
          🎉
        </motion.span>
      ))}
    </div>
  );

  return (
    <div className="page-container flex min-h-screen flex-col items-center justify-center p-8">
      <PartyText
        text="Merry Crisis"
        className="text-6xl mb-8 text-center relative"
      />
      <PartyText
        text={timeLeft}
        className="text-7xl font-mono mb-8 text-pink-500 relative"
      />
      {showParty && <PartyPoppers />}
    </div>
  );
}
