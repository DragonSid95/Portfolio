export interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  demo?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    title: 'Project One',
    category: 'Web Application',
    description:
      'A full-featured web application built with React and Node.js, featuring responsive design and modern UI patterns.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    image: '/images/project1-screenshot-REPLACE-ME.png',
    demo: '#',
    github: '#',
  },
  {
    title: 'Project Two',
    category: 'Mobile App',
    description:
      'A cross-platform mobile application developed with React Native, offering seamless experiences across iOS and Android.',
    technologies: ['React Native', 'Firebase', 'Redux'],
    image: '/images/project2-screenshot-REPLACE-ME.png',
    demo: '#',
    github: '#',
  },
  {
    title: 'Project Three',
    category: 'E-commerce',
    description:
      'A complete e-commerce platform with payment integration, inventory management, and admin dashboard.',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    image: '/images/project3-screenshot-REPLACE-ME.png',
    demo: '#',
    github: '#',
  },
  {
    title: 'Project Four',
    category: 'Design System',
    description:
      'A reusable component library and design system built with Storybook and TypeScript for consistent UI development.',
    technologies: ['TypeScript', 'Storybook', 'CSS Modules'],
    image: '/images/project4-screenshot-REPLACE-ME.png',
    demo: '#',
    github: '#',
  },
  {
    title: 'Project Five',
    category: 'Portfolio',
    description:
      'A personal portfolio website showcasing projects, skills, and contact information with smooth animations and transitions.',
    technologies: ['HTML/CSS', 'JavaScript', 'GSAP'],
    image: '/images/project5-screenshot-REPLACE-ME.png',
    demo: '#',
    github: '#',
  },
  {
    title: 'Project Six',
    category: 'Dashboard',
    description:
      'An analytics dashboard with data visualization, real-time updates, and customizable widgets for business intelligence.',
    technologies: ['D3.js', 'Chart.js', 'Socket.io'],
    image: '/images/project6-screenshot-REPLACE-ME.png',
    demo: '#',
    github: '#',
  },
];

/** Unique, sorted list of categories for the filter bar. */
export const categories: string[] = [
  'All',
  ...Array.from(new Set(projects.map((p) => p.category))).sort(),
];
