'use client';

import React, { useEffect, useState } from 'react';
import { Skill } from '@/lib/skills';

interface SkillBarProps {
  skill: Skill;
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
  
  // Animate the skill bar width
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setWidth(skill.level);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [animated, delay, skill.level]);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <div className="flex items-center">
          <span className="mr-2">{skill.icon}</span>
          <h3 className="text-linkedin-text font-medium">{skill.name}</h3>
        </div>
        {showLevel && (
          <div className="flex items-center">
            <span className="text-sm text-linkedin-secondary font-medium">
              {skill.level}%
            </span>
            <span className="ml-2 text-xs text-linkedin-secondary">
              {skill.experience}
            </span>
          </div>
        )}
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-linkedin-primary rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${width}%`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
      
      {/* Endorsements UI (LinkedIn-specific) */}
      <div className="mt-1 flex items-center">
        <div className="flex -space-x-1">
          {[...Array(Math.min(3, Math.ceil(skill.level / 25)))].map((_, i) => (
            <div 
              key={i} 
              className="w-5 h-5 rounded-full bg-gray-300 border border-white flex items-center justify-center text-xs"
              style={{ zIndex: 3 - i }}
            >
              {['👍', '👌', '⭐'][i % 3]}
            </div>
          ))}
        </div>
        {skill.level >= 75 && (
          <span className="text-xs text-linkedin-secondary ml-2">
            + {Math.floor(skill.level / 20)} endorsements
          </span>
        )}
      </div>
    </div>
  );
} 