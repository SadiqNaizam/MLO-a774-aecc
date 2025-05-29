import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  title?: string; // Optional: To be passed to the Header component
  className?: string; // Optional: for the root div of MainAppLayout
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, title, className }) => {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <Sidebar />
      <Header title={title} />
      {/* 
        Main content area configuration based on Layout Requirements:
        - Sidebar: fixed, w-64 (16rem)
        - Header: fixed, h-[70px], left-64
        - Main Content: ml-64 (to clear sidebar), mt-[70px] (to clear header),
                        p-6 (internal padding), min-w-0, overflow-y-auto (for scrolling),
                        and h-[calc(100vh_-_70px)] to correctly manage its own scrollbar.
      */}
      <main className={cn(
        "ml-64 mt-[70px] p-6 min-w-0 overflow-y-auto h-[calc(100vh_-_70px)]"
      )}>
        {/* 
          Inner container for content layout as per mainContent.container: "flex flex-col gap-6"
        */}
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
