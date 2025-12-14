import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Read Something Wonderful
        </Link>
        <div className={styles.subtitle}>
          A collection of timeless articles.
        </div>
      </div>
    </header>
  );
}
