const WhatWeDoSection = () => {
  return (
    <section className="relative py-32 px-6 overflow-x-hidden">
      <div className="absolute inset-0 opacity-5">
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
        <div className="text-center mb-24">
          <h2
            className="text-[clamp(2rem,8vw,8rem)] font-black leading-[0.8] mb-12 will-change-transform"
            style={{
              animation: "slideUpSoft 900ms cubic-bezier(0.22,1,0.36,1) 0.1s both",
            }}
          >
            What I do
          </h2>

          <div
            className="w-24 h-px bg-foreground mx-auto mb-16 will-change-transform"
            style={{
              animation: "slideUpSoft 900ms cubic-bezier(0.22,1,0.36,1) 0.25s both",
            }}
          />

          <p
            className="text-[clamp(1.5rem,4vw,3rem)] font-medium leading-tight max-w-5xl mx-auto will-change-transform"
            style={{
              animation: "slideUpSoft 900ms cubic-bezier(0.22,1,0.36,1) 0.4s both",
            }}
          >
            My goal is to transform your idea into a product where design meets effortless experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-32">
          {[
            { number: "100%", label: "Passion", d: 0.2 },
            { number: "24/7", label: "Support", d: 0.35 },
            { number: "∞", label: "Creativity", d: 0.5 },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center group will-change-transform"
              style={{
                animation: `slideUpSoft 900ms cubic-bezier(0.22,1,0.36,1) ${item.d}s both`,
              }}
            >
              <div className="relative inline-block">
                <div className="text-[clamp(4rem,10vw,12rem)] font-black leading-none group-hover:text-depo-blue transition-colors duration-700">
                  {item.number}
                </div>
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-depo-blue/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="text-xs font-medium tracking-[0.4em] uppercase mt-4">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <blockquote
            className="text-[clamp(1.2rem,3vw,2rem)] font-medium leading-relaxed max-w-4xl mx-auto italic will-change-transform"
            style={{
              animation: "slideUpSoft 900ms cubic-bezier(0.22,1,0.36,1) 0.8s both",
            }}
          >
            “Every detail is intentional, every motion is meaningful, every click leads somewhere.”
          </blockquote>

          <div
            className="mt-12 text-xs font-medium tracking-[0.3em] uppercase opacity-60 will-change-transform"
            style={{
              animation: "slideUpSoft 900ms cubic-bezier(0.22,1,0.36,1) 0.95s both",
            }}
          >
            — Note here
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes slideUpSoft {
          0% { transform: translate3d(0,28px,0); opacity: 0; }
          100% { transform: translate3d(0,0,0); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          *[style*="slideUpSoft"] {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhatWeDoSection;