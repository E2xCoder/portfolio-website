'use client';

export default function About() {
  const skills = ["Python", "MySQL", "RStudio", "Nmap", "Bash Scripting"];

  return (
    <section id="about" className="sec-pad">
      <div className="main-container">
        <h2 className="heading-sec animate-fade-in-up">
          <span>About Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Bio Section */}
          <div className="animate-fade-in-left">
            <h3 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>
              Get to know me
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-primary">
               Hey! I'm <strong>Emre Eren</strong>.  I’m studying Computer Science in Berlin and currently in my first year.
               I'm mainly interested in <b>Cybersecurity</b>, but I also like software development, machine learning, and game development.
               I enjoy turning ideas into real projects and bringing them to life. I like figuring out how things work, writing code, finding bugs, or just making things better.</p>           
            
            </div>
          </div>

          {/* Skills Section */}
          <div className="animate-fade-in-right">
            <h3 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>
              My Skills
            </h3>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className="px-6 py-3 rounded-full text-lg font-medium cursor-default transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-primary)',
                    animationDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-blue)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
