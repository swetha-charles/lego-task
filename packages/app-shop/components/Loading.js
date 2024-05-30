import React from 'react';
import styles from './Loading.module.css'

export default function Loading() {
  return (
    <div>
      <p className={styles.loading}>processing...</p>
    </div>
  );
}
