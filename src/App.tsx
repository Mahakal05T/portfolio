import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { CursorGlow } from './components/ui/CursorGlow';
import { Portfolio } from './components/sections/Portfolio';
import { Admin } from './components/sections/Admin';

function App() {
  return (
    <div className="min-h-screen text-gray-200">
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#1a1a2e',
            },
          },
          error: {
            iconTheme: {
              primary: '#f87171',
              secondary: '#1a1a2e',
            },
          },
        }}
      />
      <AnimatedBackground />
      <CursorGlow />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
