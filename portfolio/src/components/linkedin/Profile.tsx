import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SkillBar from './SkillBar';
import { getAllSkills } from '../../lib/skills';

interface ProfileProps {
  name: string;
  title: string;
  location: string;
  connections: number;
  about: string;
  experiences: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
    technologies?: string[];
    logo?: string;
  }>;
  educations: Array<{
    school: string;
    degree: string;
    duration: string;
    description?: string;
    logo?: string;
  }>;
  profileImage?: string;
  coverImage?: string;
  languages?: Array<{
    language: string;
    fluency: string;
  }>;
  skills?: Array<any>;
  social?: Array<{
    network: string;
    username: string;
    url: string;
  }>;
  available?: boolean;
}

export default function Profile({
  name,
  title,
  location,
  connections,
  about,
  experiences,
  educations,
  profileImage = '/images/profile.jpg',
  coverImage = '/images/cover.jpg',
  languages = [],
  skills = [],
  social = [],
  available = false
}: ProfileProps) {
  // Get skills if not provided
  const allSkills = skills.length > 0 ? skills : getAllSkills();
  
  return (
    <div className="linkedin-card max-w-4xl mx-auto">
      {/* Profile Header with animated background */}
      <div className="linkedin-profile-header">
        <div className="h-48 relative overflow-hidden">
          {coverImage && (
            <div className="absolute inset-0 hover-3d">
              <Image
                src={coverImage}
                alt="Cover"
                width={1200}
                height={300}
                className="linkedin-profile-cover"
                priority
              />
            </div>
          )}
          
          {/* Animated wave overlay */}
          <div className="absolute inset-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-24 animate-wave">
              <path fill="rgba(255,255,255,0.15)" fillOpacity="1" d="M0,160L48,149.3C96,139,192,117,288,122.7C384,128,480,160,576,165.3C672,171,768,149,864,154.7C960,160,1056,192,1152,181.3C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-32 animate-wave" style={{animationDelay: '-2s', animationDuration: '7s'}}>
              <path fill="rgba(255,255,255,0.1)" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,176C960,160,1056,160,1152,176C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({length: 6}).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white opacity-20 animate-float"
                style={{
                  width: `${Math.random() * 30 + 10}px`,
                  height: `${Math.random() * 30 + 10}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 5 + 3}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          {/* Accent decorative corner */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-theme-accent opacity-20 rounded-bl-full transform rotate-90"></div>
        </div>
        
        {/* Profile avatar with hover animation */}
        <div className="absolute -top-16 left-8">
          <div className="w-32 h-32 linkedin-profile-avatar">
            {profileImage && (
              <Image
                src={profileImage}
                alt={name}
                width={128}
                height={128}
                className="object-cover w-full h-full transition-all duration-500"
              />
            )}
          </div>
        </div>
      </div>
      
      <div className="linkedin-profile-info">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div className="fade-in-up">
            <h1 className="text-3xl font-bold text-theme-text transition-colors hover:text-theme-primary">
              {name}
              {available && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  <span className="h-2 w-2 mr-1 bg-green-400 rounded-full animate-pulse"></span>
                  Available
                </span>
              )}
            </h1>
            <p className="text-lg text-theme-text-light mt-1">{title}</p>
            <div className="flex items-center mt-2 text-sm text-theme-text-light">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-theme-primary font-medium">{connections}+ connections</span>
              </span>
            </div>
            
            {/* Social links with icon animations */}
            {social && social.length > 0 && (
              <div className="flex mt-3 space-x-2">
                {social.map((profile, index) => (
                  <Link 
                    key={profile.network} 
                    href={profile.url} 
                    target="_blank" 
                    className="icon-hover text-theme-text-light hover:text-theme-primary p-2 rounded-full bg-theme-light"
                    aria-label={profile.network}
                  >
                    {profile.network === 'GitHub' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    {profile.network === 'LinkedIn' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex space-x-2 slide-in-right">
            <button className="linkedin-button-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Connect
            </button>
            <button className="linkedin-button-outline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Message
            </button>
            <div className="relative group">
              <button className="linkedin-button-outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block glass-effect">
                <a href="#" className="block px-4 py-2 text-sm text-theme-text-light hover:bg-theme-highlight hover:text-theme-primary">Download Resume</a>
                <a href="#" className="block px-4 py-2 text-sm text-theme-text-light hover:bg-theme-highlight hover:text-theme-primary">Share Profile</a>
              </div>
            </div>
          </div>
        </div>
          
        {/* About section with fancy border */}
        <div className="mt-8 slide-in-right" style={{animationDelay: '0.1s'}}>
          <div className="p-4 rounded-lg bg-white relative before:absolute before:w-1 before:h-full before:bg-theme-primary before:left-0 before:top-0 before:rounded-l-lg hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-bold mb-3 text-theme-text">About</h2>
            <p className="text-theme-text-light whitespace-pre-line">{about}</p>
          </div>
        </div>
      </div>
      
      {/* Experience Section with timeline animation */}
      <div className="linkedin-card-body border-t border-theme-border">
        <h2 className="text-xl font-bold mb-4 text-theme-text flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Experience
        </h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="linkedin-experience-item stagger-item" style={{animationDelay: `${0.1 + index * 0.1}s`}}>
              <div className="flex">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-theme-light rounded-lg overflow-hidden flex items-center justify-center shadow-md">
                    {exp.logo ? (
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-2xl text-theme-primary font-bold">{exp.company.charAt(0)}</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-theme-text">{exp.title}</h3>
                  <p className="text-theme-primary">{exp.company}</p>
                  <p className="text-sm text-theme-text-light">{exp.duration}</p>
                  <p className="mt-2 text-theme-text-light">{exp.description}</p>
                  
                  {/* Technologies used */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap">
                      {exp.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="skill-tag text-xs"
                          style={{animationDelay: `${0.2 + techIndex * 0.05}s`}}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Education Section with staggered animation */}
      <div className="linkedin-card-body border-t border-theme-border">
        <h2 className="text-xl font-bold mb-4 text-theme-text flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
          Education
        </h2>
        <div className="space-y-6">
          {educations.map((edu, index) => (
            <div key={index} className="flex stagger-item hover:bg-theme-card-hover p-3 rounded-lg transition-colors" style={{animationDelay: `${0.1 + index * 0.1}s`}}>
              <div className="mr-4">
                <div className="w-12 h-12 bg-theme-light rounded-lg overflow-hidden flex items-center justify-center shadow-md">
                  {edu.logo ? (
                    <Image
                      src={edu.logo}
                      alt={edu.school}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-2xl text-theme-primary font-bold">{edu.school.charAt(0)}</span>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-theme-text">{edu.school}</h3>
                <p className="text-theme-primary">{edu.degree}</p>
                <p className="text-sm text-theme-text-light">{edu.duration}</p>
                {edu.description && <p className="mt-2 text-theme-text-light">{edu.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Languages Section with modern grid layout */}
      {languages && languages.length > 0 && (
        <div className="linkedin-card-body border-t border-theme-border">
          <h2 className="text-xl font-bold mb-4 text-theme-text flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            Languages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {languages.map((lang, index) => (
              <div 
                key={index} 
                className="p-3 rounded-lg bg-theme-light bg-opacity-30 hover:bg-opacity-60 transition-all stagger-item flex items-center justify-between"
                style={{animationDelay: `${0.1 + index * 0.1}s`}}
              >
                <span className="font-medium text-theme-text">
                  {lang.language}
                </span>
                <span className="text-sm text-theme-primary px-2 py-1 rounded-full bg-theme-light">
                  {lang.fluency}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Skills Section with animated bars */}
      <div className="linkedin-card-body border-t border-theme-border">
        <h2 className="text-xl font-bold mb-4 text-theme-text flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Skills
        </h2>
        <div className="space-y-1">
          {allSkills.slice(0, 8).map((skill, index) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              delay={index * 100}
            />
          ))}
          {allSkills.length > 8 && (
            <button className="mt-6 linkedin-button-outline w-full">
              Show all {allSkills.length} skills
            </button>
          )}
        </div>
      </div>
      
      {/* Footer with contact */}
      <div className="linkedin-card-footer">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-theme-primary font-medium mb-2">Looking to collaborate?</p>
            <div className="flex items-center space-x-3">
              <Link href={`mailto:${available ? 'contact@example.com' : ''}`} className="linkedin-button-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in touch
              </Link>
              <Link href="#" className="linkedin-button-outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </Link>
            </div>
          </div>
          
          <div className="md:text-right mt-4 md:mt-0">
            <p className="text-theme-text-light text-sm">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="text-xs text-theme-text-light mt-1">
              <span className="pulse-dot pl-3">Available for new opportunities</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 