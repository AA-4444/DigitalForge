import { useState } from 'react';

const AwardsButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const awards = [
    'Discovery & Scope',
        'UX Mapping',
        'Design Concepts',
        'Build & Integrations',
        'QA & Launch',
        'Support & Iteration',
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <button
        className="interactive group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Button */}
        <div className="relative z-10 w-16 h-16 bg-depo-blue text-primary-foreground rounded-full flex items-center justify-center font-black  text-[10px] tracking-wider overflow-hidden group-hover:scale-110 transition-all duration-500">
          <span className="relative z-10 transform group-hover:rotate-12 transition-transform duration-300">
            PROCESS
          </span>
          <div className="absolute inset-0 bg-primary-foreground transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
        </div>
        
        {/* Expanding Awards List */}
        <div className={`absolute bottom-20 right-0 space-y-2 transition-all duration-700 ${
          isHovered 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4 pointer-events-none'
        }`}>
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-background text-foreground px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase whitespace-nowrap border border-border backdrop-blur-sm"
              style={{
                animationDelay: `${index * 0.1}s`,
                transform: isHovered ? 'translateX(0)' : 'translateX(20px)',
                transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`
              }}
            >
              {award}
            </div>
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array(6).fill(null).map((_, index) => (
            <div
              key={index}
              className={`absolute w-1 h-1 bg-depo-blue rounded-full transition-all duration-1000 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${index * 0.2}s`,
                animation: isHovered ? 'float 2s ease-in-out infinite' : 'none'
              }}
            ></div>
          ))}
        </div>
      </button>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-10px) scale(1.2); 
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AwardsButton;