import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { DeviceFrame } from "@/components/DeviceFrame";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Vorboss Locations App Prototype",
  description: "Vorboss Locations App Prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", poppins.variable)}
    >
      <body className="h-dvh flex items-center justify-center overflow-hidden bg-neutral-100 text-sm">
        <DeviceFrame>{children}</DeviceFrame>
      </body>
    </html>
  );
}
