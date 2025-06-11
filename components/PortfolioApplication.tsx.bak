'use client';

import styles from '@components/Application.module.scss';

import * as React from 'react';
import { portfolioData } from '@common/portfolio-data';
import { Project, Skill } from '@common/portfolio-types';

import CircularLoader from '@components/CircularLoader';
import ProjectSelectorButton from '@components/ProjectSelectorButton';
import TextArea from '@components/TextArea';

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

export default function PortfolioApplication({ children }) {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [showAllProjects, setShowAllProjects] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [contactMessage, setContactMessage] = React.useState('');
  const [messageSent, setMessageSent] = React.useState(false);
  
  // Group skills by category
  const skillsByCategory = React.useMemo(() => {
    const grouped = portfolioData.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof portfolioData.skills>);
    
    // Sort skills within each category by proficiency
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => b.proficiency - a.proficiency);
    });
    
    return grouped;
  }, []);

  const handleProjectSelect = (project: Project) => {
    setLoading(true);
    setSelectedProject(project);
    // Simulate loading time for smooth transition
    setTimeout(() => setLoading(false), 300);
  };

  const handleSendMessage = () => {
    if (!contactMessage.trim()) {
      alert('Please enter a message before sending.');
      return;
    }
    
    // In a real app, this would send the message
    setMessageSent(true);
    setTimeout(() => {
      setContactMessage('');
      setMessageSent(false);
    }, 3000);
  };

  return (
    <div className={styles.root}>
      {/* Left Column - Projects Gallery */}
      <div className={styles.column}>
        <div className={styles.section}>
          <div className={styles.top}>
            <ProjectSelectorButton
              disabled={loading}
              onShowAllProjects={() => setShowAllProjects(!showAllProjects)}
              text={showAllProjects ? '◎ Featured Only' : '◎ All Projects'}
            />
          </div>
          <div className={styles.bottom}>
            {portfolioData.projects
              .filter(project => showAllProjects || project.featured)
              .map((project) => (
                <File
                  key={project.id}
                  selected={selectedProject?.id === project.id}
                  onClick={() => handleProjectSelect(project)}
                >
                  ⭢ {project.title}
                </File>
              ))}
          </div>
        </div>
      </div>
      
      {/* Center Column - Project Details */}
      <div className={styles.column}>
        <div className={styles.section}>
          <div className={styles.top}>
            {selectedProject && (
              <>
                {selectedProject.demoUrl && (
                  <Action
                    disabled={loading}
                    onClick={() => window.open(selectedProject.demoUrl, '_blank')}
                  >
                    ◎ Live Demo
                  </Action>
                )}
                {selectedProject.githubUrl && (
                  <Action
                    disabled={loading}
                    onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                  >
                    ◎ View Code
                  </Action>
                )}
              </>
            )}
          </div>
          <div className={styles.bottom}>
            <Copy>
              {loading ? (
                <>
                  <CircularLoader />
                  <div className={styles.caption}>LOADING PROJECT</div>
                </>
              ) : selectedProject ? (
                <>
                  <h3 style={{ marginBottom: '1rem' }}>{selectedProject.title}</h3>
                  <p style={{ marginBottom: '1rem' }}>{selectedProject.longDescription}</p>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Technologies:</strong>
                    <div style={{ marginTop: '0.5rem' }}>
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} style={{ marginRight: '1rem' }}>• {tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  {selectedProject.highlights && (
                    <div>
                      <strong>Key Achievements:</strong>
                      {selectedProject.highlights.map((highlight, index) => (
                        <div key={index} style={{ marginTop: '0.5rem' }}>• {highlight}</div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', opacity: 0.5 }}>
                  Select a project to view details
                </div>
              )}
            </Copy>
          </div>
        </div>
      </div>
      
      {/* Right Column - Skills & Contact */}
      <div className={styles.wide}>
        <div className={styles.section}>
          <div className={styles.top}>
            <Action
              disabled={loading || !contactMessage.trim()}
              onClick={handleSendMessage}
            >
              ◎ Send Message
            </Action>
            {messageSent && (
              <span style={{ marginLeft: '1rem', color: 'var(--theme-success)' }}>
                Message sent successfully!
              </span>
            )}
          </div>
          <div className={styles.middle}>
            <TextArea 
              value={contactMessage} 
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Hi! I'd love to discuss your projects or potential opportunities. Feel free to reach out..."
            />
          </div>
          <div className={styles.bottom}>
            <Copy>
              <h3 style={{ marginBottom: '1.5rem' }}>Skills & Expertise</h3>
              
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category} style={{ marginBottom: '2rem' }}>
                  <h4 style={{ marginBottom: '1rem', textTransform: 'capitalize' }}>
                    {category.replace('_', ' ')}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                    {skills.map(skill => (
                      <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{skill.name}</span>
                        <span style={{ opacity: 0.6 }}>
                          {'●'.repeat(Math.floor(skill.proficiency / 2))}
                          {'○'.repeat(5 - Math.floor(skill.proficiency / 2))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div style={{ marginTop: '3rem', borderTop: '1px solid var(--theme-border)', paddingTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Contact</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>📧 {portfolioData.contact.email}</div>
                  {portfolioData.contact.github && (
                    <div>
                      <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer">
                        💻 GitHub
                      </a>
                    </div>
                  )}
                  {portfolioData.contact.linkedin && (
                    <div>
                      <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer">
                        💼 LinkedIn
                      </a>
                    </div>
                  )}
                  {portfolioData.contact.resumeUrl && (
                    <div>
                      <a href={portfolioData.contact.resumeUrl} target="_blank" rel="noopener noreferrer">
                        📄 Download Resume
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Copy>
          </div>
        </div>
      </div>
    </div>
  );
}