'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const nav = document.querySelector('nav');
      const navHeight = nav ? nav.offsetHeight : 80;

      const elementTop = targetElement.offsetTop;
      const targetPosition = elementTop - navHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Emre Eren
          </h1>

          <div className="hidden md:flex space-x-4">
            <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Home</a>
            <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a>
            <a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')}>Projects</a>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;