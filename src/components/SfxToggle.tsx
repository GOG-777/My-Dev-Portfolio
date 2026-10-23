import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { isSfxEnabled, setSfxEnabled, playCopySound } from '../utils/sfx';

export const SfxToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isSfxEnabled());

    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<{ enabled: boolean }>;
      if (custom.detail) {
        setEnabled(custom.detail.enabled);
      }
    };

    window.addEventListener('sfx-status-changed', handleSync);
    return () => window.removeEventListener('sfx-status-changed', handleSync);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    setSfxEnabled(next);
    if (next) {
      playCopySound();
    }
  };

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label={`Turn sound effects ${enabled ? 'off' : 'on'}`}
      title={`SFX ${enabled ? 'Enabled' : 'Muted'}`}
      className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400"
    >
      {enabled ? (
        <Volume2 className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
      ) : (
        <VolumeX className="w-4 h-4 text-neutral-400 dark:text-neutral-600" />
      )}
    </button>
  );
};

export default SfxToggle;
