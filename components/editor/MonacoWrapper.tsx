'use client';

import dynamic from 'next/dynamic';
import { useWorkspaceStore } from '@/lib/store';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface MonacoWrapperProps {
  toolId: string;
  language?: string;
  onChange?: (value: string) => void;
}

export default function MonacoWrapper({ toolId, language = 'json', onChange }: MonacoWrapperProps) {
  const theme = useWorkspaceStore((s) => s.theme);
  const input = useWorkspaceStore((s) => s.toolData[toolId]?.input ?? '');
  const setInput = useWorkspaceStore((s) => s.setInput);

  const handleChange = (value: string | undefined) => {
    const v = value ?? '';
    setInput(toolId, v);
    onChange?.(v);
  };

  return (
    <Editor
      height="100%"
      language={language}
      value={input}
      onChange={handleChange}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      options={{
        fontFamily: 'Fira Code, JetBrains Mono, Consolas, monospace',
        fontSize: 14,
        minimap: { enabled: false },
        bracketPairColorization: { enabled: true },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        tabSize: 2,
        wordWrap: 'on',
        padding: { top: 8 },
        lineNumbersMinChars: 3,
        renderLineHighlight: 'gutter',
      }}
    />
  );
}
