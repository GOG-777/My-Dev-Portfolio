import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code, Zap, Database, Layers, Send, Server, Package, GitBranch, Cloud, BarChart3, FileSpreadsheet, Cpu, Menu, X, CheckCircle, Sparkles } from 'lucide-react';
//import { Terminal, Boxes, Lock, Brain, Globe } from 'lucide-react';
import GalaxyIcon from '../components/GalaxyIcon';
import DeveloperCoding from '../components/DeveloperCoding';
import DeveloperThinking from '../components/DeveloperThinking';

// Define types
interface MousePosition {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

interface Project {
  title: string;
  type: string;
  description: string;
  tech: string[];
  features: string[];
  status: string;
  link: string;
}

interface TechItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  category: string;
}

interface StatItem {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Skill {
  name: string;
  level: number;
}

// Main component
const HomePage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  // Event handler
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Effects
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Store in refs
    ctxRef.current = ctx;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      });
    }

    particlesRef.current = particles;

    const animate = () => {
      const currentCtx = ctxRef.current;
      const currentCanvas = canvasRef.current;

      if (!currentCtx || !currentCanvas) return;

      currentCtx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
      currentCtx.fillStyle = 'rgba(139, 92, 246, 0.5)';

      particlesRef.current.forEach((particle) => {
        currentCtx.beginPath();
        currentCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        currentCtx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > currentCanvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > currentCanvas.height) particle.speedY *= -1;
      });

      // Store animation frame ID
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const currentCanvas = canvasRef.current;
      if (currentCanvas) {
        currentCanvas.width = window.innerWidth;
        currentCanvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      // Clean up animation
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      // Clean up context ref
      ctxRef.current = null;
    };
  }, []);

  const projects: Project[] = [
    {
      title: "Praise Fashion",
      type: "E-Commerce Platform",
      description: "Complete e-commerce solution built for fashion retail. Features Paystack payment integration, automated receipt generation (PDF & JPG), inventory management, admin dashboard, and full customer management system.",
      tech: ["HTML5", "Node.js", "Express.js", "PostgreSQL", "Docker", "Paystack API", "Vanilla JavaScript", "Tailwind CSS"],
      features: ["Payment Integration", "PDF Generation", "Email Automation", "Inventory Management", "Admin Panel"],
      status: "Completed",
      link: "/projects/praise-fashion"
    },
    {
      title: "Digital Course Registration System",
      type: "Educational Platform",
      description: "UNIPORT Computer Science department solution. Level-based course registration (100-400L), integrated CGPA calculator, student dashboard, course management, semester planning, and academic analytics.",
      tech: ["HTML5", "Node.js", "Express.js", "PostgreSQL", "Docker", "Nginx", "Vanilla JavaScript", "Tailwind CSS"],
      features: ["Student Dashboard", "CGPA Calculator", "Course Scheduling", "Semester Planning"],
      status: "Academic Project",
      link: "/projects/course-registration"
    },
    {
      title: "URL Shortener",
      type: "Utility Tool",
      description: "Custom link shortening service with analytics tracking, QR code generation, custom aliases, click tracking, geographic data, and detailed performance metrics.",
      tech: ["Node.js", "PostgreSQL", "TypeScript", "Vite", "Tailwind CSS", "Lucide Icons", "Mock API"],
      features: ["Analytics", "QR Codes", "Custom Aliases", "API Access"],
      status: "Archived",
      link: "/projects/url-shortener"
    }
  ];

  const techStack: TechItem[] = [
    { name: "React", icon: Code, color: "text-cyan-400", category: "Frontend" },
    { name: "Next.js", icon: Layers, color: "text-white", category: "Frontend" },
    { name: "TypeScript", icon: Code, color: "text-blue-400", category: "Languages" },
    { name: "JavaScript", icon: Code, color: "text-yellow-400", category: "Languages" },
    { name: "Python", icon: Zap, color: "text-blue-300", category: "Languages" },
    { name: "Node.js", icon: Server, color: "text-green-400", category: "Backend" },
    { name: "Express", icon: Server, color: "text-gray-400", category: "Backend" },
    { name: "PostgreSQL", icon: Database, color: "text-cyan-400", category: "Database" },
    { name: "SQL", icon: Database, color: "text-orange-400", category: "Database" },
    { name: "Docker", icon: Package, color: "text-blue-500", category: "DevOps" },
    { name: "Git", icon: GitBranch, color: "text-orange-500", category: "DevOps" },
    { name: "REST APIs", icon: Cloud, color: "text-purple-400", category: "Backend" },
    { name: "Data Analysis", icon: BarChart3, color: "text-green-400", category: "Data" },
    { name: "Spreadsheets", icon: FileSpreadsheet, color: "text-emerald-400", category: "Data" },
    //{ name: "Data Science", icon: Brain, color: "text-pink-400", category: "Data" }
    { name: "Data Processing", icon: Cpu, color: "text-pink-400", category: "Data" }
  ];

  const stats: StatItem[] = [
    { label: "Projects Deployed", value: "15+", icon: CheckCircle },
    { label: "Lines of Code", value: "50K+", icon: Code },
    { label: "Technologies", value: "20+", icon: Cpu },
    { label: "Years Experience", value: "2+", icon: Zap }
  ];

  const skills: Skill[] = [
    { name: "Full-Stack Development", level: 93 },
    { name: "Backend Architecture", level: 90 },
    { name: "Database Design", level: 92 },
    { name: "Data Analysis", level: 85 },
    { name: "Problem Solving", level: 96 },
    { name: "Docker & DevOps", level: 88 }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-30" />

      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30"></div>
        <div
          className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
            transition: 'all 0.3s ease'
          }}
        ></div>
      </div>

      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
            <span>GOG</span>
            <GalaxyIcon className="w-6 h-6 md:w-7 md:h-7" />
          </Link>

          <div className="hidden md:flex gap-8 text-sm">
            <a href="#home" className="hover:text-purple-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-purple-400 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-purple-500/20">
            <div className="flex flex-col px-6 py-4 space-y-4">
              <a href="#home" className="hover:text-purple-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#about" className="hover:text-purple-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#projects" className="hover:text-purple-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Projects</a>
              <a href="#skills" className="hover:text-purple-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Skills</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center px-4 sm:px-6 lg:px-12 pt-32 pb-24">
        <div className="max-w-7xl mx-auto w-full">

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">

            {/* Left: Text Content */}
            <div>
              {/* Avatar + Name Row */}
              <div className="flex items-start gap-6 sm:gap-8 mb-12">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-purple-600/40 rounded-full blur-2xl"></div>
                  <img
                    src="/images/avatar.jpg"
                    alt="GOG"
                    className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full object-cover border-4 border-purple-500/40 hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 pt-2 sm:pt-3">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      GOG
                    </h1>
                    <GalaxyIcon className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-3 sm:mb-5">
                    Thegenius
                  </h2>
                  <p className="text-base sm:text-xl md:text-2xl text-purple-300 font-semibold">
                    Full-Stack Developer • Systems Architect • Vibe Coder
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-5 sm:space-y-6 mb-10 sm:mb-12">
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
                  I build scalable full-stack applications with clean architecture and robust backend systems. 
                  From e-commerce platforms to data analytics, I deliver functional solutions.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                <a
                  href="#projects"
                  className="px-6 sm:px-9 py-3.5 sm:py-4 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 text-center"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="px-6 sm:px-9 py-3.5 sm:py-4 border-2 border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 text-blue-300 text-center"
                >
                  Get In Touch
                </a>
              </div>
            </div>

            {/* Right: SVG Illustration */}
            <div className="hidden lg:block">
              <DeveloperCoding />
            </div>

          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 md:gap-7">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-5 sm:p-6 md:p-7 hover:border-purple-500 transition-all duration-300 hover:scale-105 text-center"
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-purple-400 mb-3 sm:mb-4 mx-auto" />
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              I specialize in building complete, functional solutions across the full development stack. 
              My focus is on delivering systems that work and solve real problems.
            </p>
          </div>

          {/* Add illustration for visual interest */}
          <div className="mb-12 md:mb-16 lg:mb-20 flex justify-center px-4">
            <div className="w-full max-w-2xl opacity-80 hover:opacity-100 transition-opacity duration-500">
              <DeveloperThinking />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-6 md:p-8 hover:border-purple-500 transition-all duration-300">
              <Server className="w-10 h-10 md:w-12 md:h-12 text-purple-400 mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-purple-400">Full-Stack Expertise</h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                From frontend interfaces to backend APIs and database architecture, I build complete systems. 
                React, Next.js, Node.js, Express, PostgreSQL. I work across the entire development spectrum.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6 md:p-8 hover:border-blue-500 transition-all duration-300">
              <Database className="w-10 h-10 md:w-12 md:h-12 text-blue-400 mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-400">System Architecture</h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                I design scalable backend systems with proper database normalization, API design, and containerization. 
                Every project is built with deployment and maintainability in mind.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-2xl p-6 md:p-8 hover:border-cyan-500 transition-all duration-300">
              <BarChart3 className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-cyan-400">Data & Analytics</h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Beyond web development, I work with data analysis, visualization, and extracting insights from complex datasets. 
                Python, SQL, and spreadsheet modeling are part of my toolkit.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-2xl p-6 md:p-8 hover:border-yellow-500 transition-all duration-300">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-yellow-400 mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-yellow-400">Vibe Coder Philosophy</h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                I code with intuition and flow, but deliver with precision. "Vibe" doesn't mean careless, it means 
                finding elegant solutions through experimentation and creative problem-solving. The code works, the systems scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative z-10 py-20 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg md:text-xl text-gray-400">Functional systems built to solve real problems</p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-6 md:p-8 hover:border-purple-500 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  <div className="md:col-span-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-base md:text-lg text-purple-400 font-semibold">{project.type}</p>
                      </div>
                      <span className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-sm text-green-300 whitespace-nowrap text-center inline-block min-w-[140px] sm:min-w-[180px]">
                        {project.status}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed text-base md:text-lg">
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <p className="text-sm text-gray-400 mb-3 font-semibold">KEY FEATURES:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-gray-400">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-3 font-semibold">TECH STACK:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/50 rounded-lg text-sm text-purple-300 hover:bg-purple-500/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={project.link}
                      className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 text-center"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="relative z-10 py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-400">Proficiency across the full development spectrum</p>
          </div>

          {/* Developer illustration for visual appeal */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
            <div className="order-2 lg:order-1">
              <div className="grid gap-4 md:gap-6">
                {skills.map((skill, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5 md:p-6 hover:border-purple-500 transition-all duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-base md:text-lg font-semibold text-white">{skill.name}</span>
                      <span className="text-purple-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-1000 hover:from-purple-400 hover:to-blue-400"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 opacity-90 hover:opacity-100 transition-opacity duration-500">
              <DeveloperCoding />
            </div>
          </div>

          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white">Technology Stack</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {techStack.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4 md:p-6 hover:border-purple-500 transition-all duration-300 hover:scale-110 group text-center"
                >
                  <Icon className={`w-10 h-10 md:w-12 md:h-12 ${tech.color} mb-3 mx-auto group-hover:scale-110 transition-transform`} />
                  <h3 className="text-sm md:text-base lg:text-lg font-bold text-white mb-1">{tech.name}</h3>
                  <p className="text-xs text-gray-500">{tech.category}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl">
              <Server className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <p className="text-lg font-bold text-white mb-2">Full-Stack Development</p>
              <p className="text-sm text-gray-400">Frontend, Backend, APIs</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl">
              <BarChart3 className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <p className="text-lg font-bold text-white mb-2">Data Science</p>
              <p className="text-sm text-gray-400">Analysis, Spreadsheets, Insights</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 rounded-xl sm:col-span-2 lg:col-span-1">
              <Package className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
              <p className="text-lg font-bold text-white mb-2">DevOps</p>
              <p className="text-sm text-gray-400">Docker, Git, Linux Mint</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 py-20 md:py-32 px-4 sm:px-6 bg-gradient-to-t from-purple-950/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Let's Work Together
          </h2>

          <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Available for freelance projects, contract work, or full-time opportunities. 
            Let's discuss how I can help bring your ideas to life.
          </p>

          <div className="flex justify-center gap-6 sm:gap-8 md:gap-12 mb-12 md:mb-16 flex-wrap px-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/gog-thegenius"
              className="group flex flex-col items-center gap-3 hover:scale-110 transition-transform"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm text-gray-400 group-hover:text-blue-400">LinkedIn</span>
            </a>

            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              href="https://t.me/thegenius_001" 
              className="group flex flex-col items-center gap-3 hover:scale-110 transition-transform"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300">
                <Send className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <span className="text-xs sm:text-sm text-gray-400 group-hover:text-blue-400">Telegram</span>
            </a>

            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              href="https://github.com/GOG-777" 
              className="group flex flex-col items-center gap-3 hover:scale-110 transition-transform"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-gray-500/50 transition-all duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </div>
              <span className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300">Github</span>
            </a>

            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              href="https://x.com/thegenius_xyz" 
              className="group flex flex-col items-center gap-3 hover:scale-110 transition-transform"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </div>
              <span className="text-xs sm:text-sm text-gray-400 group-hover:text-purple-400">X (Twitter)</span>
            </a>

            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              href="https://instagram.com/thegenius_001" 
              className="group flex flex-col items-center gap-3 hover:scale-110 transition-transform"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-pink-500/50 transition-all duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </div>
              <span className="text-xs sm:text-sm text-gray-400 group-hover:text-pink-400">Instagram</span>
            </a>
          </div>

          <div className="border-t border-gray-800 pt-8 md:pt-12 px-4">
            <p className="text-gray-500 text-base md:text-lg mb-3 flex items-center justify-center gap-2 flex-wrap">
              <span>GOG</span>
              <GalaxyIcon className="w-5 h-5 md:w-6 md:h-6" />
              <span>• Thegenius</span>
            </p>
            <p className="text-gray-500 text-sm mb-2">
              Copyright &copy; {currentYear}
            </p>
            <p className="text-gray-500 text-sm mb-2">
              Full-Stack Developer • Data Scientist • Systems Architect
            </p>
            <p className="text-gray-400 text-xs mt-4">
              Built with TypeScript, React, Tailwind CSS, Docker, Linux Mint
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;