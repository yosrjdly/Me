import React from 'react';
import './terminal-styles.css';

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-terminal">
      {children}
    </div>
  );
} 