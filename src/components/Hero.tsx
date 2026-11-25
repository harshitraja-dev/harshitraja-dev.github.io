import { lazy, Suspense } from 'react';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { EMAIL, LINKS, RESUME_URL } from './ui';

const BuildingCanvas = lazy(() => import('./BuildingCanvas'));

const stats = [
  { value: '4+', label: 'years shipping software' },
  { value: '40%', label: 'faster 3D model loads' },
  { value: 'AECOM · Autodesk', label: 'client proofs of concept' },
  { value: '20+', label: 'projects built' },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="wrap relative grid min-h-[calc(100svh-4rem)] items-center gap-8 py-10 lg:grid-cols-[1.05fr_1fr]">
        {/* 3D viewport */}
        <div className="pointer-events-none absolute inset-0 opacity-40 lg:pointer-events-auto lg:relative lg:order-2 lg:h-[560px] lg:opacity-100">
          <div className="ticks absolute inset-0 rounded-xl lg:border lg:border-line/70 lg:bg-panel/30">
            <Suspense fallback={null}>
              <BuildingCanvas />
            </Suspense>
            <div className="pointer-events-none absolute left-4 top-4 hidden font-mono text-[10px] uppercase tracking-widest text-muted lg:block">
              viewport · perspective
            </div>
            <div className="pointer-events-none absolute bottom-4 right-4 hidden text-right font-mono text-[10px] uppercase tracking-widest text-muted lg:block">
              IfcBuilding · 8 storeys
              <br />
              <span className="text-amber">● section plane</span>
            </div>
          </div>
        </div>

        {/* copy */}
        <div className="relative z-10 lg:order-1">
          <p className="label mb-6">
            Software Engineer <span className="text-muted">/</span> 3D &amp; BIM <span className="text-muted">/</span> GenAI
          </p>
          <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Harshit Raja
          </h1>
          <p className="mt-5 max-w-xl font-display text-2xl leading-snug text-fg sm:text-3xl">
            I turn buildings into data, and data into answers
            <span className="ml-1 inline-block h-7 w-[3px] translate-y-1 animate-blink bg-amber align-baseline" aria-hidden="true" />
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Full-stack engineer working in <span className="text-fg">C#/.NET, React and Angular</span>. I build 3D viewers,
            BIM automation and LLM features on <span className="text-fg">Autodesk Platform Services</span>, Three.js and IFC.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-primary">
              See my work <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href={RESUME_URL} download className="btn-ghost">
              <Download size={16} aria-hidden="true" /> Résumé
            </a>
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: LINKS.github, icon: Github, label: 'GitHub' },
                { href: LINKS.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${EMAIL}`, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-lg text-muted transition-colors hover:bg-panel hover:text-cyan"
                >
                  <Icon size={19} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* stats strip */}
      <div className="border-y border-line bg-panel/60 backdrop-blur-sm">
        <dl className="wrap grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-6 md:px-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-2xl font-semibold text-white md:text-3xl">{s.value}</dd>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
