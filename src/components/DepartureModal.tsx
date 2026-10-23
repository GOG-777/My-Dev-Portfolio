import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight, X, ShieldAlert, Check } from 'lucide-react';
import { playDepartureSound, playCopySound } from '../utils/sfx';

interface DepartureRequest {
  url: string;
  name?: string;
}

export const DepartureModal: React.FC = () => {
  const [request, setRequest] = useState<DepartureRequest | null>(null);
  const [dontAskAgain, setDontAskAgain] = useState(false);

  const closeModal = useCallback(() => {
    setRequest(null);
  }, []);

  const proceed = useCallback(() => {
    if (!request) return;
    playCopySound();

    if (dontAskAgain && typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('skip_departure_warning', 'true');
    }

    const targetUrl = request.url;
    closeModal();
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }, [request, dontAskAgain, closeModal]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore internal anchors, mailto, tel, or internal routes
      if (
        href.startsWith('#') ||
        href.startsWith('/') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return;
      }

      // Check if domain is external
      try {
        const urlObj = new URL(href, window.location.origin);
        const currentHostname = window.location.hostname;

        // If internal to domain, allow
        if (
          urlObj.hostname === currentHostname ||
          urlObj.hostname.endsWith('thgenius.xyz')
        ) {
          return;
        }

        // Check if user disabled prompt for this session
        if (sessionStorage.getItem('skip_departure_warning') === 'true') {
          return;
        }

        // Intercept navigation
        e.preventDefault();
        e.stopPropagation();

        playDepartureSound();
        setRequest({
          url: href,
          name: target.innerText?.trim() || urlObj.hostname
        });
      } catch {
        // invalid URL format, let browser handle
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true });
  }, []);

  // Keyboard navigation (Esc to close, Enter to proceed)
  useEffect(() => {
    if (!request) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        proceed();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [request, closeModal, proceed]);

  if (!request) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="departure-title"
    >
      <div 
        className="w-full max-w-md rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
              <ShieldAlert className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 id="departure-title" className="text-base font-bold text-neutral-950 dark:text-white">
                Departing thgenius.xyz
              </h3>
              <p className="text-xs text-neutral-500">
                External Link Interceptor
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Cancel Departure"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3 mb-6">
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            You are about to leave the thgenius.xyz network to an external service:
          </p>

          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 font-mono text-xs text-neutral-700 dark:text-neutral-300 break-all select-all flex items-center justify-between gap-2">
            <span>{request.url}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors select-none">
            <input
              type="checkbox"
              checked={dontAskAgain}
              onChange={(e) => setDontAskAgain(e.target.checked)}
              className="rounded border-neutral-300 dark:border-neutral-700 text-purple-600 focus:ring-purple-500"
            />
            <span>Do not ask again this session</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <button
            onClick={closeModal}
            type="button"
            className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            Stay Here (Esc)
          </button>
          <button
            onClick={proceed}
            type="button"
            className="px-4 py-2 rounded-lg bg-neutral-950 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-950 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
          >
            <span>Proceed to Link</span>
            <Check className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartureModal;
