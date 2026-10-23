import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Link2, BarChart3, QrCode, Globe, Shield, Copy, TrendingUp, Mail, X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import GalaxyIcon from '../components/GalaxyIcon';
import ThemeToggle from '../components/ThemeToggle';
import SfxToggle from '../components/SfxToggle';

interface Feature {
  icon: typeof Link2;
  title: string;
  description: string;
}

interface TechItem {
  name: string;
  role: string;
}

interface Architecture {
  section: string;
  items: string[];
}

interface Screenshot {
  title: string;
  desc: string;
  image: string;
}

export const URLShortener = () => {
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const features: Feature[] = [
    {
      icon: Link2,
      title: "URL Shortening UI",
      description: "Interface for converting long URLs into compact short links with customizable aliases and tag categorization."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard UI",
      description: "Data visualization interface displaying click volume, referrer channels, device breakdown, and geographic traffic."
    },
    {
      icon: QrCode,
      title: "QR Code Generator UI",
      description: "Dynamic QR code generation tool with export options for SVG and PNG formats."
    },
    {
      icon: Globe,
      title: "Custom Domain Routing UI",
      description: "Branded link setup interface with DNS configuration guidance and domain validation checks."
    },
    {
      icon: Shield,
      title: "Authentication Flows",
      description: "Complete sign-up, sign-in, and account recovery screens with client-side form validation."
    },
    {
      icon: Mail,
      title: "Email Verification UI",
      description: "Interactive 6-digit code entry interface with resend cooldown timers and accessible feedback states."
    },
    {
      icon: Copy,
      title: "Link Management",
      description: "Searchable table view supporting bulk actions, link expiration settings, and instant clipboard copying."
    },
    {
      icon: TrendingUp,
      title: "Tier Comparison",
      description: "Feature matrix and subscription tier layout detailing link limits and advanced analytics options."
    }
  ];

  const techStack: TechItem[] = [
    { name: "TypeScript", role: "Type-Safe Client Architecture" },
    { name: "Vite", role: "Fast Development Bundler" },
    { name: "Tailwind CSS", role: "Utility Styling & Design System" },
    { name: "HTML5 & DOM APIs", role: "Accessible Form Elements" }
  ];

  const architecture: Architecture[] = [
    {
      section: "Frontend Architecture",
      items: [
        "13 structured HTML views covering auth, dashboard, analytics, links, and domain management",
        "TypeScript modules organized by page controllers, mock API services, and shared utilities",
        "Type-safe data contracts modeling link analytics and user profiles",
        "Mobile-first responsive dashboard layout with collapsible navigation"
      ]
    },
    {
      section: "What Was Built",
      items: [
        "Complete client-side user experience and authentication flow",
        "Interactive analytics dashboards with mock data feeds",
        "Link creation forms with custom alias collision checks UI",
        "Accessible notifications, modal dialogs, and form validation states"
      ]
    },
    {
      section: "Project Learnings",
      items: [
        "Architecting multi-page TypeScript applications without heavy frontend frameworks",
        "Building accessible form controls and keyboard-friendly navigation",
        "Managing client-side state across complex analytics dashboards"
      ]
    }
  ];

  const screenshots: Screenshot[] = [
    {
      title: "Dashboard Overview",
      desc: "Central overview with active link statistics and quick shortening input",
      image: "/images/projects/urlshortener/dashboard.png"
    },
    {
      title: "Links Management",
      desc: "Table of active short links with click counters and actions",
      image: "/images/projects/urlshortener/links.png"
    },
    {
      title: "Analytics Dashboard",
      desc: "Visual charts breaking down clicks by time and geographic location",
      image: "/images/projects/urlshortener/analytics.png"
    },
    {
      title: "Authentication Flow",
      desc: "Account sign-in interface with validation states",
      image: "/images/projects/urlshortener/login.png"
    },
    {
      title: "Registration View",
      desc: "User registration screen with password requirement checklist",
      image: "/images/projects/urlshortener/register.png"
    },
    {
      title: "Email Verification",
      desc: "6-digit code verification screen with auto-focus inputs",
      image: "/images/projects/urlshortener/verify-email.png"
    },
    {
      title: "Custom Domains",
      desc: "Domain management interface for branded short URLs",
      image: "/images/projects/urlshortener/domains.png"
    },
    {
      title: "Subscription Plans",
      desc: "Pricing tier matrix showcasing plan features and quotas",
      image: "/images/projects/urlshortener/subscription.png"
    }
  ];

  const openModal = (index: number) => {
    setSelectedImage(screenshots[index]);
    setCurrentImageIndex(index);
  };

  const closeModal = () => setSelectedImage(null);

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      {/* ─── Navigation ─── */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight group">
            <span className="text-neutral-950 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">GOG</span>
            <GalaxyIcon className="w-5 h-5" />
            <span className="text-xs font-mono text-neutral-500 font-normal">thgenius.xyz</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <SfxToggle />
            <ThemeToggle />
            <Link 
              to="/#projects" 
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Systems</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Header & Overview ─── */}
      <section className="pt-16 pb-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
            Case Study · Frontend Prototype
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white mb-4">
            URL Shortener UI & Analytics
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
            A comprehensive frontend prototype built to test modular TypeScript application structure, fast Vite workflows, and dense analytics interfaces. Features complete link creation tools, user dashboard layouts, and domain management screens.
          </p>
        </div>

        {/* System Specs Grid */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
            <div className="text-xs font-mono text-neutral-400 mb-1">Architecture</div>
            <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">TypeScript + Vite Modular UI</div>
          </div>
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
            <div className="text-xs font-mono text-neutral-400 mb-1">Styling</div>
            <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Tailwind CSS Responsive Design</div>
          </div>
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
            <div className="text-xs font-mono text-neutral-400 mb-1">Status</div>
            <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Frontend Prototype (Archived)</div>
          </div>
        </div>
      </section>

      {/* ─── Core Features ─── */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
            Functionality
          </div>
          <h2 className="text-2xl font-bold text-neutral-950 dark:text-neutral-100">
            Interface Features
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30"
              >
                <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300 mb-3" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-1.5">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Tech Stack ─── */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
            Technology
          </div>
          <h2 className="text-2xl font-bold text-neutral-950 dark:text-neutral-100">
            Stack Breakdown
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30"
            >
              <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-0.5">{item.name}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">{item.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Architecture ─── */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
            Design & Structure
          </div>
          <h2 className="text-2xl font-bold text-neutral-950 dark:text-neutral-100">
            Architecture Structure
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {architecture.map((arch, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30"
            >
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-3">{arch.section}</h3>
              <ul className="space-y-2">
                {arch.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex items-start gap-2">
                    <span className="text-neutral-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Screenshots ─── */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200 dark:border-neutral-800 mb-16">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
            Visuals
          </div>
          <h2 className="text-2xl font-bold text-neutral-950 dark:text-neutral-100">
            Interface Screenshots
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {screenshots.map((shot, idx) => (
            <div
              key={idx}
              onClick={() => openModal(idx)}
              className="group cursor-pointer rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              <div className="aspect-[16/10] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                <img
                  src={shot.image}
                  alt={shot.title}
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-200"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{shot.title}</h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-200 transition-colors" />
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1">{shot.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Modal Lightbox ─── */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{selectedImage.title}</h3>
                <p className="text-xs text-neutral-400">{selectedImage.desc}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto p-4 flex items-center justify-center bg-black">
              <img
                src={screenshots[currentImageIndex].image}
                alt={screenshots[currentImageIndex].title}
                className="max-h-[65vh] w-auto object-contain rounded"
              />
            </div>
            <div className="p-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
              <button
                onClick={goToPrevious}
                className="inline-flex items-center gap-1 hover:text-white px-2 py-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <span>{currentImageIndex + 1} / {screenshots.length}</span>
              <button
                onClick={goToNext}
                className="inline-flex items-center gap-1 hover:text-white px-2 py-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Footer ─── */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800/80 py-8 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="text-neutral-800 dark:text-neutral-300 font-semibold">GOG 🌌</span>
          <span>•</span>
          <span>Neverland</span>
          <span>•</span>
          <span>thgenius.xyz</span>
        </div>
        <Link to="/#projects" className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300">
          Return to Portfolio
        </Link>
      </footer>
    </div>
  );
};

export default URLShortener;
