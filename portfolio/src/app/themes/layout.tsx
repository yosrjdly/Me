import type { Metadata } from 'next';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: 'Portfolio Theme Experience',
  description: 'Experience different UI metaphors for my portfolio',
};

export default function ThemesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="themes-container">
      {children}
    </div>
  )
}
