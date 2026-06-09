'use client';

import { useEffect, useRef, useState } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff4120';
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-20"
      style={{ zIndex: 1 }}
    />
  );
};

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [started, text]);

  return <span>{displayed}<span className="animate-pulse">▋</span></span>;
};

export default function About() {
  const skills: Record<string, string[]> = {
    'Core Skills': ['Python', 'C++', 'Linux', 'Bash', 'MySQL'],
    'Security Tools': ['Nmap', 'Nikto', 'Wireshark'],
    'Data & Design': ['Tableau', 'RStudio', 'FreeCAD'],
    'Game Dev': ['Unreal Engine 5'],
  };

  const terminalLines = [
    { cmd: 'whoami', out: 'Emre Eren — CS Student @ BSBI Berlin' },
    { cmd: 'cat origin.txt', out: 'Roots in Turkey 🇹🇷 · Raised in Kuwait 🇰🇼 · Living in Berlin 🇩🇪' },
    { cmd: 'cat interests.txt', out: 'Cybersecurity • Software Dev • Game Dev' },
    { cmd: 'echo $FOCUS', out: 'Breaking things to understand them. Fixing them better.' },
  ];

  return (
    <section id="about" className="sec-pad relative overflow-hidden scroll-mt-28" style={{ background: '#020c02' }}>
      <MatrixRain />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          zIndex: 2,
        }}
      />

      <div className="main-container relative z-10">

        {/* Section Header */}
        <div className="mb-16 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-green-400 font-mono text-sm opacity-70">root@portfolio:~$</span>
            <span className="text-green-300 font-mono text-sm">cat about.md</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black font-mono" style={{ color: '#00ff41', textShadow: '0 0 30px #00ff4160' }}>
            {'<about_me />'}
          </h2>
          <div className="w-32 h-px mt-4" style={{ background: 'linear-gradient(90deg, #00ff41, transparent)' }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT — Terminal Block */}
          <div className="animate-fade-in-left space-y-6">

            {/* Terminal window */}
            <div className="rounded-xl overflow-hidden border border-green-900/50" style={{ background: '#050f05', boxShadow: '0 0 40px #00ff4115' }}>
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-green-900/40" style={{ background: '#0a1a0a' }}>
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs font-mono text-green-600">emre@portfolio ~ zsh</span>
              </div>

              {/* Terminal content */}
              <div className="p-6 space-y-4 font-mono text-sm">
                {terminalLines.map((line, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">❯</span>
                      <span className="text-green-300">{line.cmd}</span>
                    </div>
                    <div className="mt-1 pl-5 text-green-400/80 leading-relaxed">{line.out}</div>
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-green-500">❯</span>
                  <TypingText text="ls -la current_status/" delay={800} />
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: '2nd', label: 'Year', icon: '🎓' },
                { val: 'Berlin', label: 'Location', icon: '📍' },
                { val: '5+', label: 'Certs', icon: '🏆' },
              ].map(({ val, label, icon }) => (
                <div
                  key={label}
                  className="rounded-xl p-4 text-center border border-green-900/40 hover:border-green-500/40 transition-all duration-300 group cursor-default"
                  style={{ background: '#050f05' }}
                >
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-lg font-black font-mono" style={{ color: '#00ff41' }}>{val}</div>
                  <div className="text-xs font-mono text-green-700">{label}</div>
                </div>
              ))}
            </div>

            {/* Focus tags */}
            <div className="flex flex-wrap gap-3">
              {['🛡️ Cybersecurity', '💻 Software Dev', '🎮 Game Dev'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-lg text-sm font-mono border border-green-800/50 hover:border-green-400/60 hover:shadow-lg transition-all duration-300 cursor-default"
                  style={{ color: '#00ff41', background: 'rgba(0,255,65,0.05)', textShadow: '0 0 8px #00ff4140' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — Skills */}
          <div className="animate-fade-in-right space-y-6">
            <div className="rounded-xl border border-green-900/50 overflow-hidden" style={{ background: '#050f05', boxShadow: '0 0 40px #00ff4110' }}>
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-green-900/40" style={{ background: '#0a1a0a' }}>
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs font-mono text-green-600">skills.txt — read only</span>
              </div>

              <div className="p-6 space-y-8 font-mono">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-green-600 text-xs">##</span>
                      <span className="text-green-400 text-xs uppercase tracking-widest">{category}</span>
                      <div className="flex-1 h-px bg-green-900/50" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((name) => (
                        <span
                          key={name}
                          className="px-3 py-1 rounded-full text-xs font-mono border border-green-800/60 hover:border-green-400/70 transition-all duration-200 cursor-default"
                          style={{ color: '#00ff41', background: 'rgba(0,255,65,0.06)', textShadow: '0 0 6px #00ff4130' }}
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-2 border-t border-green-900/40">
                  <p className="text-green-700 text-xs text-center">
                    // always_learning = true · skills.push(new_tech) 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}