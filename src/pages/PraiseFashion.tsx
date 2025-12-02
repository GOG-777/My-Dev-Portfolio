import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, ShoppingCart, CreditCard, FileText, Mail, Package, BarChart3, Shield, Zap, ImageIcon, Database, X, ChevronLeft, ChevronRight } from 'lucide-react';
import GalaxyIcon from '../components/GalaxyIcon';

// Define interfaces
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

const PraiseFashion: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const features: Feature[] = [
    {
      icon: ShoppingCart,
      title: "Full E-Commerce System",
      description: "Complete shopping cart with product catalog, filtering, search, and wishlist functionality built with vanilla JavaScript"
    },
    {
      icon: CreditCard,
      title: "Paystack Integration",
      description: "Secure payment processing with Paystack API, supporting multiple payment methods with webhook verification"
    },
    {
      icon: FileText,
      title: "Receipt Generation",
      description: "Automated receipt generation in both PDF and JPG formats with custom branding and order details"
    },
    {
      icon: Mail,
      title: "Email Automation",
      description: "Automated order confirmations, shipping updates, and customer notifications using custom email templates"
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Real-time stock tracking, low stock alerts, and automated inventory updates with admin controls"
    },
    {
      icon: BarChart3,
      title: "Admin Dashboard",
      description: "Comprehensive analytics, sales reports, order management, and customer management interface"
    },
    {
      icon: ImageIcon,
      title: "Image Processing",
      description: "Automatic image optimization with Sharp, generating full-size and thumbnail versions for products"
    },
    {
      icon: Shield,
      title: "Security Features",
      description: "Activity logging, secure authentication, input validation, and protection against common web vulnerabilities"
    }
  ];

  const techStack: TechItem[] = [
    { name: "HTML/CSS/JavaScript", role: "Frontend (Vanilla JS)" },
    { name: "Tailwind CSS", role: "UI Framework" },
    { name: "Node.js", role: "Backend Runtime" },
    { name: "Express.js", role: "API Framework" },
    { name: "PostgreSQL", role: "Database" },
    { name: "Paystack API", role: "Payment Processing" },
    { name: "Sharp", role: "Image Processing" },
    { name: "Nodemailer", role: "Email Service" },
    { name: "JWT", role: "Authentication" },
    { name: "Docker", role: "Containerization" },
    { name: "Multer", role: "File Upload Handling" }
  ];

  const architecture: Architecture[] = [
    {
      section: "Frontend Structure",
      items: [
        "14 HTML pages including shop, cart, admin, gallery, contact, and order tracking",
        "Vanilla JavaScript for cart management, shop filtering, and admin operations",
        "Tailwind CSS with custom configuration for responsive design",
        "Video hero section with fashion showcase"
      ]
    },
    {
      section: "Backend Architecture",
      items: [
        "RESTful API with Express.js handling authentication, products, orders, payments",
        "Middleware for authentication, activity logging, and security",
        "Utility modules for delivery calculation, order numbering, and email templates",
        "Paystack integration for payment processing and webhook handling"
      ]
    },
    {
      section: "Database Design",
      items: [
        "PostgreSQL with comprehensive schema for users, products, orders, payments",
        "Security updates and optimized queries for performance",
        "Support for pickup stations, newsletters, notifications, and messages"
      ]
    },
    {
      section: "DevOps & Deployment",
      items: [
        "Docker containerization for consistent environments",
        "Image upload handling with automatic optimization (full + thumbnail)",
        "Environment-based configuration for development and production"
      ]
    }
  ];

  const screenshots: Screenshot[] = [
    {
      title: "Homepage",
      desc: "Hero video section with featured collections and products",
      image: "/images/projects/praise-fashion/hero.png",
      path: "views/index.html"
    },
    {
      title: "Product Shop",
      desc: "Filterable product catalog with categories (Ankara, Lace, Silk, etc.)",
      image: "/images/projects/praise-fashion/shop.png",
      path: "views/shop.html + public/js/shop.js"
    },
    {
      title: "Shopping Cart",
      desc: "Interactive cart with real-time price calculations",
      image: "/images/projects/praise-fashion/cart.png",
      path: "views/cart.html + public/js/cart.js"
    },
    {
      title: "Admin Dashboard",
      desc: "Product management, order tracking, and analytics",
      image: "/images/projects/praise-fashion/admin.png",
      path: "views/admin.html + public/js/admin.js"
    },
    {
      title: "Order Confirmation",
      desc: "Receipt display with order details and payment status",
      image: "/images/projects/praise-fashion/order-confirmation.png",
      path: "views/order-confirmation.html"
    },
    {
      title: "Gallery",
      desc: "Fashion collection showcase with image grid",
      image: "/images/projects/praise-fashion/gallery.png",
      path: "views/gallery.html"
    }
  ];

  const openModal = (image: Screenshot, index: number) => {
    setSelectedImage(image);
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
              Production • Client Project
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Praise Fashion Hub
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-8">
            Full-Stack E-Commerce Platform for Fashion Retail
          </p>

          <p className="text-xl text-gray-400 max-w-4xl leading-relaxed mb-12">
            A comprehensive e-commerce solution built for a fashion retail business specializing in African fabrics and ready-made garments.
            Features complete Paystack payment integration, automated receipt generation (PDF & JPG), real-time inventory management,
            image optimization with Sharp, and a powerful admin dashboard. Built with vanilla JavaScript frontend and Express.js backend,
            containerized with Docker for seamless deployment.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">Timeline</p>
              <p className="text-2xl font-bold text-white">3 weeks</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">Architecture</p>
              <p className="text-2xl font-bold text-white">Vanilla JS + Express</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">Status</p>
              <p className="text-2xl font-bold text-white">Live in Production</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
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

      <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Technology Stack
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

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Project Screenshots
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {screenshots.map((shot, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-500 transition-all duration-300 hover:scale-105 group cursor-pointer"
                onClick={() => openModal(shot, idx)}
              >
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={shot.image}
                    alt={shot.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={handleImageError}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center">
                    <Package className="w-16 h-16 text-purple-300" />
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
              <p className="text-4xl font-bold text-green-400 mb-2">14</p>
              <p className="text-sm text-gray-300">Pages Built</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-blue-400 mb-2">100%</p>
              <p className="text-sm text-gray-300">Payment Success</p>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-purple-400 mb-2">8</p>
              <p className="text-sm text-gray-300">API Routes</p>
            </div>
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-orange-400 mb-2">Auto</p>
              <p className="text-sm text-gray-300">Image Optimization</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Technical Achievements</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span>Integrated Paystack payment gateway with webhook verification for secure transactions</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span>Built custom image processing pipeline with Sharp generating thumbnails and full-size versions</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span>Implemented automated email system with custom HTML templates for order updates</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span>Deployed with Docker for consistent development and production environments</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span>Created pickup station system with delivery cost calculation for Nigerian locations</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span>Built with vanilla JavaScript for optimal performance and minimal dependencies</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Need an E-Commerce Solution?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            I build custom e-commerce platforms with payment integration, inventory management, and more.
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

export default PraiseFashion;