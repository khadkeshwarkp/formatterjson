'use client';

import { useEffect, useState } from 'react';
import { useWorkspaceStore } from '@/lib/store';
import WorkspaceShell from '@/components/layout/WorkspaceShell';
import ToolWorkspace from '@/components/editor/ToolWorkspace';
import ToolSEOContent from '@/components/seo/ToolSEOContent';

interface ToolPageProps {
  toolId: string;
}

export default function ToolPage({ toolId }: ToolPageProps) {
  const openTab = useWorkspaceStore((s) => s.openTab);
  const activeTool = useWorkspaceStore((s) => s.activeTool);
  const [hasMounted, setHasMounted] = useState(false);

  // Sync URL → store on mount
  useEffect(() => {
    openTab(toolId);
    setHasMounted(true);
  }, [toolId, openTab]);

  // SSR: use toolId (matches URL, correct for Googlebot)
  // Client after mount: use activeTool (supports tab switching)
  const displayToolId = hasMounted ? activeTool : toolId;

  return (
    <WorkspaceShell>
      <div className="flex flex-col h-full">
        <div className="flex-1 min-h-0">
          <ToolWorkspace toolId={displayToolId} />
        </div>
        <div className="overflow-y-auto border-t border-dt-border bg-dt-bg max-h-[40vh]">
          <ToolSEOContent toolId={toolId} />
        </div>
      </div>
    </WorkspaceShell>
  );
}
