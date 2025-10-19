'use client';

import Image from "next/image";
import { useEffect, useRef } from 'react';

// Neural Network Animation Component
const NeuralNetwork = () => {
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

    // Neural network nodes
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      connections: number[];
      pulsePhase: number;
      activity: number;
    }> = [];

    // Create nodes
    const createNodes = () => {
      nodes.length = 0;
      const nodeCount = Math.min(20, Math.floor((canvas.width * canvas.height) / 15000));
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 2,
          connections: [],
          pulsePhase: Math.random() * Math.PI * 2,
          activity: Math.random()
        });
      }

      // Create connections between nearby nodes
      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + 
              Math.pow(node.y - otherNode.y, 2)
            );
            if (distance < 150 && node.connections.length < 4) {
              node.connections.push(j);
            }
          }
        });
      });
    };

    createNodes();

    // Animation variables
    let time = 0;
    const signals: Array<{
      fromIndex: number;
      toIndex: number;
      progress: number;
      intensity: number;
    }> = [];

    // Create neural signals
    const createSignal = () => {
      if (signals.length < 5 && Math.random() < 0.02) {
        const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (fromNode.connections.length > 0) {
          const toIndex = fromNode.connections[Math.floor(Math.random() * fromNode.connections.length)];
          signals.push({
            fromIndex: nodes.indexOf(fromNode),
            toIndex: toIndex,
            progress: 0,
            intensity: Math.random() * 0.5 + 0.5
          });
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position with gentle movement
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Update activity
        node.activity = (Math.sin(time + node.pulsePhase) + 1) / 2;

        // Draw connections
        node.connections.forEach(connectionIndex => {
          const connectedNode = nodes[connectionIndex];
          if (connectedNode) {
            const opacity = (node.activity + connectedNode.activity) / 4;
            
            // Connection color based on activity
            const hue = 200 + (node.activity * 60); // Blue to cyan
            ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.stroke();
          }
        });

        // Draw node
        const nodeOpacity = 0.4 + node.activity * 0.6;
        const nodeSize = node.radius + node.activity * 2;
        
        // Node glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeSize * 3);
        gradient.addColorStop(0, `hsla(${180 + node.activity * 40}, 70%, 60%, ${nodeOpacity * 0.8})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.fillStyle = `hsla(${180 + node.activity * 40}, 80%, 70%, ${nodeOpacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Create and update signals
      createSignal();
      
      signals.forEach((signal, index) => {
        const fromNode = nodes[signal.fromIndex];
        const toNode = nodes[signal.toIndex];
        
        if (fromNode && toNode) {
          signal.progress += 0.02;
          
          if (signal.progress <= 1) {
            // Calculate signal position
            const x = fromNode.x + (toNode.x - fromNode.x) * signal.progress;
            const y = fromNode.y + (toNode.y - fromNode.y) * signal.progress;
            
            // Draw signal
            const signalOpacity = signal.intensity * (1 - signal.progress * 0.5);
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${signalOpacity})`);
            gradient.addColorStop(0.5, `rgba(100, 200, 255, ${signalOpacity * 0.8})`);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
            
            // Activate destination node when signal arrives
            if (signal.progress > 0.9) {
              toNode.activity = Math.min(1, toNode.activity + 0.3);
            }
          } else {
            signals.splice(index, 1);
          }
        } else {
          signals.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Recreate nodes on resize
    const handleResize = () => {
      resizeCanvas();
      createNodes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30"
      style={{ zIndex: 1 }}
    />
  );
};

export default function Labs() {
  const labProjects = [
    {
      title: "IBM SkillBuild Cybersecurity Fundamentals",
      description: "Covers CIA Triad, five foundational security principles, threat actor groups, cyberattack tactics and social engineering, common attack types, incident response and vulnerability management, IAM and endpoint security, network and application security, encryption techniques, hashing and PKI, security frameworks and compliance, case studies, overall defense strategies, and career roles in cybersecurity.",
      image: "https://i.ibb.co/hF4BVP3S/Screenshot-2025-07-28-024311.png",
      link: "https://drive.google.com/file/d/1LP6U14Tz7w8OLwoZyNbxqDNnYL0s5SRB/view",
      buttonText: "View Certificate",
      provider: "IBM SkillBuild",
      category: "Cybersecurity",
      skills: ["CIA Triad", "Threat Analysis", "IAM", "Encryption", "PKI"]
    },
    {
      title: "Introduction to Linux Course",
      description: "Completed Codecademy Introduction to Linux on Bash Scripting and Users & Permissions. Covered Linux architecture and kernel structure, file system hierarchy, user and group management, file ownership and permission settings, basic shell utilities, navigation commands, Bash scripting fundamentals with real‑world script projects, automation via build scripts and workflow tools.",
      image: "https://i.ibb.co/3y3DKzg9/Ekran-g-r-nt-s-28-7-2025-3227.jpg",
      link: "https://drive.google.com/file/d/1vUuYJmro6n_O70kGLHwjM-AfoPqNzPQ-/view",
      buttonText: "View Certificate",
      provider: "Codecademy",
      category: "Linux",
      skills: ["Linux", "File Systems", "User Management", "Shell", "Automation"]
    },
    {
      title: "Learn Bash Scripting Course",
      description: "Covered Bash shebang (#!/bin/bash), variables and positional arguments, reading user input (read), comparison operators (==, !=), control structures (if‑else, loops), aliases, script permissions and execution, basic automation, script projects and quiz-based validation.",
      image: "https://i.ibb.co/7NRNbX26/Ekran-g-r-nt-s-28-7-2025-326.jpg",
      link: "https://drive.google.com/file/d/1kJ3Ld9v9sj28RBoC0VtmQ2xlCxtRmiti/view",
      buttonText: "View Certificate",
      provider: "Codecademy",
      category: "Scripting",
      skills: ["Bash", "Scripting", "Variables", "Control Flow", "Automation"]
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Cybersecurity': 'from-red-500 to-orange-500',
      'Linux': 'from-green-500 to-teal-500',
      'Scripting': 'from-blue-500 to-purple-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Cybersecurity': '🔐',
      'Linux': '🐧',
      'Scripting': '⚡'
    };
    return icons[category as keyof typeof icons] || '📚';
  };

  return (
    <section id="cyber-labs" className="sec-pad gradient-projects relative overflow-hidden">
      {/* Neural Network Background */}
      <NeuralNetwork />
      
      {/* Floating Gradient Elements - Enhanced for Neural Theme */}
      <div className="floating-gradient floating-gradient-1 opacity-20" style={{ zIndex: 2 }}></div>
      <div className="floating-gradient floating-gradient-2 opacity-15" style={{ zIndex: 2 }}></div>
      <div className="floating-gradient floating-gradient-3 opacity-18" style={{ zIndex: 2 }}></div>

      <div className="main-container relative z-10">
        <h2 className="heading-sec animate-fade-in-up">
          <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            🔐 Certificates and Labs
          </span>
        </h2>
        <p className="heading-sec__sub text-center mb-24 animate-fade-in-up opacity-90">
          Hands-on labs, and exercises exploring cybersecurity concepts, risk assessments, and security tooling.
        </p>

        <div className="space-y-24 mt-10">
          {labProjects.map((project, index) => (
            <div
              key={project.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'
              }`}
              style={{ 
                animationDelay: `${index * 0.3}s`,
                zIndex: 5
              }}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="gradient-card p-8 rounded-2xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 group relative">
                  {/* Neural Connection Indicator */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                  
                  {/* Provider Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getCategoryColor(project.category)} shadow-lg`}>
                      {getCategoryIcon(project.category)} {project.category}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-600/50 text-gray-300 border border-gray-500/50">
                      {project.provider}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-red-300 transition-all duration-500">
                    {project.title}
                  </h3>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills.map((skill, i) => (
                      <span 
                        key={skill}
                        className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getCategoryColor(project.category)}/20 border border-current/30 text-current backdrop-blur-sm hover:scale-105 transition-transform duration-200`}
                        style={{ 
                          animationDelay: `${i * 0.1}s`,
                          color: project.category === 'Cybersecurity' ? '#ff6b35' : 
                                 project.category === 'Linux' ? '#22c55e' : '#3b82f6'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-primary mb-8 leading-relaxed text-lg opacity-90">
                    {project.description}
                  </p>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-gradient inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 group bg-gradient-to-r ${getCategoryColor(project.category)} hover:shadow-lg hover:shadow-current/30`}
                  >
                    {project.buttonText}
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative group">
                  {/* Certificate Glow Effect */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${getCategoryColor(project.category)}/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>
                  
                  {/* Verified Badge */}
                  <div className="absolute -top-3 -right-3 z-20 px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-300 flex items-center gap-1">
                    ✓ Verified
                  </div>
                  
                  {/* Neural Activity Indicator */}
                  <div className="absolute top-4 left-4 z-20 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                    🧠
                  </div>
                  
                  <div className="relative z-10 transition-all duration-500 hover:scale-105 group-hover:rotate-1">
                    <div className={`relative overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-r ${getCategoryColor(project.category)}/50 p-1 hover:from-current hover:via-current hover:to-current transition-all duration-500`}>
                      <div className="bg-gray-900/90 rounded-xl overflow-hidden backdrop-blur-sm">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Neural Scan Line Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Section with Neural Theme */}
        <div className="text-center mt-20 animate-fade-in-up relative z-10" style={{ animationDelay: '1.2s' }}>
          <div className="gradient-card p-8 rounded-2xl backdrop-blur-lg border border-white/10 inline-block relative overflow-hidden">
            {/* Neural Grid Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-6 grid-rows-4 h-full w-full gap-4 p-4">
                {Array.from({length: 24}).map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-pulse"
                    style={{
                       animationDelay: `${i * 0.1}s`,
                       animationDuration: `${2 + (i % 2) * 0.5}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-8 text-center relative z-10">
              <div className="group cursor-pointer">
                <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">3+</div>
                <div className="text-sm text-gray-400">Certificates</div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-red-400 to-orange-500 mx-auto mt-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
                <div className="text-sm text-gray-400">Skills Learned</div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-teal-500 mx-auto mt-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                <div className="text-sm text-gray-400">Hours Studied</div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}