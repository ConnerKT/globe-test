import { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Scene } from './components/Scene';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  const startExploring = () => {
    setShowIntro(false);
  };

  return (
    <main className="relative bg-black text-white">
      {loading ? (
        <LoadingScreen setLoading={setLoading} />
      ) : (
        <>
          <div className="absolute inset-0">
            <Scene />
          </div>
          
          <AnimatePresence>
            {showIntro ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 text-center"
              >
                <h1 className="mb-4 text-6xl font-bold">John Doe</h1>
                <p className="mb-8 text-xl text-gray-300">Full Stack Developer</p>
                
                <div className="mb-12 flex space-x-6">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="transform transition-transform hover:scale-110">
                    <Github className="h-8 w-8" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transform transition-transform hover:scale-110">
                    <Linkedin className="h-8 w-8" />
                  </a>
                  <a href="mailto:contact@example.com" className="transform transition-transform hover:scale-110">
                    <Mail className="h-8 w-8" />
                  </a>
                </div>

                <button
                  onClick={startExploring}
                  className="group flex flex-col items-center gap-2 transition-colors hover:text-blue-400"
                >
                  <span className="text-lg font-medium">Explore My Journey</span>
                  <ChevronDown className="h-6 w-6 animate-bounce" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-center"
              >
                <p className="text-sm text-gray-400">Hover over the points to explore my projects</p>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </main>
  );
}

export default App;