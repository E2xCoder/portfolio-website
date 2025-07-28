"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isBloodEffect, setIsBloodEffect] = useState(false);

  const handleToggle = () => {
    // Only show blood effect when switching to light mode
    if (theme === 'dark') {
      setIsBloodEffect(true);
      
      // Show blood effect for 600ms then switch theme
      setTimeout(() => {
        toggleTheme();
        setTimeout(() => {
          setIsBloodEffect(false);
        }, 100);
      }, 600);
    } else {
      // Normal switch back to dark
      toggleTheme();
    }
  };

  return (
    <>
      {/* Blood Effect Overlay */}
      {isBloodEffect && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-radial from-red-800 via-red-600 to-red-900 animate-pulse">
            <div className="flex items-center justify-center h-full">
              <div className="text-white text-4xl md:text-6xl font-bold animate-bounce drop-shadow-2xl">
                ⚠️ ALERT! ⚠️
              </div>
            </div>
          </div>
          {/* Blood drip effect */}
          <div className="absolute top-0 left-1/4 w-2 h-20 bg-red-700 animate-drip opacity-80"></div>
          <div className="absolute top-0 left-1/2 w-3 h-32 bg-red-800 animate-drip-delayed opacity-60"></div>
          <div className="absolute top-0 right-1/3 w-2 h-24 bg-red-600 animate-drip-slow opacity-70"></div>
        </div>
      )}

      <button
        onClick={handleToggle}
        className="theme-toggle relative"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        disabled={isBloodEffect}
      >
        {theme === 'dark' ? (
          // Sun icon for light mode
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isBloodEffect ? "text-red-300 animate-pulse" : ""}
          >
            <path
              d="M12 3V5M12 19V21M5.64 5.64L7.05 7.05M16.95 16.95L18.36 18.36M3 12H5M19 12H21M5.64 18.36L7.05 16.95M16.95 7.05L18.36 5.64M12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // Moon icon for dark mode
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12.79C20.25 13.89 19.08 14.75 17.68 15.17C16.28 15.59 14.79 15.52 13.43 14.97C12.07 14.42 10.91 13.42 10.14 12.12C9.37 10.82 9.03 9.3 9.17 7.78C9.31 6.26 9.92 4.81 10.92 3.64C11.92 2.47 13.26 1.63 14.76 1.23C13.5 0.89 12.17 0.84 10.9 1.1C9.63 1.36 8.44 1.92 7.42 2.73C6.4 3.54 5.58 4.58 5.01 5.77C4.44 6.96 4.13 8.27 4.1 9.6C4.07 10.93 4.32 12.25 4.84 13.47C5.36 14.69 6.13 15.78 7.1 16.66C8.07 17.54 9.21 18.2 10.46 18.6C11.71 19 13.04 19.12 14.34 18.96C15.64 18.8 16.88 18.36 18 17.66C19.12 16.96 20.08 16.02 20.81 14.91C21.54 13.8 22.02 12.54 22.21 11.22C21.94 11.72 21.5 12.29 21 12.79Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>

      <style jsx>{`
        @keyframes drip {
          0% { height: 0; opacity: 1; }
          100% { height: 100px; opacity: 0; }
        }
        
        @keyframes drip-delayed {
          0% { height: 0; opacity: 1; }
          100% { height: 120px; opacity: 0; }
        }
        
        @keyframes drip-slow {
          0% { height: 0; opacity: 1; }
          100% { height: 80px; opacity: 0; }
        }
        
        .animate-drip {
          animation: drip 0.8s ease-out forwards;
        }
        
        .animate-drip-delayed {
          animation: drip-delayed 1s ease-out 0.2s forwards;
        }
        
        .animate-drip-slow {
          animation: drip-slow 1.2s ease-out 0.1s forwards;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, #991b1b, #dc2626, #b91c1c, #7f1d1d);
        }
      `}</style>
    </>
  );
}