import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { playDepartureSound, playCopySound } from '../utils/sfx';

interface DepartureRequest {
  url: string;
  name?: string;
}

export const DepartureModal: React.FC = () => {
  const [request, setRequest] = useState<DepartureRequest | null>(null);
  const continueRef = useRef<HTMLAnchorElement>(null);

  const closeModal = useCallback(() => {
    setRequest(null);
  }, []);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = (e.target as Element)?.closest?.('a');
      if (!target) return;

      // Never intercept links explicitly marked as allowed (e.g. the Continue button)
      if (
        target.hasAttribute('data-departure-allow') ||
        target.closest('[data-departure-allow]')
      ) {
        return;
      }

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore in-page anchors, relative paths, mailto, tel, javascript:
      if (
        href.startsWith('#') ||
        href.startsWith('/') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      // Check if domain is external to thgenius.xyz
      try {
        const urlObj = new URL(href, window.location.href);
        const currentHostname = window.location.hostname;

        // Allow links on current host or within the thgenius.xyz ecosystem
        const isEcosystem =
          urlObj.hostname === currentHostname ||
          urlObj.hostname === 'thgenius.xyz' ||
          urlObj.hostname.endsWith('.thgenius.xyz');

        if (isEcosystem) {
          return;
        }

        // Intercept external navigation
        e.preventDefault();
        e.stopPropagation();

        playDepartureSound();
        setRequest({
          url: urlObj.href,
          name: target.getAttribute('aria-label') || target.textContent?.trim() || urlObj.hostname
        });
      } catch {
        // Let browser handle standard navigation if URL parsing fails
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
        if (continueRef.current) {
          continueRef.current.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [request, closeModal]);

  if (!request) return null;

  const kbd = 'font-mono text-[10px] leading-none px-1.5 py-0.5 rounded-[4px] border';

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="departure-title"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
          <h3
            id="departure-title"
            className="text-sm font-semibold text-neutral-900 dark:text-neutral-100"
          >
            Leaving thgenius.xyz
          </h3>
          <button
            onClick={closeModal}
            className="p-1 -mr-1 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Cancel Departure"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            This link navigates to an external destination outside the thgenius.xyz network:
          </p>

          <div className="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-800 dark:text-neutral-200 break-all select-all">
            <span className="truncate">{request.url}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
          <button
            onClick={closeModal}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <span>Stay here</span>
            <kbd className={`${kbd} border-neutral-300 dark:border-neutral-700 text-neutral-500`}>Esc</kbd>
          </button>
          <a
            ref={continueRef}
            href={request.url}
            target="_blank"
            rel="noopener noreferrer"
            data-departure-allow="true"
            onClick={() => {
              playCopySound();
              closeModal();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-950 text-xs font-medium transition-colors cursor-pointer"
          >
            <span>Continue</span>
            <kbd className={`${kbd} border-white/30 dark:border-neutral-950/30 text-white/70 dark:text-neutral-950/60`}>Enter</kbd>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DepartureModal;
