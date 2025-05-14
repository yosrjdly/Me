import skillsData from '../data/skills.json';

export interface Skill {
  name: string;
  level: number;
  experience: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

// Get all skill categories
export function getAllSkillCategories(): SkillCategory[] {
  return skillsData as SkillCategory[];
}

// Get a specific skill category by name
export function getSkillCategoryByName(name: string): SkillCategory | undefined {
  return getAllSkillCategories().find(
    (category) => category.category.toLowerCase() === name.toLowerCase()
  );
}

// Get all skills flattened into a single array
export function getAllSkills(): Skill[] {
  return getAllSkillCategories().flatMap((category) => category.skills);
}

// Get top skills by level (highest level first)
export function getTopSkills(count: number = 5): Skill[] {
  return getAllSkills()
    .sort((a, b) => b.level - a.level)
    .slice(0, count);
}

// Get skills above a certain level
export function getSkillsAboveLevel(level: number): Skill[] {
  return getAllSkills().filter((skill) => skill.level >= level);
} 