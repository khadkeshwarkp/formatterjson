'use client';

import Sidebar from './Sidebar';
import TabBar from './TabBar';
import ToastContainer from './ToastContainer';

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen bg-dt-bg text-dt-text overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TabBar />
        <main className="flex-1 min-h-0 overflow-hidden">{children}</main>
      </div>
      <ToastContainer />
    </div>
  );
}
