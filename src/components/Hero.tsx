'use client';

import Image from "next/image";

export default function Hero() {
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
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen relative pt-28 pb-0 overflow-hidden">
      {/* Floating Gradient Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-700/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gray-600/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-gray-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="main-container relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8 animate-fade-in-up opacity-0" style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}>
            <h1 className="text-5xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="text-white">Hey there — I'm </span>
              <span className="text-white animate-pulse">
                Emre!
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 font-medium" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s forwards', opacity: 0 }}>
               Thanks for stopping by!
            </p>
          </div>

          {/* Info Card */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-gray-800/50 group relative overflow-hidden rounded-2xl p-8 backdrop-blur-lg border border-gray-600/30 max-w-4xl mx-auto hover:bg-gray-700/50 transition-all duration-500">
              {/* Card Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 space-y-4">
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                  I'm from <span className="text-white font-semibold">Turkey</span>, born in <span className="text-gray-100 font-semibold">Kuwait</span>, and currently studying <span className="text-white font-semibold">Computer Science</span> at BSBI in <span className="text-gray-100 font-semibold">Berlin</span>.
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Welcome to my portfolio! 🚀
                </h2>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/20 via-gray-400/20 to-gray-500/20 animate-gradient-border"></div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={() => {
                console.log('🎯 BUTTON CLICKED!');
                handleSmoothScroll({ preventDefault: () => {} } as any, "#projects");
              }}
              className="inline-flex items-center gap-3 group/btn text-lg px-8 py-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white border border-gray-500 hover:border-gray-400 transition-all duration-300 cursor-pointer"
            >
              <span>View Projects</span>
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
            <div className="bg-gray-800/50 w-16 h-16 flex items-center justify-center rounded-xl backdrop-blur-lg border border-gray-600/30 transition-all duration-300 hover:scale-110 hover:border-gray-400/50 hover:bg-gray-700/50">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gray-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
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
            <div className="bg-gray-800/50 w-16 h-16 flex items-center justify-center rounded-xl backdrop-blur-lg border border-gray-600/30 transition-all duration-300 hover:scale-110 hover:border-gray-400/50 hover:bg-gray-700/50">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gray-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
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
            <div className="bg-gray-800/50 w-16 h-16 flex items-center justify-center rounded-xl backdrop-blur-lg border border-gray-600/30 transition-all duration-300 hover:scale-110 hover:border-gray-400/50 hover:bg-gray-700/50">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gray-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
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
            <div className="bg-gray-800/50 w-16 h-16 flex items-center justify-center rounded-xl backdrop-blur-lg border border-gray-600/30 transition-all duration-300 hover:scale-110 hover:border-gray-400/50 hover:bg-gray-700/50">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gray-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
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
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-gray-600/10 to-gray-500/10 rounded-full blur-2xl animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-gradient-to-r from-gray-500/10 to-gray-400/10 rounded-full blur-xl animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-gray-700/10 to-gray-600/10 rounded-full blur-lg animate-pulse opacity-30" style={{ animationDelay: '3s' }}></div>
      </div>
    </section>
  );
}