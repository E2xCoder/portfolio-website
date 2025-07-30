'use client';

import { useEffect, useRef } from 'react';

// Liquid Morphing Animation Component
const LiquidMorphing = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Liquid blob parameters
    let time = 0;
    const blobs: Array<{
      x: number;
      y: number;
      baseRadius: number;
      color: string;
      speed: number;
      phase: number;
      opacity: number;
    }> = [];

    // Create blobs
    const createBlobs = () => {
      blobs.length = 0;
      const blobCount = 4;
      
      const colors = [
        'rgba(99, 102, 241, 0.15)',   // Blue
        'rgba(139, 92, 246, 0.12)',  // Purple  
        'rgba(59, 130, 246, 0.18)',  // Light blue
        'rgba(168, 85, 247, 0.10)'   // Magenta
      ];

      for (let i = 0; i < blobCount; i++) {
        blobs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseRadius: 80 + Math.random() * 120,
          color: colors[i % colors.length],
          speed: 0.5 + Math.random() * 0.8,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.3 + Math.random() * 0.4
        });
      }
    };

    createBlobs();

    // Mouse interaction
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Metaball function for smooth blending
    const drawMetaballs = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let x = 0; x < canvas.width; x += 2) {
        for (let y = 0; y < canvas.height; y += 2) {
          let sum = 0;
          let r = 0, g = 0, b = 0, a = 0;

          blobs.forEach(blob => {
            const dx = x - blob.x;
            const dy = y - blob.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < blob.baseRadius * 2) {
              const influence = (blob.baseRadius * blob.baseRadius) / (distance * distance + 1);
              sum += influence;
              
              // Color blending
              const color = blob.color.match(/\d+\.?\d*/g);
              if (color) {
                r += parseInt(color[0]) * influence;
                g += parseInt(color[1]) * influence;
                b += parseInt(color[2]) * influence;
                a += parseFloat(color[3] || '1') * influence;
              }
            }
          });

          if (sum > 0.5) {
            const pixelIndex = (y * canvas.width + x) * 4;
            const normalizedSum = Math.min(sum, 2) / 2;
            
            data[pixelIndex] = Math.min(255, r / sum * 255);     // R
            data[pixelIndex + 1] = Math.min(255, g / sum * 255); // G
            data[pixelIndex + 2] = Math.min(255, b / sum * 255); // B
            data[pixelIndex + 3] = Math.min(255, a / sum * normalizedSum * 100); // A
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with slight trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.008;

      // Update blob positions
      blobs.forEach((blob, index) => {
        // Organic movement with sine waves
        const baseX = canvas.width * (0.2 + 0.6 * ((index % 2) + 1) / 3);
        const baseY = canvas.height * (0.3 + 0.4 * (index + 1) / 5);
        
        blob.x = baseX + Math.sin(time * blob.speed + blob.phase) * 100 +
                 Math.cos(time * blob.speed * 0.7 + blob.phase) * 60;
        blob.y = baseY + Math.cos(time * blob.speed + blob.phase) * 80 +
                 Math.sin(time * blob.speed * 1.3 + blob.phase) * 40;

        // Mouse attraction (subtle)
        const dx = mouseX - blob.x;
        const dy = mouseY - blob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200 * 0.5;
          blob.x += dx * force * 0.05;
          blob.y += dy * force * 0.05;
        }

        // Dynamic radius
        blob.baseRadius = 80 + Math.sin(time * 2 + blob.phase) * 30;

        // Keep blobs in bounds
        blob.x = Math.max(50, Math.min(canvas.width - 50, blob.x));
        blob.y = Math.max(50, Math.min(canvas.height - 50, blob.y));
      });

      // Draw with gradient fills instead of metaballs for better performance
      blobs.forEach(blob => {
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.baseRadius
        );
        
        const color = blob.color.match(/\d+\.?\d*/g);
        if (color) {
          gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${blob.opacity})`);
          gradient.addColorStop(0.7, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${blob.opacity * 0.4})`);
          gradient.addColorStop(1, 'transparent');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.baseRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

export default function About() {
  const skills = ["Python", "MySQL", "RStudio", "Nmap", "Bash Scripting"];

  return (
    <section id="about" className="gradient-about sec-pad relative overflow-hidden">
      {/* Liquid Morphing Background */}
      <LiquidMorphing />
      
      {/* Enhanced decorative elements */}
      <div 
        className="absolute top-20 right-10 w-20 h-20 rounded-full opacity-10 animate-pulse"
        style={{ 
          background: 'linear-gradient(45deg, var(--color-accent-blue), transparent)',
          zIndex: 2
        }}
      ></div>
      <div 
        className="absolute bottom-32 left-16 w-16 h-16 rounded-full opacity-8 animate-pulse"
        style={{ 
          background: 'linear-gradient(-45deg, var(--color-accent-blue), transparent)',
          animationDelay: '1s',
          zIndex: 2
        }}
      ></div>

      <div className="main-container relative z-10">
        <h2 className="heading-sec animate-fade-in-up">
          <span>About Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Bio Section */}
          <div className="animate-fade-in-left">
            {/* Card wrapper with enhanced gradient and liquid-inspired styling */}
            <div 
              className="backdrop-blur-lg rounded-3xl p-8 border border-opacity-30 hover:border-opacity-50 transition-all duration-500 hover:scale-[1.02] group relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {/* Liquid-inspired flowing border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div 
                  className="absolute inset-0 rounded-3xl animate-pulse"
                  style={{
                    background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                    filter: 'blur(1px)'
                  }}
                ></div>
              </div>

              <h3 className="text-3xl font-bold mb-6 relative z-10" style={{ color: 'var(--color-text-primary)' }}>
                Get to know me
              </h3>
              
              <div className="space-y-4 relative z-10">
                <p className="text-primary leading-relaxed hover:text-opacity-100 transition-all duration-300">
                  Hey! I'm <strong style={{ color: 'var(--color-accent-blue)' }}>Emre Eren</strong>. 
                  I'm studying Computer Science in BSBI. I was born in Kuwait and have my roots in Turkey. 
                </p>
                
                <p className="text-primary leading-relaxed hover:text-opacity-100 transition-all duration-300">
                  I'm mainly interested in{' '}
                  <strong style={{ color: 'var(--color-accent-blue)' }}>Cybersecurity</strong>, 
                  but I also like software development, ML, and game development.
                </p>
                
                <p className="text-primary leading-relaxed hover:text-opacity-100 transition-all duration-300">
                  I enjoy turning ideas into real projects and bringing them to life. I like figuring out 
                  how things work, writing code, finding bugs, or just making things better.
                </p>
              </div>

              {/* Enhanced stats with liquid-inspired hover effects */}
              <div className="mt-8 grid grid-cols-2 gap-6 relative z-10">
                <div className="text-center group/stat cursor-pointer p-4 rounded-2xl transition-all duration-300 hover:bg-white/5">
                  <div 
                    className="text-2xl font-bold mb-1 group-hover/stat:scale-110 transition-transform duration-300"
                    style={{ color: 'var(--color-accent-blue)' }}
                  >
                    1st Year
                  </div>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    👨🏻‍🎓
                  </div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-2 transform scale-0 group-hover/stat:scale-100 transition-transform duration-500"></div>
                </div>
                <div className="text-center group/stat cursor-pointer p-4 rounded-2xl transition-all duration-300 hover:bg-white/5">
                  <div 
                    className="text-2xl font-bold mb-1 group-hover/stat:scale-110 transition-transform duration-300"
                    style={{ color: 'var(--color-accent-blue)' }}
                  >
                    Berlin
                  </div>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Current Location
                  </div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-2 transform scale-0 group-hover/stat:scale-100 transition-transform duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="animate-fade-in-right">
            <div 
              className="backdrop-blur-lg rounded-3xl p-8 border border-opacity-30 hover:border-opacity-50 transition-all duration-500 hover:scale-[1.02] group relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {/* Liquid-inspired flowing border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div 
                  className="absolute inset-0 rounded-3xl animate-pulse"
                  style={{
                    background: 'linear-gradient(-45deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
                    filter: 'blur(1px)',
                    animationDelay: '0.5s'
                  }}
                ></div>
              </div>

              <h3 className="text-3xl font-bold mb-6 relative z-10" style={{ color: 'var(--color-text-primary)' }}>
                My Skills
              </h3>
              
              <div className="space-y-4 mb-8 relative z-10">
                <p className="text-primary hover:text-opacity-100 transition-all duration-300">
                  Here are the technologies and tools I work with:
                </p>
              </div>

              <div className="flex flex-wrap gap-4 relative z-10">
                {skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="group/skill px-6 py-3 rounded-2xl text-lg font-medium cursor-default transition-all duration-500 hover:scale-110 hover:-translate-y-2 border border-opacity-30 relative overflow-hidden"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      color: 'var(--color-text-primary)',
                      borderColor: 'var(--color-border)',
                      animationDelay: `${index * 0.1}s`,
                      boxShadow: 'var(--shadow-sm)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-blue)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = 'var(--color-accent-blue)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    }}
                  >
                    {/* Liquid ripple effect on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover/skill:translate-x-full transition-transform duration-700"></div>
                    </div>
                    
                    <span className="relative z-10">{skill}</span>
                    
                    {/* Enhanced icon with liquid animation */}
                    <span 
                      className="ml-2 opacity-50 group-hover/skill:opacity-100 group-hover/skill:rotate-12 group-hover/skill:scale-125 transition-all duration-300 relative z-10 inline-block"
                    >
                      ⚡
                    </span>
                  </div>
                ))}
              </div>

              {/* Enhanced call-to-action */}
              <div className="mt-8 p-6 rounded-2xl relative overflow-hidden group/cta" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500"></div>
                <p className="text-sm text-center relative z-10 group-hover/cta:text-white transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>
                  Always learning and expanding my skillset! 🚀
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Focus Areas with liquid theme */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div 
            className="text-center backdrop-blur-lg rounded-3xl p-8 border border-opacity-30 hover:border-opacity-50 transition-all duration-500 hover:scale-[1.01] group relative overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'var(--color-border)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {/* Flowing background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000">
              <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-purple-500/5 to-transparent animate-pulse"></div>
            </div>

            <h3 className="text-2xl font-bold mb-4 relative z-10" style={{ color: 'var(--color-text-primary)' }}>
              Current Focus
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-lg relative z-10">
              {[
                { icon: '🛡️', text: 'Cybersecurity', delay: '0s' },
                { icon: '💻', text: 'Software Development', delay: '0.1s' },
                { icon: '🤖', text: 'Machine Learning', delay: '0.2s' }
              ].map((focus, index) => (
                <span 
                  key={focus.text}
                  className="px-6 py-3 rounded-2xl border transition-all duration-500 hover:scale-110 hover:-translate-y-1 cursor-pointer group/focus relative overflow-hidden"
                  style={{ 
                    color: 'var(--color-accent-blue)', 
                    borderColor: 'var(--color-accent-blue)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    animationDelay: focus.delay
                  }}
                >
                  {/* Liquid hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover/focus:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">
                    <span className="inline-block group-hover/focus:rotate-12 group-hover/focus:scale-125 transition-transform duration-300 mr-2">
                      {focus.icon}
                    </span>
                    {focus.text}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}