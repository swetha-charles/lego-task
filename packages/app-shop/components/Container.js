import React from 'react';
import styles from './Container.module.css'

export default function Container({ children }) {
  return (
    <div className={styles.appContainer}>
      {children}
    </div>
  );
}
