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
           
          {/* Enhanced Name Section */}
          <div className="flex flex-col justify-center">
            <div className="relative">
              {/* Main Text */}
              <h4 
                className="text-4xl md:text-5xl font-bold tracking-wide"
                style={{ 
                  color: '#ffffff',
                  textShadow: '0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 123, 255, 0.3)',
                  background: 'linear-gradient(45deg, #ffffff, var(--color-accent-blue), #00ff88, #ffffff)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'text-gradient 4s ease-in-out infinite, text-glow 2s ease-in-out infinite alternate'
                }}
              >
                Emre Eren
              </h4>
              
              {/* Subtitle/Role */}
              <p 
                className="text-lg mt-2 opacity-80 tracking-wider"
                style={{ 
                  color: 'var(--color-text-secondary)',
                  animation: 'fade-in-delayed 1s ease-out 0.5s both'
                }}
              >
                Code. Secure. Repeat.
              </p>
            </div>
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
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes text-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes text-glow {
          0% { 
            text-shadow: 0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 123, 255, 0.3);
          }
          100% { 
            text-shadow: 0 0 30px rgba(0, 255, 136, 0.8), 0 0 60px rgba(0, 123, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.2);
          }
        }
        
        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 0.8; transform: translateY(0); }
        }
      `}</style>
    </footer>
  );
}