"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type Paths = "/" | "/page1" | "/page2" | "/page3" | "/page4";

const backgrounds: Record<Paths, string> = {
  "/": "bg-pink-100",
  "/page1": "bg-pink-200",
  "/page2": "bg-pink-300",
  "/page3": "bg-pink-400",
  "/page4": "bg-pink-500",
};

const pageVariants = {
  initial: {
    scale: 0.8,
    opacity: 0,
    rotate: -5,
  },
  animate: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.4,
    },
  },
  exit: {
    scale: 1.2,
    opacity: 0,
    rotate: 5,
    transition: {
      duration: 0.3,
    },
  },
};

export default function AnimatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={backgrounds[pathname as Paths] || "bg-pink-100"}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
