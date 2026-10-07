"use client";
import IntroSplash from "./IntroSplash";
import CursorSpotlight from "./CursorSpotlight";
import AnimatedBackground from "./AnimatedBackground";
import ScrollProgress from "./ScrollProgress";
import BadgeLanyard from "./BadgeLanyard";
import Navbar from "./Navbar";

export default function Shell() {
  return (
    <>
      <IntroSplash />
      <AnimatedBackground />
      <ScrollProgress />
      <CursorSpotlight />
      <div className="hidden xl:block">
        <BadgeLanyard />
      </div>
      <Navbar />
    </>
  );
}