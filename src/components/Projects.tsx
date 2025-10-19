'use client';

import { useEffect, useRef } from 'react';

// Matrix Rain Component
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]()';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F4';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-20"
      style={{ zIndex: 1 }}
    />
  );
};

export default function Projects() {
  const projects = [
    {
      title: "Password Strength Analyzer",
      description: "A cybersecurity tool that analyzes password complexity and provides real-time feedback on strength levels. The analyzer checks character diversity (lowercase, uppercase, digits, special characters), supports multiple hash types (MD5, SHA-256, NTLM, bcrypt), and offers security recommendations. Features color-coded terminal output and evaluates passwords as WEAK, MODERATE, or STRONG based on length and character variety.",
      image: "https://i.ibb.co/1JTc3jNQ/PassChecker.png",
      link: "https://github.com/E2xCoder/Password-Strength-Control",
      buttonText: "Check it out!",
      tech: ["Python", "Cybersecurity", "CLI Tool", "Security Tool"]
    },
    {
      title: "Network IP Monitoring",
      description: "A simple Bash script that tracks changes in your device's IPv4 and IPv6 addresses. It logs these changes in daily files and sends instant alerts via Telegram. Designed for basic network monitoring and learning scripting with practical use in cybersecurity.",
      image: "https://i.ibb.co/TB6V1zYq/Whats-App-Image-2025-07-28-at-00-26-27-723cf510.jpg",
      link: "https://github.com/E2xCoder/Network-IP-Monitoring",
      buttonText: "Check it out!",
      tech: ["Bash", "Networking", "Telegram API"]
    },
    {
      title: "Library Management System",
      description: "This Python project is a simple Library Management System. It supports Students and Teachers with different borrowing limits. Members can borrow available books within their limits. Books become unavailable when borrowed and available again after return. The system tracks books, members, and borrowing rules using classes and inheritance.",
      image: "https://i.ibb.co/RpZHtBsZ/Screenshot-2025-07-28-002151.png",
      link: "https://github.com/E2xCoder/library-management-system",
      buttonText: "Check it out!",
      tech: ["Python", "OOP", "Class Design"]
    },
  ];

  const handleOpenLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    window.open(href, '_blank');
  };

  return (
    <section id="projects" className="gradient-projects sec-pad relative overflow-hidden" style={{ marginTop: '-150px', paddingTop: '10px' }}>
      <MatrixRain />
      
      <div className="floating-gradient floating-gradient-1" style={{ zIndex: 2 }}></div>
      <div className="floating-gradient floating-gradient-2" style={{ zIndex: 2 }}></div>
      <div className="floating-gradient floating-gradient-3" style={{ zIndex: 2 }}></div>

      <div className="main-container relative z-10">
        <h2 className="heading-sec animate-fade-in-up">
          <span>Projects</span>
        </h2>

        <div className="space-y-20 mt-16">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`gradient-card-project group relative overflow-hidden rounded-2xl p-8 backdrop-blur-lg border border-white/10 ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                zIndex: 5 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                      {project.title}
                    </h3>
                    
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

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="relative group/image">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm aspect-video">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full transition-transform duration-700 group-hover/image:scale-110"
                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="absolute -top-3 -right-3 opacity-0 group-hover/image:opacity-100 transition-all duration-500 transform translate-y-2 group-hover/image:translate-y-0">
                      <div className="bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white border border-white/20">
                        ✨ Live Project
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 animate-gradient-border"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 relative z-10">
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