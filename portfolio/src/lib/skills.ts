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

// Convert the JSON data to typed skill data
export const skillCategories: SkillCategory[] = skillsData as SkillCategory[];

// Flatten all skills into a single array for components that don't need categories
export const skills: Skill[] = skillCategories.reduce((acc, category) => {
  return [...acc, ...category.skills];
}, [] as Skill[]);

// Get skills by category
export const getSkillsByCategory = (categoryName: string): Skill[] => {
  const category = skillCategories.find(c => c.category === categoryName);
  return category ? category.skills : [];
};

// Get top skills by level
export const getTopSkills = (count: number = 5): Skill[] => {
  return [...skills].sort((a, b) => b.level - a.level).slice(0, count);
};

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

// Get skills above a certain level
export function getSkillsAboveLevel(level: number): Skill[] {
  return getAllSkills().filter((skill) => skill.level >= level);
} 