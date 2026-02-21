'use client';

import { useEffect, useCallback, useState, useRef, DragEvent } from 'react';
import { useWorkspaceStore } from '@/lib/store';
import { TOOL_MAP } from '@/lib/tools-registry';
import {
  formatJson,
  validateJson,
  minifyJson,
  jsonToXml,
  jsonToCsv,
  jsonToYaml,
  base64Encode,
  base64Decode,
  type ProcessResult,
} from '@/lib/processors';
import MonacoWrapper from './MonacoWrapper';
import OutputPanel from './OutputPanel';
import Toolbar from './Toolbar';
import KeyboardShortcutsModal from './KeyboardShortcutsModal';

interface ToolWorkspaceProps {
  toolId: string;
}

function getProcessor(toolId: string, base64Mode: 'encode' | 'decode') {
  switch (toolId) {
    case 'json-formatter': return formatJson;
    case 'json-validator': return validateJson;
    case 'json-minifier': return minifyJson;
    case 'json-to-xml': return jsonToXml;
    case 'base64': return base64Mode === 'encode' ? base64Encode : base64Decode;
    default: return formatJson;
  }
}

function getOutputLanguage(toolId: string): string {
  if (toolId === 'json-to-xml') return 'xml';
  if (toolId === 'base64') return 'text';
  if (toolId === 'json-validator') return 'text';
  return 'json';
}

function getInputLanguage(toolId: string): string {
  if (toolId === 'base64') return 'plaintext';
  return 'json';
}

// Multi-convert targets
const CONVERT_TARGETS = [
  { id: 'json-formatter', label: 'Format', processor: formatJson },
  { id: 'json-minifier', label: 'Minify', processor: minifyJson },
  { id: 'json-to-xml', label: 'XML', processor: jsonToXml },
  { id: 'json-to-csv', label: 'CSV', processor: jsonToCsv },
  { id: 'json-to-yaml', label: 'YAML', processor: jsonToYaml },
] as const;

export default function ToolWorkspace({ toolId }: ToolWorkspaceProps) {
  const tool = TOOL_MAP[toolId];
  const setOutput = useWorkspaceStore((s) => s.setOutput);
  const setInput = useWorkspaceStore((s) => s.setInput);
  const input = useWorkspaceStore((s) => s.toolData[toolId]?.input ?? '');
  const base64Mode = useWorkspaceStore((s) => s.base64Mode);
  const setBase64Mode = useWorkspaceStore((s) => s.setBase64Mode);
  const toggleSidebar = useWorkspaceStore((s) => s.toggleSidebar);
  const setShowShortcutsModal = useWorkspaceStore((s) => s.setShowShortcutsModal);
  const addToast = useWorkspaceStore((s) => s.addToast);

  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [splitPercent, setSplitPercent] = useState(50);
  const [isDragOver, setIsDragOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const runTool = useCallback(() => {
    setProcessing(true);
    setTimeout(() => {
      const processor = getProcessor(toolId, base64Mode);
      const result: ProcessResult = processor(input);
      setOutput(toolId, result.output);
      setError(result.error);
      if (result.error) addToast(result.error, 'error');
      setProcessing(false);
    }, 0);
  }, [toolId, input, base64Mode, setOutput, addToast]);

  // Auto-run on input change (debounced 1s)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) runTool();
    }, 300);
    return () => clearTimeout(timer);
  }, [input, runTool]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      // ? for shortcuts modal (only when not typing in input)
      if (e.key === '?' && !mod && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setShowShortcutsModal(true);
      }
      if (mod && e.key === 'Enter') {
        e.preventDefault();
        runTool();
      }
      if (mod && e.shiftKey && (e.key === 'M' || e.key === 'm')) {
        e.preventDefault();
        if (toolId.startsWith('json')) {
          const result = minifyJson(input);
          setOutput(toolId, result.output);
          setError(result.error);
        }
      }
      if (mod && (e.key === 'b' || e.key === 'B') && !e.shiftKey) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [runTool, toolId, input, setOutput, toggleSidebar, setShowShortcutsModal]);

  // Resizable split
  const onMouseDown = () => {
    dragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPercent(Math.min(80, Math.max(20, pct)));
    };
    const onMouseUp = () => {
      dragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // Drag-and-drop file upload
  const handleDragOver = (e: DragEvent) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (!file.name.match(/\.(json|txt|xml|csv)$/i)) {
      addToast('Only .json, .txt, .xml, .csv files supported', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setInput(toolId, text);
      addToast(`Loaded ${file.name}`, 'success');
    };
    reader.readAsText(file);
  };

  // Multi-convert handler
  const handleMultiConvert = (processor: (input: string) => ProcessResult) => {
    const result = processor(input);
    setOutput(toolId, result.output);
    setError(result.error);
    if (result.error) addToast(result.error, 'error');
  };

  if (!tool) return <div className="p-4 text-dt-error">Unknown tool: {toolId}</div>;

  const isJsonTool = toolId.startsWith('json');

  return (
    <div
      className="flex flex-col h-full relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-50 bg-dt-accent/10 border-2 border-dashed border-dt-accent rounded-lg flex items-center justify-center">
          <span className="text-lg font-semibold text-dt-accent">Drop file to load</span>
        </div>
      )}

      {/* Tool header bar */}
      <div className="flex items-center gap-3 px-4 h-10 bg-gradient-to-r from-dt-surface to-dt-bg border-b border-dt-border shrink-0 shadow-sm">
        <span className="font-mono text-xs text-dt-text-dim">{tool.icon}</span>
        <h1 className="text-sm font-semibold text-dt-text">{tool.name}</h1>

        {toolId === 'base64' && (
          <div className="flex items-center gap-1 ml-4">
            {(['encode', 'decode'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setBase64Mode(mode)}
                className={`text-xs px-2 py-0.5 rounded capitalize ${
                  base64Mode === mode
                    ? 'bg-dt-accent text-white'
                    : 'text-dt-text-muted bg-dt-bg hover:text-dt-text'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Toolbar */}
      <Toolbar toolId={toolId} onRun={runTool} processing={processing} />

      {/* Split panels */}
      <div ref={containerRef} className="flex flex-1 min-h-0">
        {/* Input editor */}
        <div style={{ width: `${splitPercent}%` }} className="min-w-0 shadow-[2px_0_8px_rgba(0,0,0,0.1)]">
          <MonacoWrapper toolId={toolId} language={getInputLanguage(toolId)} />
        </div>

        {/* Resizer */}
        <div className="resizer" onMouseDown={onMouseDown} />

        {/* Output panel */}
        <div style={{ width: `${100 - splitPercent}%` }} className="min-w-0">
          <OutputPanel toolId={toolId} error={error} outputLanguage={getOutputLanguage(toolId)} />
        </div>
      </div>

      {/* Multi-convert bar (for JSON tools) */}
      {isJsonTool && input && (
        <div className="flex items-center gap-2 px-3 h-9 bg-dt-surface border-t border-dt-border shrink-0">
          <span className="text-[10px] text-dt-text-dim uppercase tracking-wider mr-1">Convert to:</span>
          {CONVERT_TARGETS.map((t) => (
            <button
              key={t.id}
              onClick={() => handleMultiConvert(t.processor)}
              className="text-xs px-2.5 py-1 rounded bg-dt-bg border border-dt-border text-dt-text-muted hover:text-dt-text hover:border-dt-accent transition-colors"
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* Shortcuts modal */}
      <KeyboardShortcutsModal />
    </div>
  );
}
