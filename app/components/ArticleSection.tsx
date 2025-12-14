import Link from 'next/link';
import { RSWEntry } from '../types';
import styles from './ArticleSection.module.css';
import { forwardRef } from 'react';

interface ArticleSectionProps {
  entry: RSWEntry;
}

const ArticleSection = forwardRef<HTMLDivElement, ArticleSectionProps>(({ entry }, ref) => {
  const imageUrl = entry.screenshot || entry.og_image;
  const domain = new URL(entry.url).hostname.replace('www.', '');

  return (
    <section ref={ref} id={`post-${entry.id}`} className={styles.section}>
      <div className={styles.imageColumn}>
        {imageUrl && (
          <Link 
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.imageLink}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={imageUrl} 
              alt={entry.title} 
              className={styles.image}
              loading="lazy"
            />
          </Link>
        )}
      </div>

      <div className={styles.infoColumn}>
        <div className={styles.content}>
          <div className={styles.metaTop}>
            <span className={styles.date}>
              {entry.publication_date ? new Date(entry.publication_date).getFullYear() : ''}
            </span>
            <span className={styles.divider}>•</span>
            <span className={styles.domain}>{domain}</span>
          </div>

          <h1 className={styles.title}>{entry.title}</h1>

          {entry.author_name && (
            <div className={styles.author}>by {entry.author_name}</div>
          )}

          <Link 
            href={entry.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.readButton}
          >
            Read Original Article
          </Link>
        </div>
      </div>
    </section>
  );
});

ArticleSection.displayName = 'ArticleSection';
export default ArticleSection;
