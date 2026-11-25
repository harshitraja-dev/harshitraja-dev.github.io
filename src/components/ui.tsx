import { useEffect, useRef, type ReactNode, type ElementType } from 'react';

export const RESUME_URL = `${import.meta.env.BASE_URL}assets/Harshit-Raja's-Resume.pdf`;
export const EMAIL = 'iamharshitraja@gmail.com';
export const LINKS = {
  github: 'https://github.com/HarshitRaja1999',
  linkedin: 'https://www.linkedin.com/in/harshit-raja-1411671b2/',
};

/** Fades children in when they scroll into view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function SectionHeader({ index, kicker, title, children }: { index: string; kicker: string; title: string; children?: ReactNode }) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <p className="label mb-3">
        <span className="text-amber">{index}</span> / {kicker}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
      {children && <p className="mt-4 max-w-2xl text-muted">{children}</p>}
    </Reveal>
  );
}
