import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Header.module.css'

import { UserContext } from '../lib/userContext';

export default function Header() {
  const { pathname } = useRouter();
  const { user } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <img src="assets/LEGO-Logo.gif" alt="Lego" className={styles.logo} />
      <Link href="/">
        <a className={pathname === '/' ? styles.active : styles.link}>Home</a>
      </Link>
      <Link href="/about">
        <a className={pathname === '/about' ? styles.active : styles.link}>About</a>
      </Link>
      <span className={styles.right}>
          {user ? (
            <Link href="/logout">
              <a className={pathname === '/logout' ? styles.active : styles.link}>
                Logout
              </a>
            </Link>
          ) : (
            <Link href="/login">
              <a className={pathname === '/login' ? styles.active : styles.link}>
                Login
              </a>
            </Link>
          )}
        </span>
    </header>
  );
}
