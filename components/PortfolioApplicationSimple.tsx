'use client';

import styles from '@components/Application.module.scss';
import * as React from 'react';

export default function PortfolioApplicationSimple() {
  return (
    <div className={styles.root}>
      <div className={styles.column}>
        <div className={styles.section}>
          <div className={styles.top}>
            <button>◎ View Projects</button>
          </div>
          <div className={styles.bottom}>
            <div>⭢ Project 1</div>
            <div>⭢ Project 2</div>
          </div>
        </div>
      </div>
      
      <div className={styles.column}>
        <div className={styles.section}>
          <div className={styles.top}>
            <button>◎ Live Demo</button>
          </div>
          <div className={styles.bottom}>
            <div className={styles.copy}>
              <h3>Project Details</h3>
              <p>Select a project to view details</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.wide}>
        <div className={styles.section}>
          <div className={styles.top}>
            <button>◎ Send Message</button>
          </div>
          <div className={styles.middle}>
            <textarea placeholder="Contact message..." />
          </div>
          <div className={styles.bottom}>
            <div className={styles.copy}>
              <h3>Skills & Contact</h3>
              <p>Frontend: React, TypeScript</p>
              <p>Backend: Node.js, Python</p>
              <p>📧 john.doe@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}