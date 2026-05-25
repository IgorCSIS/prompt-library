'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/framework/', label: 'Framework' },
  { href: '/library/', label: 'Library' },
  { href: '/exercises/', label: 'Exercises' },
  { href: '/scraped/', label: 'Scraped' },
  { href: '/about/', label: 'About' },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-border">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="h-7 w-7 rounded-md bg-accent text-bg font-bold font-mono flex items-center justify-center text-sm">
              M
            </div>
            <div className="absolute inset-0 rounded-md bg-accent/30 blur-md group-hover:bg-accent/50 transition-all -z-10" />
          </div>
          <span className="font-semibold text-fg tracking-tight">
            Prompt Library
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href || pathname?.startsWith(l.href.replace(/\/$/, '/'));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  active
                    ? 'text-fg bg-bg-subtle'
                    : 'text-fg-muted hover:text-fg hover:bg-bg-subtle/50'
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <button
          className="md:hidden btn-ghost h-9 w-9 !p-0"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border">
          <div className="container-page py-3 flex flex-col gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'px-3 py-2.5 text-sm font-medium rounded-md',
                    active ? 'text-fg bg-bg-subtle' : 'text-fg-muted'
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
