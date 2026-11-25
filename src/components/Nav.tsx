import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { RESUME_URL } from './ui';

const items = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-line bg-ink/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="wrap flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2 font-mono text-sm text-white">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-cyan/50 text-cyan transition-colors group-hover:bg-cyan group-hover:text-ink">
            HR
          </span>
          <span className="hidden sm:inline">harshit.raja</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((it, i) => (
            <li key={it.href}>
              <a href={it.href} className="rounded-md px-3 py-2 font-mono text-xs text-muted transition-colors hover:text-white">
                <span className="text-cyan">0{i + 1}.</span> {it.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a href={RESUME_URL} download className="btn-ghost !px-3 !py-1.5 text-xs">
              <Download size={14} aria-hidden="true" /> Résumé
            </a>
          </li>
        </ul>

        <button
          className="grid h-10 w-10 place-items-center rounded-md border border-line text-fg md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="wrap pb-5 md:hidden">
          <ul className="flex flex-col gap-1">
            {items.map((it, i) => (
              <li key={it.href}>
                <a
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 font-mono text-sm text-fg hover:bg-panel"
                >
                  <span className="text-cyan">0{i + 1}.</span> {it.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a href={RESUME_URL} download className="btn-primary w-full justify-center">
                <Download size={16} aria-hidden="true" /> Download résumé
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
