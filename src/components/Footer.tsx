'use client';

import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="py-16 transition-colors duration-300"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="main-container">
        <div className="grid md:grid-cols-2 gap-12 mb-12 animate-fade-in-up">
          {/* Social Section */}
          <div>
            <h4 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>
              Social
            </h4>
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/in/-paul-harrison/"
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
                href="https://github.com/paulhrsn"
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

          {/* Name Section */}
          <div>
            <h4 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Emre Eren
            </h4>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="border-t pt-8 animate-fade-in-up"
          style={{ borderColor: 'var(--color-bg-secondary)' }}
        >
          <p className="text-center" style={{ color: 'var(--color-text-secondary)' }}>
            © 2025 Emre Eren. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
