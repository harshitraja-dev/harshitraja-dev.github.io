import { useMemo, useState } from 'react';
import { ArrowUpRight, Box, Brain, Check, Copy, Download, Github, GraduationCap, Layers, Linkedin, Mail } from 'lucide-react';
import { categories, projects, type Category, type Project } from '../data/projects';
import { education, experience } from '../data/experience';
import { logoBelt, skillGroups } from '../data/skills';
import { EMAIL, LINKS, RESUME_URL, Reveal, SectionHeader } from './ui';

/* ------------------------------------------------------------------ About */

const pillars = [
  {
    icon: Box,
    title: '3D & BIM',
    text: 'Autodesk Platform Services, Forge Viewer, Data Exchange GraphQL, Three.js and IFC. Viewers that stay fast with very large models.',
  },
  {
    icon: Brain,
    title: 'GenAI features',
    text: 'RAG, hybrid search and natural-language-to-query assistants that are built into real products, not standalone demos.',
  },
  {
    icon: Layers,
    title: 'Full-stack .NET',
    text: 'ASP.NET Core APIs, React and Angular front ends, WPF desktop tools, Docker and CI. From the database to the UI.',
  },
];

export function About() {
  return (
    <section id="about" className="wrap py-24 md:py-32">
      <SectionHeader index="01" kicker="About" title="Engineer for the built world.">
        I've spent 4+ years building software for architecture, engineering and construction (AEC) teams: 3D viewers, BIM
        data pipelines and AI assistants that answer questions about a building. I've led proofs of concept for AECOM and
        Autodesk and mentored the developers who joined after me.
      </SectionHeader>
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 90} className="panel ticks p-6">
            <p.icon className="mb-5 text-cyan" size={26} aria-hidden="true" />
            <h3 className="text-lg font-semibold text-white">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Experience */

export function Experience() {
  return (
    <section id="experience" className="wrap py-24 md:py-32">
      <SectionHeader index="02" kicker="Experience" title="Where I've worked." />
      <ol className="relative border-l border-line pl-6 md:pl-10">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.title + job.period} delay={i * 80} className="relative mb-12 last:mb-0">
            <span className="absolute -left-[31px] top-1.5 h-3 w-3 rotate-45 border border-cyan bg-ink md:-left-[47px]" aria-hidden="true" />
            <p className="font-mono text-xs text-amber">{job.period}</p>
            <h3 className="mt-1 text-xl font-semibold text-white">
              {job.title} <span className="font-normal text-muted">· {job.company}</span>
            </h3>
            <ul className="mt-4 space-y-2.5">
              {job.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-fg/90">
                  <span className="mt-2.5 h-px w-3 shrink-0 bg-cyan" aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="panel mt-14 flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
        <GraduationCap className="shrink-0 text-cyan" size={28} aria-hidden="true" />
        <div className="flex-1">
          <h3 className="font-semibold text-white">{education.degree}</h3>
          <p className="text-sm text-muted">{education.school}</p>
        </div>
        <p className="font-mono text-xs text-muted">
          {education.period} · <span className="text-amber">{education.score}</span>
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------- Work */

function FeaturedCard({ p, i }: { p: Project; i: number }) {
  return (
    <Reveal delay={(i % 2) * 90} className="panel ticks group flex flex-col p-6 transition-colors hover:border-cyan/40 md:p-7">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-cyan">
            {String(i + 1).padStart(2, '0')} · {p.tagline}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{p.title}</h3>
        </div>
        {p.work && <span className="chip shrink-0 !border-amber/40 !text-amber">at work</span>}
      </div>
      <p className="text-[15px] leading-relaxed text-muted">{p.description}</p>
      {p.highlights && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.highlights.map((h) => (
            <li key={h} className="rounded-md bg-amber/10 px-2.5 py-1 font-mono text-xs text-amber">
              {h}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-6">
        <div className="flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        {p.link && (
          <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-xs text-cyan hover:underline">
            Code <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </Reveal>
  );
}

function ProjectRow({ p }: { p: Project }) {
  const Wrapper = p.link ? 'a' : 'div';
  return (
    <Wrapper
      {...(p.link ? { href: p.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="panel group flex h-full flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-cyan/40"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-lg font-semibold text-white">{p.title}</h4>
        {p.link ? (
          <Github size={16} className="mt-1 shrink-0 text-muted transition-colors group-hover:text-cyan" aria-label="Code on GitHub" />
        ) : p.work ? (
          <span className="chip shrink-0 !border-amber/40 !text-amber">work</span>
        ) : null}
      </div>
      <p className="mt-0.5 font-mono text-[11px] text-cyan">{p.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {p.tech.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
    </Wrapper>
  );
}

export function Work() {
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const shown = useMemo(() => (filter === 'all' ? rest : rest.filter((p) => p.categories.includes(filter))), [filter, rest]);
  const count = (id: Category | 'all') => (id === 'all' ? rest.length : rest.filter((p) => p.categories.includes(id)).length);

  return (
    <section id="work" className="wrap py-24 md:py-32">
      <SectionHeader index="03" kicker="Selected work" title="Things I've built.">
        Production work on 3D/BIM platforms, plus side projects where I try out new ideas in AI, systems and desktop
        software.
      </SectionHeader>

      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((p, i) => (
          <FeaturedCard key={p.title} p={p} i={i} />
        ))}
      </div>

      <Reveal className="mt-20">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="text-2xl font-semibold text-white">More projects</h3>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter projects">
            {categories.map((c) => {
              const active = filter === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                    active ? 'border-cyan bg-cyan text-ink' : 'border-line text-muted hover:border-cyan/60 hover:text-fg'
                  }`}
                >
                  {c.label} <span className={active ? 'text-ink/60' : 'text-muted/60'}>{count(c.id)}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <ProjectRow key={p.title} p={p} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ----------------------------------------------------------------- Skills */

export function Skills() {
  const belt = [...logoBelt, ...logoBelt];
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="wrap">
        <SectionHeader index="04" kicker="Toolbox" title="Skills & technologies." />
      </div>

      <div className="relative mb-12 overflow-hidden border-y border-line bg-panel/50 py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
          {belt.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5" aria-hidden={i >= logoBelt.length}>
              <img src={s.icon} alt="" className="h-7 w-7" loading="lazy" width={28} height={28} />
              <span className="font-mono text-sm text-muted">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={(i % 3) * 70} className="panel p-5">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan">{g.title}</h3>
            <ul className="flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <li key={it} className="rounded-md border border-line px-2.5 py-1 text-sm text-fg/90">
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
        <Reveal delay={140} className="panel flex flex-col justify-center p-5">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan">Languages</h3>
          <p className="text-sm text-fg/90">English (fluent)</p>
          <p className="text-sm text-fg/90">German (B1, in progress)</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Contact */

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="wrap py-24 md:py-32">
      <Reveal className="panel ticks relative overflow-hidden px-6 py-14 text-center md:px-16 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(600px_circle_at_50%_0%,rgba(76,201,240,0.12),transparent_60%)]"
          aria-hidden="true"
        />
        <p className="label relative mb-4">
          <span className="text-amber">05</span> / Contact
        </p>
        <h2 className="relative mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Let's build something together.
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-muted">
          I'm open to new roles in 3D/BIM software, full-stack .NET and applied AI. The fastest way to reach me is email.
        </p>
        <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={`mailto:${EMAIL}`} className="btn-primary">
            <Mail size={16} aria-hidden="true" /> {EMAIL}
          </a>
          <button onClick={copy} className="btn-ghost" aria-live="polite">
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>
        <div className="relative mt-8 flex items-center justify-center gap-5 font-mono text-xs text-muted">
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan">
            <Linkedin size={15} aria-hidden="true" /> LinkedIn
          </a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan">
            <Github size={15} aria-hidden="true" /> GitHub
          </a>
          <a href={RESUME_URL} download className="inline-flex items-center gap-1.5 hover:text-cyan">
            <Download size={15} aria-hidden="true" /> Résumé
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col items-center justify-between gap-2 py-8 font-mono text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Harshit Raja</p>
        <p>Built with React, Three.js &amp; Tailwind</p>
      </div>
    </footer>
  );
}
