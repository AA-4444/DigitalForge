import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  if (isComplete) {
    return (
      <div 
        className="fixed inset-0 z-50 bg-background flex items-center justify-center"
        style={{
          animation: 'slideUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          animationDelay: '0.5s'
        }}
      >
        <div className="text-center">
          <div className="text-[clamp(4rem,15vw,15rem)] font-black leading-none mb-8">
            <span 
              className="block"
              style={{
                animation: 'fadeUp 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards'
              }}
            >
               DIGITAL
            </span>
            <span 
              className="block text-depo-blue"
              style={{
                animation: 'fadeUp 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s backwards'
              }}
            >
              FORGE
            </span>
          </div>
          
          <div 
            className="w-32 h-px bg-foreground mx-auto mb-8"
            style={{
              animation: 'scaleX 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s backwards'
            }}
          ></div>
          
          <div 
            className="text-xs font-medium tracking-[0.4em] uppercase"
            style={{
              animation: 'fadeUp 1s cubic-bezier(0.4, 0, 0.2, 1) 0.8s backwards'
            }}
          >
            Independent Digital Creator
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <div className="text-center">
        {/* Progress Counter */}
        <div className="text-[clamp(8rem,20vw,20rem)] font-black leading-none mb-8 tabular-nums">
          {progress.toString().padStart(3, '0')}
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-px bg-border mx-auto mb-8 overflow-hidden">
          <div 
            className="h-full bg-foreground transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-xs font-medium tracking-[0.4em] uppercase opacity-60">
          Loading Experience
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        @keyframes fadeUp {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleX {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;