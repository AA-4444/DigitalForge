import barcodeImg from "@/assets/barcode.png";

const HeroSection = () => {
  const rotatingProjects = [
   "Independent Creator",
   "Digital Craftsman",
   "Future Focused",
   "Human Centered",
   "Driven by Design",
   "Built with Purpose",
  ];

  const floatingElements = Array(12).fill(null).map((_, index) => ({
    id: index,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2
  }));

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 overflow-hidden">
      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute bg-depo-blue/10 rounded-full"
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: `${element.x}%`,
              top: `${element.y}%`,
              animation: `float ${element.duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`
            }}
          ></div>
        ))}
      </div>

      {/* Scrolling project ticker — fix clipped top */}
      <div className="absolute top-24 left-0 w-full overflow-hidden opacity-20">
        <div
          className="flex items-center space-x-12 text-xs md:text-sm font-medium tracking-[0.3em] uppercase leading-[1.15] py-[2px] [will-change:transform]"
          style={{ animation: 'scroll-horizontal 60s linear infinite', transform: 'translateZ(0)' }}
        >
          {Array(4)
            .fill([
              "iOS Development",
              "Website Development",
              "UI/UX Design",
              "AI Integration",
              "Custom Chatbots",
              "From idea to launch",
              "Designing with purpose",
              "Building seamless experiences",
              "Turning concepts into products",
              "Collaboration at every step",
              "Your vision, built with precision",
            ])
            .flat()
            .map((project, index) => (
              <div key={index} className="flex items-center space-x-12 whitespace-nowrap">
                <span className="inline-block align-middle pt-px">{project}</span>
                <img src={barcodeImg} alt="barcode" className="h-3 md:h-3.5 w-auto opacity-50 align-middle" />
              </div>
            ))}
        </div>
      </div>

      {/* Central content */}
      <div className="relative z-10">
        {/* MOBILE NAME BAR — full width, centered; spacer prevents overlap */}
        <div className="md:hidden absolute -top-8 left-1/2 -translate-x-1/2 w-screen z-20">
          <div className="bg-depo-blue text-primary-foreground py-4 flex justify-center">
            <span className="typing-clip font-semibold tracking-[0.2em] uppercase text-center text-[clamp(1.25rem,5.2vw,1.6rem)]">
              Oleksii Zarytskyi
            </span>
          </div>
        </div>
        {/* Spacer to push hero text below the absolute bar (mobile only) */}
        <div className="md:hidden h-14" />

        {/* Logo */}
        <div className="text-center mb-20">
          
        </div>

        {/* Main Hero Text */}
        <div className="text-center max-w-7xl mx-auto mb-20">
          <h1 className="text-[clamp(4rem,14vw,15rem)] font-black leading-[0.75] tracking-tight">
            <div className="overflow-hidden mb-4">
              <div 
                className="block transform"
                style={{ animation: 'slideUp 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.6s backwards' }}
              >
                I create
              </div>
            </div>
            <div className="overflow-hidden mb-4">
              <div 
                className="block text-depo-blue transform relative"
                style={{ animation: 'slideUp 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.8s backwards' }}
              >
                standout
                <span className="absolute -top-4 -right-4 w-8 h-8 bg-depo-blue/20 rounded-full animate-pulse"></span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div 
                className="block transform"
                style={{ animation: 'slideUp 1.5s cubic-bezier(0.4, 0, 0.2, 1) 1s backwards' }}
              >
                digital experiences
              </div>
            </div>
          </h1>
        </div>

        {/* Enhanced CTA */}
        <div 
          className="text-center"
          style={{ animation: 'fadeUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1.2s backwards' }}
        >
          <a
            href="/contact"
            className="interactive group relative inline-block"
          >
            <div className="relative z-10 text-xs font-medium tracking-[0.5em] uppercase">
              <span className="inline-block transform group-hover:scale-110 transition-transform duration-500">
                Ready to work with me ?
              </span>
            </div>
            <span className="absolute -bottom-3 left-0 w-full h-px bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-all duration-700 origin-left"></span>
            <div className="absolute -top-2 -right-2 w-2 h-2 bg-depo-blue rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-200"></div>
          </a>
        </div>
      </div>

      {/* Enhanced rotating side text */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="transform rotate-90 origin-center">
          <div className="overflow-hidden h-8">
            <div style={{ animation: 'rotate-projects 15s infinite' }}>
              {rotatingProjects.concat(rotatingProjects[0]).map((project, index) => (
                <div 
                  key={index} 
                  className="h-8 flex items-center text-xs font-medium tracking-[0.3em] uppercase"
                >
                  {project}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* typewriter using clip-path — centered text, faster, full reveal */
        .typing-clip {
          position: relative;
          display: inline-block;
          white-space: nowrap;
          border-right: 2px solid currentColor;
          clip-path: inset(0 100% 0 0);
          animation: typeReveal 0.9s steps(16, end) 0.05s forwards, caretBlink 0.7s step-end infinite;
        }
        @keyframes typeReveal {
          to { clip-path: inset(0 0 0 0); }
        }
        @keyframes caretBlink {
          50% { border-right-color: transparent; }
        }

        @keyframes slideUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
        @keyframes fadeUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleX {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;