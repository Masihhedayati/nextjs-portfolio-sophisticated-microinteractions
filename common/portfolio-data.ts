import { PortfolioData } from './portfolio-types';

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: 'John Doe',
    title: 'Full Stack Developer',
    tagline: 'Building digital experiences with modern web technologies',
    bio: 'Passionate developer with expertise in React, Node.js, and cloud technologies. I love creating elegant solutions to complex problems.',
    avatar: '/avatar.jpg'
  },
  
  projects: [
    {
      id: 'project-1',
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with real-time inventory and AI recommendations',
      longDescription: 'Built a full-stack e-commerce platform featuring real-time inventory management, AI-powered product recommendations, and seamless payment integration. The platform handles thousands of concurrent users with 99.9% uptime.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
      category: 'web',
      featured: true,
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/username/project',
      imageUrl: '/projects/ecommerce.jpg',
      thumbnailUrl: '/projects/ecommerce-thumb.jpg',
      date: '2024-01',
      highlights: [
        'Increased conversion rate by 35% through AI recommendations',
        'Reduced page load time by 60% with optimized caching',
        'Handled Black Friday traffic with 10x normal load'
      ]
    },
    {
      id: 'project-2',
      title: 'Task Management Mobile App',
      description: 'Cross-platform mobile app for team collaboration and task tracking',
      longDescription: 'Developed a React Native application that helps teams collaborate effectively with real-time updates, push notifications, and offline support. Features include kanban boards, time tracking, and team analytics.',
      technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
      category: 'mobile',
      featured: true,
      demoUrl: 'https://apps.apple.com/app/example',
      githubUrl: 'https://github.com/username/taskapp',
      imageUrl: '/projects/taskapp.jpg',
      thumbnailUrl: '/projects/taskapp-thumb.jpg',
      date: '2023-08',
      highlights: [
        '50K+ downloads across iOS and Android',
        '4.8 star rating on app stores',
        'Featured in "Apps We Love" by Apple'
      ]
    },
    {
      id: 'project-3',
      title: 'AI Content Generator',
      description: 'Machine learning powered content generation tool for marketers',
      longDescription: 'Created an AI-powered platform that generates marketing content using fine-tuned language models. The system can produce blog posts, social media content, and email campaigns tailored to brand voice.',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Docker'],
      category: 'ai',
      featured: false,
      githubUrl: 'https://github.com/username/ai-content',
      imageUrl: '/projects/ai-content.jpg',
      thumbnailUrl: '/projects/ai-content-thumb.jpg',
      date: '2023-12',
      highlights: [
        'Generates SEO-optimized content in seconds',
        'Supports 15+ languages',
        'Used by 200+ marketing agencies'
      ]
    },
    {
      id: 'project-4',
      title: 'Real-time Analytics Dashboard',
      description: 'Data visualization platform for business intelligence',
      longDescription: 'Built a comprehensive analytics dashboard that processes millions of events per day and provides real-time insights through interactive visualizations. Features custom chart components and exportable reports.',
      technologies: ['Vue.js', 'D3.js', 'Node.js', 'ClickHouse', 'Kafka'],
      category: 'web',
      featured: false,
      demoUrl: 'https://analytics-demo.example.com',
      imageUrl: '/projects/analytics.jpg',
      thumbnailUrl: '/projects/analytics-thumb.jpg',
      date: '2023-05',
      highlights: [
        'Processes 10M+ events daily',
        'Sub-second query response times',
        'Custom visualization library'
      ]
    }
  ],
  
  skills: [
    // Frontend
    { id: 'skill-1', name: 'React', category: 'frontend', proficiency: 9, yearsOfExperience: 5 },
    { id: 'skill-2', name: 'TypeScript', category: 'frontend', proficiency: 8, yearsOfExperience: 4 },
    { id: 'skill-3', name: 'Next.js', category: 'frontend', proficiency: 8, yearsOfExperience: 3 },
    { id: 'skill-4', name: 'Vue.js', category: 'frontend', proficiency: 7, yearsOfExperience: 2 },
    { id: 'skill-5', name: 'CSS/SCSS', category: 'frontend', proficiency: 9, yearsOfExperience: 6 },
    
    // Backend
    { id: 'skill-6', name: 'Node.js', category: 'backend', proficiency: 9, yearsOfExperience: 5 },
    { id: 'skill-7', name: 'Python', category: 'backend', proficiency: 8, yearsOfExperience: 4 },
    { id: 'skill-8', name: 'Express.js', category: 'backend', proficiency: 9, yearsOfExperience: 5 },
    { id: 'skill-9', name: 'FastAPI', category: 'backend', proficiency: 7, yearsOfExperience: 2 },
    
    // Database
    { id: 'skill-10', name: 'PostgreSQL', category: 'database', proficiency: 8, yearsOfExperience: 4 },
    { id: 'skill-11', name: 'MongoDB', category: 'database', proficiency: 8, yearsOfExperience: 4 },
    { id: 'skill-12', name: 'Redis', category: 'database', proficiency: 7, yearsOfExperience: 3 },
    
    // DevOps
    { id: 'skill-13', name: 'Docker', category: 'devops', proficiency: 8, yearsOfExperience: 4 },
    { id: 'skill-14', name: 'AWS', category: 'devops', proficiency: 7, yearsOfExperience: 3 },
    { id: 'skill-15', name: 'CI/CD', category: 'devops', proficiency: 8, yearsOfExperience: 4 },
    
    // Languages
    { id: 'skill-16', name: 'JavaScript', category: 'language', proficiency: 10, yearsOfExperience: 6 },
    { id: 'skill-17', name: 'Python', category: 'language', proficiency: 8, yearsOfExperience: 4 },
    { id: 'skill-18', name: 'Java', category: 'language', proficiency: 6, yearsOfExperience: 2 },
    
    // Tools
    { id: 'skill-19', name: 'Git', category: 'tool', proficiency: 9, yearsOfExperience: 6 },
    { id: 'skill-20', name: 'VS Code', category: 'tool', proficiency: 10, yearsOfExperience: 5 },
  ],
  
  experience: [
    {
      id: 'exp-1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Developer',
      startDate: '2022-01',
      description: 'Lead developer for multiple client projects, focusing on scalable web applications and cloud architecture.',
      achievements: [
        'Led team of 5 developers on critical e-commerce platform',
        'Reduced infrastructure costs by 40% through optimization',
        'Implemented CI/CD pipeline reducing deployment time by 80%'
      ],
      technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL']
    },
    {
      id: 'exp-2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2020-03',
      endDate: '2021-12',
      description: 'Core developer in a fast-paced startup environment, building MVP and scaling to production.',
      achievements: [
        'Built MVP from scratch in 3 months',
        'Scaled application to handle 100K+ users',
        'Integrated third-party APIs for payment and shipping'
      ],
      technologies: ['Vue.js', 'Python', 'MongoDB', 'Docker']
    }
  ],
  
  contact: {
    email: 'john.doe@example.com',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    website: 'https://johndoe.dev',
    resumeUrl: '/resume.pdf'
  }
};