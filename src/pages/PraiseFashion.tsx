import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, CreditCard, FileText, Mail, Package, BarChart3, Shield, ImageIcon, X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import GalaxyIcon from '../components/GalaxyIcon';
import ThemeToggle from '../components/ThemeToggle';
import SfxToggle from '../components/SfxToggle';

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
  path: string;
}

export const PraiseFashion = () => {
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const features: Feature[] = [
    {
      icon: ShoppingCart,
      title: "Full E-Commerce Flow",
      description: "Complete shopping experience with product catalog, category filtering, search, and persistent cart management."
    },
    {
      icon: CreditCard,
      title: "Paystack Payment Engine",
      description: "Secure payment processing integrated with Paystack API, including automated webhook verification."
    },
    {
      icon: FileText,
      title: "Automated Receipts",
      description: "Instant generation of downloadable receipts in both PDF and JPG formats upon successful payment."
    },
    {
      icon: Mail,
      title: "Email Dispatch",
      description: "Automated order confirmation notices, shipping alerts, and customer notifications via Nodemailer."
    },
    {
      icon: Package,
      title: "Inventory Control",
      description: "Real-time stock depletion tracking, low stock notifications, and administrator product controls."
    },
    {
      icon: BarChart3,
      title: "Admin Dashboard",
      description: "Administrative interface for monitoring store sales, processing orders, and updating inventory."
    },
    {
      icon: ImageIcon,
      title: "Image Processing",
      description: "Automatic image optimization with Sharp, generating thumbnails and compressed full-size web assets."
    },
    {
      icon: Shield,
      title: "Security & Validation",
      description: "Activity auditing, secure authentication tokens, and strict input validation across all endpoints."
    }
  ];

  const techStack: TechItem[] = [
    { name: "JavaScript (Vanilla)", role: "Frontend Logic & DOM" },
    { name: "Tailwind CSS", role: "UI Design & Layout" },
    { name: "Node.js & Express", role: "Backend API Framework" },
    { name: "PostgreSQL", role: "Relational Database" },
    { name: "Paystack API", role: "Payment Processing" },
    { name: "Sharp", role: "Image Optimization" },
    { name: "Nodemailer", role: "Email Delivery" },
    { name: "Docker", role: "Containerization" }
  ];

  const architecture: Architecture[] = [
    {
      section: "Frontend Architecture",
      items: [
        "14 static pages covering shop, cart, checkout, admin, order tracking, and gallery",
        "Lightweight vanilla JavaScript for cart state and client-side filtering",
        "Responsive grid styling powered by Tailwind CSS",
        "Fast-loading video showcase on the landing hero"
      ]
    },
    {
      section: "Backend Architecture",
      items: [
        "RESTful Express API managing authentication, products, orders, and transactions",
        "Middleware for JWT authentication, request logging, and rate limiting",
        "Custom utility modules for Nigerian pickup station delivery calculations",
        "Secure Paystack webhook listener verifying payment success before order fulfillment"
      ]
    },
    {
      section: "Database Design",
      items: [
        "PostgreSQL schema modeling users, products, orders, items, and payments",
        "Optimized indexes on product categories and customer lookups",
        "Dedicated tables for pickup stations, delivery zones, and customer messages"
      ]
    },
    {
      section: "Deployment & DevOps",
      items: [
        "Docker container setup for reproducible local and server execution",
        "Automated image pipeline processing uploaded product images on the server",
        "Isolated environment configurations for staging and production"
      ]
    }
  ];

  const screenshots: Screenshot[] = [
    {
      title: "Storefront Homepage",
      desc: "Hero video banner with seasonal featured product collections",
      image: "/images/projects/praise-fashion/hero.png",
      path: "views/index.html"
    },
    {
      title: "Product Catalog",
      desc: "Filterable product catalog with African fabric categories (Ankara, Lace, Silk)",
      image: "/images/projects/praise-fashion/shop.png",
      path: "views/shop.html"
    },
    {
      title: "Shopping Cart",
      desc: "Interactive cart drawer with dynamic delivery cost calculation",
      image: "/images/projects/praise-fashion/cart.png",
      path: "views/cart.html"
    },
    {
      title: "Admin Dashboard",
      desc: "Management dashboard for revenue analytics and inventory tracking",
      image: "/images/projects/praise-fashion/admin.png",
      path: "views/admin.html"
    },
    {
      title: "Order Confirmation",
      desc: "Receipt view showing payment status and transaction ID",
      image: "/images/projects/praise-fashion/order-confirmation.png",
      path: "views/order-confirmation.html"
    },
    {
      title: "Collection Gallery",
      desc: "Editorial photo grid showcasing tailored garments",
      image: "/images/projects/praise-fashion/gallery.png",
      path: "views/gallery.html"
    }
  ];

  const openModal = (image: Screenshot, index: number) => {
    setSelectedImage(image);
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
            Case Study · Commercial E-Commerce
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white mb-4">
            Praise Fashion Hub
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
            A production-ready retail platform designed for an African textile brand. Handles online checkout with Paystack, calculates pickup station deliveries across Nigeria, generates automated receipts, and provides full inventory administration.
          </p>
        </div>

        {/* System Specs Grid */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
            <div className="text-xs font-mono text-neutral-400 mb-1">Architecture</div>
            <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Vanilla JS + Express API</div>
          </div>
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
            <div className="text-xs font-mono text-neutral-400 mb-1">Database</div>
            <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">PostgreSQL with Docker</div>
          </div>
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30">
            <div className="text-xs font-mono text-neutral-400 mb-1">Payments</div>
            <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Paystack Verified Webhooks</div>
          </div>
        </div>
      </section>

      {/* ─── Key Features ─── */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
            Functionality
          </div>
          <h2 className="text-2xl font-bold text-neutral-950 dark:text-neutral-100">
            Core Features
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

      {/* ─── System Architecture ─── */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
            Engineering Decisions
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

      {/* ─── Screenshots Grid ─── */}
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
              onClick={() => openModal(shot, idx)}
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

export default PraiseFashion;
