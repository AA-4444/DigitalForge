import { motion } from "framer-motion";

const WhatWeDoSection = () => {
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25, margin: "0px 0px -10% 0px" },
    transition: { duration: 0.9, ease: "easeOut" as const, delay },
  });

  return (
    <section className="relative py-32 px-6 overflow-x-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2">
          <div
            className="flex space-x-16"
            style={{
              animation: "scroll-horizontal 100s linear infinite",
              width: "calc(300% + 128px)",
            }}
          >
            {Array(3)
              .fill("CREATIVE DIGITAL EXPERIENCES")
              .map((text, index) => (
                <span
                  key={index}
                  className="text-[clamp(4rem,15vw,15rem)] font-black whitespace-nowrap"
                >
                  {text}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.h2
            {...reveal(0.1)}
            className="text-[clamp(2rem,8vw,8rem)] font-black leading-[0.8] mb-12"
          >
            What I do
          </motion.h2>

          <motion.div
            {...reveal(0.25)}
            className="w-24 h-px bg-foreground mx-auto mb-16"
          />

          <motion.p
            {...reveal(0.4)}
            className="text-[clamp(1.5rem,4vw,3rem)] font-medium leading-tight max-w-5xl mx-auto"
          >
            My goal is to transform your idea into a product where design meets
            effortless experience.
          </motion.p>
        </div>

        {/* Floating Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-32">
          {[
            { number: "100%", label: "Passion", d: 0.2 },
            { number: "24/7", label: "Support", d: 0.35 },
            { number: "∞", label: "Creativity", d: 0.5 },
          ].map((item) => (
            <motion.div key={item.label} {...reveal(item.d)} className="text-center group">
              <div className="relative inline-block">
                <div className="text-[clamp(4rem,10vw,12rem)] font-black leading-none group-hover:text-depo-blue transition-colors duration-700">
                  {item.number}
                </div>
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-depo-blue/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="text-xs font-medium tracking-[0.4em] uppercase mt-4">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy */}
        <div className="text-center">
          <motion.blockquote
            {...reveal(0.8)}
            className="text-[clamp(1.2rem,3vw,2rem)] font-medium leading-relaxed max-w-4xl mx-auto italic"
          >
            “Every detail is intentional, every motion is meaningful, every click leads somewhere.”
          </motion.blockquote>

          <motion.div
            {...reveal(0.95)}
            className="mt-12 text-xs font-medium tracking-[0.3em] uppercase opacity-60"
          >
            — Note here
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
};

export default WhatWeDoSection;