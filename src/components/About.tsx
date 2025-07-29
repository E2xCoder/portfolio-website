'use client';

export default function About() {
  const skills = ["Python", "MySQL", "RStudio", "Nmap", "Bash Scripting"];

  return (
    <section id="about" className="gradient-about sec-pad relative">
      {/* Subtle decorative elements */}
      <div 
        className="absolute top-20 right-10 w-20 h-20 rounded-full opacity-5"
        style={{ background: 'var(--color-accent-blue)' }}
      ></div>
      <div 
        className="absolute bottom-32 left-16 w-16 h-16 rounded-full opacity-5"
        style={{ background: 'var(--color-accent-blue)' }}
      ></div>

      <div className="main-container relative z-10">
        <h2 className="heading-sec animate-fade-in-up">
          <span>About Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Bio Section */}
          <div className="animate-fade-in-left">
            {/* Card wrapper with subtle gradient */}
            <div 
              className="backdrop-blur-sm rounded-2xl p-8 border border-opacity-20 hover:border-opacity-40 transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
                Get to know me
              </h3>
              
              <div className="space-y-4">
                <p className="text-primary leading-relaxed">
                  Hey! I'm <strong style={{ color: 'var(--color-accent-blue)' }}>Emre Eren</strong>. 
                  I'm studying Computer Science in Berlin and currently in my first year.
                </p>
                
                <p className="text-primary leading-relaxed">
                  I'm mainly interested in{' '}
                  <strong style={{ color: 'var(--color-accent-blue)' }}>Cybersecurity</strong>, 
                  but I also like software development, machine learning, and game development.
                </p>
                
                <p className="text-primary leading-relaxed">
                  I enjoy turning ideas into real projects and bringing them to life. I like figuring out 
                  how things work, writing code, finding bugs, or just making things better.
                </p>
              </div>

              {/* Stats or highlights */}
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold mb-1"
                    style={{ color: 'var(--color-accent-blue)' }}
                  >
                    1st Year
                  </div>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Computer Science
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold mb-1"
                    style={{ color: 'var(--color-accent-blue)' }}
                  >
                    Berlin
                  </div>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Current Location
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="animate-fade-in-right">
            <div 
              className="backdrop-blur-sm rounded-2xl p-8 border border-opacity-20 hover:border-opacity-40 transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
                My Skills
              </h3>
              
              <div className="space-y-4 mb-8">
                <p className="text-primary">
                  Here are the technologies and tools I work with:
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="group px-6 py-3 rounded-xl text-lg font-medium cursor-default transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-opacity-30"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      color: 'var(--color-text-primary)',
                      borderColor: 'var(--color-border)',
                      animationDelay: `${index * 0.1}s`,
                      boxShadow: 'var(--shadow-sm)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-blue)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = 'var(--color-accent-blue)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    }}
                  >
                    {skill}
                    
                    {/* Subtle icon or indicator */}
                    <span 
                      className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      ⚡
                    </span>
                  </div>
                ))}
              </div>

              {/* Call-to-action or additional info */}
              <div className="mt-8 p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                <p className="text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>
                  Always learning and expanding my skillset! 🚀
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: Interests or Focus Areas */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div 
            className="text-center backdrop-blur-sm rounded-2xl p-8 border border-opacity-20"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              borderColor: 'var(--color-border)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Current Focus
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <span 
                className="px-4 py-2 rounded-lg border"
                style={{ 
                  color: 'var(--color-accent-blue)', 
                  borderColor: 'var(--color-accent-blue)',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)'
                }}
              >
                🛡️ Cybersecurity
              </span>
              <span 
                className="px-4 py-2 rounded-lg border"
                style={{ 
                  color: 'var(--color-accent-blue)', 
                  borderColor: 'var(--color-accent-blue)',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)'
                }}
              >
                💻 Software Development
              </span>
              <span 
                className="px-4 py-2 rounded-lg border"
                style={{ 
                  color: 'var(--color-accent-blue)', 
                  borderColor: 'var(--color-accent-blue)',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)'
                }}
              >
                🤖 Machine Learning
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}