import { motion } from "framer-motion";

const Footer = () => {
  const services = [
    "complete website",
    "UI/UX design",
    "IOS Development",
    "web development",
  ];

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25, margin: "0px 0px -10% 0px" },
    transition: { duration: 0.8, ease: "easeOut" as const, delay },
  });

  return (
    <footer className="relative py-32 px-6 bg-primary text-primary-foreground overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="flex space-x-8"
            style={{
              animation: "scroll-horizontal 80s linear infinite",
              width: "calc(400% + 128px)",
            }}
          >
            {Array(4)
              .fill("DESIGN BUREAU")
              .map((text, index) => (
                <span
                  key={index}
                  className="text-[clamp(4rem,20vw,20rem)] font-black whitespace-nowrap opacity-10"
                >
                  {text}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main CTA */}
        <div className="text-center mb-24">
          <motion.h2
            {...reveal(0.1)}
            className="text-[clamp(3rem,10vw,10rem)] font-black leading-[0.8] mb-12"
          >
            <span className="block">Ready to work</span>
            <span className="block text-depo-blue">with me?</span>
          </motion.h2>

          {/* Button with text always visible */}
          <motion.div {...reveal(0.25)} className="inline-block">
            <a href="/contact" className="interactive group relative inline-block isolate">
              <div className="relative z-10 px-12 py-6 border border-primary-foreground text-xs font-medium tracking-[0.4em] uppercase overflow-hidden">
                <span className="relative z-20 transition-colors duration-700 group-hover:text-primary">
                  Start Project
                </span>
                <div className="absolute inset-0 z-10 bg-primary-foreground transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </div>
              <div className="absolute inset-0 -z-10 bg-primary-foreground transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
            </a>
          </motion.div>
        </div>

        {/* Services List */}
        <motion.div {...reveal(0.35)} className="text-center mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-medium tracking-[0.3em] uppercase">
            {services.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 + index * 0.06 }}
                className="group cursor-pointer"
              >
                <span className="relative">
                  {service}
                  <span className="absolute -bottom-2 left-0 w-full h-px bg-primary-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          {...reveal(0.65)}
          className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-primary-foreground/20"
        >
          <div className="text-xs font-medium tracking-[0.4em] uppercase mb-4 md:mb-0">
            © 2022 DIGITAL FORGE
          </div>

          <div className="flex space-x-8 text-xs font-medium tracking-[0.3em] uppercase">
            <a href="/privacy" className="interactive hover:text-depo-blue transition-colors duration-500">
              Privacy
            </a>
            <a href="/terms" className="interactive hover:text-depo-blue transition-colors duration-500">
              Terms
            </a>
            <a href="#" className="interactive hover:text-depo-blue transition-colors duration-500">
              Instagram
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;