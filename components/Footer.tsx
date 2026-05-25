import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container-page py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="h-6 w-6 rounded bg-accent text-bg font-bold font-mono flex items-center justify-center text-xs">
              M
            </div>
            <span className="font-semibold tracking-tight">Prompt Library</span>
          </div>
          <p className="text-sm text-fg-muted leading-relaxed max-w-xs">
            A career-grade reference of prompts built on the 9-layer MASTER
            framework. Maintained, audited, and used in real work.
          </p>
        </div>

        <div>
          <h4 className="heading-eyebrow mb-3">Browse</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/framework/" className="text-fg-muted hover:text-fg">The MASTER Framework</Link></li>
            <li><Link href="/library/" className="text-fg-muted hover:text-fg">Saved Templates</Link></li>
            <li><Link href="/exercises/" className="text-fg-muted hover:text-fg">Completed Exercises</Link></li>
            <li><Link href="/scraped/" className="text-fg-muted hover:text-fg">Scraped Prompts</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="heading-eyebrow mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://github.com"
                className="text-fg-muted hover:text-fg inline-flex items-center gap-1.5"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={14} /> Source on GitHub
              </a>
            </li>
            <li>
              <Link href="/about/" className="text-fg-muted hover:text-fg">
                About this project
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page py-6 border-t border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <p className="text-xs text-fg-subtle font-mono">
          Built on the MASTER framework. Mission · Agent · Situation · Task · Examples · Rules · Think · Eval · Output
        </p>
        <p className="text-xs text-fg-subtle">
          © {new Date().getFullYear()} — by nifty
        </p>
      </div>
    </footer>
  );
}
