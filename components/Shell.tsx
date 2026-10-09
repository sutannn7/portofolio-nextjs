"use client";
import { usePathname } from "next/navigation";
import ScrollProgress from "./ScrollProgress";
import BadgeLanyard from "./BadgeLanyard";
import Navbar from "./Navbar";

export default function Shell() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <>
      <ScrollProgress />

      {isHome && (
        <div className="hidden xl:block">
          <BadgeLanyard />
        </div>
      )}
      <Navbar />
    </>
  );
}