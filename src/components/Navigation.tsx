import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_H = 72;

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
    { text: "Home", href: "/DigitalForge/" },
    { text: "about", href: "/about" },
    { text: "services", href: "/services" },
    { text: "cases", href: "/cases" },
    { text: "contacts", href: "/contact" },
    { text: "instagram", href: "#" },
  ];

  const createSpacedText = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="char"
        style={{ transitionDelay: `${i * 0.04}s` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[3000] bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6" style={{ height: NAV_H }}>
          <div className="h-full flex justify-between items-center">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className={`flex items-center gap-3 px-6 py-2 rounded-full transition-all duration-500 ${
                isMenuOpen ? "bg-depo-blue text-white" : "bg-neutral-800 text-white"
              } hover:scale-105 hover:bg-depo-blue`}
            >
              <span className="uppercase text-xs tracking-[0.4em]">
                {isMenuOpen ? "close" : "menu"}
              </span>
              <motion.div initial={false} animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.35 }}>
                {isMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
              </motion.div>
            </button>

            <div className="text-xs font-medium tracking-[0.4em] uppercase">100%</div>
          </div>
        </div>
      </nav>

      {/* overlay */}
      <div
        className={`fixed inset-0 z-[2500] ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        onTouchMove={(e) => isMenuOpen && e.preventDefault()}
      >
        {/* backdrop */}
        <motion.div
          className="absolute inset-0 bg-background"
          initial={false}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ minHeight: "100dvh" }}
        />

        {/* menu content */}
        <motion.div
          className="relative w-full"
          initial={false}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 24 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: isMenuOpen ? 0.05 : 0 }}
          style={{
            minHeight: "100dvh",
            paddingTop: `calc(env(safe-area-inset-top, 0px) + ${NAV_H}px)`,
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 h-full relative">
            {/* центр + смещение вверх на мобилках */}
            <div className="grid place-items-center h-full">
              <div className="w-full">
                <div className="mx-auto text-center space-y-8
                                translate-y-[-6vh] md:translate-y-0">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.text}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="nav-link interactive block whitespace-nowrap text-[clamp(2.5rem,6vw,6rem)] font-black leading-none"
                      initial={false}
                      animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                      transition={{ duration: 0.45, ease: "easeOut", delay: isMenuOpen ? index * 0.06 + 0.12 : 0 }}
                    >
                      {createSpacedText(item.text)}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* декоративная полоска — внизу меню */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-[max(16px,env(safe-area-inset-bottom,0px))] w-16 h-px bg-foreground"
              initial={false}
              animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: isMenuOpen ? 0.5 : 0 }}
            />
          </div>
        </motion.div>
      </div>

      {/* локальные стили для анимации букв */}
      <style>{`
        .nav-link { 
          transition: color .35s ease;
        }
        .nav-link .char {
          display: inline-block;
          transition: transform .35s cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }
        .nav-link:hover .char,
        .nav-link:focus-visible .char {
          transform: translateY(-6px);
        }
      `}</style>
    </>
  );
};

export default Navigation;