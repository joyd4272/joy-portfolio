"use client";

import { useState } from "react";
import { nav } from "@/data/portfolio";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-[var(--border)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center text-foreground" aria-label="Joy Das — home">
          <Logo className="h-8 w-auto text-foreground" />
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link text-foreground/90 hover:text-foreground"
            >
              <span aria-hidden className="nav-link__bracket nav-link__bracket--left">
                [
              </span>
              <span className="nav-link__text">
                <span>{item.label}</span>
                <span className="is-clone" aria-hidden>
                  {item.label}
                </span>
              </span>
              <span aria-hidden className="nav-link__bracket nav-link__bracket--right">
                ]
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="cta-status inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            <span className="relative flex h-2 w-2 cta-status__dot">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="hidden sm:inline">Available for work</span>
            <span className="sm:hidden">Available</span>
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 3L13 13M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path
                  d="M3 6H15M3 12H15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-background">
          <nav className="mx-auto max-w-6xl px-5 py-3 flex flex-col">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground/90"
              >
                <span className="text-foreground-soft mr-1">[</span>
                {item.label}
                <span className="text-foreground-soft ml-1">]</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
