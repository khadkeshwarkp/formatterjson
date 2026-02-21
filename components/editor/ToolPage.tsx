'use client';

import { useEffect, useState } from 'react';
import LZString from 'lz-string';
import { useWorkspaceStore } from '@/lib/store';
import WorkspaceShell from '@/components/layout/WorkspaceShell';
import ToolWorkspace from '@/components/editor/ToolWorkspace';
import ToolSEOContent from '@/components/seo/ToolSEOContent';

interface ToolPageProps {
  toolId: string;
}

export default function ToolPage({ toolId }: ToolPageProps) {
  const openTab = useWorkspaceStore((s) => s.openTab);
  const setInput = useWorkspaceStore((s) => s.setInput);
  const addToast = useWorkspaceStore((s) => s.addToast);
  const activeTool = useWorkspaceStore((s) => s.activeTool);
  const [hasMounted, setHasMounted] = useState(false);

  // Sync URL → store on mount
  useEffect(() => {
    openTab(toolId);
    setHasMounted(true);
  }, [toolId, openTab]);

  // Decode ?data= share link on mount
  useEffect(() => {
    if (!hasMounted || typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (!data) return;
    try {
      const decompressed = LZString.decompressFromEncodedURIComponent(data);
      if (!decompressed || decompressed === '') {
        addToast('Invalid share link', 'error');
        return;
      }
      setInput(toolId, decompressed);
    } catch {
      addToast('Invalid share link', 'error');
    }
  }, [toolId, hasMounted, setInput, addToast]);

  // SEO: noindex when ?data= present (share links)
  useEffect(() => {
    if (!hasMounted || typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (!params.get('data')) return;
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, [hasMounted]);

  // SSR: use toolId (matches URL, correct for Googlebot)
  // Client after mount: use activeTool (supports tab switching)
  const displayToolId = hasMounted ? activeTool : toolId;

  return (
    <WorkspaceShell>
      <div className="flex flex-col h-full min-h-0 overflow-y-auto">
        <div className="flex-1 min-h-[calc(100vh-140px)] shrink-0">
          <ToolWorkspace toolId={displayToolId} />
        </div>
        <div className="shrink-0 border-t border-dt-border bg-dt-bg overflow-y-auto">
          <ToolSEOContent toolId={displayToolId} />
        </div>
      </div>
    </WorkspaceShell>
  );
}
