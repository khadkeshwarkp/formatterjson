'use client';

import { useWorkspaceStore } from '@/lib/store';
import { TOOL_MAP } from '@/lib/tools-registry';
import { copyToClipboard } from '@/lib/utils';

interface ToolbarProps {
  toolId: string;
  onRun: () => void;
  processing: boolean;
}

export default function Toolbar({ toolId, onRun, processing }: ToolbarProps) {
  const tool = TOOL_MAP[toolId];
  const input = useWorkspaceStore((s) => s.toolData[toolId]?.input ?? '');
  const setInput = useWorkspaceStore((s) => s.setInput);
  const clearInput = useWorkspaceStore((s) => s.clearInput);
  const addToast = useWorkspaceStore((s) => s.addToast);
  const setShowShortcutsModal = useWorkspaceStore((s) => s.setShowShortcutsModal);

  const handleLoadSample = () => {
    if (tool?.sampleInput) {
      setInput(toolId, tool.sampleInput);
      addToast('Sample data loaded', 'success');
    }
  };

  const handleCopyInput = async () => {
    if (!input) return;
    const ok = await copyToClipboard(input);
    addToast(ok ? 'Input copied' : 'Copy failed', ok ? 'success' : 'error');
  };

  const handleClear = () => {
    clearInput(toolId);
    addToast('Cleared', 'success');
  };

  return (
    <div className="flex items-center gap-1.5 px-3 h-9 bg-dt-surface/80 backdrop-blur border-b border-dt-border shrink-0">
      {/* Run */}
      <button
        onClick={onRun}
        disabled={processing}
        className="flex items-center gap-1 text-xs bg-dt-accent hover:bg-dt-accent-hover disabled:opacity-50 text-white px-2.5 py-1 rounded transition-colors"
        title="Run (Ctrl+Enter)"
      >
        {processing ? (
          <span className="animate-spin">⟳</span>
        ) : (
          <span>▶</span>
        )}
        Run
      </button>

      <div className="w-px h-4 bg-dt-border" />

      {/* Load Sample */}
      <button
        onClick={handleLoadSample}
        className="text-xs text-dt-text-muted hover:text-dt-text px-2 py-1 rounded hover:bg-dt-bg transition-colors"
        title="Load sample data"
      >
        📋 Sample
      </button>

      {/* Clear */}
      <button
        onClick={handleClear}
        className="text-xs text-dt-text-muted hover:text-dt-text px-2 py-1 rounded hover:bg-dt-bg transition-colors"
        title="Clear input and output"
      >
        ✕ Clear
      </button>

      {/* Copy Input */}
      <button
        onClick={handleCopyInput}
        disabled={!input}
        className="text-xs text-dt-text-muted hover:text-dt-text disabled:opacity-30 px-2 py-1 rounded hover:bg-dt-bg transition-colors"
        title="Copy input to clipboard"
      >
        ⎘ Copy
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Shortcuts hint */}
      <button
        onClick={() => setShowShortcutsModal(true)}
        className="text-[10px] text-dt-text-dim hover:text-dt-text-muted px-1.5 py-0.5 rounded border border-dt-border hover:border-dt-text-dim transition-colors"
        title="Keyboard shortcuts (?)"
      >
        ⌘ ?
      </button>
    </div>
  );
}
