import { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Terminal, 
  Layers, 
  Database, 
  Cpu, 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Menu, 
  X, 
  BookOpen 
} from 'lucide-react';
import GalaxyIcon from '../components/GalaxyIcon';
import MyProjects from '../components/MyProjects';
import ThemeToggle from '../components/ThemeToggle';
import SfxToggle from '../components/SfxToggle';
import SpotlightCard from '../components/SpotlightCard';
import CopyEmailCard from '../components/CopyEmailCard';
import { playMenuSound } from '../utils/sfx';

export const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playMenuSound(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      {/* ─── Navigation ─── */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 font-bold text-lg tracking-tight group">
            <span className="text-neutral-950 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">GOG</span>
            <GalaxyIcon className="w-5 h-5" />
            <span className="text-xs font-mono text-neutral-500 font-normal">thgenius.xyz</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            <a href="#projects" className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors">Systems</a>
            <a href="#ecosystem" className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors">Ecosystem</a>
            <a href="#capabilities" className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors">Stack</a>
            <a href="#about" className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors">About</a>
            <a href="#contact" className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <SfxToggle />
            <ThemeToggle />
            <a
              href="https://github.com/GOG-777"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hidden sm:inline-flex p-2 rounded-lg border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                const next = !mobileMenuOpen;
                playMenuSound(next);
                setMobileMenuOpen(next);
              }}
              className="md:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div 
            onClick={() => {
              playMenuSound(false);
              setMobileMenuOpen(false);
            }}
            className="md:hidden fixed inset-0 top-16 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 p-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200"
            >
              <div className="flex flex-col space-y-3 font-medium text-base">
                <a 
                  href="#projects" 
                  onClick={() => { playMenuSound(false); setMobileMenuOpen(false); }}
                  className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white py-1 transition-colors"
                >
                  Systems & Work
                </a>
                <a 
                  href="#ecosystem" 
                  onClick={() => { playMenuSound(false); setMobileMenuOpen(false); }}
                  className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white py-1 transition-colors"
                >
                  thgenius Ecosystem
                </a>
                <a 
                  href="#capabilities" 
                  onClick={() => { playMenuSound(false); setMobileMenuOpen(false); }}
                  className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white py-1 transition-colors"
                >
                  Stack
                </a>
                <a 
                  href="#about" 
                  onClick={() => { playMenuSound(false); setMobileMenuOpen(false); }}
                  className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white py-1 transition-colors"
                >
                  About
                </a>
                <a 
                  href="#contact" 
                  onClick={() => { playMenuSound(false); setMobileMenuOpen(false); }}
                  className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white py-1 transition-colors"
                >
                  Contact
                </a>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>GOG 🌌 · thgenius.xyz</span>
                <button 
                  onClick={() => { playMenuSound(false); setMobileMenuOpen(false); }}
                  className="hover:text-neutral-700 dark:hover:text-neutral-200 underline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ─── Hero Section ─── */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
            Software Engineer & Systems Architect
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1] mb-6">
            Building software systems that actually work in production.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
            I engineer full-stack web applications, backend services, and AI messaging systems. From conversational commerce to fast database architecture and payment integrations, I build reliable software that delivers real results.
          </p>

          {/* Quick CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-950 font-semibold text-sm rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              View Work
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#ecosystem"
              className="px-5 py-2.5 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 font-medium text-sm rounded-lg transition-colors"
            >
              The Ecosystem
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 text-sm font-medium transition-colors"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </section>

      {/* ─── Projects & Systems ─── */}
      <MyProjects />

      {/* ─── thgenius.xyz Ecosystem ─── */}
      <section id="ecosystem" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200 dark:border-neutral-800/60">
        <div className="mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
            The Network
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-neutral-100 tracking-tight">
            thgenius.xyz Ecosystem
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base mt-2 max-w-2xl">
            Independent services, developer tools, technical articles, and experimental projects under the thgenius umbrella.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Item 1: Root Umbrella */}
          <SpotlightCard>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Ecosystem Portal
                </span>
                <a 
                  href="https://thgenius.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">thgenius.xyz</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                The central homepage for everything I build. A directory connecting our digital currency tools, celebration services, and software engineering projects under one clean address.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400 dark:text-neutral-500 pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
              Main Gateway
            </div>
          </SpotlightCard>

          {/* Item 2: gNGN Stablecoin */}
          <SpotlightCard>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Digital Currency
                </span>
                <a 
                  href="https://ngn.thgenius.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">ngn.thgenius.xyz</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                A digital Nigerian Naira designed for internet payments. Deposit crypto as security to mint 1-to-1 digital Naira with zero extra transaction fees.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
              Testnet Live
            </div>
          </SpotlightCard>

          {/* Item 3: Neverland Protocol */}
          <SpotlightCard>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Celebration Service
                </span>
                <a 
                  href="https://neverland.thgenius.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">neverland.thgenius.xyz</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                A digital card and gift delivery service. Write your message, choose a future date like a birthday or anniversary, and it arrives right on schedule with a 3D unboxing experience.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400 dark:text-neutral-500 pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
              Live Service
            </div>
          </SpotlightCard>

          {/* Item 4: Snip Protocol */}
          <SpotlightCard>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Developer Tool
                </span>
                <a 
                  href="https://snip.thgenius.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">snip.thgenius.xyz</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                A fast, private way to share code and diagrams. Paste your work and get an instant link with a live preview, without needing to create an account or save files on a database.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400 dark:text-neutral-500 pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
              Live Service
            </div>
          </SpotlightCard>

          {/* Item 5: Wrap Link Router */}
          <SpotlightCard>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Edge Link Router
                </span>
                <a 
                  href="https://wrap.thgenius.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">wrap.thgenius.xyz</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                An open source URL shortener built in pure Go. Wraps long links into short Base62 aliases and HMAC-signed stateless tokens with QR matrices, click telemetry, and per-IP rate limiting.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400 dark:text-neutral-500 pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
              Live Service
            </div>
          </SpotlightCard>

          {/* Item 6: Knowledge Base */}
          <SpotlightCard>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Articles &amp; Guides
                </span>
                <BookOpen className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">learn.thgenius.xyz</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                A planned technical library where I write clear, easy-to-follow explanations on how modern software systems work, blockchain concepts, and practical coding guides.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400 dark:text-neutral-500 pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
              Coming Soon
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* ─── Engineering Capabilities ─── */}
      <section id="capabilities" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200 dark:border-neutral-800/60">
        <div className="mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
            Technical Stack
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-neutral-100 tracking-tight">
            How I Build
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base mt-2 max-w-2xl">
            A clear summary of the technologies, tools, and practices I use across projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
            <div className="flex items-center gap-2 mb-4 text-neutral-900 dark:text-neutral-200 font-bold">
              <Terminal className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              <h3>System Architecture</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Multi-provider AI failovers</li>
              <li>• Context-based user routing</li>
              <li>• Containerized Docker services</li>
              <li>• WhatsApp message gateways</li>
              <li>• Background task workers</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
            <div className="flex items-center gap-2 mb-4 text-neutral-900 dark:text-neutral-200 font-bold">
              <Database className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              <h3>Backend & Data</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              <li>• PostgreSQL and Supabase</li>
              <li>• Row Level Security (RLS) policies</li>
              <li>• Node.js and Express APIs</li>
              <li>• Paystack payment webhooks</li>
              <li>• Redis data caching</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
            <div className="flex items-center gap-2 mb-4 text-neutral-900 dark:text-neutral-200 font-bold">
              <Cpu className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              <h3>AI & Automation</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Groq and DeepSeek orchestration</li>
              <li>• Custom tool and function calling</li>
              <li>• Real-time stock overrides</li>
              <li>• Dynamic catalog prompt injections</li>
              <li>• Structured JSON data extraction</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
            <div className="flex items-center gap-2 mb-4 text-neutral-900 dark:text-neutral-200 font-bold">
              <Layers className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              <h3>Frontend & Mobile</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Next.js and App Router</li>
              <li>• React 19 and TypeScript</li>
              <li>• Tailwind CSS responsive design</li>
              <li>• Capacitor for Android apps</li>
              <li>• Web Push notification standards</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section id="about" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200 dark:border-neutral-800/60">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Identity Column */}
          <div className="md:col-span-5 flex items-center gap-4 sm:gap-5">
            <img
              src="/images/avatar.jpg"
              alt="GOG"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-800 shadow-sm shrink-0"
            />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-neutral-100 tracking-tight flex items-center gap-2 whitespace-nowrap">
              <span>About GOG</span>
              <span>🌌</span>
            </h2>
          </div>

          {/* Bio Column */}
          <div className="md:col-span-7 space-y-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed md:pt-1 text-justify">
            <p>
              I am a software engineer focused on building practical, high-performance web applications and backend systems.
            </p>
            <p>
              I like understanding how software works from the database layer all the way up to user interfaces. Rather than chasing flashy visuals or gimmicks, I care about writing straightforward code, securing user data, and making sure production services remain up and responsive.
            </p>
            <p>
              Under the <span className="text-neutral-950 dark:text-neutral-100 font-medium">thgenius.xyz</span> domain, I am building out independent web services, developer tools, and technical documentation.
            </p>
            <p className="pt-2 font-mono text-xs sm:text-[13px] text-neutral-400 dark:text-neutral-500 tracking-wider text-left">
              ¡️⅁ꟽHS •uɐɯnɥ ʇou sᴉ ɹǝsn sᴉɥꞱ
            </p>
          </div>
        </div>
      </section>

      {/* ─── Contact & Socials ─── */}
      <section id="contact" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200 dark:border-neutral-800/60">
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-neutral-100 tracking-tight mb-4">
            Connect & Collaborate
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
            Reach out directly across any of the channels below if you want to discuss software engineering, technical projects, or potential work.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <a
              href="https://github.com/GOG-777"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 hover:border-neutral-400 dark:hover:border-neutral-700 flex items-center justify-between text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <div>
                  <div className="text-sm font-semibold">GitHub</div>
                  <div className="text-xs font-mono text-neutral-500">github.com/GOG-777</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            </a>

            <a
              href="https://x.com/thegenius_xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 hover:border-neutral-400 dark:hover:border-neutral-700 flex items-center justify-between text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Twitter className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <div>
                  <div className="text-sm font-semibold">X (Twitter)</div>
                  <div className="text-xs font-mono text-neutral-500">@thegenius_xyz</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            </a>

            <a
              href="https://t.me/thegenius_001"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 hover:border-neutral-400 dark:hover:border-neutral-700 flex items-center justify-between text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <div>
                  <div className="text-sm font-semibold">Telegram</div>
                  <div className="text-xs font-mono text-neutral-500">@thegenius_001</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            </a>

            <a
              href="https://www.linkedin.com/in/gog-thegenius"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 hover:border-neutral-400 dark:hover:border-neutral-700 flex items-center justify-between text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <div>
                  <div className="text-sm font-semibold">LinkedIn</div>
                  <div className="text-xs font-mono text-neutral-500">in/gog-thegenius</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            </a>

            <a
              href="https://instagram.com/thegenius_001"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 hover:border-neutral-400 dark:hover:border-neutral-700 flex items-center justify-between text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <div>
                  <div className="text-sm font-semibold">Instagram</div>
                  <div className="text-xs font-mono text-neutral-500">@thegenius_001</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            </a>

            <CopyEmailCard />
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800/80 py-8 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="text-neutral-800 dark:text-neutral-300 font-semibold">GOG 🌌</span>
          <span>•</span>
          <span>Neverland</span>
          <span>•</span>
          <span>thgenius.xyz</span>
          <span>•</span>
          <span>© {currentYear}</span>
        </div>
        <div className="text-neutral-500">
          Built with React 19, TypeScript & Tailwind CSS
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
