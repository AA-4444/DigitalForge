import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const FeaturedWorkSection = () => {
  const featuredProjects = [
    {
      title: "Orb Space",
      subtitle: "Digital Experience",
      category: "Web Design & Development",
      image: project1,
      year: "2023"
    },
    {
      title: "Stabondar",
      subtitle: "Creative Portfolio",
      category: "UI/UX Design",
      image: project2,
      year: "2023"
    },
    {
      title: "Kutsenko",
      subtitle: "Photography Studio",
      category: "Brand & Web",
      image: project3,
      year: "2022"
    }
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 
            className="text-[clamp(2rem,8vw,8rem)] font-black leading-[0.8] mb-8"
            style={{ animation: 'fadeUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards' }}
          >
            Featured Work
          </h2>
          <div 
            className="w-24 h-px bg-foreground mx-auto mb-12"
            style={{ animation: 'scaleX 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s backwards' }}
          ></div>
          <p 
            className="text-lg opacity-80 max-w-2xl mx-auto"
            style={{ animation: 'fadeUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.6s backwards' }}
          >
            A selection of our most awarded projects that showcase our commitment to excellence
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-32">
          {featuredProjects.map((project, index) => (
            <div 
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              style={{ animation: `fadeUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${0.8 + index * 0.2}s backwards` }}
            >
              {/* Project Image */}
              <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Year Badge */}
                <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium tracking-[0.2em] uppercase">
                  {project.year}
                </div>
              </div>

              {/* Project Info */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="space-y-6">
                  <div className="text-xs font-medium tracking-[0.3em] uppercase text-depo-blue">
                    {project.category}
                  </div>
                  
                  <div>
                    <h3 className="text-[clamp(2rem,6vw,6rem)] font-black leading-[0.8] mb-2">
                      {project.title}
                    </h3>
                    <h4 className="text-[clamp(1rem,3vw,3rem)] font-medium opacity-60">
                      {project.subtitle}
                    </h4>
                  </div>
                  
                  <div className="w-16 h-px bg-foreground"></div>
                  
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    Award-winning digital experience that combines beautiful design with seamless functionality. 
                    Recognized for excellence in both creative and technical execution.
                  </p>
                  
                  <a 
                    href={`/projects/${project.title.toLowerCase()}`}
                    className="interactive group inline-flex items-center text-xs font-medium tracking-[0.3em] uppercase hover:text-depo-blue transition-colors duration-500"
                  >
                    <span className="mr-4">View Project</span>
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div 
          className="text-center mt-32"
          style={{ animation: 'fadeUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1.8s backwards' }}
        >
          <a 
            href="/work"
            className="interactive group relative inline-block"
          >
            <div className="relative z-10 px-8 py-4 border border-foreground text-xs font-medium tracking-[0.4em] uppercase overflow-hidden">
              <span className="relative z-10">View All Work</span>
              <div className="absolute inset-0 bg-foreground transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            </div>
            <div className="absolute inset-0 bg-foreground transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleX {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
};

export default FeaturedWorkSection;