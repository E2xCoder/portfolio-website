'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
  tech: string[];
  status: 'ACTIVE' | 'ARCHIVED';
  year: string;
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setTilt({ x: x * 6, y: y * -6 });
  };

  const accentColors = [
    { glow: '#818cf8', from: '#6366f1', to: '#8b5cf6' },
    { glow: '#38bdf8', from: '#0ea5e9', to: '#6366f1' },
    { glow: '#c084fc', from: '#a855f7', to: '#ec4899' },
  ];
  const accent = accentColors[index % accentColors.length];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'translateY(-8px)' : ''}`,
        transition: 'transform 0.15s ease, box-shadow 0.4s ease',
        boxShadow: hovered
          ? `0 30px 80px rgba(0,0,0,0.5), 0 0 40px ${accent.glow}25`
          : '0 8px 32px rgba(0,0,0,0.4)',
      }}
      className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300"
    >
      {/* Glass background */}
      <div className="absolute inset-0" style={{ background: 'rgba(15, 15, 30, 0.7)', backdropFilter: 'blur(20px)' }} />

      {/* Gradient orb behind card */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${accent.from}20, ${accent.to}10)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative grid md:grid-cols-5 z-10">
        {/* Image */}
        <div className="md:col-span-2 relative overflow-hidden" style={{ minHeight: '240px' }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, transparent 60%, rgba(15,15,30,0.95))`,
            }}
          />
          {/* Index badge */}
          <div
            className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black"
            style={{
              background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              boxShadow: `0 4px 15px ${accent.glow}50`,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>
          {/* Status */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: project.status === 'ACTIVE' ? '#4ade80' : '#94a3b8' }}
            />
            <span className="text-xs font-medium" style={{ color: project.status === 'ACTIVE' ? '#4ade80' : '#94a3b8' }}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3 p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: accent.glow }}>
                {project.year}
              </span>
            </div>

            <h3
              className="text-2xl font-black mb-4 leading-tight"
              style={{
                background: `linear-gradient(135deg, #fff 60%, ${accent.glow})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {project.title}
            </h3>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(200,200,220,0.7)' }}>
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-medium rounded-full border"
                  style={{
                    color: accent.glow,
                    borderColor: `${accent.glow}30`,
                    background: `${accent.glow}10`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs" style={{ color: 'rgba(150,150,170,0.5)' }}>
              github.com/E2xCoder
            </span>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                color: '#fff',
                boxShadow: hovered ? `0 8px 25px ${accent.glow}40` : 'none',
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const projects: Project[] = [
    {
      title: 'Linux Firewall Automation',
      description: 'Simple firewall management tool that automates UFW commands on Linux systems with CLI interface for managing ports, blocking IPs and firewall rules.',
      image: 'https://i.ibb.co/8DCD94Ck/1775337586117.jpg',
      link: 'https://github.com/E2xCoder/linux-firewall-automation',
      tech: ['Python', 'Linux', 'UFW', 'CLI Tool'],
      status: 'ACTIVE',
      year: '2026',
    },
    {
      title: 'Password Strength Analyzer',
      description: 'Analyzes password complexity with real-time feedback, supports MD5, SHA-256, NTLM, bcrypt hash types and color-coded terminal output.',
      image: 'https://i.ibb.co/1JTc3jNQ/PassChecker.png',
      link: 'https://github.com/E2xCoder/Password-Strength-Control',
      tech: ['Python', 'Cybersecurity', 'CLI Tool', 'Security Tool'],
      status: 'ACTIVE',
      year: '2025',
    },
    {
      title: 'Network IP Monitoring',
      description: 'Tracks IPv4/IPv6 address changes, logs them daily and sends instant Telegram alerts for basic network monitoring.',
      image: 'https://i.ibb.co/TB6V1zYq/Whats-App-Image-2025-07-28-at-00-26-27-723cf510.jpg',
      link: 'https://github.com/E2xCoder/Network-IP-Monitoring',
      tech: ['Bash', 'Networking', 'Telegram API'],
      status: 'ACTIVE',
      year: '2025',
    },
    {
      title: 'Library Management System',
      description: 'Python OOP project with Student/Teacher roles, borrowing limits and book availability tracking.',
      image: 'https://i.ibb.co/RpZHtBsZ/Screenshot-2025-07-28-002151.png',
      link: 'https://github.com/E2xCoder/library-management-system',
      tech: ['Python', 'OOP', 'Class Design'],
      status: 'ARCHIVED',
      year: '2024',
    },
  ];

  return (
    <section
      id="projects"
      className="sec-pad relative overflow-hidden scroll-mt-28"
      style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0d0d24 50%, #0a0a1a 100%)' }}
    >
      {/* Ambient orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />

      <div className="main-container relative z-10">
        {/* Header */}
        <div className="mb-16 animate-fade-in-up">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#6366f1' }}>
            — Selected Work
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
            My <span style={{
              background: 'linear-gradient(135deg, #818cf8, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Projects</span>
          </h2>
          <div className="w-20 h-1 rounded-full mt-4" style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} />
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center animate-fade-in-up">
          <div
            className="inline-block rounded-2xl p-8 border border-white/10"
            style={{ background: 'rgba(15,15,30,0.6)', backdropFilter: 'blur(20px)' }}
          >
            <p className="text-white/50 text-sm mb-6">More projects in progress — check GitHub for latest commits</p>
            <a
              href="https://github.com/E2xCoder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                boxShadow: '0 8px 30px rgba(99,102,241,0.3)',
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View All on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}