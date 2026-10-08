"use client";
import { usePathname } from "next/navigation";
import IntroSplash from "./IntroSplash";
import CursorSpotlight from "./CursorSpotlight";
import AnimatedBackground from "./AnimatedBackground";
import ScrollProgress from "./ScrollProgress";
import BadgeLanyard from "./BadgeLanyard";
import Navbar from "./Navbar";

export default function Shell() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <>
      <IntroSplash />
      <AnimatedBackground />
      <ScrollProgress />
      <CursorSpotlight />
      {isHome && (
        <div className="hidden xl:block">
          <BadgeLanyard />
        </div>
      )}
      <Navbar />
    </>
  );
}