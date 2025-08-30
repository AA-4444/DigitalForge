import { useEffect, useRef, useState } from "react";
import barcodeImg from "@/assets/barcode.png";

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
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px", ...(options || {}) }
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

const ServicesSection = () => {
  const services = [
    {
      title: "complete website",
      description:
        "Moodboard / Wireframing / concepts in animation / design / development",
      href: "/services/website-creation",
    },
    {
      title: "UI design",
      description: "moodboard / design concepts / animation / webdesign",
      href: "/services/ui-design",
    },
    {
      title: "UX design",
      description: "wireframing / UX research / website audit",
      href: "/services/ux-design",
    },
    {
      title: "web development",
      description: "development / webflow / e-commerce",
      href: "/services/webflow-development",
    },
    {
      title: "AI integration",
      description: "custom chatbots / automation / smart features / openai api",
      href: "/services/ai-integration",
    },
    {
      title: "iOS development",
      description: "native apps / swift / swiftui / app store deployment",
      href: "/services/ios-development",
    },
  ];

  return (
    <section className="relative py-32 px-6 bg-secondary overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-0 w-full">
          <div
            className="flex space-x-12"
            style={{
              animation: "scroll-horizontal 80s linear infinite",
              width: "calc(400% + 96px)",
            }}
          >
            {Array(4)
              .fill("SERVICES")
              .map((text, index) => (
                <div key={index} className="flex items-center space-x-12">
                  <span className="text-[clamp(3rem,10vw,10rem)] font-black whitespace-nowrap">
                    {text}
                  </span>
                  <img src={barcodeImg} alt="" className="h-8 w-auto opacity-30" />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(2rem,8vw,8rem)] font-black leading-[0.8] mb-8">
              Services
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="w-24 h-px bg-foreground mx-auto" />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={0.2 + index * 0.12}>
              <a href={service.href} className="interactive group block relative">
                <div className="relative p-12 bg-background/50 backdrop-blur-sm border border-border/20 hover:bg-background transition-all duration-700 group-hover:transform group-hover:scale-105">
                  <div className="absolute top-6 right-6 text-6xl font-black opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-black mb-6 group-hover:text-depo-blue transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8 text-sm font-medium tracking-[0.1em]">
                      {service.description}
                    </p>
                    <div className="flex items-center text-xs font-medium tracking-[0.3em] uppercase">
                      <span className="mr-4 group-hover:text-depo-blue transition-colors duration-500">
                        Learn More
                      </span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-depo-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-depo-blue group-hover:w-8 group-hover:h-8 transition-all duration-500"></div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25 + services.length * 0.12} className="text-center mt-24">
          <p className="text-lg mb-8 opacity-80">
            Need something else? Let's talk about your project.
          </p>
          <a
            href="/contact"
            className="interactive group inline-block text-xs font-medium tracking-[0.4em] uppercase relative"
          >
            <span className="relative z-10">Custom Solution</span>
            <span className="absolute -bottom-2 left-0 w-full h-px bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></span>
            <div className="absolute -top-1 -right-1 w-1 h-1 bg-depo-blue rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-200"></div>
          </a>
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
          transition-duration: 700ms;
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
    </section>
  );
};

export default ServicesSection;