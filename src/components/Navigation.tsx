import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

type InternalItem = {
  type: "section";
  text: string;
  sectionId: "home" | "about" | "services" | "contact";
};

type ExternalItem = {
  type: "external";
  text: string;
  href: string;
};

type NavItem = InternalItem | ExternalItem;

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const navItems: NavItem[] = [
    { type: "section", text: "Home", sectionId: "home" },
    { type: "section", text: "About", sectionId: "about" },
    { type: "section", text: "Services", sectionId: "services" },
    { type: "section", text: "Contacts", sectionId: "contact" },
    { type: "external", text: "instagram", href: "https://instagram.com" },
  ];

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const targetW = isMobile ? Math.min(window.innerWidth - 96, 320) : 420;
  const targetH = isMobile ? Math.min(window.innerHeight * 0.7, 420) : 380;

  const open = () => setIsMenuOpen(true);
  const close = () => setIsMenuOpen(false);
  const toggle = () => setIsMenuOpen((v) => !v);

  // ESC для закрытия
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Плавный скролл к секции (после закрытия меню)
  const scrollToSection = (id: InternalItem["sectionId"]) => {
    close();
    // даём кадр на закрытие, затем скроллим — iOS меньше мигает
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        try {
          history.replaceState(null, "", `#${id}`);
        } catch {}
      }
    });
  };

  return (
    <>
      {/* обычный хедер */}
      <nav className="w-full z-30 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-end items-center" />
      </nav>

      {/* фиксируем только кнопку — она под панелью по z-index */}
      <div className="fixed top-6 left-6 z-40">
        <button
          ref={btnRef}
          onPointerUp={toggle} // на iOS стабильнее, чем onClick
          aria-expanded={isMenuOpen}
          aria-controls="nav-panel"
          // когда меню открыто — кнопку полностью прячем и отключаем её события
          className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
            isMenuOpen ? "opacity-0 pointer-events-none" : "bg-neutral-800 text-white hover:scale-105 hover:bg-depo-blue"
          }`}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <span className="uppercase text-xs tracking-[0.4em] leading-none">
            menu
          </span>
          <span className="inline-flex">
            <Menu size={20} strokeWidth={2} />
          </span>
        </button>
      </div>

      {/* панель — всегда растёт из top-6/left-6; выше кнопки по z-index */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="nav-panel"
            id="nav-panel"
            role="dialog"
            aria-modal="true"
            className="fixed z-50"
            style={{
              top: 24,  // top-6
              left: 24, // left-6
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              WebkitTapHighlightColor: "transparent",
            }}
            initial={{
              width: 56,
              height: 48,
              borderRadius: 9999,
              opacity: 0.98,
            }}
            animate={{
              width: targetW,
              height: targetH,
              borderRadius: 24,
              opacity: 1,
            }}
            exit={{
              width: 56,
              height: 48,
              borderRadius: 9999,
              opacity: 0,
            }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
          >
            <div className="relative bg-depo-blue text-primary-foreground shadow-xl rounded-3xl overflow-hidden h-full w-full">
              {/* шапка */}
              <div className="px-5 py-4 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <span className="uppercase text-[11px] tracking-[0.4em] leading-none">
                    close
                  </span>
                  <button
                    type="button"
                    onPointerUp={close}
                    aria-label="Close menu"
                    className="inline-flex items-center justify-center rounded-full"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <X size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* список */}
              <nav className="h-[calc(100%-56px)] overflow-auto">
                <ul className="px-5 pb-4">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={`${item.type}-${item.text}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3, ease: "easeOut" }}
                      className="border-b border-white/15 last:border-b-0"
                    >
                      {item.type === "external" ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={close}
                          className="flex items-center justify-between py-4 group"
                          style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                          <span className="text-lg md:text-xl font-semibold tracking-wide">
                            {item.text}
                          </span>
                          <span className="text-xs uppercase tracking-[0.3em] opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            go
                          </span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          onPointerUp={() => scrollToSection(item.sectionId)}
                          className="w-full text-left flex items-center justify-between py-4 group"
                          style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                          <span className="text-lg md:text-xl font-semibold tracking-wide">
                            {item.text}
                          </span>
                          <span className="text-xs uppercase tracking-[0.3em] opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            go
                          </span>
                        </button>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;