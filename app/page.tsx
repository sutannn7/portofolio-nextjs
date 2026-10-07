"use client";
import HomeSection from "@/components/sections/HomeSection";
import { usePageTransition } from "@/components/TransitionProvider";

export default function Page() {
  const { navigate } = usePageTransition();

  return (
    <HomeSection
      setActiveSection={(id) => navigate(id === "home" ? "/" : `/${id}`)}
    />
  );
}
