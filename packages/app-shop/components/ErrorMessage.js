import React from 'react';
import styles from './ErrorMessage.module.css'

export default function ErrorMessage({ error }) {
  return (
    <pre className={styles.errorText}>
      Bad:{' '}
      {error.graphQLErrors.map(({ message }, i) => (
        <span key={i}>{message}</span>
      ))}
    </pre>
  );
}
