import Nav from './components/Nav';
import Hero from './components/Hero';
import { About, Contact, Experience, Footer, Skills, Work } from './components/sections';

export default function App() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-amber focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
