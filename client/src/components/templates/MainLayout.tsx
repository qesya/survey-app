import React, { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <main className={twMerge('w-full max-w-4xl bg-white shadow-md rounded-lg p-6', className)}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
