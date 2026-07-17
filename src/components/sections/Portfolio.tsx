import React, { useEffect, Suspense } from 'react';
import Lenis from 'lenis';

import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Footer } from './Footer';
import { Skeleton } from '../ui/Skeleton';

const About = React.lazy(() => import('./About').then(module => ({ default: module.About })));
const Skills = React.lazy(() => import('./Skills').then(module => ({ default: module.Skills })));
const Projects = React.lazy(() => import('./Projects').then(module => ({ default: module.Projects })));
const Services = React.lazy(() => import('./Services').then(module => ({ default: module.Services })));
const Contact = React.lazy(() => import('./Contact').then(module => ({ default: module.Contact })));

const SectionLoader = () => (
  <div className="w-full h-64 md:h-96 py-24 px-6 max-w-7xl mx-auto flex flex-col gap-6">
    <Skeleton className="w-1/3 h-12" />
    <Skeleton className="w-full h-full" />
  </div>
);

export const Portfolio = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen text-gray-200">
      <Navbar />

      <main>
        {/* Hero is not lazy loaded to ensure LCP is fast */}
        <Hero />
        
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

