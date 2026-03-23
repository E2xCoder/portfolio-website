'use client';

import { useEffect, useRef } from 'react';

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
    for (let x = 0; x < columns; x++) drops[x] = Math.random() * canvas.height;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F4';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    return () => { clearInterval(interval); window.removeEventListener('resize', resizeCanvas); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20" style={{ zIndex: 1 }} />;
};

export default function Projects() {
  const projects = [
    {
      title: "Password Strength Analyzer",
      description: "Analyzes password complexity with real-time feedback, supports MD5, SHA-256, NTLM, bcrypt hash types and color-coded terminal output.",
      image: "https://i.ibb.co/1JTc3jNQ/PassChecker.png",
      link: "https://github.com/E2xCoder/Password-Strength-Control",
      tech: ["Python", "Cybersecurity", "CLI Tool", "Security Tool"]
    },
    {
      title: "Network IP Monitoring",
      description: "Tracks IPv4/IPv6 address changes, logs them daily and sends instant Telegram alerts for basic network monitoring.",
      image: "https://i.ibb.co/TB6V1zYq/Whats-App-Image-2025-07-28-at-00-26-27-723cf510.jpg",
      link: "https://github.com/E2xCoder/Network-IP-Monitoring",
      tech: ["Bash", "Networking", "Telegram API"]
    },
    {
      title: "Library Management System",
      description: "Python OOP project with Student/Teacher roles, borrowing limits and book availability tracking.",
      image: "https://i.ibb.co/RpZHtBsZ/Screenshot-2025-07-28-002151.png",
      link: "https://github.com/E2xCoder/library-management-system",
      tech: ["Python", "OOP", "Class Design"]
    },
  ];

  return (
    <section id="projects" className="gradient-projects sec-pad relative overflow-hidden" style={{ marginTop: '-150px', paddingTop: '10px' }}>
      <MatrixRain />
      <div className="floating-gradient floating-gradient-1" style={{ zIndex: 2 }}></div>
      <div className="floating-gradient floating-gradient-2" style={{ zIndex: 2 }}></div>
      <div className="floating-gradient floating-gradient-3" style={{ zIndex: 2 }}></div>

      <div className="main-container relative z-10">
        <h2 className="heading-sec animate-fade-in-up"><span>Projects</span></h2>

        <div className="flex flex-col gap-4 mt-16 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-6 rounded-2xl border border-white/10 p-4 backdrop-blur-lg transition-all duration-300 hover:border-blue-500/50"
              style={{ backgroundColor: 'var(--color-bg-secondary)', zIndex: 5 }}
            >
              <span className="text-3xl font-black text-white/10 group-hover:text-blue-500/40 transition-colors duration-300 w-8 shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent truncate">
                  {project.title}
                </h3>
                <p className="text-xs opacity-60 mt-0.5 line-clamp-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <svg className="w-5 h-5 text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ))}
        </div>

        <div className="text-center mt-16 relative z-10">
          <div className="gradient-card inline-block p-8 rounded-2xl backdrop-blur-lg border border-white/10">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>More Projects Coming Soon!</h3>
            <p className="text-primary opacity-80 mb-6">Currently working on exciting new projects. Stay tuned for updates!</p>
            <a href="https://github.com/E2xCoder" target="_blank" rel="noopener noreferrer" className="btn-gradient">View GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}