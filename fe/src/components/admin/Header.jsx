// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext'; // 🔥 PERBAIKI: pindah ke '../context/LanguageContext'

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = menuItems.map(item => item.href.replace('#', ''));
      let current = 'home';
      
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // 🔥 PERBAIKI: Tambahkan useEffect untuk handle scroll ke section
  // Saat menu diklik dan ditutup, scroll ke section yang dituju

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('nav')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          <a 
            href="#home" 
            onClick={(e) => handleScrollTo(e, '#home')}
            className="text-sm font-light tracking-[0.15em] text-gray-600 hover:text-gray-900 transition-colors"
          >
            Marsell {'</>'} Resume
          </a>

          <nav className="hidden md:flex items-center gap-0.5">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`px-3 py-1.5 text-xs font-light tracking-wide transition-all duration-200 ${
                  activeSection === item.href.replace('#', '')
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t(item.label)}
              </a>
            ))}
            
            <button
              onClick={toggleLanguage}
              className="ml-2 px-3 py-1.5 text-xs font-light tracking-wide transition-all duration-200 text-gray-400 hover:text-gray-600 border-l border-gray-200 pl-4"
            >
              {language === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}
            </button>
          </nav>

          {/* 🔥 PERBAIKI: Mobile Menu Button - tambahkan z-index lebih tinggi */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors relative z-50"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-px bg-gray-600 transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-1.5' : ''
              }`} />
              <span className={`block h-px bg-gray-600 transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`} />
              <span className={`block h-px bg-gray-600 transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-14 left-0 right-0 bg-white/98 backdrop-blur-md border-b border-gray-100 shadow-lg"
          >
            <div className="px-4 py-3 space-y-0.5">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    handleScrollTo(e, item.href);
                    setIsOpen(false);
                  }}
                  className={`block px-4 py-2 text-xs font-light tracking-wide transition-all duration-200 ${
                    activeSection === item.href.replace('#', '')
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {t(item.label)}
                </a>
              ))}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-xs font-light tracking-wide text-gray-400 hover:text-gray-600 border-t border-gray-100 mt-2 pt-3"
              >
                {language === 'id' ? '🇮🇩 Ganti ke English' : '🇬🇧 Switch to Indonesian'}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}