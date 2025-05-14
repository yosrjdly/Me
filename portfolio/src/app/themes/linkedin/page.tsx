'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import Profile from '../../components/linkedin/Profile';
import Projects from '../../components/linkedin/Projects';
import Link from 'next/link';
import { getAllProjects } from '../../../lib/projects';
import { getPersonalInfo, formatDateRange } from '../../../lib/personal';
import { getAllSkills } from '../../../lib/skills';
import './linkedin-styles.css';

// Parallax mouse effect for decorative elements
function useMouseParallax() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return mousePosition;
}

export default function LinkedInThemePage() {
  const { theme, setTheme } = useTheme();
  const mousePosition = useMouseParallax();
  const [pageLoaded, setPageLoaded] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Get personal data from the personal.ts utility
  const personalData = getPersonalInfo();
  const skills = getAllSkills();

// Process projects for the LinkedIn view
  const linkedInProjects = getAllProjects().map(project => ({
  id: project.id,
  title: project.title,
  description: project.description,
    thumbnail: project.thumbnail || '/images/projects/default.jpg',
  technologies: project.tags,
  demoUrl: project.demoUrl,
  githubUrl: project.githubUrl,
    featured: personalData.portfolio.featured.includes(project.id)
  }));

  // Create profile data structure from personal data
  const profileData = {
    name: personalData.basics.name,
    title: personalData.basics.title,
    location: `${personalData.basics.location.city}, ${personalData.basics.location.country}`,
    connections: Math.floor(Math.random() * 500) + 500, // Just for display
    about: personalData.bio.long,
    experiences: personalData.experience.map(exp => ({
      title: exp.position,
      company: exp.company,
      duration: formatDateRange(exp.startDate, exp.endDate),
      description: exp.description,
      technologies: exp.technologies,
      logo: `/companies/${exp.company.toLowerCase().replace(/\s+/g, '-')}.png` // Assuming logo naming convention
    })),
    educations: personalData.education.map(edu => ({
      school: edu.institution,
      degree: edu.degree,
      duration: formatDateRange(edu.startDate, edu.endDate),
      description: edu.description,
      logo: `/education/${edu.institution.toLowerCase().replace(/\s+/g, '-')}.png` // Assuming logo naming convention
    })),
    languages: personalData.languages,
    skills: skills,
    social: personalData.social,
    profileImage: personalData.basics.avatarUrl || '/images/profile.jpg',
    coverImage: '/images/cover-linkedin.jpg',
    available: personalData.basics.available
  };

  // Auto-set theme to LinkedIn when visiting this page
  useEffect(() => {
    let mounted = true;
    if (theme !== 'linkedin' && mounted) {
      setTheme('linkedin');
    }
    
    return () => {
      mounted = false;
    };
  }, [theme, setTheme]);
  
  // Add page load animation
  useEffect(() => {
    setPageLoaded(true);
    
    // Add scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <main 
      ref={pageRef}
      className={`linkedin-bg min-h-screen pb-16 relative transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Background decorative elements with mouse parallax */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-theme-primary/20 to-theme-accent/10 opacity-70 -z-10"></div>
      <div 
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-theme-primary/10 blur-3xl -z-10"
        style={{ 
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      ></div>
      <div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-theme-accent/10 blur-3xl -z-10"
        style={{ 
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      ></div>
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#7F5AF0_1px,transparent_1px)] [background-size:30px_30px] opacity-[0.03] -z-10"></div>
      
      {/* Header Navigation */}
      <header 
        className="sticky top-0 z-50 backdrop-blur-md bg-theme-glass border-b border-theme-glass-border shadow-lg mb-6"
        style={{
          animation: pageLoaded ? 'slideDown 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' : 'none',
        }}
      >
        <div className="max-w-[1200px] mx-auto flex justify-between items-center px-4 py-3">
          <div className="flex items-center space-x-4">
          <Link 
            href="/"
              className="button-outline flex items-center group transform transition hover:scale-105"
          >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Themes
          </Link>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-accent font-bold text-xl hidden md:block">Professional Portfolio</h1>
        </div>
        
          <div className="flex items-center space-x-3">
          <Link 
            href="/themes/terminal"
              className="button-outline hidden sm:flex items-center group transform transition hover:scale-105"
          >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            Try Terminal View
          </Link>
            
            {personalData.basics.available && (
              <div className="available-badge transform transition hover:scale-105">
                Available for Hire
              </div>
            )}
          </div>
        </div>
      </header>
      
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Main Profile and Projects */}
        <div 
          className="animate-on-scroll opacity-0 translate-y-10"
          style={{ transitionDelay: '0.2s' }}
        >
        <Profile {...profileData} />
        </div>
        
        <div 
          className="animate-on-scroll opacity-0 translate-y-10"
          style={{ transitionDelay: '0.5s' }}
        >
        <Projects projects={linkedInProjects} />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-theme-glass-border backdrop-blur-md bg-theme-glass">
        <div className="max-w-[1200px] mx-auto px-4 text-center relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-20 w-20 h-20 rounded-full bg-theme-primary/5 blur-xl"></div>
          <div className="absolute bottom-0 right-20 w-20 h-20 rounded-full bg-theme-accent/5 blur-xl"></div>
          
          <div className="social-links flex justify-center mb-6 relative z-10">
            {personalData.social.map((social, index) => (
              <Link 
                key={social.network} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
                title={social.network}
              >
                {social.network === 'GitHub' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                )}
                {social.network === 'LinkedIn' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                )}
                {social.network === 'Twitter' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                )}
              </Link>
            ))}
            
            <Link 
              href={`mailto:${personalData.basics.email}`}
              className="social-link stagger-item"
              style={{ animationDelay: `${personalData.social.length * 0.1}s` }}
              title="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
              </svg>
            </Link>
          </div>
          
          <div className="footer-text relative z-10">
            <p>© {new Date().getFullYear()} | <span className="text-theme-primary font-medium">{personalData.basics.name}</span> | <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-accent">Professional Portfolio</span></p>
            <p className="mt-1 text-xs text-theme-text-light">This is part of a multi-theme portfolio showcase</p>
          </div>
        </div>
      </footer>
      
      {/* Add keyframes for animate-in elements */}
      <style jsx>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-on-scroll {
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-on-scroll.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </main>
  );
} 