import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { text: "Home", href: "/" },
    { text: "about", href: "/about" },
    { text: "services", href: "/services" },
    { text: "cases", href: "/cases" },
    { text: "contacts", href: "/contact" },
    { text: "instagram", href: "#" },
  ];

  const createSpacedText = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="inline-block char-animate"
        style={{
          animationDelay: `${index * 0.05}s`,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <>
      {/* Навбар */}
      <nav className="fixed top-0 left-0 w-full z-[1000] bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          {/* Кнопка меню */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center gap-3 px-6 py-2 rounded-full transition-all duration-500 ${
              isMenuOpen
                ? "bg-depo-blue text-white"
                : "bg-neutral-800 text-white"
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

          {/* Справа "100%" */}
          <div className="text-xs font-medium tracking-[0.4em] uppercase">
            100%
          </div>
        </div>
      </nav>

      {/* Фуллскрин меню */}
      <div
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-[900] transition-all duration-500 ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Фон — полностью непрозрачный */}
        <div
          className={`absolute inset-0 bg-background transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ overscrollBehavior: "contain" }}
        />

        {/* Контент меню */}
        <div className="relative h-full w-full flex flex-col items-center overflow-y-auto pt-28 md:pt-36">
          <div className="space-y-8 text-center">
            {navItems.map((item, index) => (
              <motion.a
                key={item.text}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="interactive block whitespace-nowrap text-[clamp(2.5rem,6vw,6rem)] font-black hover:text-depo-blue transition-colors leading-none"
                initial={false}
                animate={
                  isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: isMenuOpen ? index * 0.06 + 0.15 : 0,
                }}
              >
                {createSpacedText(item.text)}
              </motion.a>
            ))}
          </div>

          {/* Декор снизу */}
          <motion.div
            className="mt-16"
            initial={false}
            animate={
              isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: isMenuOpen ? 0.6 : 0,
            }}
          >
            <div className="w-16 h-px bg-foreground" />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Navigation;