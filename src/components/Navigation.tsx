import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_H = 72; // фактическая высота бара (px)

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollYRef = useRef(0);

  // Жёсткая блокировка скролла body (лучше работает на iOS)
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
      // возврат
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
      // на случай размонтирования
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
    { text: "Home", href: "/DigitalForge/" }, // если у тебя base в vite = /DigitalForge/
    { text: "about", href: "/about" },
    { text: "services", href: "/services" },
    { text: "cases", href: "/cases" },
    { text: "contacts", href: "/contact" },
    { text: "instagram", href: "#" },
  ];

  const createSpacedText = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="inline-block">{char === " " ? "\u00A0" : char}</span>
    ));

  return (
    <>
      {/* фиксированный top-bar */}
      <nav className="fixed top-0 left-0 w-full z-[3000] bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6" style={{ height: NAV_H }}>
          <div className="h-full flex justify-between items-center">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className={`flex items-center gap-3 px-6 py-2 rounded-full transition-all duration-500
                ${isMenuOpen ? "bg-depo-blue text-white" : "bg-neutral-800 text-white"}
                hover:scale-105 hover:bg-depo-blue`}
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
        // предотвращаем прокрутку подложки даже если что-то просочится
        onTouchMove={(e) => isMenuOpen && e.preventDefault()}
      >
        {/* задник */}
        <motion.div
          className="absolute inset-0 bg-background"
          initial={false}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          // iOS safe areas
          style={{
            minHeight: "100dvh",
          }}
        />

        {/* контент меню — строго по центру, учитываем высоту nav и safe areas */}
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
          <div className="max-w-7xl mx-auto px-6">
            {/* центрируем сеткой */}
            <div className="grid min-h-[calc(100dvh-var(--nav-shift))] place-items-center"
                 style={{ // переменная чтоб Tailwind не ругался на calc в классе
                   // в iOS адресная строка меняется, но 100dvh уже учитывает это
                   // вычитаем 0 — оставил на будущее, если захочешь ещё сдвинуть
                   // @ts-ignore
                   ['--nav-shift' as any]: `0px`,
                 }}
            >
              <div className="space-y-8 text-center">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.text}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="interactive block whitespace-nowrap text-[clamp(2.5rem,6vw,6rem)] font-black hover:text-depo-blue transition-colors leading-none"
                    initial={false}
                    animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: isMenuOpen ? index * 0.06 + 0.12 : 0 }}
                  >
                    {createSpacedText(item.text)}
                  </motion.a>
                ))}

                <motion.div
                  className="mx-auto w-16 h-px bg-foreground"
                  initial={false}
                  animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: isMenuOpen ? 0.5 : 0 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Navigation;