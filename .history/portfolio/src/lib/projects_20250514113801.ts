import projectsData from '../data/projects.json';

export interface ProjectProcess {
  phase: string;
  description: string;
  duration: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  tags: string[];
  thumbnail: string;
  demoUrl: string;
  githubUrl: string;
  process: ProjectProcess[];
}

// Get all projects
export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

// Get a specific project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

// Get a specific project by ID
export function getProjectById(id: string): Project | undefined {
  return getAllProjects().find((project) => project.id === id);
}

// Get featured projects (could be based on some criteria)
export function getFeaturedProjects(count: number = 3): Project[] {
  return getAllProjects().slice(0, count);
}

// Filter projects by tag
export function getProjectsByTag(tag: string): Project[] {
  return getAllProjects().filter((project) => project.tags.includes(tag));
}

// Get all tags
export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllProjects().forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
} 