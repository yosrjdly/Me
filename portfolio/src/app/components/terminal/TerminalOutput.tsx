'use client';

import React from 'react';
import { CommandResult } from './CommandRegistry';

interface TerminalOutputProps {
  result: CommandResult;
}

export default function TerminalOutput({ result }: TerminalOutputProps) {
  if (!result.output) return null;

  // Handle different types of output
  if (result.isError) {
    return (
      <div className="terminal-error text-terminal-red">
        {result.output}
      </div>
    );
  }

  if (result.isHTML) {
    return (
      <div 
        className="terminal-output"
        dangerouslySetInnerHTML={{ __html: result.output as string }} 
      />
    );
  }

  return (
    <div className="terminal-output">
      {result.output}
    </div>
  );
} 