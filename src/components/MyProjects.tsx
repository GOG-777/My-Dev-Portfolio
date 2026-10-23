import { Link } from 'react-router-dom';
import { Star, Clock, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { useGitHubProjects, type GitHubRepo } from '../hooks/useGitHubProjects';
import SpotlightCard from './SpotlightCard';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductionProject {
  title: string;
  type: string;
  description: string;
  badge: string;
  route: string;
  isExternal?: boolean;
  techStack: string[];
}

// ─── Production / Systems Projects Data ───────────────────────────────────────

const systemsProjects: ProductionProject[] = [
  {
    title: "Eerina",
    type: "AI Business Messaging & Commerce Engine",
    description:
      "A live platform that lets businesses run AI sales and customer service directly through WhatsApp and their web storefront. It automatically routes customer questions, takes orders, and seamlessly switches between AI models so the service never goes down.",
    badge: "Live System",
    route: "https://eerina.com",
    isExternal: true,
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Groq", "DeepSeek", "WhatsApp API"],
  },
  {
    title: "Praise Fashion Hub",
    type: "Commercial E-Commerce Platform",
    description:
      "A complete online retail store built for an African fashion brand. Handles card payments with Paystack, generates instant customer receipts, tracks stock in real time, and calculates pickup station deliveries across Nigeria.",
    badge: "Client Project",
    route: "/projects/praise-fashion",
    isExternal: false,
    techStack: ["JavaScript", "Express.js", "PostgreSQL", "Paystack", "Docker"],
  },
  {
    title: "Course Registration System",
    type: "Academic Department Portal",
    description:
      "An online academic portal built for the university computer science department. Students can register for semester courses, calculate their GPA automatically, and track their degree progress from year one to graduation.",
    badge: "Academic Portal",
    route: "/projects/course-registration",
    isExternal: false,
    techStack: ["Node.js", "Express", "PostgreSQL", "Docker", "Tailwind CSS"],
  },
  {
    title: "URL Shortener Service",
    type: "Link Redirection & Analytics",
    description:
      "A fast link shortening tool that generates QR codes, tracks total clicks, and provides geographic analytics on visitor traffic.",
    badge: "Utility Service",
    route: "/projects/url-shortener",
    isExternal: false,
    techStack: ["TypeScript", "Node.js", "PostgreSQL", "Express"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRepoName(name: string): string {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function timeAgo(iso: string): string {
  const diffDays = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

// ─── System Card ──────────────────────────────────────────────────────────────

function SystemCard({ project }: { project: ProductionProject }) {
  return (
    <SpotlightCard>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-neutral-950 dark:text-neutral-100">
              {project.title}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{project.type}</p>
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 self-start sm:self-auto">
            {project.badge}
          </span>
        </div>

        <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div>
        <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-6">
          <span className="text-neutral-400 dark:text-neutral-500">Built with:</span> {project.techStack.join(' · ')}
        </div>

        <div>
          {project.isExternal ? (
            <a
              href={project.route}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-white dark:text-neutral-950 rounded-lg text-sm font-semibold transition-colors"
            >
              Launch System
              <ArrowUpRight className="w-4 h-4" />
            </a>
          ) : (
            <Link
              to={project.route}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg text-sm font-medium transition-colors"
            >
              Case Study & Details
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}

// ─── Open Source Repo Card ────────────────────────────────────────────────────

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/30 p-5 hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-base text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            {formatRepoName(repo.name)}
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
          </a>
          <span className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-1 flex-shrink-0">
            <Clock className="w-3 h-3" />
            {timeAgo(repo.updated_at)}
          </span>
        </div>

        <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
          {repo.description || 'Public open source repository.'}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 font-mono">
        <div className="flex items-center gap-2">
          {repo.language && (
            <span>{repo.language}</span>
          )}
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
              <Star className="w-3 h-3 text-amber-500" />
              {repo.stargazers_count}
            </span>
          )}
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
        >
          view source
        </a>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function MyProjects() {
  const { projects, loading, error } = useGitHubProjects();

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
          Featured Systems & Applications
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-neutral-100 tracking-tight">
          Selected Work
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base mt-2 max-w-2xl">
          Real software applications and platforms built to handle real traffic, business logic, and actual users.
        </p>
      </div>

      {/* Systems Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {systemsProjects.map((project) => (
          <SystemCard key={project.title} project={project} />
        ))}
      </div>

      {/* Open Source / GitHub Section */}
      <div id="opensource" className="pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              <FolderGit2 className="w-4 h-4" />
              <span>GitHub Activity</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-neutral-950 dark:text-neutral-100">
              Open Source Code
            </h3>
          </div>
          <a
            href="https://github.com/GOG-777"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white inline-flex items-center gap-1 self-start sm:self-auto"
          >
            github.com/GOG-777
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 rounded-xl bg-neutral-200 dark:bg-neutral-900/40 border border-neutral-300 dark:border-neutral-800" />
            ))}
          </div>
        ) : error ? (
          <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-sm">
            Public feed temporarily unavailable. View repositories directly on{' '}
            <a href="https://github.com/GOG-777" className="text-neutral-900 dark:text-neutral-200 underline">
              GitHub
            </a>.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
