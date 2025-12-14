import Link from 'next/link';
import { RSWEntry } from '../types';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  entry: RSWEntry;
}

export default function ArticleCard({ entry }: ArticleCardProps) {
  const imageUrl = entry.screenshot || entry.og_image;
  const fallbackStyle = { 
    background: entry.gradient_start 
      ? `linear-gradient(135deg, ${entry.gradient_start}, ${entry.gradient_end})` 
      : '#333' 
  };

  const domain = new URL(entry.url).hostname.replace('www.', '');

  return (
    <Link href={entry.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <div className={styles.header}>
        <div className={styles.metaTop}>
          <span className={styles.date}>
            {entry.publication_date ? new Date(entry.publication_date).getFullYear() : ''}
          </span>
          <span className={styles.domain}>{domain}</span>
        </div>
        <h2 className={styles.title}>{entry.title}</h2>
      </div>

      {imageUrl ? (
        <div className={styles.imageContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imageUrl} 
            alt={entry.title} 
            className={styles.image} 
            loading="lazy"
          />
        </div>
      ) : (
        <div className={styles.imageFallback} style={fallbackStyle} />
      )}
      
      <div className={styles.footer}>
        {entry.author_name && (
          <div className={styles.author}>by {entry.author_name}</div>
        )}
      </div>
    </Link>
  );
}
