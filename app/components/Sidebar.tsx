'use client';

import { RSWEntry } from '../types';
import styles from './Sidebar.module.css';

interface SidebarProps {
  entries: RSWEntry[];
  activeId: number | null;
  onSelect: (id: number) => void;
}

export default function Sidebar({ entries, activeId, onSelect }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Read Something Wonderful</div>
      <nav className={styles.nav}>
        {entries.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelect(entry.id)}
            className={`${styles.item} ${activeId === entry.id ? styles.active : ''}`}
          >
            {entry.title}
          </button>
        ))}
      </nav>
    </aside>
  );
}
