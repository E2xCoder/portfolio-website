'use client';

import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      title: "Library Management System",
      description: "This Python project is a simple Library Management System. It supports Students and Teachers with different borrowing limits. Members can borrow available books within their limits. Books become unavailable when borrowed and available again after return. The system tracks books, members, and borrowing rules using classes and inheritance.",
      image: "https://ibb.co/SXWvHdMW",
      link: "https://github.com/E2xCoder/library-management-system",
      buttonText: "Check it out!"
    },
    {
      title: "Network IP Monitoring",
      description: "A simple Bash script that tracks changes in your device's IPv4 and IPv6 addresses. It logs these changes in daily files and sends instant alerts via Telegram. Designed for basic network monitoring and learning scripting with practical use in cybersecurity.",
      image: "https://ibb.co/fYfh9mqG",
      link: "https://github.com/E2xCoder/Network-IP-Monitoring",
      buttonText: "Check it out!"
    },  
  ];

  const handleOpenLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    window.open(href, '_blank');
  };

  return (
    <section id="projects" className="sec-pad">
      <div className="main-container">
        <h2 className="heading-sec animate-fade-in-up">
          <span>Projects</span>
        </h2>

        <div className="space-y-24 mt-16">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <h3 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                  {project.title}
                </h3>
                <p className="text-primary mb-6 leading-relaxed">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  onClick={(e) => handleOpenLink(e, project.link)}
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
                    width={400}
                    height={250}
                    className="w-[300px] h-auto rounded-lg shadow-2xl mx-auto"
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
