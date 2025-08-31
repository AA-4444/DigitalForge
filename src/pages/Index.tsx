"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
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

/* ----------------------------- Scene (repeatable + iOS kick) ----------------------------- */
function Scene({
  id,
  children,
  maskIn = "inset(0 0 100% 0)",
  maskShow = "inset(0 0 0% 0)",
  viewAmount = 0.25,
  autoReveal = false,        // автостарт (для Hero)
  remountOnReveal = false,   // перемаунт при раскрытии
}: {
  id: string;
  children: ReactNode;
  maskIn?: string;
  maskShow?: string;
  viewAmount?: number;
  autoReveal?: boolean;
  remountOnReveal?: boolean;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  // мягче анимации на мобильных
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

  // повторяемая анимация — без once
  const inView = useInView(sectionRef, { amount: viewAmount });

  // параллакс
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-3vh", "3vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.98, 1, 1, 0.98]);

  // маска
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

  // автостарт для Hero + iOS kick (двойной RAF, потом лёгкая задержка)
  const [kick, setKick] = useState(0);
  useEffect(() => {
    if (!autoReveal) return;
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isiOS = /iP(hone|od|ad)/.test(ua) || (/(Mac)/.test(ua) && "ontouchend" in document);
    if (!isiOS) return;

    // 1) сразу цель → 0 (как и было)
    clipTarget.set(REVEAL_START);
    const r1 = requestAnimationFrame(() => {
      clipTarget.set(0);
      // 2) через кадр форс-ремоунт контента, чтобы CSS keyframes перезапустились
      const r2 = requestAnimationFrame(() => {
        setKick((k) => k + 1);
        // 3) и ещё маленький таймаут — на случай медленного first paint
        const t = setTimeout(() => setKick((k) => k + 1), 60);
        return () => clearTimeout(t);
      });
      return () => cancelAnimationFrame(r2);
    });
    return () => cancelAnimationFrame(r1);
  }, [autoReveal, clipTarget]);

  const clipPathMV = useTransform(clipPct, (p) => buildClip(maskIn, p as number));

  // флаг для CSS-анимаций детей
  const revealOn = inView || autoReveal;

  // ключи для перемаунта контента при раскрытии и для iOS kick
  const contentKey =
    (remountOnReveal ? `${id}-${revealOn ? "on" : "off"}` : `${id}`) + `-k${kick}`;

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
        data-reveal={revealOn ? "on" : "off"}
        style={{ clipPath: clipPathMV, willChange: "clip-path, transform", transform: "translateZ(0)" }}
      >
        <motion.div
          key={contentKey}
          className="w-full h-full"
          style={{ y, opacity, willChange: "transform, opacity", transform: "translateZ(0)" }}
        >
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
      return () => { document.body.style.overflow = prev; };
    }
  }, [booted]);

  // страховка, если LoadingScreen не вызовет onDone
  useEffect(() => {
    if (!booted) {
      const safety = setTimeout(() => setBooted(true), 4000);
      return () => clearTimeout(safety);
    }
  }, [booted]);

  useMobileVhFix();
  useAnchorIntercept();

  // Рендерим только лоадер, пока он не завершился (без подложек)
  if (!booted) {
    return (
      <div className="fixed inset-0 z-[10000] bg-background">
        <LoadingScreen {...({ onDone: () => setBooted(true) } as any)} />
      </div>
    );
  }

  // После завершения — основной контент
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <TransitionOverlay />
      <Navigation />

      {/* лёгкий fade-in контента при первом показе */}
      <motion.main
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        {/* 1. Hero — автостарт + ремоунт при раскрытии + iOS kick */}
        <Scene
          id="home"
          maskIn="inset(0 0 100% 0)"
          maskShow="inset(0 0 0 0)"
          viewAmount={0.25}
          autoReveal
          remountOnReveal
        >
          <HeroSection />
        </Scene>

        {/* 2. WhatWeDo — повторяемый вайп сверху */}
        <Scene id="about" maskIn="inset(100% 0 0 0)" maskShow="inset(0 0 0 0)" viewAmount={0.22}>
          <WhatWeDoSection />
        </Scene>

        {/* 3. Services — такой же вайп сверху */}
        <Scene id="services" maskIn="inset(100% 0 0 0)" maskShow="inset(0 0 0 0)" viewAmount={0.22}>
          <ServicesSection />
        </Scene>

        {/* 4. Footer — вайп снизу */}
        <Scene id="contact" maskIn="inset(0 100% 0 0)" maskShow="inset(0 0 0 0)" viewAmount={0.25}>
          <Footer />
        </Scene>
      </motion.main>

      <AwardsButton />

      {/* Управление CSS-анимациями детей через data-атрибут */}
      <style>{`
        [data-reveal='off'] * {
          animation-play-state: paused !important;
        }
        [data-reveal='on'] * {
          animation-play-state: running !important;
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
        }
      `}</style>
    </div>
  );
}