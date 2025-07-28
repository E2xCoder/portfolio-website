'use client';

import Image from "next/image";
import Typewriter from "./Typewriter";

export default function Hero() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const targetId = href.substring(1); // Remove "#"
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const yOffset = -120; // Header yüksekliği kadar negatif offset (px)
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="pt-28 pb-0">
      <div className="main-container">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="heading-primary animate-fade-in-up">
            Hey there — I'm <span className="no-wrap">Emre!</span>
          </h1>
          <p
            className="heading-sub text-xl md:text-2xl font-semibold text-[var(--color-accent-blue)] animate-pulse"
            style={{ animationDelay: '0.2s' }}
          >
            Thanks for stopping by!
          </p>

          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-primary max-w-3xl mx-auto">
             I'm from Turkey, born in Kuwait, and currently studying Computer Science at BSBI in Berlin.. </p>
             <p className="text-2xl md:text-3xl font-bold text-primary max-w-3xl mx-auto">
             Welcome to my portfolio!</p>
          </div>

          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, "#projects")}
              className="btn"
            >
              Projects
            </a>
          </div>
        </div>

        {/* Social Icons - Positioned on the left side */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col space-y-6 animate-fade-in-left" style={{ animationDelay: '0.8s' }}>
          <a
            href="https://www.linkedin.com/in/emreern7/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent-blue)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
            }}
          >
            <Image
              src="https://ext.same-assets.com/6507759/3844985022.png"
              alt="LinkedIn"
              width={24}
              height={24}
            />
          </a>

          <a
            href="https://github.com/e2xcoder"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent-blue)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
            }}
          >
            <Image
              src="https://ext.same-assets.com/6507759/3223105816.png"
              alt="GitHub"
              width={24}
              height={24}
            />
          </a>
        </div>

        {/* Mobile Social Icons */}
        <div className="lg:hidden flex justify-center space-x-6 mt-8 animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
          <a
            href="https://www.linkedin.com/in/emreern7/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent-blue)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
            }}
          >
            <Image
              src="https://ext.same-assets.com/6507759/3844985022.png"
              alt="LinkedIn"
              width={24}
              height={24}
            />
          </a>

          <a
            href="https://github.com/e2xcoder"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent-blue)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
            }}
          >
            <Image
              src="https://ext.same-assets.com/6507759/3223105816.png"
              alt="GitHub"
              width={24}
              height={24}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
