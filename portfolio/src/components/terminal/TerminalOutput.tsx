'use client';

import React from 'react';
import { CommandResult } from './CommandRegistry';

interface TerminalOutputProps {
  result: CommandResult;
}

export default function TerminalOutput({ result }: TerminalOutputProps) {
  if (!result.output) return null;
  
  // For HTML output
  if (result.isHTML) {
    return (
      <div 
        className={`pl-4 ${result.isError ? 'text-red-500' : ''}`}
        dangerouslySetInnerHTML={{ __html: result.output as string }}
      />
    );
  }
  
  // For text output
  return (
    <div className={`pl-4 whitespace-pre-wrap break-words ${result.isError ? 'text-red-500' : ''}`}>
      {result.output}
    </div>
  );
} 