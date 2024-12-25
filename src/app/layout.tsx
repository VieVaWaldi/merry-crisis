"use client";

// import type { Metadata } from "next";
import { Rowdies } from "next/font/google"; // Fun, chunky font
import AnimatedLayout from "@/components/AnimatedLayout";
import "./globals.css";

const font = Rowdies({ subsets: ["latin"], weight: "400" });

// export const metadata: Metadata = {
//   title: "Merry Chrism",
//   description: "Fuchsbau Special",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {" "}
        <AnimatedLayout>{children}</AnimatedLayout>
      </body>
    </html>
  );
}
