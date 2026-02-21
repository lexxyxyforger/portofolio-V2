"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}