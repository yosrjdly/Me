import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

interface ProjectsProps {
  projects: ProjectProps[];
}

export default function Projects({ projects }: ProjectsProps) {
  // Split projects into featured and regular
  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);
  const [visibleProjects, setVisibleProjects] = useState(6); // Initial number of visible projects
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const [observedElements, setObservedElements] = useState<Map<string, boolean>>(new Map());
  
  // Observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setObservedElements(prev => new Map(prev).set(entry.target.id, true));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all project elements
    const allProjects = document.querySelectorAll('.project-animate');
    allProjects.forEach(project => {
      observer.observe(project);
    });
    
    return () => observer.disconnect();
  }, [visibleProjects]);
  
  // Load more projects handler
  const handleLoadMore = () => {
    // Increase visible projects with staggered animation
    setVisibleProjects(prev => Math.min(prev + 6, regularProjects.length));
  };
  
  return (
    <section className="mt-8">
      {/* Featured Project(s) */}
      {featuredProjects.length > 0 && (
        <div className="mb-8">
          <h2 className="section-title mb-6 flex items-center">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Featured Project
            </span>
          </h2>
          
          {featuredProjects.map((project, index) => (
              <div 
                key={project.id} 
              id={`featured-${project.id}`}
              className="featured-project slide-up project-animate" 
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-theme-primary/20 before:to-theme-accent/10 before:opacity-50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,90,240,0.1),transparent_70%)]"></div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                  {/* Image - 2 columns on desktop */}
                  <div className="md:col-span-2 overflow-hidden h-72 md:h-auto relative rounded-lg shadow-lg group">
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-dark/70 via-transparent to-transparent z-10"></div>
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    <div className="absolute top-3 left-3 z-20">
                      <span className="featured-project-tag group-hover:animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        Featured
                      </span>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-theme-primary/20 to-theme-accent/20 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-theme-accent/20 to-theme-primary/20 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
                </div>
                  
                  {/* Content - 3 columns on desktop */}
                  <div className="md:col-span-3 featured-project-content p-6 md:p-4 md:pl-0 backdrop-blur-sm">
                    <h3 className="featured-project-title group">
                      <span className="bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent inline-block">{project.title}</span>
                      <span className="block h-1 w-0 group-hover:w-full bg-gradient-to-r from-theme-primary to-theme-accent transition-all duration-300 mt-1"></span>
                    </h3>
                    <p className="featured-project-description">{project.description}</p>
                    
                    <div className="skills-container mb-6">
                      {project.technologies.map((tech, i) => (
                      <span 
                        key={tech} 
                          className="skill-tag shimmer-effect"
                          style={{ animationDelay: `${0.5 + (i * 0.1)}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                    <div className="featured-project-actions">
                    {project.demoUrl && (
                      <Link 
                        href={project.demoUrl}
                        target="_blank"
                          className="button-primary group relative overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Demo
                          </span>
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link 
                        href={project.githubUrl}
                        target="_blank"
                          className="button-outline flex items-center group"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="mr-2 transition-transform group-hover:scale-110">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        View Code
                      </Link>
                    )}
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      
      {/* All Projects */}
      <div className="portfolio-card" ref={projectsContainerRef}>
        <div className="portfolio-card-header">
          <h2 className="section-title flex justify-between items-center">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Projects
            </span>
            <span className="badge badge-primary text-xs relative">
              <span className="absolute inset-0 bg-gradient-to-r from-theme-primary/20 to-theme-accent/20 animate-pulse rounded-full"></span>
              <span className="relative">{projects.length} total</span>
            </span>
          </h2>
        </div>
        
        <div className="portfolio-card-body">
          <div className="projects-grid">
            {regularProjects.slice(0, visibleProjects).map((project, index) => (
            <div 
              key={project.id} 
                id={`project-${project.id}`}
                className="project-card project-animate group"
                style={{ 
                  opacity: observedElements.get(`project-${project.id}`) ? 1 : 0,
                  transform: observedElements.get(`project-${project.id}`) 
                    ? 'translateY(0)' 
                    : 'translateY(40px)',
                  transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
                }}
              >
                <div className="project-image-container">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                    width={400}
                    height={240}
                    className="project-image"
                    priority={index < 2}
                  />
                  
                  <div className="project-overlay flex justify-center items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2 mb-4 translate-y-5 group-hover:translate-y-0 transition-transform duration-300">
                  {project.demoUrl && (
                    <Link 
                      href={project.demoUrl}
                      target="_blank"
                          className="button-primary text-xs py-1"
                    >
                          View Demo
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link 
                      href={project.githubUrl}
                      target="_blank"
                          className="button-outline text-xs py-1 bg-white/90"
                    >
                      View Code
                    </Link>
                      )}
                    </div>
                  </div>
                  
                  {/* Add decorative corner gradient */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-theme-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title group-hover:text-theme-primary transition-colors duration-300 bg-gradient-to-r from-theme-text to-theme-text bg-clip-text group-hover:from-theme-primary group-hover:to-theme-accent group-hover:text-transparent">{project.title}</h3>
                  <p className="project-description line-clamp-3">{project.description}</p>
                  
                  <div className="project-tags">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span 
                        key={tech} 
                        className="project-tag"
                        style={{
                          transition: 'all 0.3s ease',
                          transitionDelay: '0.1s'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-theme-accent">+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        
        {regularProjects.length > visibleProjects && (
          <div className="portfolio-card-footer text-center">
            <button 
              onClick={handleLoadMore}
              className="button-secondary inline-flex items-center group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Load More Projects
              </span>
            </button>
          </div>
        )}
    </div>
    </section>
  );
} 