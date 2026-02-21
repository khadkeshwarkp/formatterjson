'use client';

import { useEffect } from 'react';
import { useWorkspaceStore } from '@/lib/store';

const SHORTCUTS = [
  { keys: 'Ctrl + Enter', action: 'Run current tool' },
  { keys: 'Ctrl + Shift + M', action: 'Minify JSON (JSON tools)' },
  { keys: '?', action: 'Show keyboard shortcuts' },
  { keys: 'Ctrl + B', action: 'Toggle sidebar' },
  { keys: 'Ctrl + Shift + F', action: 'Toggle fullscreen' },
  { keys: 'Ctrl + K', action: 'Focus search' },
];

export default function KeyboardShortcutsModal() {
  const show = useWorkspaceStore((s) => s.showShortcutsModal);
  const setShow = useWorkspaceStore((s) => s.setShowShortcutsModal);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && show) {
        setShow(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [show, setShow]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setShow(false)}
    >
      <div
        className="bg-dt-surface border border-dt-border rounded-xl shadow-2xl w-[420px] max-w-[90vw] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-dt-text">Keyboard Shortcuts</h2>
          <button
            onClick={() => setShow(false)}
            className="text-dt-text-dim hover:text-dt-text text-lg"
          >
            ✕
          </button>
        </div>
        <div className="space-y-2">
          {SHORTCUTS.map((s) => (
            <div
              key={s.keys}
              className="flex items-center justify-between py-2 border-b border-dt-border last:border-0"
            >
              <span className="text-sm text-dt-text-muted">{s.action}</span>
              <kbd className="bg-dt-bg px-2 py-1 rounded text-xs font-mono text-dt-text border border-dt-border">
                {s.keys}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
