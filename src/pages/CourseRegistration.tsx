import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, BookOpen, Calculator, Users, Lock, BarChart3, Calendar, Award, Server, ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import GalaxyIcon from '../components/GalaxyIcon';

// Fix for Lucide icons - they're React components with SVG props
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface Feature {
  icon: IconComponent; 
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

interface Level {
  level: string;
  courses: number;
  credits: number;
  desc: string;
}

interface Screenshot {
  title: string;
  desc: string;
  image: string;
  path: string;
}

const CourseRegistration: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const features: Feature[] = [
    {
      icon: BookOpen as IconComponent,
      title: "Level-Based Registration",
      description: "Intelligent course filtering system showing only eligible courses based on student level (100L-400L) with automatic validation"
    },
    {
      icon: Calculator as IconComponent,
      title: "CGPA Calculator",
      description: "Built-in CGPA calculator with semester-by-semester tracking, grade point computation, and academic performance analytics"
    },
    {
      icon: Users as IconComponent,
      title: "Student Dashboard",
      description: "Personalized dashboard displaying registered courses, academic progress, semester overview, and course enrollment status"
    },
    {
      icon: Lock as IconComponent,
      title: "JWT Authentication",
      description: "Secure authentication system with JWT tokens, password hashing with bcrypt, and role-based access control"
    },
    {
      icon: Calendar as IconComponent,
      title: "Semester Management",
      description: "Academic calendar integration with registration periods, semester tracking, and deadline management"
    },
    {
      icon: BarChart3 as IconComponent,
      title: "Analytics Dashboard",
      description: "Real-time statistics on course enrollment, student distribution across levels, and registration trends"
    },
    {
      icon: Award as IconComponent,
      title: "Course Management",
      description: "Complete CRUD operations for courses with prerequisites validation, credit unit tracking, and course code management"
    },
    {
      icon: Server as IconComponent,
      title: "Nginx Reverse Proxy",
      description: "Production-ready deployment with Nginx handling static files, load balancing, and SSL termination"
    }
  ];

  const techStack: TechItem[] = [
    { name: "HTML/CSS/JavaScript", role: "Frontend (Vanilla JS)" },
    { name: "Tailwind CSS", role: "UI Styling" },
    { name: "Node.js", role: "Backend Runtime" },
    { name: "Express.js", role: "RESTful API" },
    { name: "PostgreSQL", role: "Relational Database" },
    { name: "JWT", role: "Authentication Tokens" },
    { name: "Bcrypt", role: "Password Hashing" },
    { name: "Nginx", role: "Reverse Proxy" },
    { name: "Docker", role: "Containerization" }
  ];

  const architecture: Architecture[] = [
    {
      section: "Frontend Structure",
      items: [
        "6 HTML pages: index, login, register, dashboard, courses, and CGPA calculator",
        "Vanilla JavaScript modules for auth, course management, and CGPA calculations",
        "Tailwind CSS for responsive, mobile-first design",
        "courses-data.js containing complete CS department curriculum (100L-400L)"
      ]
    },
    {
      section: "Backend Architecture",
      items: [
        "Express.js RESTful API with modular routing (auth, courses, enrollment)",
        "JWT middleware for protected route authentication",
        "PostgreSQL connection pooling with pg library",
        "Separated controllers for business logic (auth, course, enrollment)"
      ]
    },
    {
      section: "Database Design",
      items: [
        "Initialization SQL with users, courses, enrollments, and sessions tables",
        "Foreign key relationships ensuring data integrity",
        "Indexes on frequently queried columns for performance",
        "Support for multi-semester tracking and historical data"
      ]
    },
    {
      section: "DevOps & Deployment",
      items: [
        "Docker Compose orchestrating backend, frontend, database, and Nginx",
        "Nginx configuration for reverse proxy and static file serving",
        "Environment-based configuration for scalability",
        "Health checks and container restart policies"
      ]
    }
  ];

  const levels: Level[] = [
    { level: "100 Level", courses: 12, credits: 48, desc: "Foundation courses" },
    { level: "200 Level", courses: 14, credits: 52, desc: "Core CS concepts" },
    { level: "300 Level", courses: 16, credits: 58, desc: "Advanced topics" },
    { level: "400 Level", courses: 10, credits: 42, desc: "Specialization" }
  ];

  const screenshots: Screenshot[] = [
    {
      title: "Homepage",
      desc: "Welcome page with academic branding and navigation",
      image: "/images/projects/course-registration/homepage.png",
      path: "frontend/pages/index.html"
    },
    {
      title: "Login/Register",
      desc: "Authentication interface with validation",
      image: "/images/projects/course-registration/login.png",
      path: "frontend/pages/login.html + register.html"
    },
    {
      title: "Student Dashboard",
      desc: "Overview of enrolled courses and academic stats",
      image: "/images/projects/course-registration/dashboard.png",
      path: "frontend/pages/dashboard.html"
    },
    {
      title: "Course Registration",
      desc: "Level-filtered course selection interface",
      image: "/images/projects/course-registration/courses.png",
      path: "frontend/pages/courses.html + js/courses.js"
    },
    {
      title: "CGPA Calculator",
      desc: "Semester-wise GPA computation tool",
      image: "/images/projects/course-registration/cgpa-calculator.png",
      path: "frontend/pages/cgpa-calculator.html + js/cgpa-calculator.js"
    },
    {
      title: "API Documentation",
      desc: "RESTful endpoints documentation and testing",
      image: "/images/projects/course-registration/api-docs.png",
      path: "backend/routes/ + Postman collection"
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

  // Handle image error with proper TypeScript typing
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
          <div className="mb-8">
            <span className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-sm text-green-300">
              Deployed • IT Project
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Course Registration System
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-8">
            UNIPORT Computer Science Department Platform
          </p>

          <p className="text-xl text-gray-400 max-w-4xl leading-relaxed mb-12">
            A comprehensive course registration platform built specifically for the Computer Science department at the University of Port Harcourt.
            Features intelligent level-based course filtering, integrated CGPA calculator with semester tracking, JWT authentication, and complete
            academic management for students from 100 to 400 level. Deployed with Docker and Nginx for production-ready scalability.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">Timeline</p>
              <p className="text-2xl font-bold text-white">1 week</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">Architecture</p>
              <p className="text-2xl font-bold text-white">Vanilla JS + Express</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">Deployment</p>
              <p className="text-2xl font-bold text-white">Docker + Nginx</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            UNIPORT CS Course Structure
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {levels.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500 transition-all duration-300 hover:scale-105 text-center"
              >
                <p className="text-2xl font-bold text-purple-400 mb-4">{item.level}</p>
                <div className="space-y-2">
                  <p className="text-3xl font-black text-white">{item.courses}</p>
                  <p className="text-sm text-gray-400">Courses</p>
                  <div className="border-t border-gray-700 my-3"></div>
                  <p className="text-2xl font-bold text-blue-400">{item.credits}</p>
                  <p className="text-sm text-gray-400">Credit Units</p>
                  <div className="border-t border-gray-700 my-3"></div>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Department Coverage</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Complete course catalog for UNIPORT Computer Science department covering all four years of undergraduate study.
              The system includes core courses (Programming, Data Structures, Algorithms, Databases), electives, general studies,
              and department-specific requirements with proper prerequisite tracking and credit unit management.
            </p>
            <p className="text-gray-400 text-sm">
              All course data stored in <code className="text-purple-300 bg-purple-900/30 px-2 py-1 rounded">frontend/js/courses-data.js</code>
              {" "}for easy updates and maintenance.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon; // Capitalize for JSX
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-8 hover:border-purple-500 transition-all duration-300 hover:scale-105"
                >
                  <Icon className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Technology Stack & Architecture
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
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Project Screenshots
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
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
                    <BookOpen className="w-16 h-16 text-purple-300" />
                  </div>

                  {/* Overlay with click hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-black/50 rounded-full p-3 backdrop-blur-sm">
                      <ImageIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{shot.title}</h3>
                  <p className="text-gray-400 mb-3">{shot.desc}</p>
                  <code className="text-xs text-purple-300 bg-purple-900/30 px-2 py-1 rounded">{shot.path}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6 bg-gradient-to-t from-purple-950/20 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Project Impact & Achievements
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-green-400 mb-2">52</p>
              <p className="text-sm text-gray-300">Total Courses</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-blue-400 mb-2">4</p>
              <p className="text-sm text-gray-300">Academic Levels</p>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-purple-400 mb-2">200</p>
              <p className="text-sm text-gray-300">Total Credits</p>
            </div>
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-orange-400 mb-2">6</p>
              <p className="text-sm text-gray-300">Pages Built</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Technical Achievements</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span>Built complete course database for all UNIPORT CS courses from 100L to 400L</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span>Implemented intelligent filtering showing only eligible courses based on student level</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span>Created fully functional CGPA calculator with semester-by-semester grade tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span>Deployed with Docker Compose orchestrating multi-container architecture</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span>Configured Nginx as reverse proxy for production-grade performance</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span>Designed clean, intuitive UI with Tailwind CSS making registration effortless</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Need an Educational Platform?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            I build custom solutions for educational institutions and academic management systems.
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
              View Other Projects
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

export default CourseRegistration;