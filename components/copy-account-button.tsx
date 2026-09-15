'use client';

import { useState } from 'react';

type CopyAccountButtonProps = {
  account: string;
  className?: string;
};

export function CopyAccountButton({ account, className = 'copy-account' }: CopyAccountButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyAccount() {
    const compactAccount = account.replace(/\s/g, '');
    try {
      await navigator.clipboard.writeText(compactAccount);
    } catch {
      const input = document.createElement('textarea');
      input.value = compactAccount;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.append(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return <button type="button" className={className} onClick={copyAccount} aria-live="polite">
    {copied ? 'Skopiowano numer konta ✓' : 'Kopiuj numer konta'}
  </button>;
}
