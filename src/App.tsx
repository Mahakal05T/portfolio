import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { CursorGlow } from './components/ui/CursorGlow';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

function App() {
  return (
    <div className="min-h-screen text-gray-200">
      <AnimatedBackground />
      <CursorGlow />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
