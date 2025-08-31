import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    if (isMenuOpen) {
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
      body.style.position = "fixed";
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
      (body.style as any).touchAction = "none";
    } else {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      (body.style as any).touchAction = "";
      window.scrollTo(0, scrollYRef.current || 0);
    }
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      (body.style as any).touchAction = "";
    };
  }, [isMenuOpen]);

  const navItems = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Contacts", href: "/contact" },
    { text: "instagram", href: "#" },
  ];

  const createSpacedText = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="inline-block char-animate"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-500 ${
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
              {isMenuOpen ? (
                <X size={20} strokeWidth={2} />
              ) : (
                <Menu size={20} strokeWidth={2} />
              )}
            </motion.div>
          </button>

          <div className="text-xs font-medium tracking-[0.4em] uppercase">
            100%
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{
          height: "calc(var(--vh, 1vh) * 100)",
          minHeight: "calc(var(--vh, 1vh) * 100)",
          overscrollBehavior: "none",
        }}
        onTouchMove={(e) => isMenuOpen && e.preventDefault()}
      >
        {/* Background */}
        <div
          className={`absolute inset-0 bg-background transition-transform duration-700 ${
            isMenuOpen ? "translate-y-0" : "translate-y-full"
          }`}
          style={{
            height: "calc(var(--vh, 1vh) * 100)",
            minHeight: "calc(var(--vh, 1vh) * 100)",
          }}
        ></div>

        {/* Menu Content */}
        <div
          className="relative flex flex-col justify-center items-center"
          style={{
            height: "calc(var(--vh, 1vh) * 100)",
            minHeight: "calc(var(--vh, 1vh) * 100)",
          }}
        >
          {/* Navigation Items */}
          <div className="space-y-8 text-center">
            {navItems.map((item, index) => (
              <div
                key={index}
                className={
                  item.text === "instagram"
                    ? "overflow-visible pb-[0.3em]"
                    : "overflow-hidden"
                }
              >
                <a
                  href={item.href}
                  className={
                    item.text === "instagram"
                      ? "interactive block whitespace-nowrap text-[clamp(2.5rem,6vw,6rem)] font-black hover:text-depo-blue transition-all duration-700 leading-[1.04] will-change-transform"
                      : "interactive block whitespace-nowrap text-[clamp(2.5rem,6vw,6rem)] font-black hover:text-depo-blue transition-all duration-700 leading-none"
                  }
                  style={{
                    transform: isMenuOpen ? "translateY(0)" : "translateY(100%)",
                    transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${
                      index * 0.1 + 0.3
                    }s`,
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
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen
                ? "translateY(0) translateX(-50%)"
                : "translateY(20px) translateX(-50%)",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1s",
            }}
          >
            <div className="w-16 h-px bg-foreground"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;