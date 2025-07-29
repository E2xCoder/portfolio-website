'use client';

import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      title: "Library Management System",
      description: "This Python project is a simple Library Management System. It supports Students and Teachers with different borrowing limits. Members can borrow available books within their limits. Books become unavailable when borrowed and available again after return. The system tracks books, members, and borrowing rules using classes and inheritance.",
      image: "https://i.ibb.co/RpZHtBsZ/Screenshot-2025-07-28-002151.png",
      link: "https://github.com/E2xCoder/library-management-system",
      buttonText: "Check it out!",
      tech: ["Python", "OOP", "Class Design"]
    },
    {
      title: "Network IP Monitoring",
      description: "A simple Bash script that tracks changes in your device's IPv4 and IPv6 addresses. It logs these changes in daily files and sends instant alerts via Telegram. Designed for basic network monitoring and learning scripting with practical use in cybersecurity.",
      image: "https://i.ibb.co/TB6V1zYq/Whats-App-Image-2025-07-28-at-00-26-27-723cf510.jpg",
      link: "https://github.com/E2xCoder/Network-IP-Monitoring",
      buttonText: "Check it out!",
      tech: ["Bash", "Networking", "Telegram API"]
    },  
  ];

  const handleOpenLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    window.open(href, '_blank');
  };

  return (
    <section id="projects" className="gradient-projects sec-pad relative overflow-hidden">
      {/* Floating Gradient Elements */}
      <div className="floating-gradient floating-gradient-1"></div>
      <div className="floating-gradient floating-gradient-2"></div>
      <div className="floating-gradient floating-gradient-3"></div>

      <div className="main-container relative z-10">
        <h2 className="heading-sec animate-fade-in-up">
          <span>Projects</span>
        </h2>

        <div className="space-y-24 mt-16">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`gradient-card-project group relative overflow-hidden rounded-2xl p-8 backdrop-blur-lg border border-white/10 ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Card Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                      {project.title}
                    </h3>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 hover:border-blue-400/50 transition-colors duration-300"
                          style={{ animationDelay: `${techIndex * 0.1}s` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="text-primary leading-relaxed text-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      {project.description}
                    </p>

                    <div className="pt-4">
                      <a
                        href={project.link}
                        onClick={(e) => handleOpenLink(e, project.link)}
                        className="btn-gradient inline-flex items-center gap-2 group/btn"
                      >
                        <span>{project.buttonText}</span>
                        <svg 
                          className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="relative group/image">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Image Container */}
                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={500}
                        height={300}
                        className="w-full h-auto transition-transform duration-700 group-hover/image:scale-110"
                      />
                      
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Floating Tech Labels */}
                    <div className="absolute -top-3 -right-3 opacity-0 group-hover/image:opacity-100 transition-all duration-500 transform translate-y-2 group-hover/image:translate-y-0">
                      <div className="bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white border border-white/20">
                        ✨ Live Project
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 animate-gradient-border"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="gradient-card inline-block p-8 rounded-2xl backdrop-blur-lg border border-white/10">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              More Projects Coming Soon!
            </h3>
            <p className="text-primary opacity-80 mb-6">
              Currently working on exciting new projects. Stay tuned for updates!
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/E2xCoder"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient"
              >
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}