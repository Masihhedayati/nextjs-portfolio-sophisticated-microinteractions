import styles from '@components/ActionUploadButton.module.scss';
import * as React from 'react';

interface ProjectSelectorButtonProps {
  disabled?: boolean;
  onShowAllProjects?: () => void;
  text?: string;
}

export default function ProjectSelectorButton(props: ProjectSelectorButtonProps) {
  const { disabled, onShowAllProjects, text = '◎ View Projects' } = props;

  if (disabled) {
    return (
      <span className={styles.rootDisabled}>
        <button className={styles.buttonDisabled}>{text}</button>
      </span>
    );
  }

  return (
    <div className={styles.root}>
      <button 
        className={styles.button} 
        type="button" 
        onClick={() => onShowAllProjects && onShowAllProjects()}
      >
        {text}
      </button>
    </div>
  );
}