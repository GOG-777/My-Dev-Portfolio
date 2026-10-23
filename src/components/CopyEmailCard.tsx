import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { playCopySound } from '../utils/sfx';

export const CopyEmailCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "contact@thgenius.xyz";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      playCopySound();
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div
      onClick={handleCopy}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCopy();
        }
      }}
      className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 hover:border-neutral-400 dark:hover:border-neutral-700 flex items-center justify-between text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer group select-none"
    >
      <div className="flex items-center gap-3">
        {copied ? (
          <Check className="w-5 h-5 text-emerald-500 transition-transform scale-110 flex-shrink-0" />
        ) : (
          <Mail className="w-5 h-5 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
        )}
        <div>
          <div className="text-sm font-semibold flex items-center gap-2">
            <span>Direct Email</span>
            {copied && (
              <span className="text-[11px] font-mono text-emerald-500 dark:text-emerald-400 font-normal">
                copied ⚡
              </span>
            )}
          </div>
          <div className="text-xs font-mono text-neutral-500">
            {email}
          </div>
        </div>
      </div>

      <div className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
        {copied ? (
          <span className="text-xs font-mono text-emerald-500">done</span>
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </div>
    </div>
  );
};

export default CopyEmailCard;
