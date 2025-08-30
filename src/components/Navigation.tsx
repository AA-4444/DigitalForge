import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // надёжный scroll-lock для iOS: фиксируем body на текущем scrollY
  useEffect(() => {
    const body = document.body;
    if (isMenuOpen) {
      const scrollY = window.scrollY || window.pageYOffset;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overscrollBehavior = "none";
      body.setAttribute("data-lock", String(scrollY));
    } else {
      const lockY = Number(body.getAttribute("data-lock") || 0);
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overscrollBehavior = "";
      body.removeAttribute("data-lock");
      // вернуть скролл туда, где был
      window.scrollTo(0, lockY);
    }
    return () => {
      // на всякий случай чистим при размонтировании
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overscrollBehavior = "";
      body.removeAttribute("data-lock");
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
    text.split("").map((char, i) => (
      <span
        key={i}
        className="inline-block char-animate"
        style={{ animationDelay: `${i * 0.05}s` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <>
      {/* NAV поверх оверлея (кнопка всегда видна) */}
      <nav className="fixed top-0 left-0 w-full z-[70] bg-background/90 backdrop-blur-md">
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
              transition={{ duration: 0.4 }}
            >
              {isMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </motion.div>
          </button>

          <div className="text-xs font-medium tracking-[0.4em] uppercase">100%</div>
        </div>
      </nav>

      {/* OVERLAY: фиксированный, перекрывает всё, свой скролл, без прокрутки боди */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-500 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        // фон
        style={{
          background: "var(--background)",
          // iOS: запрет «проталкивания» скролла
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          // safe-area отступы
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Контейнер контента меню со своим скроллом */}
        <div
          className={`h-full w-full flex flex-col items-center justify-center transition-transform duration-700 ${
            isMenuOpen ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ overflowY: "auto", touchAction: "none" }}
        >
          {/* дубль-кнопка внутри оверлея (справа сверху) */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 z-[65] flex items-center gap-3 px-5 py-2 rounded-full bg-neutral-800 text-white hover:bg-depo-blue transition-all duration-300"
          >
            <span className="uppercase text-[11px] tracking-[0.4em]">close</span>
            <X size={18} strokeWidth={2} />
          </button>

          {/* пункты меню */}
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

          {/* декоративная линия снизу */}
          <div
            className="mt-16"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1s",
            }}
          >
            <div className="w-16 h-px bg-foreground" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;