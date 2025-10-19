import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  opacity: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const codeSnippets = [
    '</>',
    '{}',
    '[]',
    'React',
    'JS',
    'CSS',
    'HTML',
    '()',
    '=>',
    'const',
    'let',
    'function',
    'useState',
    'useEffect',
    'console.log()',
    'import',
    'export',
    'async',
    'await',
    'return',
    'if',
    'else',
    'for',
    'while',
    'true',
    'false',
    'null',
    'undefined',
    '===',
    '!==',
    '&&',
    '||',
    'map',
    'filter',
    'reduce',
    '.then()',
    '.catch()',
    'try',
    'catch',
    'throw',
    'new',
    'class',
    'extends',
    'super',
    'this',
    'props',
    'state',
    'render()',
    'onClick',
    'onChange',
    'onSubmit',
    'preventDefault()',
    'setTimeout',
    'setInterval',
    'JSON.stringify',
    'localStorage',
    'fetch()',
    'axios',
    'API',
    'REST',
    'GraphQL',
    'MongoDB',
    'SQL',
    'MySQL',
    'PostgreSQL',
    'Firebase',
    'Node.js',
    'Express',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Python',
    'Django',
    'Flask',
    'Git',
    'GitHub',
    'npm',
    'yarn',
    'webpack',
    'babel',
    'eslint',
    'prettier',
    'tailwind',
    'bootstrap',
    'sass',
    'less',
    'styled',
    'emotion',
    'redux',
    'zustand',
    'context',
    'router',
    'hooks',
    'components',
    'props',
    'children',
    'key',
    'ref',
    'useRef',
    'useMemo',
    'useCallback',
    'useContext',
    'useReducer',
    'custom hook',
    'HOC',
    'render prop',
    'compound',
    'portal',
    'suspense',
    'lazy',
    'memo',
    'fragment',
    'strict mode',
    'dev tools',
    'hot reload',
    'live reload',
    'debugging',
    'breakpoint',
    'inspect',
    'network',
    'performance',
    'lighthouse',
    'SEO',
    'accessibility',
    'responsive',
    'mobile first',
    'progressive',
    'PWA',
    'SPA',
    'SSR',
    'SSG',
    'CSR',
    'hydration',
    'code split',
    'lazy load',
    'tree shake',
    'bundle',
    'minify',
    'compress',
    'optimize',
    'cache',
    'CDN',
    'deploy',
    'CI/CD',
    'docker',
    'kubernetes',
    'AWS',
    'Azure',
    'GCP',
    'vercel',
    'netlify',
    'heroku',
    'digital ocean'
  ];

  const colors = [
    '#60A5FA', // blue-400
    '#A78BFA', // purple-400
    '#F472B6', // pink-400
    '#34D399', // emerald-400
    '#FBBF24', // amber-400
    '#F87171', // red-400
    '#06B6D4', // cyan-400
    '#84CC16', // lime-400
  ];

  const createParticle = (x?: number, y?: number): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Particle;

    return {
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      opacity: Math.random() * 0.8 + 0.2,
      size: Math.random() * 10 + 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 300 + 200
    };
  };

  const initParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle());
    }
  };

  const updateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;

      // Mouse interaction
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.vx -= (dx / distance) * force * 0.01;
        particle.vy -= (dy / distance) * force * 0.01;
      }

      // Boundary check with wrapping
      if (particle.x < -50) particle.x = canvas.width + 50;
      if (particle.x > canvas.width + 50) particle.x = -50;
      if (particle.y < -50) particle.y = canvas.height + 50;
      if (particle.y > canvas.height + 50) particle.y = -50;

      // Fade out near end of life
      if (particle.life > particle.maxLife * 0.8) {
        particle.opacity = Math.max(0, particle.opacity - 0.01);
      }

      // Remove dead particles and create new ones
      if (particle.life > particle.maxLife || particle.opacity <= 0) {
        particlesRef.current[index] = createParticle();
      }
    });
  };

  const drawParticles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(particle => {
      ctx.save();
      
      // Set styles
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.font = `${particle.size}px 'Fira Code', 'Monaco', 'Consolas', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Add subtle glow effect
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = 5;

      // Draw the text
      ctx.fillText(particle.text, particle.x, particle.y);
      
      ctx.restore();
    });
  };

  const animate = () => {
    updateParticles();
    drawParticles();
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  };

  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    initParticles();

    // Start animation
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default ParticleSystem;