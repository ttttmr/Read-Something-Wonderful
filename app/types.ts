export interface RSWEntry {
    id: number;
    url: string;
    title: string;
    screenshot: string | null;
    og_image: string | null;
    publication_date: string | null;
    author_name: string | null;
    author_twitter_screen_name: string | null;
    recommender_name: string | null;
    recommender_twitter_screen_name: string | null;
    gradient_start: string | null; // Hex color
    gradient_end: string | null;   // Hex color
}

export interface APIResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: RSWEntry[];
}
