'use client';

import dynamic from 'next/dynamic';
import { useWorkspaceStore } from '@/lib/store';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface MonacoWrapperProps {
  toolId: string;
  language?: string;
  onChange?: (value: string) => void;
  /** For dual-input tools (e.g. json-diff): bind to second input */
  variant?: 'left' | 'right';
}

export default function MonacoWrapper({ toolId, language = 'json', onChange, variant = 'left' }: MonacoWrapperProps) {
  const theme = useWorkspaceStore((s) => s.theme);
  const toolData = useWorkspaceStore((s) => s.toolData[toolId]);
  const setInput = useWorkspaceStore((s) => s.setInput);
  const setInput2 = useWorkspaceStore((s) => s.setInput2);
  const value = variant === 'right' ? (toolData?.input2 ?? '') : (toolData?.input ?? '');
  const setValue = variant === 'right' ? setInput2 : setInput;

  const handleChange = (val: string | undefined) => {
    const v = val ?? '';
    setValue(toolId, v);
    onChange?.(v);
  };

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
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
