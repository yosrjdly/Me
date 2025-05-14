import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Main Portfolio Experience',
  description: 'The main portfolio experience',
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main-container">
      {children}
    </div>
  );
} 