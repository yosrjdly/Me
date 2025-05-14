'use client';

import React, { useEffect, useState, useRef } from 'react';

interface SkillProps {
  name: string;
  level: number;
  category?: string;
  color?: string;
}

interface SkillBarProps {
  skill: SkillProps;
  showLevel?: boolean;
  animated?: boolean;
  delay?: number;
}

export default function SkillBar({
  skill,
  showLevel = true,
  animated = true,
  delay = 0,
}: SkillBarProps) {
  const [width, setWidth] = useState(animated ? 0 : skill.level);
  const [isVisible, setIsVisible] = useState(false);
  const skillRef = useRef<HTMLDivElement>(null);
  
  // Observe when skill bar enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (skillRef.current) {
      observer.observe(skillRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Animate the skill bar width
  useEffect(() => {
    if (animated && isVisible) {
      const timer = setTimeout(() => {
        setWidth(skill.level);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [animated, delay, skill.level, isVisible]);
  
  // Define experience level label based on skill level
  const getExperienceLabel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Intermediate';
    return 'Beginner';
  };
  
  const percent = skill.level * 10;
  
  // Determine color based on level
  const getColorClass = (level: number) => {
    if (level >= 90) return 'from-theme-primary to-purple-500';
    if (level >= 75) return 'from-blue-500 to-theme-primary';
    if (level >= 60) return 'from-theme-accent to-teal-500';
    return 'from-teal-400 to-theme-accent';
  };
  
  const colorGradient = getColorClass(skill.level);
  
  return (
    <div ref={skillRef} className="skill-bar-container group relative overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <div className="text-theme-text font-medium group-hover:text-theme-primary transition-colors duration-300 flex items-center">
          <div className="relative overflow-hidden">
            {skill.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-theme-primary to-theme-accent group-hover:w-full transition-all duration-500"></span>
          </div>
        </div>
        {showLevel && (
          <div className="text-xs bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent font-semibold group-hover:scale-110 transform transition-transform duration-300">
            {getExperienceLabel(skill.level)}
          </div>
        )}
      </div>
      
      <div className="progress-bar backdrop-blur-sm bg-theme-surface/30 relative">
        <div 
          className={`progress-bar-fill bg-gradient-to-r ${colorGradient}`}
          style={{ 
            '--percent': `${animated && !isVisible ? 0 : percent}%`,
            animationDelay: `${delay}ms`,
            animationPlayState: isVisible ? 'running' : 'paused',
          } as React.CSSProperties} 
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-white/20 skew-x-12 animate-shimmer"></div>
          </div>
        </div>
        
        <div 
          className="absolute top-0 right-0 bottom-0 px-2 flex items-center text-[10px] font-bold"
          style={{ 
            background: 'linear-gradient(to right, transparent, rgba(127, 90, 240, 0.3))',
            width: '30%',
            opacity: 0,
            transform: 'translateX(100%)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            ...(isVisible && { opacity: 0.8, transform: 'translateX(70%)' }),
          }}
        >
          <span className="text-white backdrop-blur-sm px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {percent}%
          </span>
        </div>
      </div>
      
      {/* Endorsement dots */}
      <div className="mt-1 flex items-center">
        <div className="flex -space-x-1">
          {[...Array(Math.min(3, Math.max(1, Math.ceil(skill.level / 30))))].map((_, i) => (
            <div 
              key={i} 
              className="w-4 h-4 rounded-full bg-gradient-to-r from-theme-primary to-theme-accent flex items-center justify-center text-[8px] text-white font-bold border border-white transition-all duration-500 opacity-70 group-hover:opacity-100"
              style={{ 
                zIndex: 3 - i,
                transform: `scale(${animated && !isVisible ? 0 : 1 - i * 0.15}) translateX(${i * 2}px)`,
                transitionDelay: `${delay + i * 150}ms`,
              }}
            >
              {i === 0 ? '+' : ''}
            </div>
          ))}
        </div>
        
        {skill.level >= 75 && (
          <div 
            className="ml-2 text-[9px] text-theme-primary bg-theme-highlight px-1.5 py-0.5 rounded-sm opacity-0 transition-opacity duration-300"
            style={{
              opacity: isVisible ? 0.8 : 0,
              transitionDelay: `${delay + 400}ms`,
            }}
          >
            Highly endorsed
          </div>
        )}
      </div>
    </div>
  );
} 