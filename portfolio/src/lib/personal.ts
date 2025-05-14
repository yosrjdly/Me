import personalData from '../data/personal.json';

export interface PersonalInfo {
  basics: {
    name: string;
    title: string;
    summary: string;
    location: {
      city: string;
      country: string;
    };
    available: boolean;
    email: string;
    phone: string;
    website: string;
    avatarUrl: string;
  };
  bio: {
    short: string;
    long: string;
  };
  social: Array<{
    network: string;
    username: string;
    url: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    location: string;
    description: string;
    technologies: string[];
  }>;
  skills: {
    main: string[];
    familiar: string[];
  };
  languages: Array<{
    language: string;
    fluency: string;
  }>;
  interests: string[];
  testimonials: Array<{
    name: string;
    position: string;
    text: string;
    avatarUrl: string;
  }>;
  portfolio: {
    featured: string[];
    showCaseStudies: boolean;
  };
  preferences: {
    theme: string;
    accentColor: string;
    fontPreference: string;
    showAvailabilityStatus: boolean;
  };
}

/**
 * Get all personal information
 */
export function getPersonalInfo(): PersonalInfo {
  return personalData as PersonalInfo;
}

/**
 * Get basic information (name, title, contact)
 */
export function getBasicInfo() {
  return personalData.basics;
}

/**
 * Get social media profiles
 */
export function getSocialProfiles() {
  return personalData.social;
}

/**
 * Get work experience, sorted by most recent first
 */
export function getExperience() {
  return [...personalData.experience].sort((a, b) => {
    // Sort by start date in descending order
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}

/**
 * Get education history, sorted by most recent first
 */
export function getEducation() {
  return [...personalData.education].sort((a, b) => {
    // Sort by end date in descending order
    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
  });
}

/**
 * Get a specific section of the personal data
 */
export function getPersonalSection<K extends keyof PersonalInfo>(section: K): PersonalInfo[K] {
  return personalData[section];
}

/**
 * Format a date range for display
 */
export function formatDateRange(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short'
  });
  
  if (!endDate) {
    return `${startFormatted} - Present`;
  }
  
  const end = new Date(endDate);
  const endFormatted = end.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short'
  });
  
  return `${startFormatted} - ${endFormatted}`;
}

/**
 * Calculate experience duration in years and months
 */
export function calculateDuration(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  
  const totalMonths = years * 12 + months;
  const displayYears = Math.floor(totalMonths / 12);
  const displayMonths = totalMonths % 12;
  
  if (displayYears === 0) {
    return `${displayMonths} month${displayMonths !== 1 ? 's' : ''}`;
  } else if (displayMonths === 0) {
    return `${displayYears} year${displayYears !== 1 ? 's' : ''}`;
  } else {
    return `${displayYears} year${displayYears !== 1 ? 's' : ''}, ${displayMonths} month${displayMonths !== 1 ? 's' : ''}`;
  }
} 