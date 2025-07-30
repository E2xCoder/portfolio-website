'use client';

import Image from "next/image";
import ParticleSystem from "./ParticleSystem";
import { useState, useEffect } from "react";

export default function Hero() {
  // Hydration hatası için mounted state
  const [mounted, setMounted] = useState(false);
  
  // Typewriter efekti için state'ler
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Component mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  // Dinamik metinler
  const texts = [
    "Software Developer.",
    "Cybersecurity Enthusiast.",
    "Computer Science Student.",
    "Problem Solver."
  ];

  // Typewriter efekti - sadece client'ta çalışsın
  useEffect(() => {
    if (!mounted) return; // Server'da çalışmasın
    
    const currentFullText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Yazma aşaması
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
          setTypingSpeed(100);
        } else {
          // Tam metin yazıldı, 2 saniye bekle
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Silme aşaması
        if (displayText.length > 0) {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
          setTypingSpeed(50);
        } else {
          // Metin silindi, bir sonraki metne geç
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [mounted, displayText, isDeleting, currentTextIndex, typingSpeed, texts]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Header yüksekliğini bul
      const header = document.querySelector('header') || 
                    document.querySelector('nav') || 
                    document.querySelector('[data-header]');
      
      let headerHeight = 0;
      if (header) {
        headerHeight = header.offsetHeight;
        console.log('📏 Header height:', headerHeight);
      } else {
        // Header bulunamazsa, sabit değer kullan
        headerHeight = 80; // Varsayılan header yüksekliği
        console.log('📏 Using default header height:', headerHeight);
      }
      
      // Ekstra boşluk
      const extraSpace = 20;
      const totalOffset = headerHeight + extraSpace;
      
      // Pozisyon hesapla
      const elementRect = targetElement.getBoundingClientRect();
      const currentScroll = window.pageYOffset;
      const elementTop = elementRect.top + currentScroll;
      const targetPosition = elementTop - totalOffset;
      
      console.log('🎯 Scroll calculation:');
      console.log('  Element top:', elementTop);
      console.log('  Header height:', headerHeight);
      console.log('  Extra space:', extraSpace);
      console.log('  Total offset:', totalOffset);
      console.log('  Target position:', targetPosition);
      
      // Scroll yap
      window.scrollTo({ 
        top: Math.max(0, targetPosition),
        behavior: "smooth" 
      });
    }
  };

  return (
    <>
      <ParticleSystem />
      
      {/* ✅ CSS değişkenlerini kullanan ama normal mavi gradient koruyan */}
      <section 
        className="min-h-screen relative pt-28 pb-0 overflow-hidden"
        style={{
          background: 'var(--gradient-hero)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite'
        }}
      >
        {/* Floating Gradient Elements - Theme'e uyumlu */}
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse"
          style={{ 
            backgroundColor: 'var(--color-bg-secondary)',
            opacity: 0.2 
          }}
        ></div>
        <div 
          className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full blur-2xl animate-pulse" 
          style={{ 
            animationDelay: '2s',
            backgroundColor: 'var(--color-bg-tertiary)',
            opacity: 0.2 
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-3/4 w-32 h-32 rounded-full blur-xl animate-pulse" 
          style={{ 
            animationDelay: '4s',
            backgroundColor: 'var(--color-accent-blue)',
            opacity: 0.15 
          }}
        ></div>

        <div className="main-container relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Main Heading */}
            <div className="mb-8 animate-fade-in-up opacity-0" style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}>
              <h1 className="text-5xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span style={{ color: 'var(--color-text-primary)' }}>Hey there — I'm </span>
                <span style={{ color: 'var(--color-text-primary)' }} className="animate-pulse">
                  Emre!
                </span>
              </h1>
              
              <p 
                className="text-xl md:text-2xl font-medium mb-4" 
                style={{ 
                  animation: 'fadeInUp 0.6s ease-out 0.2s forwards', 
                  opacity: 0,
                  color: 'var(--color-text-secondary)'
                }}
              >
                 Thanks for stopping by!
              </p>

              {/* Dinamik Typewriter Efekti */}
              <div 
                className="text-2xl md:text-3xl font-bold min-h-[2.5rem] flex items-center justify-center"
                style={{ 
                  animation: 'fadeInUp 0.6s ease-out 0.4s forwards', 
                  opacity: 0,
                  color: 'var(--color-accent-blue)'
                }}
              >
                I'm a <span className="ml-2 relative">
                  {mounted ? displayText : "Software Developer."}
                  <span 
                    className="animate-pulse ml-1 inline-block w-0.5 h-8 bg-current"
                    style={{ 
                      animation: 'blink 1s infinite',
                      backgroundColor: 'var(--color-accent-blue)'
                    }}
                  ></span>
                </span>
              </div>
            </div>

            {/* Welcome Message - Sadece bu kaldı */}
            <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div 
                className="group relative overflow-hidden rounded-2xl p-8 backdrop-blur-lg border max-w-4xl mx-auto transition-all duration-500"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border)',
                  opacity: 0.9
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                }}
              >
                {/* Card Gradient Overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, var(--color-accent-blue) 0%, transparent 100%)`,
                    opacity: 0.05
                  }}
                ></div>
                
                <div className="relative z-10">
                  <h2 
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Welcome to my digital world! 🌟
                  </h2>
                  <p 
                    className="text-lg md:text-xl mt-4 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Explore my journey in software development and cybersecurity
                  </p>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div 
                    className="absolute inset-0 rounded-2xl animate-gradient-border"
                    style={{
                      background: `linear-gradient(45deg, var(--color-accent-blue), var(--color-accent-purple), var(--color-accent-blue))`,
                      opacity: 0.3
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* CTA Button - Explore My Projects */}
            <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <button
                onClick={() => {
                  console.log('🎯 BUTTON CLICKED!');
                  handleSmoothScroll({ preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement, MouseEvent>, "#projects");
                }}
                className="inline-flex items-center gap-3 group/btn text-lg px-8 py-4 rounded-full border transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-text-primary)',
                  borderColor: 'var(--color-border)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-blue)';
                  e.currentTarget.style.borderColor = 'var(--color-accent-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                <span>Explore My Projects</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Social Icons */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col space-y-4" style={{ animation: 'fadeInLeft 0.6s ease-out 0.8s forwards', opacity: 0 }}>
            <a
              href="https://www.linkedin.com/in/emreern7/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div 
                className="w-16 h-16 flex items-center justify-center rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-blue)';
                  e.currentTarget.style.borderColor = 'var(--color-accent-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-2 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: 'var(--color-accent-blue)' }}
                ></div>
                
                <Image
                  src="https://ext.same-assets.com/6507759/3844985022.png"
                  alt="LinkedIn"
                  width={28}
                  height={28}
                  className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </a>

            <a
              href="https://github.com/e2xcoder"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div 
                className="w-16 h-16 flex items-center justify-center rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-blue)';
                  e.currentTarget.style.borderColor = 'var(--color-accent-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-2 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: 'var(--color-accent-blue)' }}
                ></div>
                
                <Image
                  src="https://ext.same-assets.com/6507759/3223105816.png"
                  alt="GitHub"
                  width={28}
                  height={28}
                  className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </a>
          </div>

          {/* Mobile Social Icons */}
          <div className="lg:hidden flex justify-center space-x-6 mt-8" style={{ animation: 'fadeInUp 0.6s ease-out 1.0s forwards', opacity: 0 }}>
            <a
              href="https://www.linkedin.com/in/emreern7/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div 
                className="w-16 h-16 flex items-center justify-center rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <Image
                  src="https://ext.same-assets.com/6507759/3844985022.png"
                  alt="LinkedIn"
                  width={28}
                  height={28}
                  className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </a>

            <a
              href="https://github.com/e2xcoder"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div 
                className="w-16 h-16 flex items-center justify-center rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <Image
                  src="https://ext.same-assets.com/6507759/3223105816.png"
                  alt="GitHub"
                  width={28}
                  height={28}
                  className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </a>
          </div>

          {/* Background Decorative Elements */}
          <div 
            className="absolute top-20 right-10 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-60" 
            style={{ 
              animationDelay: '1s',
              background: `linear-gradient(45deg, var(--color-accent-purple), var(--color-accent-blue))`,
              opacity: 0.1
            }}
          ></div>
          <div 
            className="absolute bottom-32 left-20 w-24 h-24 rounded-full blur-xl animate-pulse opacity-40" 
            style={{ 
              animationDelay: '2s',
              background: `linear-gradient(45deg, var(--color-accent-cyan), var(--color-accent-pink))`,
              opacity: 0.1
            }}
          ></div>
          <div 
            className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full blur-lg animate-pulse opacity-30" 
            style={{ 
              animationDelay: '3s',
              background: `linear-gradient(45deg, var(--color-accent-blue), var(--color-accent-purple))`,
              opacity: 0.1
            }}
          ></div>
        </div>

        {/* CSS için blink animasyonu */}
        <style jsx>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}</style>
      </section>
    </>
  );
}