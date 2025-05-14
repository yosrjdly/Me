import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SkillBar from './SkillBar';

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
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  skills: Array<{
    name: string;
    level: number;
    category?: string;
    color?: string;
  }>;
  social: Array<{
    network: string;
    url: string;
  }>;
  profileImage?: string;
  coverImage?: string;
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
  languages,
  skills,
  social,
  profileImage = '/profile.jpg',
  coverImage = '/cover.jpg',
  available = false,
}: ProfileProps) {
  return (
    <div className="portfolio-container">
      {/* Sidebar - Profile Info */}
      <aside className="portfolio-sidebar">
        <div className="portfolio-card">
          <div className="profile-header">
            <div className="h-28 bg-gradient-to-r from-primary-100 to-primary-200 relative">
          {coverImage && (
            <Image
              src={coverImage}
              alt="Cover"
                  width={320}
                  height={112}
                  className="w-full h-full object-cover"
              priority
            />
          )}
        </div>
        
            <div className="profile-avatar-container">
              <div className="profile-avatar">
              {profileImage && (
                <Image
                  src={profileImage}
                  alt={name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
            
            <div className="profile-info">
              <h1 className="profile-name">{name}</h1>
              <p className="profile-title">{title}</p>
              
              <div className="profile-details mb-4">
                <span className="text-sm text-theme-text-light flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {location}
                </span>
                <span className="text-sm text-theme-text-light flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {connections}+ connections
                </span>
        </div>
        
              {available && (
                <div className="available-badge mb-4">
                  Available for hire
                </div>
              )}
              
              <div className="flex space-x-2">
                <button className="button-primary w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact
                </button>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="portfolio-card-body border-t border-theme-border">
            <h2 className="text-lg font-bold mb-3">About</h2>
            <p className="about-text">{about}</p>
          </div>
          
          {/* Skills Section */}
          <div className="portfolio-card-body border-t border-theme-border">
            <h2 className="text-lg font-bold mb-3">Skills</h2>
            <div className="space-y-2">
              {skills.slice(0, 5).map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  delay={index * 100}
                />
              ))}
              {skills.length > 5 && (
                <button className="mt-4 button-outline w-full text-sm">
                  Show all {skills.length} skills
                </button>
              )}
            </div>
          </div>
          
          {/* Languages Section */}
          {languages && languages.length > 0 && (
            <div className="portfolio-card-body border-t border-theme-border">
              <h2 className="text-lg font-bold mb-3">Languages</h2>
              <div className="languages-grid">
                {languages.map((lang, index) => (
                  <div key={lang.language} className="language-item stagger-item" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="language-name">{lang.language}</div>
                    <div className="language-level">{lang.proficiency}</div>
                </div>
                ))}
              </div>
              </div>
            )}
            
          {/* Contact Section */}
          <div className="portfolio-card-footer">
            <div className="flex justify-center space-x-4">
              {social.map((item) => (
                <Link 
                  key={item.network} 
                  href={item.url}
                  target="_blank"
                  className="social-link"
                  title={item.network}
                >
                  {item.network === 'GitHub' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {item.network === 'LinkedIn' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )}
                  {item.network === 'Twitter' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  )}
                </Link>
              ))}
              <Link 
                href={`mailto:contact@example.com`}
                className="social-link"
                title="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                </svg>
              </Link>
              </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main>
        {/* Experience Section */}
        <section className="portfolio-card mb-8">
          <div className="portfolio-card-header">
            <h2 className="section-title">Professional Experience</h2>
      </div>
          <div className="portfolio-card-body">
            <div className="timeline">
          {experiences.map((exp, index) => (
                <div 
                  key={`${exp.company}-${index}`} 
                  className="timeline-item stagger-item"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="timeline-item-header">
                    <div className="timeline-item-icon">
                    {exp.logo ? (
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                      />
                    ) : (
                        <span className="text-xl font-bold text-theme-primary">{exp.company.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="timeline-item-title text-lg">{exp.title}</h3>
                      <p className="timeline-item-subtitle">{exp.company}</p>
                      <p className="timeline-item-date">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                        </svg>
                        {exp.duration}
                      </p>
                    </div>
                  </div>
                  <div className="ml-14">
                    <p className="timeline-item-description">{exp.description}</p>
                    
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="skills-container mt-3">
                        {exp.technologies.map(tech => (
                          <span key={tech} className="skill-tag">{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
        </div>
        </section>
      
      {/* Education Section */}
        <section className="portfolio-card mb-8">
          <div className="portfolio-card-header">
            <h2 className="section-title">Education</h2>
          </div>
          <div className="portfolio-card-body">
            <div className="timeline">
          {educations.map((edu, index) => (
                <div 
                  key={`${edu.school}-${index}`} 
                  className="timeline-item stagger-item"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="timeline-item-header">
                    <div className="timeline-item-icon">
                  {edu.logo ? (
                    <Image
                      src={edu.logo}
                      alt={edu.school}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                    />
                  ) : (
                        <span className="text-xl font-bold text-theme-primary">{edu.school.charAt(0)}</span>
                  )}
              </div>
              <div>
                      <h3 className="timeline-item-title text-lg">{edu.school}</h3>
                      <p className="timeline-item-subtitle">{edu.degree}</p>
                      <p className="timeline-item-date">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {edu.duration}
                      </p>
              </div>
            </div>
                  {edu.description && (
                    <div className="ml-14">
                      <p className="timeline-item-description">{edu.description}</p>
      </div>
          )}
        </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 