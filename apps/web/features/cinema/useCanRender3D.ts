"use client";
import { useEffect, useState } from "react";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Whether to mount the WebGL lobby. Defaults to false (static) until the
 * client passes every check, so SSR and low-end devices never load three.js.
 */
export function useCanRender3D(): boolean {
  const [can, setCan] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!hasWebGL()) return;

    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    if (typeof mem === "number" && mem < 4) return;

    const cores = navigator.hardwareConcurrency;
    if (typeof cores === "number" && cores < 4) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse && window.innerWidth < 768) return;

    setCan(true);
  }, []);
  return can;
}
