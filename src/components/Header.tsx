"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsImageOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const navItems = [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "About", href: "#about", icon: "👨‍💻" },
    { label: "Projects", href: "#projects", icon: "🚀" },
    { label: "Contact", href: "#contact", icon: "📬" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsMobileMenuOpen(false);
      return;
    }

    const targetId = href.split('#')[1];
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const extraSpace = 20;
      const totalOffset = headerHeight + extraSpace;
      
      const elementRect = targetElement.getBoundingClientRect();
      const currentScroll = window.pageYOffset;
      const elementTop = elementRect.top + currentScroll;
      const targetPosition = elementTop - totalOffset;
      
      window.scrollTo({ 
        top: Math.max(0, targetPosition),
        behavior: "smooth" 
      });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-visible ${
          isScrolled ? 'backdrop-blur-xl shadow-2xl' : 'backdrop-blur-md'
        }`}
        style={{
          background: isScrolled 
            ? 'rgba(0, 0, 0, 0.9)' 
            : 'rgba(0, 0, 0, 0.7)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-black/50 to-gray-900/50" style={{ pointerEvents: 'none'}} ></div>
        
        <div className="floating-gradient floating-gradient-1"></div>
        <div className="floating-gradient floating-gradient-2"></div>

        <div className="main-container relative z-10">
          <div className="flex items-center justify-between py-4">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              {/* Profile Image Container - overflow:visible */}
              <div 
                className="relative cursor-pointer"
                onClick={() => setIsImageOpen(!isImageOpen)}
                style={{
                  width: '64px',
                  height: '64px',
                }}
              >
                <div 
                  className="relative w-full h-full rounded-full overflow-visible border-2 border-blue-400/50"
                  style={{
                    transform: isImageOpen ? 'scale(2.2) translateY(1px)' : 'scale(1) translateY(0px)',
                    transformOrigin: 'center top',
                    zIndex: isImageOpen ? 101 : 10,
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <Image
                    src="https://i.ibb.co/fm9G4t2/Whats-App-mage-2026-04-09-at-00-09-17.jpg"
                    alt="Emre Eren"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Text */}
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Emre Eren
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  💻 Computer Science Student
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full p-2 border border-white/10">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="group relative px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10 flex items-center gap-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <span className="relative flex items-center gap-2">
                      <span className="text-sm group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <span className="group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {item.label}
                      </span>
                    </span>

                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </a>
                ))}
              </div>

              <div className="ml-4 relative">
                <div className="bg-black/20 backdrop-blur-sm rounded-full p-2 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <ThemeToggle />
                </div>
              </div>
            </nav>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center space-x-3">
              <div className="bg-black/20 backdrop-blur-sm rounded-full p-2 border border-white/10">
                <ThemeToggle />
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="group relative p-3 bg-black/20 backdrop-blur-sm rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                aria-label="Toggle mobile menu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                
                <div className="relative">
                  {isMobileMenuOpen ? (
                    <svg className="w-5 h-5 text-gray-300 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <div className="space-y-1">
                      <div className="w-5 h-0.5 bg-gray-300 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400"></div>
                      <div className="w-5 h-0.5 bg-gray-300 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400"></div>
                      <div className="w-5 h-0.5 bg-gray-300 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400"></div>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden pb-6 animate-fade-in-up">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10 mt-4">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        onClick={(e) => handleSmoothScroll(e, item.href)}
                        className="group flex items-center gap-4 p-3 rounded-xl text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10 relative overflow-hidden"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <span className="relative flex items-center gap-4 w-full">
                          <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </span>
                          <span className="font-medium group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                            {item.label}
                          </span>
                          <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </header>

      {/* Overlay */}
      {isImageOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsImageOpen(false)}
          style={{
            opacity: isImageOpen ? 1 : 0,
            pointerEvents: isImageOpen ? 'auto' : 'none'
          }}
        ></div>
      )}
    </>
  );
}