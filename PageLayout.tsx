import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function PageLayout({ children, title = "BOOK BUILDER PAGE" }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col">
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 px-6 py-3">
        <h1 className="text-lg font-semibold text-gray-700 uppercase tracking-wide">
          {title}
        </h1>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {children}
      </div>
    </div>
  );
}
