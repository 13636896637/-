import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Heart, Users, BookOpen, MessageCircle, Sparkles } from 'lucide-react';
import Home from './pages/Home';
import Matchmaking from './pages/Matchmaking';
import Learning from './pages/Learning';
import Community from './pages/Community';
import Diagnosis from './pages/Diagnosis';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', name: '首页', icon: Heart },
    { path: '/matchmaking', name: '相亲匹配', icon: Users },
    { path: '/learning', name: '恋爱技巧', icon: BookOpen },
    { path: '/community', name: '匿名社区', icon: MessageCircle },
    { path: '/diagnosis', name: 'AI解忧', icon: Sparkles },
  ];

  // Determine if current page has a dark hero section at the top
  const isDarkHero = location.pathname === '/matchmaking' && !scrolled;

  return (
    <div className="min-h-screen flex flex-col relative">
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm py-3 px-8' 
            : 'bg-transparent py-6 px-8'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-bold font-serif transition-colors duration-300 flex items-center gap-2 ${isDarkHero ? 'text-white' : 'text-dark-ink'}`}>
            <Heart className={`w-6 h-6 ${isDarkHero ? 'text-accent-peach' : 'text-accent-peach'}`} fill="currentColor" />
            恋AI解忧
          </h1>
          <nav className={`flex space-x-1 backdrop-blur-md rounded-full p-1 border transition-colors duration-300 ${
            isDarkHero 
              ? 'bg-white/10 border-white/20' 
              : 'bg-dark-ink/5 border-dark-ink/10'
          }`}>
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-white text-dark-ink shadow-sm' 
                      : isDarkHero 
                        ? 'hover:bg-white/20 text-white/90 hover:text-white' 
                        : 'hover:bg-white/50 text-dark-ink/80 hover:text-dark-ink'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className={`flex-grow w-full ${location.pathname === '/' || location.pathname === '/matchmaking' ? '' : 'pt-28 p-4 md:p-8 max-w-7xl mx-auto'}`}>
        {children}
      </main>
      <footer className="p-8 text-center text-sm text-muted-olive/60 border-t border-gray-100">
        © 2026 恋AI解忧平台 · 探索更美好的关系
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matchmaking" element={<Matchmaking />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/community" element={<Community />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
        </Routes>
      </Layout>
    </Router>
  );
}
