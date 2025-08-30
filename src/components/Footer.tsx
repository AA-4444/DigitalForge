import { useEffect, useRef, useState } from "react";

const useInView = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px", ...(options || {}) }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return { ref, inView };
};

type RevealProps = {
  delay?: number;
  className?: string;
  children?: React.ReactNode;
};

const Reveal = ({ children, delay = 0, className = "" }: RevealProps) => {
  const { ref, inView } = useInView();
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

const Footer = () => {
  const services = [
    "complete website",
    "UI/UX design",
    "IOS Development",
    "web development",
  ];

  return (
    <footer className="relative py-32 px-6 bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="flex space-x-8"
            style={{
              animation: "scroll-horizontal 80s linear infinite",
              width: "calc(400% + 128px)",
            }}
          >
            {Array(4)
              .fill("DESIGN BUREAU")
              .map((text, index) => (
                <span
                  key={index}
                  className="text-[clamp(4rem,20vw,20rem)] font-black whitespace-nowrap opacity-10"
                >
                  {text}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(3rem,10vw,10rem)] font-black leading-[0.8] mb-12">
              <span className="block">Ready to work</span>
              <span className="block text-depo-blue">with me?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="inline-block">
              <a href="/contact" className="interactive group relative inline-block isolate">
                <div className="relative z-10 px-12 py-6 border border-primary-foreground text-xs font-medium tracking-[0.4em] uppercase overflow-hidden">
                  <span className="relative z-20 transition-colors duration-700 group-hover:text-primary">
                    Start Project
                  </span>
                  <div className="absolute inset-0 z-10 bg-primary-foreground transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                </div>
                <div className="absolute inset-0 -z-10 bg-primary-foreground transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.35}>
          <div className="text-center mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-medium tracking-[0.3em] uppercase">
              {services.map((service, index) => (
                <div key={index} className="group cursor-pointer" style={{ transitionDelay: `${index * 0.05}s` }}>
                  <span className="relative">
                    {service}
                    <span className="absolute -bottom-2 left-0 w-full h-px bg-primary-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-primary-foreground/20">
            <div className="text-xs font-medium tracking-[0.4em] uppercase mb-4 md:mb-0">
              © 2022 DIGITAL FORGE
            </div>
            <div className="flex space-x-8 text-xs font-medium tracking-[0.3em] uppercase">
              <a href="/privacy" className="interactive hover:text-depo-blue transition-colors duration-500">
                Privacy
              </a>
              <a href="/terms" className="interactive hover:text-depo-blue transition-colors duration-500">
                Terms
              </a>
              <a href="#" className="interactive hover:text-depo-blue transition-colors duration-500">
                Instagram
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .reveal {
          opacity: 0;
          transform: translate3d(0, 28px, 0);
          transition-property: transform, opacity;
          transition-duration: 800ms;
          transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
          will-change: transform, opacity;
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
    </footer>
  );
};

export default Footer;