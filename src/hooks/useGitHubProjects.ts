import { useState, useEffect } from 'react';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  visibility: string;
}

interface UseGitHubProjectsReturn {
  projects: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

interface CacheEntry {
  data: GitHubRepo[];
  timestamp: number;
}

const GITHUB_USERNAME = 'GOG-777';
const CACHE_KEY = 'gog_github_projects_v1';
const CACHE_DURATION_MS = 1000 * 60 * 30; // 30 minutes — respects GitHub's 60 req/hr unauthed limit

async function fetchFeaturedRepos(): Promise<GitHubRepo[]> {
  // Primary: repos tagged with the 'featured' topic on GitHub
  const res = await fetch(
    `https://api.github.com/search/repositories?q=user:${GITHUB_USERNAME}+topic:featured&sort=updated&per_page=6`,
    { headers: { Accept: 'application/vnd.github.v3+json' } }
  );

  if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);

  const json = await res.json();
  return (json.items as GitHubRepo[]) ?? [];
}

async function fetchFallbackRepos(): Promise<GitHubRepo[]> {
  // Fallback: most recently updated public, non-fork repos
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12&type=public`,
    { headers: { Accept: 'application/vnd.github.v3+json' } }
  );

  if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);

  const repos = (await res.json()) as GitHubRepo[];
  return repos.filter((r) => !r.fork).slice(0, 6);
}

export function useGitHubProjects(): UseGitHubProjectsReturn {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // Serve from cache if still fresh
        try {
          const raw = localStorage.getItem(CACHE_KEY);
          if (raw) {
            const cached: CacheEntry = JSON.parse(raw);
            if (Date.now() - cached.timestamp < CACHE_DURATION_MS) {
              if (!cancelled) {
                setProjects(cached.data);
                setLoading(false);
              }
              return;
            }
          }
        } catch {
          // Bad cache — ignore and re-fetch
          localStorage.removeItem(CACHE_KEY);
        }

        // Network fetch
        let repos = await fetchFeaturedRepos();

        // If nobody's tagged anything 'featured' yet, graceful fallback
        if (repos.length === 0) {
          repos = await fetchFallbackRepos();
        }

        if (!cancelled) {
          setProjects(repos);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: repos, timestamp: Date.now() } satisfies CacheEntry)
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load projects');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  return { projects, loading, error };
}