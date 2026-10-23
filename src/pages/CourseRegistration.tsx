import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calculator, Users, Lock, BarChart3, Calendar, Award, Server, X, ChevronLeft, ChevronRight, Github, ArrowUpRight } from 'lucide-react';
import GalaxyIcon from '../components/GalaxyIcon';
import ThemeToggle from '../components/ThemeToggle';
import SfxToggle from '../components/SfxToggle';

interface Feature {
  icon: typeof BookOpen;
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

export const CourseRegistration = () => {
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const features: Feature[] = [
    {
      icon: BookOpen,
      title: "Level-Based Filtering",
      description: "Intelligent course filtering showing only eligible courses based on student level (100L to 400L) with automatic prerequisite validation."
    },
    {
      icon: Calculator,
      title: "CGPA Computation Engine",
      description: "Integrated calculator with semester-by-semester tracking, grade point computation, and academic standing analytics."
    },
    {
      icon: Users,
      title: "Student Dashboard",
      description: "Personalized portal displaying registered courses, semester units, academic progress, and enrollment status."
    },
    {
      icon: Lock,
      title: "JWT Authentication",
      description: "Session management using JSON Web Tokens, password hashing with bcrypt, and role-based access control."
    },
    {
      icon: Calendar,
      title: "Semester Deadlines",
      description: "Academic calendar integration enforcing registration windows, course add/drop deadlines, and semester tracking."
    },
    {
      icon: BarChart3,
      title: "Department Analytics",
      description: "Real-time statistics on course enrollment capacity, student distribution across academic levels, and registration patterns."
    },
    {
      icon: Award,
      title: "Curriculum Management",
      description: "Full administrative controls for courses, credit unit weighting, elective definitions, and prerequisite requirements."
    },
    {
      icon: Server,
      title: "Nginx Reverse Proxy",
      description: "Production-ready reverse proxy handling static asset caching, upstream load distribution, and security headers."
    }
  ];

  const techStack: TechItem[] = [
    { name: "JavaScript & HTML5", role: "Frontend UI Logic" },
    { name: "Tailwind CSS", role: "Responsive Layouts" },
    { name: "Node.js & Express", role: "RESTful API Engine" },
    { name: "PostgreSQL", role: "Relational Database" },
    { name: "JWT & Bcrypt", role: "Authentication & Security" },
    { name: "Docker Compose", role: "Container Orchestration" },
    { name: "Nginx", role: "Reverse Proxy & Static Files" }
  ];

  const architecture: Architecture[] = [
    {
      section: "Frontend Architecture",
      items: [
        "Static page templates covering authentication, dashboard, course registration, and CGPA calculator",
        "Modular client scripts managing enrollment state and real-time GPA calculations",
        "Curriculum dataset containing complete Computer Science department course mappings (100L to 400L)",
        "Mobile-responsive table and card layouts built with Tailwind CSS"
      ]
    },
    {
      section: "Backend Architecture",
      items: [
        "Modular Express.js API separating authentication, course management, and enrollment controllers",
        "JWT middleware enforcing protected student and administrator access",
        "Database connection pooling handling high concurrent registration loads",
        "Input sanitization protecting against SQL injection and duplicate enrollments"
      ]
    },
    {
      section: "Database Schema",
      items: [
        "PostgreSQL schema modeling students, academic sessions, courses, prerequisites, and enrollments",
        "Foreign key constraints ensuring consistency across course registrations and grades",
        "Indexes on matriculation numbers and course codes for sub-millisecond lookups"
      ]
    },
    {
      section: "Containerization & Proxy",
      items: [
        "Docker Compose setup linking backend, frontend, database, and Nginx containers",
        "Nginx reverse proxy routing API requests and serving static assets efficiently",
        "Container health checks and restart policies for operational resilience"
      ]
    }
  ];

  const screenshots: Screenshot[] = [
    {
      title: "Portal Homepage",
      desc: "Welcome landing page with academic portal navigation",
      image: "/images/projects/course-registration/homepage.png"
    },
    {
      title: "Student Authentication",
      desc: "Secure login and registration interface with client-side verification",
      image: "/images/projects/course-registration/login.png"
    },
    {
      title: "Academic Dashboard",
      desc: "Overview of registered courses, semester units, and academic stats",
      image: "/images/projects/course-registration/dashboard.png"
    },
    {
      title: "Course Registration View",
      desc: "Level-filtered course catalog with dynamic unit calculation",
      image: "/images/projects/course-registration/courses.png"
    },
    {
      title: "CGPA Calculator",
      desc: "Interactive grade point average calculator across all academic levels",
      image: "/images/projects/course-registration/cgpa-calculator.png"
    },
    {
      title: "API Endpoints & Documentation",
      desc: "Backend route documentation and API testing collection",
      image: "/images/projects/course-registration/api-docs.png"
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
            Case Study · Departmental Platform
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white mb-4">
            Course Registration System
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
            A specialized academic registration and student records portal built for the University of Port Harcourt Computer Science department. Features automatic level-based prerequisite checks, an automated CGPA calculator, and containerized deployment with Docker and Nginx.
          </p>

          {/* GitHub Links */}
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href="https://github.com/GOG-777/IT-Defense-Project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500 text-sm font-medium transition-colors"
            >
              <Github className="w-4 h-4 text-neutral-500" />
              <span>Core Source (Vanilla JS)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>

            <a
              href="https://github.com/GOG-777/course-registration-system-react-version"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500 text-sm font-medium transition-colors"
            >
              <Github className="w-4 h-4 text-neutral-500" />
              <span>React Re-Implementation</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>
        </div>

        {/* System Specs Grid */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
            <div className="text-xs font-mono text-neutral-400 mb-1">Architecture</div>
            <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Node.js + Express + Nginx</div>
          </div>
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
            <div className="text-xs font-mono text-neutral-400 mb-1">Database</div>
            <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">PostgreSQL (Relational)</div>
          </div>
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
            <div className="text-xs font-mono text-neutral-400 mb-1">Deployment</div>
            <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Docker Compose & Nginx Proxy</div>
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
            System Features
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
            System Design
          </div>
          <h2 className="text-2xl font-bold text-neutral-950 dark:text-neutral-100">
            Architecture Structure
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{shot.title}</h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-200 transition-colors" />
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">{shot.desc}</p>
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

export default CourseRegistration;
