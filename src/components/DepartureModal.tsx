import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
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

  const kbd =
  'font-mono text-[10px] leading-none px-1 py-0.5 rounded-[4px] border';

  return (
    <div
    className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4 animate-in fade-in duration-150"
    role="dialog"
    aria-modal="true"
    aria-labelledby="departure-title"
    >
    <div
    className="w-full max-w-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xl"
    onClick={(e) => e.stopPropagation()}
    >
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
    <h3
    id="departure-title"
    className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
    >
    Leaving thgenius.xyz
    </h3>
    <button
    onClick={closeModal}
    className="p-1 -mr-1 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    aria-label="Cancel Departure"
    >
    <X className="w-4 h-4" />
    </button>
    </div>

    {/* Content */}
    <div className="px-4 py-4 space-y-3">
    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
    This link opens a site we do not control.
    </p>

    <div className="flex items-center justify-between gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-800 dark:text-neutral-200 break-all select-all">
    <span>{request.url}</span>
    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
    </div>

    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors select-none">
    <input
    type="checkbox"
    checked={dontAskAgain}
    onChange={(e) => setDontAskAgain(e.target.checked)}
    className="w-3.5 h-3.5 rounded-[4px] border-neutral-300 dark:border-neutral-700 accent-neutral-900 dark:accent-neutral-100"
    />
    <span>Do not ask again this session</span>
    </label>
    </div>

    {/* Action Buttons */}
    <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">
    <button
    onClick={closeModal}
    type="button"
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
    >
    <span>Stay here</span>
    <kbd className={kbd + ' border-neutral-300 dark:border-neutral-700 text-neutral-500'}>Esc</kbd>
    </button>
    <button
    onClick={proceed}
    type="button"
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-950 text-xs font-medium transition-colors"
    >
    <span>Continue</span>
    <kbd className={kbd + ' border-white/30 dark:border-neutral-950/30 text-white/70 dark:text-neutral-950/60'}>Enter</kbd>
    </button>
    </div>
    </div>
    </div>
  );
};

export default DepartureModal;
