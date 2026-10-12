"use client";

import { usePathname } from "next/navigation";
import Shell from "@/components/Shell";

export default function SiteChrome() {
  const pathname = usePathname();
  const isGamePage = pathname === "/game";

  if (isGamePage) {
    return null;
  }

  return <Shell />;
}
