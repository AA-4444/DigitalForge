import { useEffect, useRef, useState } from "react";

type RevealProps = {
  delay?: number;
  className?: string;
  children?: React.ReactNode;
};

/** Простой и надёжный скролл-хук: триггерит один раз, когда элемент попадает во вьюпорт */
const useRevealOnScroll = (offsetRatio = 0.85) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const check = () => {
      if (!el || inView) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh * offsetRatio) {
        setInView(true);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          check();
        });
      }
    };

    // стартовая проверка (если блок уже в зоне видимости)
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [inView, offsetRatio]);

  return { ref, inView };
};

const Reveal = ({ children, delay = 0, className = "" }: RevealProps) => {
  const { ref, inView } = useRevealOnScroll(0.85); // чем меньше, тем раньше триггер
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

const WhatWeDoSection = () => {
  return (
    <section className="relative py-32 px-6 overflow-x-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2">
          <div
            className="flex space-x-16"
            style={{
              animation: "scroll-horizontal 100s linear infinite",
              width: "calc(300% + 128px)",
            }}
          >
            {Array(3)
              .fill("CREATIVE DIGITAL EXPERIENCES")
              .map((text, index) => (
                <span
                  key={index}
                  className="text-[clamp(4rem,15vw,15rem)] font-black whitespace-nowrap"
                >
                  {text}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(2rem,8vw,8rem)] font-black leading-[0.8] mb-12">
              What I do
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="w-24 h-px bg-foreground mx-auto mb-16" />
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-[clamp(1.5rem,4vw,3rem)] font-medium leading-tight max-w-5xl mx-auto">
              My goal is to transform your idea into a product where design meets effortless experience.
            </p>
          </Reveal>
        </div>

        {/* Floating Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-32">
          {[
            { number: "100%", label: "Passion", d: 0.2 },
            { number: "24/7", label: "Support", d: 0.35 },
            { number: "∞", label: "Creativity", d: 0.5 },
          ].map((item) => (
            <Reveal key={item.label} delay={item.d}>
              <div className="text-center group">
                <div className="relative inline-block">
                  <div className="text-[clamp(4rem,10vw,12rem)] font-black leading-none group-hover:text-depo-blue transition-colors duration-700">
                    {item.number}
                  </div>
                  <div className="absolute -top-4 -right-4 w-6 h-6 bg-depo-blue/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="text-xs font-medium tracking-[0.4em] uppercase mt-4">
                  {item.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Philosophy */}
        <div className="text-center">
          <Reveal delay={0.8}>
            <blockquote className="text-[clamp(1.2rem,3vw,2rem)] font-medium leading-relaxed max-w-4xl mx-auto italic">
              “Every detail is intentional, every motion is meaningful, every click leads somewhere.”
            </blockquote>
          </Reveal>

          <Reveal delay={0.95}>
            <div className="mt-12 text-xs font-medium tracking-[0.3em] uppercase opacity-60">
              — Note here
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .reveal {
          opacity: 0;
          transform: translate3d(0, 28px, 0);
          transition-property: transform, opacity;
          transition-duration: 900ms;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
        .reveal.reveal-in {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhatWeDoSection;