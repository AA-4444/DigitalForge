import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollYRef = useRef(0);

  // Лочим скролл страницы (особенно для iPhone)
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
    { text: "Home", href: "/" },
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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              transition={{ duration: 0.4 }}
            >
              {isMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </motion.div>
          </button>

          <div className="text-xs font-medium tracking-[0.4em] uppercase">100%</div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-1000 ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        } vh-fix`}
      >
        {/* Background */}
        <div
          className={`absolute inset-0 bg-background transition-transform duration-1200 ${
            isMenuOpen ? "translate-y-0" : "translate-y-full"
          } vh-fix`}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col justify-center items-center vh-fix">
          {/* Navigation Items */}
          <div className="space-y-8 text-center">
            {navItems.map((item, index) => (
              <div key={index} className="overflow-hidden">
                <a
                  href={item.href}
                  className="interactive block whitespace-nowrap text-[clamp(2.5rem,6vw,6rem)] font-black hover:text-depo-blue transition-all duration-700 leading-none"
                  style={{
                    transform: isMenuOpen ? "translateY(0)" : "translateY(100%)",
                    transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1 + 0.3}s`,
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {createSpacedText(item.text)}
                </a>
              </div>
            ))}
          </div>

          {/* Menu Decoration */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              bottom: "max(8px, env(safe-area-inset-bottom, 0px))",
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen
                ? "translateY(0) translateX(-50%)"
                : "translateY(20px) translateX(-50%)",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1s",
            }}
          >
            <div className="w-16 h-px bg-foreground"></div>
          </div>

          {/* защитный слой у самого низа, чтобы ничего не просвечивало */}
          <div
            className="fixed inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: "env(safe-area-inset-bottom, 0px)",
              background: "var(--background)",
              zIndex: 1,
            }}
          />
        </div>
      </div>

      <style>{`
        /* высота-фикс: сперва 100svh, затем дублируем 100dvh — браузер возьмёт поддерживаемое */
        .vh-fix{
          height: 100svh;
          min-height: 100svh;
          height: 100dvh;
          min-height: 100dvh;
          overscroll-behavior: none;
        }

        /* поочередное появление букв */
        .char-animate {
          transform: translateY(12px);
          opacity: 0.001;
          animation: charIn .55s cubic-bezier(0.22,1,0.36,1) forwards;
          will-change: transform, opacity;
        }
        @keyframes charIn { to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </>
  );
};

export default Navigation;