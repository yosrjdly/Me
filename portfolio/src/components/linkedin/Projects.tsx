import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  // Separate featured projects from regular projects
  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-6">
            {featuredProjects.map(project => (
              <div 
                key={project.id} 
                className="linkedin-card flex flex-col md:flex-row overflow-hidden"
              >
                <div className="md:w-1/3 relative h-48 md:h-auto">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-bold text-linkedin-text">{project.title}</h3>
                  <p className="text-linkedin-secondary mt-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map(tech => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-blue-50 text-linkedin-primary text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3 mt-4">
                    {project.demoUrl && (
                      <Link 
                        href={project.demoUrl}
                        className="linkedin-button-primary" 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link 
                        href={project.githubUrl}
                        className="linkedin-button-outline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Code
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Regular Projects */}
      <div>
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularProjects.map(project => (
            <div 
              key={project.id} 
              className="linkedin-project-card"
            >
              <div className="relative h-48">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="linkedin-project-image"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-linkedin-text">{project.title}</h3>
                <p className="text-linkedin-secondary mt-1 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span 
                      key={tech} 
                      className="px-2 py-0.5 bg-blue-50 text-linkedin-primary text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2 mt-4">
                  {project.demoUrl && (
                    <Link 
                      href={project.demoUrl}
                      className="text-sm text-linkedin-primary hover:underline" 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link 
                      href={project.githubUrl}
                      className="text-sm text-linkedin-secondary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 