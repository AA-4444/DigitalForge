import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (isMenuOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      (document.body.style as any).touchAction = "none";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      (document.body.style as any).touchAction = "";
      window.scrollTo(0, scrollYRef.current || 0);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      (document.body.style as any).touchAction = "";
    };
  }, [isMenuOpen]);

  const navItems = [
    { text: "Home", href: "/DigitalForge/" }, // GH Pages
    { text: "about", href: "/about" },
    { text: "services", href: "/services" },
    { text: "cases", href: "/cases" },
    { text: "contacts", href: "/contact" },
    { text: "instagram", href: "#" },
  ];

  const createSpacedText = (text: string) =>
    text.split("").map((char, index) => (
      <span
        key={index}
        className="inline-block char-animate"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className={`flex items-center gap-3 px-6 py-2 rounded-full transition-all duration-500 ${
              isMenuOpen ? "bg-depo-blue text-white" : "bg-neutral-800 text-white"
            } hover:scale-105 hover:bg-depo-blue`}
          >
            <span className="uppercase text-xs tracking-[0.4em]">
              {isMenuOpen ? "close" : "menu"}
            </span>
            <motion.div
              initial={false}
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.35 }}
            >
              {isMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </motion.div>
          </button>

          <div className="text-xs font-medium tracking-[0.4em] uppercase">100%</div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 ${isMenuOpen ? "visible opacity-100" : "invisible opacity-0"} transition-opacity duration-300`}
        onTouchMove={(e) => isMenuOpen && e.preventDefault()}
        style={{
          minHeight: "100dvh",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "auto",
        }}
      >
        <div
          className={`absolute inset-0 bg-background transition-transform duration-500 ${
            isMenuOpen ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ minHeight: "100dvh" }}
        />

        <div
          className="relative w-full h-full flex flex-col items-center"
          style={{
            minHeight: "100dvh",
            paddingTop: "calc(env(safe-area-inset-top, 0px) + 96px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          <div className="flex-1 w-full grid place-items-center">
            <div className="space-y-8 text-center translate-y-[-4vh] md:translate-y-0">
              {navItems.map((item, index) => (
                <div key={index} className="overflow-hidden">
                  <a
                    href={item.href}
                    className="interactive nav-hover block whitespace-nowrap text-[clamp(2.5rem,6vw,6rem)] font-black hover:text-depo-blue transition-colors duration-700 leading-none"
                    style={{
                      transform: isMenuOpen ? "translateY(0)" : "translateY(100%)",
                      transition: `transform 0.8s cubic-bezier(0.4,0,0.2,1) ${index * 0.1 + 0.25}s`,
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {createSpacedText(item.text)}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div
            className="w-16 h-px bg-foreground mb-[max(16px,env(safe-area-inset-bottom,0px))] transition-all duration-500"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? "translateY(0)" : "translateY(12px)",
            }}
          />
        </div>
      </div>

      <style>{`
        .char-animate {
          transform: translateY(12px);
          opacity: 0.001;
          animation: charIn .55s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes charIn { to { transform: translateY(0); opacity: 1; } }

        .nav-hover .char-animate {
          transition: transform .35s cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }
        .nav-hover:hover .char-animate,
        .nav-hover:focus-visible .char-animate {
          transform: translateY(-6px);
        }
      `}</style>
    </>
  );
};

export default Navigation;