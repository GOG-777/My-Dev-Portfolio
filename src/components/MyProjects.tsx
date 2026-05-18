import React from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Star, Clock, Globe, ExternalLink, Lock } from 'lucide-react';
import { useGitHubProjects, type GitHubRepo } from '../hooks/useGitHubProjects';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PrivateProject {
  title: string;
  type: string;
  description: string;
  badge: string;
  badgeStyle: string;
  route: string;
}

// ─── Private/Commercial Projects Data ────────────────────────────────────────
// These live here permanently — private repos, client work, academic projects.
// Add/remove freely. They render below the live GitHub cards.

const privateProjects: PrivateProject[] = [
  {
    title: "Praise Fashion Hub",
    type: "E-Commerce Platform",
    description:
      "Full-stack fashion retail platform built for a Nigerian client specialising in African fabrics. Paystack payment integration, automated PDF & JPG receipt generation, real-time inventory management, image optimisation with Sharp, pickup station delivery logic, and a full admin dashboard. Vanilla JS + Express + PostgreSQL, containerised with Docker.",
    badge: "Commercial Project",
    badgeStyle: "bg-purple-500/20 border-purple-500/50 text-purple-300",
    route: "/projects/praise-fashion",
  },
  {
    title: "Digital Course Registration System",
    type: "Educational Platform",
    description:
      "Built for UNIPORT's Computer Science department. Level-based course registration (100–400L), integrated CGPA calculator, student dashboard, semester planning, and academic analytics. Node.js + PostgreSQL + Docker.",
    badge: "Academic Project",
    badgeStyle: "bg-blue-500/20 border-blue-500/50 text-blue-300",
    route: "/projects/course-registration",
  },
  {
    title: "URL Shortener",
    type: "Utility Tool",
    description:
      "Custom link shortening service with analytics tracking, QR code generation, custom aliases, click tracking, geographic data, and detailed performance metrics. TypeScript + Node.js + PostgreSQL.",
    badge: "Archived",
    badgeStyle: "bg-gray-500/20 border-gray-500/50 text-gray-400",
    route: "/projects/url-shortener",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
};

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

// ─── Divider ──────────────────────────────────────────────────────────────────

function SectionDivider({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 my-10 md:my-14">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <span className="flex items-center gap-2 text-xs text-gray-500 font-semibold tracking-widest uppercase px-3">
        {icon}
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ProjectSkeleton() {
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-6 md:p-8 animate-pulse">
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="h-8 bg-gray-700/60 rounded w-3/4" />
          <div className="h-4 bg-gray-700/60 rounded w-1/3" />
          <div className="space-y-2 pt-2">
            <div className="h-4 bg-gray-700/60 rounded" />
            <div className="h-4 bg-gray-700/60 rounded w-5/6" />
            <div className="h-4 bg-gray-700/60 rounded w-4/6" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-7 w-20 bg-gray-700/60 rounded-lg" />
            ))}
          </div>
          <div className="h-10 bg-gray-700/60 rounded-lg mt-6" />
          <div className="h-10 bg-gray-700/60 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─── GitHub Project Card ──────────────────────────────────────────────────────

function GitHubCard({ repo }: { repo: GitHubRepo }) {
  const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] ?? '#8b5cf6') : '#8b5cf6';
  const visibleTopics = repo.topics.filter((t) => t !== 'featured');
  const techStack = [repo.language, ...visibleTopics.slice(0, 5)].filter(Boolean) as string[];

  return (
    <div className="group bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-6 md:p-8 hover:border-purple-500 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">

        <div className="md:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <GitBranch className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  {formatRepoName(repo.name)}
                </h3>
              </div>
              <div className="flex items-center flex-wrap gap-4 text-sm text-gray-400">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: langColor }} />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />{repo.stargazers_count}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />{timeAgo(repo.updated_at)}
                </span>
              </div>
            </div>
            <span className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-sm text-green-300 whitespace-nowrap text-center flex-shrink-0 self-start">
              Open Source
            </span>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed text-base md:text-lg min-h-[3.5rem]">
            {repo.description}
          </p>

          {visibleTopics.length > 0 && (
            <div>
              <p className="text-sm text-gray-400 mb-3 font-semibold tracking-wide">TOPICS</p>
              <div className="flex flex-wrap gap-2">
                {visibleTopics.slice(0, 8).map((topic) => (
                  <div key={topic} className="flex items-center gap-1.5 text-gray-400">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                    <span className="text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div>
            <p className="text-sm text-gray-400 mb-3 font-semibold tracking-wide">TECH STACK</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/50 rounded-lg text-sm text-purple-300 hover:bg-purple-500/30 transition-colors capitalize">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 text-center flex items-center justify-center gap-2">
                <Globe className="w-4 h-4" />
                Live Demo
              </a>
            )}
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
              className="w-full px-6 py-3 border border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-purple-300 text-center flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Private Project Card ─────────────────────────────────────────────────────

function PrivateCard({ project }: { project: PrivateProject }) {
  return (
    <div className="group bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-6 md:p-8 hover:border-purple-500 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
          </div>
          <p className="text-base text-purple-300 font-semibold">{project.type}</p>
        </div>
        <span className={`px-4 py-2 border rounded-full text-sm whitespace-nowrap text-center flex-shrink-0 self-start ${project.badgeStyle}`}>
          {project.badge}
        </span>
      </div>

      <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-8">
        {project.description}
      </p>

      <Link
        to={project.route}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
      >
        View Case Study →
      </Link>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function MyProjects() {
  const { projects, loading, error } = useGitHubProjects();

  return (
    <section
      id="projects"
      className="relative z-10 py-20 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-black via-purple-950/10 to-black"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-4">
            Functional systems built to solve real problems
          </p>
          <a
            href="https://github.com/GOG-777"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            See everything on GitHub →
          </a>
        </div>

        {/* ── Open Source: GitHub live cards ── */}
        <SectionDivider label="Open Source" />

        <div className="space-y-6 md:space-y-8">
          {loading && <><ProjectSkeleton /><ProjectSkeleton /><ProjectSkeleton /></>}

          {error && !loading && (
            <div className="text-center py-16 text-gray-400">
              <p className="mb-3 text-lg">Couldn't reach GitHub right now.</p>
              <a href="https://github.com/GOG-777" target="_blank" rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
                View projects directly on GitHub →
              </a>
            </div>
          )}

          {!loading && !error && projects
            .filter((repo) => repo.description)
            .map((repo) => (
              <GitHubCard key={repo.id} repo={repo} />
            ))
          }
        </div>

        {/* ── Commercial Work: hardcoded private projects ── */}
        <SectionDivider
          label="Commercial Work"
          icon={<Lock className="w-3 h-3" />}
        />

        <div className="space-y-6 md:space-y-8">
          {privateProjects.map((project) => (
            <PrivateCard key={project.route} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}