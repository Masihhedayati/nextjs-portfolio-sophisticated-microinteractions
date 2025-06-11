'use client';

import styles from '@components/Application.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import CircularLoader from '@components/CircularLoader';
import TextArea from '@components/TextArea';

// Portfolio data - can be moved to separate file later
const portfolioProjects = [
  {
    id: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with real-time inventory management, AI-powered product recommendations, and seamless payment integration.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/username/ecommerce',
    highlights: [
      'Increased conversion rate by 35% through AI recommendations',
      'Reduced page load time by 60% with optimized caching',
      'Handled Black Friday traffic with 10x normal load'
    ]
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    description: 'Cross-platform mobile application for team collaboration with real-time updates, push notifications, and offline support.',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
    demoUrl: 'https://apps.apple.com/app/taskapp',
    githubUrl: 'https://github.com/username/taskapp',
    highlights: [
      '50K+ downloads across iOS and Android',
      '4.8 star rating on app stores',
      'Featured in "Apps We Love" by Apple'
    ]
  },
  {
    id: 'ai-content-generator',
    title: 'AI Content Generator',
    description: 'Machine learning powered content generation tool that creates marketing content using fine-tuned language models.',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Docker'],
    githubUrl: 'https://github.com/username/ai-content',
    highlights: [
      'Generates SEO-optimized content in seconds',
      'Supports 15+ languages',
      'Used by 200+ marketing agencies'
    ]
  },
  {
    id: 'analytics-dashboard',
    title: 'Real-time Analytics Dashboard',
    description: 'Data visualization platform that processes millions of events per day and provides real-time insights through interactive visualizations.',
    technologies: ['Vue.js', 'D3.js', 'Node.js', 'ClickHouse', 'Kafka'],
    demoUrl: 'https://analytics-demo.example.com',
    highlights: [
      'Processes 10M+ events daily',
      'Sub-second query response times',
      'Custom visualization library'
    ]
  }
];

const skillsData = {
  'Frontend': ['React', 'TypeScript', 'Next.js', 'Vue.js', 'CSS/SCSS'],
  'Backend': ['Node.js', 'Python', 'Express.js', 'FastAPI', 'GraphQL'],
  'Database': ['PostgreSQL', 'MongoDB', 'Redis', 'ClickHouse'],
  'DevOps': ['Docker', 'AWS', 'CI/CD', 'Kubernetes'],
  'Tools': ['Git', 'VS Code', 'Figma', 'Webpack']
};

const defaultPrompt = `Hi! I'm a passionate Full Stack Developer with expertise in modern web technologies. I love creating elegant solutions to complex problems and building digital experiences that make a difference.

Feel free to reach out if you'd like to discuss potential opportunities, collaborations, or just want to chat about technology!`;

const Action = (props) => {
  if (props.disabled) {
    return <span className={styles.actionDisabled}>{props.children}</span>;
  }

  return <span className={styles.action} {...props} />;
};

const File = (props) => {
  if (props.selected) {
    return <div className={styles.selectedFile}>{props.children}</div>;
  }

  return <div className={styles.file} {...props} />;
};

const Copy = (props) => {
  return <div className={styles.copy} {...props} />;
};

const Prompt = (props) => {
  return <TextArea value={props.value} onChange={props.onChange}></TextArea>;
};

const ProjectSelectorButton = (props) => {
  if (props.disabled) {
    return (
      <span className={styles.rootDisabled}>
        <button className={styles.buttonDisabled}>◎ View Projects</button>
      </span>
    );
  }

  return (
    <div className={styles.root}>
      <button className={styles.button} type="button" onClick={props.onClick}>
        ◎ View Projects
      </button>
    </div>
  );
};

export default function PortfolioApplicationComplete({ children }) {
  const [prompt, setPrompt] = React.useState(defaultPrompt);
  const [current, setCurrent] = React.useState('');
  const [projects, setProjects] = React.useState(portfolioProjects);
  const [loading, setLoading] = React.useState(true);
  const [viewingProject, setViewingProject] = React.useState(false);
  const [generatingResponse, setGeneratingResponse] = React.useState(false);
  const [projectDetails, setProjectDetails] = React.useState('');
  const [skillsDisplay, setSkillsDisplay] = React.useState('');

  async function onSelectProject(projectId) {
    setCurrent(projectId);
    setLoading(false);
    setViewingProject(true);
    setGeneratingResponse(true);

    // Simulate project loading
    setTimeout(() => {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setProjectDetails(`${project.description}\n\nTechnologies: ${project.technologies.join(', ')}\n\nKey Achievements:\n${project.highlights.map(h => `• ${h}`).join('\n')}`);
      }
      setViewingProject(false);
    }, 800);

    // Simulate skills generation
    setTimeout(() => {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        const relatedSkills = Object.entries(skillsData)
          .map(([category, skills]) => `${category}:\n${skills.map(s => `• ${s}`).join('\n')}`)
          .join('\n\n');
        setSkillsDisplay(`Related Skills & Technologies:\n\n${relatedSkills}\n\nContact: john.doe@example.com\nGitHub: github.com/johndoe\nLinkedIn: linkedin.com/in/johndoe`);
      }
      setGeneratingResponse(false);
    }, 1200);
  }

  React.useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setSkillsDisplay(`Full Stack Developer Portfolio\n\n${Object.entries(skillsData)
        .map(([category, skills]) => `${category}:\n${skills.map(s => `• ${s}`).join('\n')}`)
        .join('\n\n')}\n\nContact Information:\n📧 john.doe@example.com\n💻 github.com/johndoe\n💼 linkedin.com/in/johndoe`);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.column}>
        <div className={styles.section}>
          <div className={styles.top}>
            <ProjectSelectorButton
              disabled={loading || viewingProject || generatingResponse}
              onClick={() => {
                // Toggle between showing all projects or just featured ones
                setProjects(portfolioProjects);
              }}
            />
          </div>
          <div className={styles.bottom}>
            {loading ? (
              <>
                <CircularLoader />
                <div className={styles.caption}>PLEASE WAIT</div>
              </>
            ) : (
              projects.map((project) => (
                <File
                  key={project.id}
                  selected={project.id === current}
                  onClick={async () => {
                    if (loading || viewingProject || generatingResponse) {
                      alert('You need to wait till we finish our current task.');
                      return;
                    }
                    await onSelectProject(project.id);
                  }}
                >
                  ⭢ {project.title}
                </File>
              ))
            )}
          </div>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.section}>
          <div className={styles.top}>
            <Action
              disabled={loading || viewingProject || generatingResponse}
              onClick={async () => {
                const selectedProject = projects.find(p => p.id === current);
                if (!selectedProject) {
                  alert('You need to select a project to view the live demo.');
                  return;
                }

                if (selectedProject.demoUrl) {
                  window.open(selectedProject.demoUrl, '_blank');
                } else {
                  alert('No live demo available for this project.');
                }
              }}
            >
              ◎ Live Demo
            </Action>

            {!Utilities.isEmpty(projectDetails) ? (
              <Action
                disabled={loading || viewingProject || generatingResponse}
                onClick={async () => {
                  const selectedProject = projects.find(p => p.id === current);
                  if (!selectedProject) {
                    alert('You need to select a project to view the source code.');
                    return;
                  }

                  if (selectedProject.githubUrl) {
                    window.open(selectedProject.githubUrl, '_blank');
                  } else {
                    alert('Source code is not publicly available for this project.');
                  }
                }}
              >
                ◎ View Code
              </Action>
            ) : null}
          </div>
          <div className={styles.bottom}>
            <Copy>
              {viewingProject ? (
                <>
                  <CircularLoader />
                  <div className={styles.caption}>PLEASE WAIT</div>
                </>
              ) : (
                projectDetails || 'Select a project to view details'
              )}
            </Copy>
          </div>
        </div>
      </div>
      <div className={styles.wide}>
        <div className={styles.section}>
          <div className={styles.top}>
            <Action
              disabled={loading || viewingProject || generatingResponse}
              onClick={async () => {
                if (Utilities.isEmpty(prompt.trim())) {
                  alert('Please enter a message before sending.');
                  return;
                }
                
                alert('Thank you for your message! I\'ll get back to you soon.');
                setPrompt(defaultPrompt);
              }}
            >
              ◎ Send Message
            </Action>
          </div>
          <div className={styles.middle}>
            <Prompt value={prompt} onChange={(e) => setPrompt(e.target.value)}></Prompt>
          </div>
          <div className={styles.bottom}>
            <Copy>
              {generatingResponse ? (
                <>
                  <CircularLoader />
                  <div className={styles.caption}>PLEASE WAIT</div>
                </>
              ) : (
                skillsDisplay
              )}
            </Copy>
          </div>
        </div>
      </div>
    </div>
  );
}