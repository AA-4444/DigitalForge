"use client";

import { useEffect, useRef, useState, ReactNode, isValidElement, cloneElement } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  cubicBezier,
} from "framer-motion";

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import AwardsButton from "@/components/AwardsButton";
import LoadingScreen from "@/components/LoadingScreen";

/* ---------- easing ---------- */
const easeOverlay = cubicBezier(0.83, 0, 0.17, 1);

/* ----------------------------- Overlay ----------------------------- */
function TransitionOverlay() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    (window as any).startTransition = () => {
      setActive(true);
      setTimeout(() => setActive(false), 900);
    };
  }, []);
  return active ? (
    <motion.div
      key="overlay"
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 0.45, ease: easeOverlay }}
      className="fixed inset-0 z-[9999] bg-black/95"
    />
  ) : null;
}

/* ----------------------------- mobile vh fix ----------------------------- */
function useMobileVhFix() {
  useEffect(() => {
    const set = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    set();
    window.addEventListener("resize", set);
    window.addEventListener("orientationchange", set);
    return () => {
      window.removeEventListener("resize", set);
      window.removeEventListener("orientationchange", set);
    };
  }, []);
}

/* ----------------------------- helpers ----------------------------- */
function buildClip(maskIn: string, percent: number) {
  const p = Math.max(0, Math.min(100, percent));
  const v = `${p}%`;
  if (maskIn.startsWith("inset(0 0") && maskIn.includes("% 0)")) return `inset(0 0 ${v} 0)`; // bottom
  if (maskIn.startsWith("inset(0 ") && maskIn.includes("% 0 0)")) return `inset(0 ${v} 0 0)`; // right
  if (maskIn.startsWith("inset(") && maskIn.includes(" 0 0 0)")) return `inset(${v} 0 0 0)`; // top
  return `inset(0 0 ${v} 0)`; // default bottom
}

function isiOSDevice() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const touchMac = /Macintosh/.test(ua) && typeof (window as any).ontouchend !== "undefined";
  return /iP(hone|od|ad)/.test(ua) || touchMac;
}

/* ----------------------------- Scene (repeatable reveal) ----------------------------- */
/** mask: "clip" | "fade" — для iOS герою ставим fade, остальным — clip */
function Scene({
  id,
  children,
  mask = "clip",
  maskIn = "inset(0 0 100% 0)",
  viewAmount = 0.25,
}: {
  id: string;
  children: ReactNode;
  mask?: "clip" | "fade";
  maskIn?: string;
  viewAmount?: number;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const touch = window.matchMedia("(pointer: coarse)");
    const update = () => setIsMobile(mq.matches || touch.matches);
    update();
    mq.addEventListener?.("change", update);
    touch.addEventListener?.("change", update);
    return () => {
      mq.removeEventListener?.("change", update);
      touch.removeEventListener?.("change", update);
    };
  }, []);

  // повторяемая: без once
  const inView = useInView(sectionRef, { amount: viewAmount });

  // прокрутка
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-3vh", "3vh"]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.98, 1, 1, 0.98]);

  // === Вариант A: clip-path reveal (всем, кроме iOS Hero)
  if (mask === "clip") {
    const REVEAL_START = 55;
    const clipTarget = useMotionValue<number>(REVEAL_START);
    const clipPct = useSpring(clipTarget, {
      stiffness: isMobile ? 160 : 220,
      damping: isMobile ? 24 : 26,
      mass: 0.9,
    });

    useEffect(() => {
      if (inView) {
        clipTarget.set(REVEAL_START);
        const id = requestAnimationFrame(() => clipTarget.set(0));
        return () => cancelAnimationFrame(id);
      } else {
        clipTarget.set(REVEAL_START);
      }
    }, [inView, clipTarget]);

    const clipPathMV = useTransform(clipPct, (p) => buildClip(maskIn, p as number));

    return (
      <section
        id={id}
        ref={sectionRef as any}
        className="relative overflow-hidden"
        style={{
          minHeight: "max(100svh, calc(var(--vh, 1vh) * 100))",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{ clipPath: clipPathMV, willChange: "clip-path, transform", transform: "translateZ(0)" }}
        >
          <motion.div
            className="w-full h-full"
            style={{ y, opacity: opacityParallax, willChange: "transform, opacity", transform: "translateZ(0)" }}
          >
            {children}
          </motion.div>
        </motion.div>
      </section>
    );
  }

  // === Вариант B: fade-only (для iOS Hero) — НИКАКИХ масок/clip-path/translateZ у родителя
  return (
    <section
      id={id}
      ref={sectionRef as any}
      className="relative overflow-hidden"
      style={{ minHeight: "max(100svh, calc(var(--vh, 1vh) * 100))" }}
    >
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0.999 }} // чуть <1 вне вью, чтобы повторно триггерить
        transition={{ duration: 0.5 }}
        // НЕТ willChange/translateZ тут — это важно для iOS CSS keyframes
      >
        <motion.div className="w-full h-full" style={{ y, opacity: opacityParallax }}>
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ----------------------------- Anchor Intercept ----------------------------- */
function useAnchorIntercept() {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")?.slice(1) || "";
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      (window as any).startTransition?.();
      setTimeout(() => {
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }, 300);
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);
}

/* ----------------------------- Page ----------------------------- */
export default function Index() {
  const [booted, setBooted] = useState(false);

  // блокируем скролл, пока лоадер виден
  useEffect(() => {
    if (!booted) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [booted]);

  // safety, если LoadingScreen не вызовет onDone
  useEffect(() => {
    if (!booted) {
      const safety = setTimeout(() => setBooted(true), 4000);
      return () => clearTimeout(safety);
    }
  }, [booted]);

  useMobileVhFix();
  useAnchorIntercept();

  if (!booted) {
    return (
      <div className="fixed inset-0 z-[10000] bg-background">
        <LoadingScreen {...({ onDone: () => setBooted(true) } as any)} />
      </div>
    );
  }

  const iOS = isiOSDevice();

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <TransitionOverlay />
      <Navigation />

      <motion.main
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        {/* 1. Hero — на iOS: fade, на остальном: clip */}
        <Scene
          id="home"
          mask={iOS ? "fade" : "clip"}
          maskIn="inset(0 0 100% 0)"
          viewAmount={0.25}
        >
          <HeroSection />
        </Scene>

        {/* 2. WhatWeDo — обычный clip сверху */}
        <Scene id="about" mask="clip" maskIn="inset(100% 0 0 0)" viewAmount={0.22}>
          <WhatWeDoSection />
        </Scene>

        {/* 3. Services — clip сверху */}
        <Scene id="services" mask="clip" maskIn="inset(100% 0 0 0)" viewAmount={0.22}>
          <ServicesSection />
        </Scene>

        {/* 4. Footer — clip снизу */}
        <Scene id="contact" mask="clip" maskIn="inset(0 100% 0 0)" viewAmount={0.25}>
          <Footer />
        </Scene>
      </motion.main>

      <AwardsButton />

      {/* Больше НЕ останавливаем CSS-анимации глобально */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
        }
      `}</style>
    </div>
  );
}