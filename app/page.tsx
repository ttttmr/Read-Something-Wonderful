import FeedManager from './components/FeedManager';
import { RSWEntry } from './types';

interface ApiResponse {
  results: RSWEntry[];
  next: string | null;
}

// Fetch all entries (handling pagination)
async function getAllEntries(): Promise<RSWEntry[]> {
  let allResults: RSWEntry[] = [];
  let nextUrl: string | null = 'https://api.getmatter.com/tools/api/rsw_entries/';

  try {
    while (nextUrl) {
      const res = await fetch(nextUrl, { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error('Failed to fetch data');
      const data: ApiResponse = await res.json();
      allResults = [...allResults, ...data.results];
      nextUrl = data.next;
    }
    // Sort by ID descending (newest first based on ID)
    allResults.sort((a, b) => b.id - a.id);
  } catch (error) {
    console.error('Error fetching entries:', error);
  }

  return allResults;
}

export default async function Home() {
  const entries = await getAllEntries();

  return (
    <FeedManager entries={entries} />
  );
}
