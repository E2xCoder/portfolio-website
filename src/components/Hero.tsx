'use client';

import { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    setMounted(true);
  }, []);

  const texts = [
    'Software Developer.',
    'Cybersecurity Enthusiast.',
    'Computer Science Student.',
    'Problem Solver.',
  ];

  useEffect(() => {
    if (!mounted) return;
    const currentFullText = texts[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
          setTypingSpeed(100);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
          setTypingSpeed(50);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [mounted, displayText, isDeleting, currentTextIndex, typingSpeed, texts]);

  const handleSmoothScroll = (href: string) => {
    const targetElement = document.getElementById(href.substring(1));
    if (targetElement) {
      const header = document.querySelector('header');
      const offset = (header?.offsetHeight ?? 80) + 20;
      const top = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0d0d24 50%, #0a0a1a 100%)' }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366f140, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a855f730, transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #818cf815, transparent 60%)' }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="main-container relative z-10 text-center py-32">
        {/* Greeting line */}
        <p
          className="text-sm font-medium tracking-[0.3em] uppercase mb-6"
          style={{
            color: '#818cf8',
            animation: 'fadeInUp 0.6s ease-out forwards',
            opacity: 0,
          }}
        >
          — Hey, I'm
        </p>

        {/* Name */}
        <h1
          className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none tracking-tight"
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.15s forwards',
            opacity: 0,
          }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #fff 40%, #818cf8 70%, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Emre Eren
          </span>
        </h1>

        {/* Typewriter */}
        <div
          className="text-xl md:text-2xl font-mono min-h-[2rem] mb-10"
          style={{
            color: '#818cf8',
            animation: 'fadeInUp 0.6s ease-out 0.3s forwards',
            opacity: 0,
          }}
        >
          {mounted ? (
            <>
              <span style={{ color: '#6b7280' }}>{'> '}</span>
              {displayText}
              <span
                className="inline-block w-[2px] h-5 ml-1 align-middle"
                style={{
                  backgroundColor: '#818cf8',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </>
          ) : (
            <span style={{ visibility: 'hidden' }}>Software Developer.</span>
          )}
        </div>

        {/* Subtitle */}
        <p
          className="text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
          style={{
            color: 'rgba(200, 200, 220, 0.6)',
            animation: 'fadeInUp 0.6s ease-out 0.45s forwards',
            opacity: 0,
          }}
        >
          Building things at the intersection of software development and cybersecurity.
          Currently studying CS in Berlin.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.6s forwards',
            opacity: 0,
          }}
        >
          <button
            onClick={() => handleSmoothScroll('#projects')}
            className="group flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              boxShadow: '0 8px 30px rgba(99,102,241,0.3)',
            }}
          >
            View Projects
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <button
            onClick={() => handleSmoothScroll('#contact')}
            className="flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 cursor-pointer border"
            style={{
              color: 'rgba(200, 200, 220, 0.8)',
              borderColor: 'rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(129,140,248,0.5)';
              (e.currentTarget as HTMLElement).style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(200, 200, 220, 0.8)';
            }}
          >
            Get in Touch
          </button>
        </div>

        {/* Social links */}
        <div
          className="flex items-center justify-center gap-4"
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.75s forwards',
            opacity: 0,
          }}
        >
          {[
            { href: 'https://github.com/e2xcoder', icon: FaGithub, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/emreern7/', icon: FaLinkedin, label: 'LinkedIn' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all duration-300 hover:scale-105 border"
              style={{
                color: 'rgba(200, 200, 220, 0.5)',
                borderColor: 'rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(129,140,248,0.3)';
                (e.currentTarget as HTMLElement).style.color = '#818cf8';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLElement).style.color = 'rgba(200, 200, 220, 0.5)';
              }}
            >
              <Icon size={16} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          animation: 'fadeInUp 0.6s ease-out 1s forwards',
          opacity: 0,
        }}
      >
        <div
          className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5"
          style={{ borderColor: 'rgba(255,255,255,0.15)' }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{
              backgroundColor: 'rgba(129,140,248,0.6)',
              animation: 'scrollBounce 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(6px); opacity: 0.2; }
        }
      `}</style>
    </section>
  );
}
