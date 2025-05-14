'use client';

import React from 'react';

interface TerminalOutputProps {
  output: string | React.ReactNode;
  isHTML?: boolean;
  isError?: boolean;
}

export default function TerminalOutput({ output, isHTML = false, isError = false }: TerminalOutputProps) {
  if (!output) return null;
  
  // For HTML output
  if (isHTML) {
    return (
      <div 
        className={`pl-4 ${isError ? 'text-terminal-red' : ''}`}
        dangerouslySetInnerHTML={{ __html: output as string }}
      />
    );
  }
  
  // For text output
  return (
    <div className={`pl-4 whitespace-pre-wrap break-words ${isError ? 'text-terminal-red' : ''}`}>
      {output}
    </div>
  );
} 