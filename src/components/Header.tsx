"use client";

import { useState } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsMobileMenuOpen(false);
      return;
    }

    const targetId = href.substring(2); // Remove "/#" to get the element ID
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = -100; // This offset is to account for the fixed header. Adjust if your header height changes.
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border)',
              opacity: 0.95
            }}>
      <div className="main-container">
        <div className="flex items-center justify-between py-0 ">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-24 h-24 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
              <Image
                src="/4L4A0470.jpg"
                alt="Emre Eren"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Emre Eren
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="text-lg font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      color: 'var(--color-text-primary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-accent-blue)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Theme Toggle */}
            <ThemeToggle />
          </nav>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 transition-colors duration-300"
              style={{ color: 'var(--color-text-primary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent-blue)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <Image
                  src="https://ext.same-assets.com/6507759/2226596248.svg"
                  alt="Close menu"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="https://ext.same-assets.com/6507759/2263678382.svg"
                  alt="Open menu"
                  width={24}
                  height={24}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 animate-fade-in-up">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="block text-lg transition-colors duration-300"
                    style={{ color: 'var(--color-text-primary)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-accent-blue)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
