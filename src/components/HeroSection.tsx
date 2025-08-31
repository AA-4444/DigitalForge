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

  const floatingElements = Array(12)
    .fill(null)
    .map((_, index) => ({
      id: index,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 overflow-hidden overflow-x-clip">
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
              animationDelay: `${element.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Scrolling project ticker */}
      <div className="absolute top-10 left-0 w-full overflow-hidden opacity-20">
        <div
          className="flex items-center space-x-12 text-xs md:text-sm font-medium tracking-[0.3em] uppercase leading-[1.15] py-[2px] [will-change:transform]"
          style={{ animation: "scroll-horizontal 60s linear infinite", transform: "translateZ(0)" }}
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
        {/* MOBILE RIGHT SLIDE NAME PANEL (локальная для Hero) */}
        <div
          className="md:hidden absolute right-0 z-20 translate-x-6"  
          style={{ top: "-85px" }}
        >
          <div
            className="bg-depo-blue text-primary-foreground rounded-l-3xl shadow-lg"
            style={{
              width: "55vw",
              padding: "30px 20px",
              animation: "panelIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both",
            }}
          >
            <div className="overflow-hidden">
              <span
                className="block font-black tracking-[0.2em] text-[clamp(1.1rem,5vw,1.5rem)] leading-tight"
                style={{ animation: "nameIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both" }}
              >
                Oleksii
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                className="block font-black tracking-[0.2em] text-[clamp(1.1rem,5vw,1.5rem)] leading-tight"
                style={{ animation: "nameIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both" }}
              >
                Zarytskyi
              </span>
            </div>
          </div>
        </div>

       
        <div className="md:hidden h-24" />

        {/* Main Hero Text */}
        <div className="max-w-7xl mx-auto mb-20">
          <h1
            className="
              w-full text-left md:text-center font-black tracking-tight
              text-[clamp(2.5rem,12vw,15rem)]
              max-md:text-[clamp(3rem,18vw,6rem)]
              leading-[1] md:leading-[1.02]
            "
          >
            
            <div
              className="
                overflow-hidden
                pt-[0.08em] pb-[0.12em]      /* mobile safe pocket */
                -mt-[0.12em] -mb-[0.12em]    /* mobile visual squeeze */
                md:pt-[0.06em] md:pb-[0.10em]
                md:mt-0 md:mb-0
              "
            >
              <div
                className="block will-change-transform"
                style={{ animation: "slideUp 1.5s cubic-bezier(0.4,0,0.2,1) 0.6s backwards", transform: "translateZ(0)" }}
              >
                I create
              </div>
            </div>

         
            <div
              className="
                overflow-hidden
                pt-[0.08em] pb-[0.12em]
                -mt-[0.12em] -mb-[0.12em]
                md:pt-[0.06em] md:pb-[0.10em]
                md:mt-0 md:mb-0
              "
            >
              <div
                className="block relative will-change-transform"
                style={{ animation: "slideUp 1.5s cubic-bezier(0.4,0,0.2,1) 0.8s backwards", transform: "translateZ(0)" }}
              >
                <span className="text-depo-blue">standout</span>
                <span className="absolute -top-4 -right-4 w-8 h-8 bg-depo-blue/20 rounded-full animate-pulse" />
              </div>
            </div>

          
<div
  className="
    overflow-hidden
    pt-[0.10em] pb-[0.14em]      
    -mt-[0.12em] -mb-[0.12em]
    md:pt-[0.08em] md:pb-[0.12em] 
    md:mt-0 md:mb-0
  "
>
  <div
    className="
      block will-change-transform
      md:whitespace-nowrap           
      md:text-[0.95em] xl:text-[0.92em] 2xl:text-[0.90em]
    "
    style={{ animation: "slideUp 1.5s cubic-bezier(0.4,0,0.2,1) 1s backwards", transform: "translateZ(0)" }}
  >
    digital journey                  
  </div>
</div>
          </h1>
        </div>

        {/* CTA */}
        <div className="text-center" style={{ animation: "fadeUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1.2s backwards" }}>
          <a href="/contact" className="interactive group relative inline-block">
            <div className="relative z-10 text-xs font-medium tracking-[0.5em] uppercase">
              <span className="inline-block transform group-hover:scale-110 transition-transform duration-500">
                Ready to work with me ?
              </span>
            </div>
            <span className="absolute -bottom-3 left-0 w-full h-px bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-all duration-700 origin-left" />
            <div className="absolute -top-2 -right-2 w-2 h-2 bg-depo-blue rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-200" />
          </a>
        </div>
      </div>

      {/* Rotating side text */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="transform rotate-90 origin-center">
          <div className="overflow-hidden h-8">
            <div style={{ animation: "rotate-projects 15s infinite" }}>
              {rotatingProjects.concat(rotatingProjects[0]).map((project, index) => (
                <div key={index} className="h-8 flex items-center text-xs font-medium tracking-[0.3em] uppercase">
                  {project}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes panelIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes nameIn {
          from { transform: translateX(40%); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
        @keyframes slideUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
        @keyframes fadeUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0) rotate(0); }
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