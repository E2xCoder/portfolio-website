'use client';

import Image from "next/image";

export default function Labs() {
  const labProjects = [
    {
      title: "IBM SkillBuild Cybersecurity Fundamentals",
      description: "Covers CIA Triad, five foundational security principles, threat actor groups, cyberattack tactics and social engineering, common attack types, incident response and vulnerability management, IAM and endpoint security, network and application security, encryption techniques, hashing and PKI, security frameworks and compliance, case studies, overall defense strategies, and career roles in cybersecurity.",
      image: "https://ibb.co/xqB16pxN",
      link: "https://drive.google.com/file/d/1LP6U14Tz7w8OLwoZyNbxqDNnYL0s5SRB/view",
      buttonText: "View"
    },
    {
      title: "Introduction to Linux Course",
      description: "Completed Codecademy Introduction to Linux on Bash Scripting and Users & Permissions. Covered Linux architecture and kernel structure, file system hierarchy, user and group management, file ownership and permission settings, basic shell utilities, navigation commands, Bash scripting fundamentals with real‑world script projects, automation via build scripts and workflow tools.",
      image: "https://ibb.co/7Jfwh4sd",
      link: "https://drive.google.com/file/d/1vUuYJmro6n_O70kGLHwjM-AfoPqNzPQ-/view",
      buttonText: "View"
    },
    {
      title: "Learn Bash Scripting Course",
      description: "Covered Bash shebang (#!/bin/bash), variables and positional arguments, reading user input (read), comparison operators (==, !=), control structures (if‑else, loops), aliases, script permissions and execution, basic automation, script projects and quiz-based validation .",
      image: "https://ibb.co/bR2R7Pz8",
      link: "https://drive.google.com/file/d/1kJ3Ld9v9sj28RBoC0VtmQ2xlCxtRmiti/view",
      buttonText: "View"
    }
  ];

  // Sabit delay sınıfları, 3 proje olduğu için yeterli.
  const delayClasses = ["delay-0", "delay-1", "delay-2"];

  return (
    <section id="cyber-labs" className="sec-pad">
      <div className="main-container">
        <h2 className="heading-sec animate-fade-in-up">
          <span>Certificates and Labs</span>
        </h2>
        <p className="heading-sec__sub text-center mb-24 animate-fade-in-up">
          Hands-on labs, and exercises exploring cybersecurity concepts, risk assessments, and security tooling.
        </p>

        <div className="space-y-24 mt-10">
          {labProjects.map((project, index) => (
            <div
              key={project.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'
              } ${delayClasses[index] || ''}`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <h3 className="text-3xl font-bold mb-6 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                  {project.title}
                </h3>
                <p className="text-primary mb-8 leading-relaxed">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  {project.buttonText}
                </a>
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative transition-transform duration-300 hover:scale-105">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
