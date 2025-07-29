'use client';

import Image from "next/image";

export default function Labs() {
  const labProjects = [
    {
      title: "IBM SkillBuild Cybersecurity Fundamentals",
      description: "Covers CIA Triad, five foundational security principles, threat actor groups, cyberattack tactics and social engineering, common attack types, incident response and vulnerability management, IAM and endpoint security, network and application security, encryption techniques, hashing and PKI, security frameworks and compliance, case studies, overall defense strategies, and career roles in cybersecurity.",
      image: "https://i.ibb.co/hF4BVP3S/Screenshot-2025-07-28-024311.png",
      link: "https://drive.google.com/file/d/1LP6U14Tz7w8OLwoZyNbxqDNnYL0s5SRB/view",
      buttonText: "View Certificate",
      provider: "IBM SkillBuild",
      category: "Cybersecurity",
      skills: ["CIA Triad", "Threat Analysis", "IAM", "Encryption", "PKI"]
    },
    {
      title: "Introduction to Linux Course",
      description: "Completed Codecademy Introduction to Linux on Bash Scripting and Users & Permissions. Covered Linux architecture and kernel structure, file system hierarchy, user and group management, file ownership and permission settings, basic shell utilities, navigation commands, Bash scripting fundamentals with real‑world script projects, automation via build scripts and workflow tools.",
      image: "https://i.ibb.co/3y3DKzg9/Ekran-g-r-nt-s-28-7-2025-3227.jpg",
      link: "https://drive.google.com/file/d/1vUuYJmro6n_O70kGLHwjM-AfoPqNzPQ-/view",
      buttonText: "View Certificate",
      provider: "Codecademy",
      category: "Linux",
      skills: ["Linux", "File Systems", "User Management", "Shell", "Automation"]
    },
    {
      title: "Learn Bash Scripting Course",
      description: "Covered Bash shebang (#!/bin/bash), variables and positional arguments, reading user input (read), comparison operators (==, !=), control structures (if‑else, loops), aliases, script permissions and execution, basic automation, script projects and quiz-based validation.",
      image: "https://i.ibb.co/7NRNbX26/Ekran-g-r-nt-s-28-7-2025-326.jpg",
      link: "https://drive.google.com/file/d/1kJ3Ld9v9sj28RBoC0VtmQ2xlCxtRmiti/view",
      buttonText: "View Certificate",
      provider: "Codecademy",
      category: "Scripting",
      skills: ["Bash", "Scripting", "Variables", "Control Flow", "Automation"]
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Cybersecurity': 'from-red-500 to-orange-500',
      'Linux': 'from-green-500 to-teal-500',
      'Scripting': 'from-blue-500 to-purple-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Cybersecurity': '🔐',
      'Linux': '🐧',
      'Scripting': '⚡'
    };
    return icons[category as keyof typeof icons] || '📚';
  };

  return (
    <section id="cyber-labs" className="sec-pad gradient-projects relative overflow-hidden">
      {/* Cybersecurity Themed Floating Elements */}
      <div className="floating-gradient floating-gradient-1 opacity-30"></div>
      <div className="floating-gradient floating-gradient-2 opacity-20"></div>
      <div className="floating-gradient floating-gradient-3 opacity-25"></div>
      
      {/* Matrix Rain Effect (subtle) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-red-400 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="main-container relative z-10">
        <h2 className="heading-sec animate-fade-in-up">
          <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            🔐 Certificates and Labs
          </span>
        </h2>
        <p className="heading-sec__sub text-center mb-24 animate-fade-in-up opacity-90">
          Hands-on labs, and exercises exploring cybersecurity concepts, risk assessments, and security tooling.
        </p>

        <div className="space-y-24 mt-10">
          {labProjects.map((project, index) => (
            <div
              key={project.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'
              }`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="gradient-card p-8 rounded-2xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 group">
                  {/* Provider Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getCategoryColor(project.category)} shadow-lg`}>
                      {getCategoryIcon(project.category)} {project.category}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-600/50 text-gray-300 border border-gray-500/50">
                      {project.provider}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-red-300 transition-all duration-500">
                    {project.title}
                  </h3>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills.map((skill, i) => (
                      <span 
                        key={skill}
                        className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getCategoryColor(project.category)}/20 border border-current/30 text-current backdrop-blur-sm hover:scale-105 transition-transform duration-200`}
                        style={{ 
                          animationDelay: `${i * 0.1}s`,
                          color: project.category === 'Cybersecurity' ? '#ff6b35' : 
                                 project.category === 'Linux' ? '#22c55e' : '#3b82f6'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-primary mb-8 leading-relaxed text-lg opacity-90">
                    {project.description}
                  </p>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-gradient inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 group bg-gradient-to-r ${getCategoryColor(project.category)} hover:shadow-lg hover:shadow-current/30`}
                  >
                    {project.buttonText}
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative group">
                  {/* Certificate Glow Effect */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${getCategoryColor(project.category)}/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>
                  
                  {/* Verified Badge */}
                  <div className="absolute -top-3 -right-3 z-20 px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-300 flex items-center gap-1">
                    ✓ Verified
                  </div>
                  
                  {/* Security Lock Animation */}
                  <div className="absolute top-4 left-4 z-20 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                    🔒
                  </div>
                  
                  <div className="relative z-10 transition-all duration-500 hover:scale-105 group-hover:rotate-1">
                    <div className={`relative overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-r ${getCategoryColor(project.category)}/50 p-1 hover:from-current hover:via-current hover:to-current transition-all duration-500`}>
                      <div className="bg-gray-900/90 rounded-xl overflow-hidden backdrop-blur-sm">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Scan Line Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="gradient-card p-8 rounded-2xl backdrop-blur-lg border border-white/10 inline-block">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent mb-2">3+</div>
                <div className="text-sm text-gray-400">Certificates</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-2">15+</div>
                <div className="text-sm text-gray-400">Skills Learned</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">50+</div>
                <div className="text-sm text-gray-400">Hours Studied</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}