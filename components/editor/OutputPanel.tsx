'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useWorkspaceStore } from '@/lib/store';
import { copyToClipboard, downloadText } from '@/lib/utils';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface OutputPanelProps {
  toolId: string;
  error?: string | null;
  outputLanguage?: string;
}

export default function OutputPanel({ toolId, error, outputLanguage = 'json' }: OutputPanelProps) {
  const output = useWorkspaceStore((s) => s.toolData[toolId]?.output ?? '');
  const setOutput = useWorkspaceStore((s) => s.setOutput);
  const addToast = useWorkspaceStore((s) => s.addToast);
  const theme = useWorkspaceStore((s) => s.theme);
  const [copied, setCopied] = useState(false);
  const [treeView, setTreeView] = useState(false);

  const canTreeView = outputLanguage === 'json' && !error;
  const isXml = outputLanguage === 'xml';

  const parsedTree = useMemo(() => {
    if (!canTreeView || !treeView || !output) return null;
    try {
      return JSON.parse(output);
    } catch {
      return null;
    }
  }, [canTreeView, treeView, output]);

  const handleCopy = async () => {
    const ok = await copyToClipboard(output);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const extMap: Record<string, string> = {
      xml: 'xml',
      text: 'txt',
      csv: 'csv',
      yaml: 'yaml',
      html: 'html',
      json: 'json',
    };
    const ext = extMap[outputLanguage] ?? 'json';
    downloadText(output, `output.${ext}`);
  };

  const handleMinifyXml = () => {
    if (!output) return;
    const minified = output.replace(/>\s+</g, '><').replace(/\n\s*/g, '').trim();
    setOutput(toolId, minified);
    addToast('XML minified', 'success');
  };

  const handleFormatXml = () => {
    if (!output) return;
    // Simple XML formatter: add indentation
    let formatted = '';
    let indent = 0;
    const parts = output.replace(/>\s*</g, '>\n<').split('\n');
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith('</')) indent = Math.max(0, indent - 1);
      formatted += '  '.repeat(indent) + trimmed + '\n';
      if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.startsWith('<?') && !trimmed.endsWith('/>') && !trimmed.includes('</')) {
        indent++;
      }
    }
    setOutput(toolId, formatted.trimEnd());
    addToast('XML formatted', 'success');
  };

  // Determine Monaco language for output
  const monacoLang =
    isXml ? 'xml'
    : outputLanguage === 'text' ? 'plaintext'
    : outputLanguage === 'yaml' ? 'yaml'
    : outputLanguage === 'html' ? 'html'
    : 'json';

  return (
    <div className="flex flex-col h-full bg-dt-bg">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 h-9 bg-dt-surface border-b border-dt-border shrink-0">
        <span className="text-xs text-dt-text-muted mr-auto">Output</span>
        {isXml && output && (
          <>
            <button
              onClick={handleFormatXml}
              className="text-xs text-dt-text-muted hover:text-dt-text px-2 py-0.5 bg-dt-bg rounded transition-colors"
            >
              Format
            </button>
            <button
              onClick={handleMinifyXml}
              className="text-xs text-dt-text-muted hover:text-dt-text px-2 py-0.5 bg-dt-bg rounded transition-colors"
            >
              Minify
            </button>
          </>
        )}
        {canTreeView && (
          <button
            onClick={() => setTreeView(!treeView)}
            className={`text-xs px-2 py-0.5 rounded transition-colors ${
              treeView
                ? 'bg-dt-accent text-white'
                : 'text-dt-text-muted hover:text-dt-text bg-dt-bg'
            }`}
          >
            Tree
          </button>
        )}
        <button
          onClick={handleCopy}
          disabled={!output}
          className="text-xs text-dt-text-muted hover:text-dt-text disabled:opacity-30 px-2 py-0.5 bg-dt-bg rounded"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <button
          onClick={handleDownload}
          disabled={!output}
          className="text-xs text-dt-text-muted hover:text-dt-text disabled:opacity-30 px-2 py-0.5 bg-dt-bg rounded"
        >
          Download
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0">
        {error ? (
          <div className="p-3 text-dt-error whitespace-pre-wrap font-mono text-sm">{error}</div>
        ) : treeView && parsedTree !== null ? (
          <div className="overflow-auto h-full p-3 font-mono text-sm">
            <TreeNode data={parsedTree} label="root" depth={0} />
          </div>
        ) : (
          <Editor
            height="100%"
            language={monacoLang}
            value={output}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            options={{
              readOnly: true,
              fontFamily: 'Fira Code, JetBrains Mono, Consolas, monospace',
              fontSize: 14,
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              tabSize: 2,
              wordWrap: 'on',
              padding: { top: 8 },
              lineNumbersMinChars: 3,
              renderLineHighlight: 'none',
              domReadOnly: true,
            }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Recursive Tree View ─────────────────────────────────────────
function TreeNode({
  data,
  label,
  depth,
}: {
  data: unknown;
  label: string;
  depth: number;
}) {
  const [expanded, setExpanded] = useState(depth < 2);

  if (data === null) {
    return (
      <div style={{ paddingLeft: depth * 16 }} className="flex items-center gap-1 py-0.5">
        <span className="text-dt-accent">{label}:</span>
        <span className="text-dt-text-dim">null</span>
      </div>
    );
  }

  if (typeof data !== 'object') {
    const color =
      typeof data === 'string'
        ? 'text-green-400'
        : typeof data === 'number'
          ? 'text-pink-400'
          : typeof data === 'boolean'
            ? 'text-yellow-400'
            : 'text-dt-text';
    return (
      <div style={{ paddingLeft: depth * 16 }} className="flex items-center gap-1 py-0.5">
        <span className="text-dt-accent">{label}:</span>
        <span className={color}>
          {typeof data === 'string' ? `"${data}"` : String(data)}
        </span>
      </div>
    );
  }

  const entries = Array.isArray(data)
    ? data.map((v, i) => [String(i), v] as const)
    : Object.entries(data);
  const bracket = Array.isArray(data) ? ['[', ']'] : ['{', '}'];

  return (
    <div style={{ paddingLeft: depth * 16 }}>
      <div
        className="flex items-center gap-1 py-0.5 cursor-pointer hover:bg-dt-surface/50 rounded"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-dt-text-dim text-[10px] w-3">{expanded ? '▼' : '▶'}</span>
        <span className="text-dt-accent">{label}:</span>
        <span className="text-dt-text-dim text-xs">
          {bracket[0]} {entries.length} {entries.length === 1 ? 'item' : 'items'} {bracket[1]}
        </span>
      </div>
      {expanded &&
        entries.map(([key, value]) => (
          <TreeNode key={key} data={value} label={key} depth={depth + 1} />
        ))}
    </div>
  );
}
