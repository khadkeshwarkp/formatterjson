'use client';

import { useWorkspaceStore } from '@/lib/store';

export default function ToastContainer() {
  const toasts = useWorkspaceStore((s) => s.toasts);
  const removeToast = useWorkspaceStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9998] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium animate-[slideIn_0.2s_ease-out] ${
            toast.type === 'success'
              ? 'bg-dt-success/20 text-dt-success border border-dt-success/30'
              : 'bg-dt-error/20 text-dt-error border border-dt-error/30'
          }`}
        >
          <span>{toast.type === 'success' ? '✓' : '✕'}</span>
          <span>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 opacity-60 hover:opacity-100 text-xs"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
