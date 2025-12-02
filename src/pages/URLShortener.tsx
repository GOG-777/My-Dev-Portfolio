import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Link2, BarChart3, QrCode, Zap, Globe, Shield, Copy, TrendingUp, Code, Database, Mail, X, ChevronLeft, ChevronRight, ImageIcon, AlertTriangle } from 'lucide-react';
import GalaxyIcon from '../components/GalaxyIcon';

// Define interfaces
interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  status?: 'implemented' | 'planned';
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
  path: string;
}

const URLShortener: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const features: Feature[] = [
    {
      icon: Link2,
      title: "URL Shortening Interface",
      description: "Frontend for transforming long URLs into short, memorable links with custom alias support",
      status: 'implemented'
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard UI",
      description: "Designed comprehensive analytics interface with charts, tables, and data visualization components",
      status: 'implemented'
    },
    {
      icon: QrCode,
      title: "QR Code Generation UI",
      description: "Frontend module for QR code creation with format options and download functionality",
      status: 'implemented'
    },
    {
      icon: Globe,
      title: "Custom Domains UI",
      description: "Interface for configuring custom domains with validation and management controls",
      status: 'implemented'
    },
    {
      icon: Shield,
      title: "Authentication Flow",
      description: "Complete login, registration, and email verification interfaces with form validation",
      status: 'implemented'
    },
    {
      icon: Mail,
      title: "Email Verification UI",
      description: "6-digit code input screens and verification flow with responsive error states",
      status: 'implemented'
    },
    {
      icon: Copy,
      title: "Dashboard Navigation",
      description: "Full dashboard with sidebar navigation, user settings, and premium feature showcases",
      status: 'implemented'
    },
    {
      icon: TrendingUp,
      title: "Subscription Management",
      description: "Premium tier comparison, subscription plans, and billing information interfaces",
      status: 'implemented'
    }
  ];

  const techStack: TechItem[] = [
    { name: "TypeScript", role: "Type-Safe Frontend Development" },
    { name: "Vite", role: "Build Tool & Development Server" },
    { name: "Tailwind CSS", role: "UI Styling Framework" },
    { name: "Lucide React", role: "Icon Library" },
    { name: "Mock Data", role: "Frontend Development Demo" }
  ];

  const architecture: Architecture[] = [
    {
      section: "Frontend Architecture (TypeScript + Vite)",
      items: [
        "13 HTML pages including auth (login, signup, email verification), dashboard, analytics, links, domains, subscription",
        "TypeScript modules organized by pages, API services, and utilities",
        "Vite for lightning-fast HMR and optimized development builds",
        "Custom UI utilities for forms, toasts, sidebar navigation, and responsive design",
        "Mock API clients demonstrating intended integration patterns"
      ]
    },
    {
      section: "What Was Built",
      items: [
        "Complete authentication flow UI with validation and error states",
        "Dashboard with sidebar navigation and user settings",
        "Link management interface with CRUD operations UI",
        "Analytics dashboard with charts and data tables",
        "Subscription management and premium feature showcase",
        "Custom domains configuration interface"
      ]
    },
    {
      section: "What Was Planned (Not Implemented)",
      items: [
        "Backend API with Express.js and PostgreSQL",
        "Actual link shortening logic and database storage",
        "Real analytics tracking and click monitoring",
        "Live QR code generation and email sending",
        "Production deployment and scalability features"
      ]
    },
    {
      section: "Key Learnings",
      items: [
        "TypeScript fundamentals and type-safe development patterns",
        "Vite build tooling and modern frontend workflows",
        "Component architecture and modular design",
        "Authentication flow design and user experience",
        "Complex dashboard navigation and state management"
      ]
    }
  ];

  const screenshots: Screenshot[] = [
    {
      title: "Dashboard",
      desc: "Main dashboard with overview, recent links, and quick actions",
      image: "/images/projects/urlshortener/dashboard.png",
      path: "src/pages/dashboard.html"
    },
    {
      title: "Links Management",
      desc: "View, create, edit, and delete shortened URLs",
      image: "/images/projects/urlshortener/links.png",
      path: "src/pages/links.html + ts/pages/links.ts"
    },
    {
      title: "Analytics Dashboard",
      desc: "Click tracking visualizations with charts and data tables",
      image: "/images/projects/urlshortener/analytics.png",
      path: "src/pages/analytics.html + ts/pages/analytics.ts"
    },
    {
      title: "Login Page",
      desc: "Authentication interface with email and password validation",
      image: "/images/projects/urlshortener/login.png",
      path: "src/pages/login.html"
    },
    {
      title: "Registration Flow",
      desc: "User signup with email verification requirement",
      image: "/images/projects/urlshortener/register.png",
      path: "src/pages/signup.html"
    },
    {
      title: "Email Verification",
      desc: "6-digit code input for email confirmation",
      image: "/images/projects/urlshortener/verify-email.png",
      path: "src/pages/verify-email.html"
    },
    {
      title: "Custom Domains",
      desc: "Configure and manage branded short link domains",
      image: "/images/projects/urlshortener/domains.png",
      path: "src/pages/domains.html + ts/pages/domains.ts"
    },
    {
      title: "Subscription Plans",
      desc: "Premium tier comparison and upgrade options",
      image: "/images/projects/urlshortener/subscription.png",
      path: "src/pages/subscription.html + ts/api/subscription.ts"
    }
  ];

  const openModal = (index: number) => {
    setSelectedImage(screenshots[index]);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  // Handle keyboard navigation
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

  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';

    const nextSibling = target.nextSibling as HTMLElement;
    if (nextSibling) {
      nextSibling.style.display = 'flex';
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30"></div>
      </div>

      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
            <GalaxyIcon className="w-7 h-7" />
            GOG
          </Link>
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Portfolio
          </Link>
        </div>
      </nav>

      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex gap-4">
            <span className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full text-sm text-orange-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Frontend Demo • Learning Project
            </span>
            <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm text-purple-300">
              Archived • Exploration Phase
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            URL Shortener Demo
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-8">
            TypeScript Frontend Exploration Project
          </p>

          <div className="bg-gradient-to-br from-orange-900/20 to-orange-900/10 border border-orange-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-orange-300 mb-2">Project Context</h3>
                <p className="text-gray-300">
                  This was my first TypeScript project - an exploration of building complex frontend interfaces.
                  <strong className="text-orange-200"> It's a frontend-only demo</strong> showcasing UI/UX design, component architecture,
                  and TypeScript patterns. The backend was never implemented, though I had some API testing that worked, the sign in and signup process, email verification, minimal backend url shortener, making it a valuable learning experience
                  in focusing on frontend fundamentals before tackling full-stack complexity.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-400 max-w-4xl leading-relaxed mb-12">
            A TypeScript exploration project focused on frontend architecture and complex UI development.
            Features complete dashboard navigation, authentication flows, analytics visualization mockups,
            and subscription management interfaces. Built with Vite for modern development workflows and
            Tailwind CSS for responsive design. Served as foundational learning in TypeScript patterns,
            component architecture, and scalable frontend structure.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 border border-orange-500/30 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">Focus</p>
              <p className="text-2xl font-bold text-white">Frontend Only</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">Primary Tech</p>
              <p className="text-2xl font-bold text-white">TypeScript + Vite</p>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">Status</p>
              <p className="text-2xl font-bold text-white">Learning Demo</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            What I Built (Frontend)
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${feature.status === 'implemented' ? 'from-purple-900/20 to-blue-900/20 border-purple-500/30' : 'from-gray-900/20 to-gray-800/20 border-gray-700/30'} border rounded-xl p-8 hover:border-purple-500 transition-all duration-300 hover:scale-105`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-12 h-12 text-purple-400" />
                    {feature.status === 'implemented' ? (
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-xs text-green-300">
                        Implemented
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-500/20 border border-gray-500/50 rounded-full text-xs text-gray-400">
                        Planned
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Technology & Architecture
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-300 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{tech.name}</h3>
                  <p className="text-sm text-gray-400">{tech.role}</p>
                </div>
                <Check className="w-6 h-6 text-green-400" />
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {architecture.map((arch, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">{arch.section}</h3>
                <ul className="space-y-3 text-gray-300">
                  {arch.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 ${idx === 2 ? 'text-gray-500' : 'text-green-400'} flex-shrink-0 mt-0.5`} />
                      <span className={idx === 2 ? 'text-gray-500' : ''}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            UI Screenshots
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenshots.map((shot, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-500 transition-all duration-300 hover:scale-105 group cursor-pointer"
                onClick={() => openModal(idx)}
              >
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={shot.image}
                    alt={shot.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={handleImageError}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center">
                    <Link2 className="w-12 h-12 text-purple-300" />
                  </div>

                  {/* Overlay with click hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-black/50 rounded-full p-3 backdrop-blur-sm">
                      <ImageIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{shot.title}</h3>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">{shot.desc}</p>
                  <code className="text-xs text-purple-300 bg-purple-900/30 px-2 py-1 rounded truncate block">{shot.path}</code>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-orange-900/20 to-orange-900/10 border border-orange-500/30 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-orange-300 mb-4">Why This Project Matters</h3>
            <p className="text-gray-300 mb-4">
              While this project never became a functional URL shortener, it was crucial in my development journey.
              It taught me TypeScript fundamentals, complex component architecture, and the importance of focusing
              on one layer (frontend) before attempting full-stack complexity.
            </p>
            <p className="text-gray-300">
              Every developer has "learning projects" - incomplete explorations that build foundational skills.
              This demo showcases my ability to design comprehensive UIs, think through user flows, and structure
              scalable frontend applications.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Key Learnings & Growth
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-8 text-center">
              <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <p className="text-xl font-bold text-white mb-2">TypeScript Mastery</p>
              <p className="text-gray-400">Type-safe development, interfaces, and modern frontend patterns</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-8 text-center">
              <Link2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <p className="text-xl font-bold text-white mb-2">UI Architecture</p>
              <p className="text-gray-400">Complex dashboard design and component organization</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 rounded-xl p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <p className="text-xl font-bold text-white mb-2">Project Scoping</p>
              <p className="text-gray-400">Understanding when to pivot vs. continue building</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">What I Gained</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>TypeScript fundamentals that enabled all my later projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>Understanding of complex authentication flow design</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>Experience with Vite and modern build tooling</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>Dashboard architecture and navigation patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>Realization that starting with frontend-only was the right learning path</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Why Archive a Demo?</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                This project served its purpose perfectly - it gave me the TypeScript confidence to build
                <strong className="text-purple-300"> actual production projects</strong> like the e-commerce platform and course registration system.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Rather than forcing completion of a saturated market solution, I chose to apply these frontend skills
                to <strong className="text-blue-300">real client needs</strong>. The technical foundation from this exploration directly enabled
                my later success with full-stack applications that deliver actual business value.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            From Learning to Building
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            This demo project was the foundation that enabled my production-ready work.
            Let's build something that delivers real value.
          </p>
          <div className="flex gap-6 justify-center">
            <Link
              to="/#contact"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
              Get In Touch
            </Link>
            <Link
              to="/"
              className="px-8 py-4 bg-blue-600/20 border border-blue-500/50 hover:border-blue-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              View Production Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-10 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors border border-gray-700"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-6 z-10 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors border border-gray-700"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-6 z-10 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors border border-gray-700"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image container */}
          <div className="relative max-w-6xl max-h-[80vh] w-full mx-6">
            <img
              src={screenshots[currentImageIndex].image}
              alt={screenshots[currentImageIndex].title}
              className="w-full h-full object-contain max-h-[70vh] rounded-lg"
            />

            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 md:p-6">
              <h3 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-2">
                {screenshots[currentImageIndex].title}
              </h3>
              <p className="text-xs md:text-base text-gray-300 mb-1 md:mb-2 line-clamp-2">
                {screenshots[currentImageIndex].desc}
              </p>
              <div className="flex items-center justify-between">
                <code className="text-xs text-purple-300 bg-purple-900/30 px-2 py-1 rounded hidden md:inline-block">
                  {screenshots[currentImageIndex].path}
                </code>
                <p className="text-xs text-gray-400">
                  {currentImageIndex + 1}/{screenshots.length}
                </p>
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default URLShortener;