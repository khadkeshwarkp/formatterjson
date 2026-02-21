'use client';

import { useWorkspaceStore } from '@/lib/store';
import { TOOL_MAP } from '@/lib/tools-registry';

export default function TabBar() {
  const { openTabs, activeTool, setActiveTool, closeTab } = useWorkspaceStore();

  return (
    <div className="flex items-center h-9 bg-dt-surface border-b border-dt-border overflow-x-auto">
      {openTabs.map((id) => {
        const tool = TOOL_MAP[id];
        if (!tool) return null;
        const isActive = activeTool === id;

        return (
          <div
            key={id}
            className={`flex items-center gap-1 px-2 h-full text-xs border-r border-dt-border cursor-pointer select-none transition-colors shrink-0 ${
              isActive
                ? 'bg-dt-bg text-dt-text border-b-2 border-b-dt-accent'
                : 'bg-dt-tab text-dt-text-muted hover:bg-dt-surface'
            }`}
            onClick={() => {
              setActiveTool(id);
              window.history.pushState(null, '', tool.route);
            }}
          >
            <span className="font-mono text-[10px] w-5 text-center">{tool.icon}</span>
            <span>{tool.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(id);
              }}
              className="ml-1 text-dt-text-dim hover:text-dt-error text-[10px] leading-none"
              title="Close tab"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
