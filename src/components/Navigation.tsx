import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

type Rect = { top: number; left: number; width: number; height: number };

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
  const [origin, setOrigin] = useState<Rect | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const navItems: NavItem[] = [
    { type: "section", text: "Home", sectionId: "home" },
    { type: "section", text: "About", sectionId: "about" },
    { type: "section", text: "Services", sectionId: "services" },
    { type: "section", text: "Contacts", sectionId: "contact" },
    { type: "external", text: "instagram", href: "https://instagram.com" },
  ];

  const measureButton = (): Rect | null => {
    const el = btnRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top, left: r.left, width: r.width, height: r.height };
  };

  const beginAnimation = () => setIsAnimating(true);
  const endAnimation = () => setIsAnimating(false);

  const toggle = () => {
    if (isAnimating) return; // защита от двойных тапов
    if (!isMenuOpen) {
      const pos = measureButton();
      if (pos) setOrigin(pos);
    }
    beginAnimation();
    setIsMenuOpen((v) => !v);
  };

  const close = () => {
    if (isAnimating) return; // защита
    beginAnimation();
    setIsMenuOpen(false);
  };

  const handleExitComplete = () => {
    setOrigin(null);
    endAnimation();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const targetW = isMobile ? Math.min(window.innerWidth - 96, 320) : 420;
  const targetH = isMobile ? Math.min(window.innerHeight * 0.7, 420) : 380;

  useLayoutEffect(() => {
    if (isMenuOpen) {
      const pos = measureButton();
      if (pos) setOrigin(pos);
    }
  }, [isMenuOpen]);

  const scrollToSection = (id: InternalItem["sectionId"]) => {
    const el = document.getElementById(id);
    if (el) {
      close();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      try {
        history.replaceState(null, "", `#${id}`);
      } catch {}
    }
  };

  const fallbackFromButton = (): Rect => {
    const r = btnRef.current?.getBoundingClientRect();
    return r
      ? { top: r.top, left: r.left, width: r.width, height: r.height }
      : { top: 24, left: 24, width: 56, height: 48 };
  };

  const from = origin ?? fallbackFromButton();

  return (
    <>
      {/* обычный хедер */}
      <nav className="w-full z-30 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-end items-center" />
      </nav>

      {/* фиксируем только кнопку — ниже панели */}
      <div className="fixed top-6 left-6 z-40">
        <button
          ref={btnRef}
          onClick={toggle}
          aria-expanded={isMenuOpen}
          aria-controls="nav-panel"
          // когда меню открыто — делаем фон прозрачным и вырубаем поинтеры, чтобы не было "двойного клика" и не светился круг
          className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-500 ${
            isMenuOpen ? "bg-transparent text-white pointer-events-none" : "bg-neutral-800 text-white"
          } hover:scale-105 hover:bg-depo-blue`}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <span className="uppercase text-xs tracking-[0.4em] leading-none">
            {isMenuOpen ? "close" : "menu"}
          </span>

          {!isMenuOpen && (
            <motion.span
              layoutId="menuIcon"
              initial={false}
              animate={{ rotate: 0 }}
              className="inline-flex"
            >
              <Menu size={20} strokeWidth={2} />
            </motion.span>
          )}
        </button>
      </div>

      {/* панель — поверх кнопки + iOS анти-артефакты */}
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isMenuOpen && (
          <motion.div
            key="nav-panel"
            id="nav-panel"
            role="dialog"
            aria-modal="true"
            className="fixed z-50 [transform:translateZ(0)]"
            style={{
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              WebkitTapHighlightColor: "transparent",
            }}
            initial={{
              top: from.top,
              left: from.left,
              width: from.width,
              height: from.height,
              borderRadius: 9999,
              opacity: 0.98,
            }}
            animate={{
              top: from.top,
              left: from.left,
              width: targetW,
              height: targetH,
              borderRadius: 24,
              opacity: 1,
            }}
            exit={{
              top: from.top,
              left: from.left,
              width: from.width,
              height: from.height,
              borderRadius: 9999,
              opacity: 0,
            }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            onAnimationComplete={() => endAnimation()}
          >
            <div className="relative bg-depo-blue text-primary-foreground shadow-xl rounded-3xl overflow-hidden h-full w-full">
              {/* шапка */}
              <div className="px-5 py-4 border-b border-white/10">
                {/* ровняем по центру, чтобы на iOS не было «выше/ниже» */}
                <div className="flex justify-between items-center">
                  <span className="uppercase text-[11px] tracking-[0.4em] leading-none">
                    close
                  </span>
                  <motion.button
                    type="button"
                    onClick={close}
                    layoutId="menuIcon"
                    initial={{ rotate: 180, y: -1 }}  // аккуратная подстройка
                    animate={{ rotate: 180, y: -1 }}
                    transition={{ duration: 0.25 }}
                    aria-label="Close menu"
                    className="inline-flex items-center justify-center rounded-full"
                    // убираем фон на iOS, чтобы не было «кружка»
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <X size={18} strokeWidth={2} />
                  </motion.button>
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
                          onClick={() => scrollToSection(item.sectionId)}
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