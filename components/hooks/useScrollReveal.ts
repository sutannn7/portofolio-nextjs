"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface UseScrollRevealProps {
  triggerOnce?: boolean;
}

export function useScrollReveal(options: UseScrollRevealProps = {}) {
  const { triggerOnce = true } = options;
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: 0.3, // trigger saat 30% visible
  });

  return { ref, isInView };
}
