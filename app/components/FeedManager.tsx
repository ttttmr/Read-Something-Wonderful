'use client';

import { useEffect, useRef, useState } from 'react';
import { RSWEntry } from '../types';
import Sidebar from './Sidebar';
import ArticleSection from './ArticleSection';
import styles from './FeedManager.module.css';

interface FeedManagerProps {
  entries: RSWEntry[];
}

export default function FeedManager({ entries }: FeedManagerProps) {
  const [activeId, setActiveId] = useState<number | null>(entries[0]?.id || null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Handle intersection to update active ID and URL
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.id.replace('post-', ''));
            setActiveId(id);
            // Update URL shallowly
            window.history.replaceState(null, '', `?article=${id}`);
          }
        });
      },
      {
        root: mainRef.current,
        threshold: 0.5, // 50% visibility triggers update
      }
    );

    const sections = document.querySelectorAll('section[id^="post-"]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [entries]);

  // Handle Sidebar navigation
  const handleSelect = (id: number) => {
    const element = document.getElementById(`post-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.feedContainer}>
      <Sidebar entries={entries} activeId={activeId} onSelect={handleSelect} />
      
      <main ref={mainRef} className={styles.mainScroll}>
        {entries.map((entry) => (
          <ArticleSection key={entry.id} entry={entry} />
        ))}
      </main>
    </div>
  );
}
