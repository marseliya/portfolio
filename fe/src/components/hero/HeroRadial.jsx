// src/components/hero/HeroRadial.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const menus = [
  { name: 'About', id: 'about', icon: '👤' },
  { name: 'Education', id: 'education', icon: '🎓' },
  { name: 'Experience', id: 'experience', icon: '💼' },
  { name: 'Projects', id: 'projects', icon: '🚀' },
  { name: 'Certificates', id: 'certificates', icon: '📜' },
  { name: 'Contact', id: 'contact', icon: '✉️' },
];

const backgroundPhotos = [
  { id: 1, src: '/images/CamEase.png' },
  { id: 2, src: '/images/celeritas.png' },
  { id: 3, src: '/images/HomeStay.png' },
  { id: 4, src: '/images/petshop.png' },
  { id: 5, src: '/images/TechStore.png' },
  { id: 6, src: '/images/CamEase.png' },
  { id: 7, src: '/images/celeritas.png' },
  { id: 8, src: '/images/HomeStay.png' },
  { id: 9, src: '/images/petshop.png' },
  { id: 10, src: '/images/TechStore.png' },
  { id: 11, src: '/images/CamEase.png' },
  { id: 12, src: '/images/celeritas.png' },
  { id: 13, src: '/images/HomeStay.png' },
  { id: 14, src: '/images/petshop.png' },
  { id: 15, src: '/images/TechStore.png' },
];

const generateScatteredStyles = (index) => {
  const seed = index * 137.508;
  const top = `${(Math.sin(seed) * 0.5 + 0.5) * 85 + 5}%`;
  const left = `${(Math.cos(seed * 1.3) * 0.5 + 0.5) * 85 + 5}%`;
  const rotate = `${(Math.sin(seed * 0.7) * 15)}deg`;
  const size = Math.floor(Math.sin(seed * 0.5) * 15 + 30);
  return { top, left, transform: `rotate(${rotate})`, size };
};

export default function HeroRadial() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoStyles, setPhotoStyles] = useState([]);
  const { t } = useLanguage();

  const radius = 170;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://portfolio-2iay-production.up.railway.app/api/profile');
        const data = await response.json();
        if (data && data.length > 0) {
          setProfile(data[0]);
        }
      } catch (error) {
        console.error("Gagal mengambil data profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    const styles = backgroundPhotos.map((_, index) => generateScatteredStyles(index));
    setPhotoStyles(styles);
  }, []);

  const getPhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    if (photoPath.startsWith('http://') || photoPath.startsWith('https://')) {
      return photoPath;
    }
    return `https://portfolio-2iay-production.up.railway.app/uploads/profile/${photoPath}`;
  };

  const handleScrollTo = (id) => {
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          <p className="text-gray-400 font-light tracking-wider">{t('Loading...')}</p>
        </div>
      </div>
    );
  }

  return (
    <section id="home" className="relative flex h-screen w-screen items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200/30 overflow-hidden select-none">
      
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {backgroundPhotos.map((photo, index) => {
          const style = photoStyles[index] || generateScatteredStyles(index);
          return (
            <div
              key={photo.id}
              className="absolute rounded-lg overflow-hidden shadow-md border border-white/30"
              style={{
                top: style.top,
                left: style.left,
                transform: style.transform,
                width: `${style.size}%`,
                maxWidth: '250px',
                filter: 'blur(3px) brightness(0.8)',
                opacity: 0.25,
              }}
            >
              <img 
                src={photo.src} 
                alt="Project screenshot" 
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      <div className="absolute w-96 h-96 rounded-full bg-gray-300/10 blur-3xl -top-20 -right-20 pointer-events-none z-5"></div>
      <div className="absolute w-96 h-96 rounded-full bg-gray-300/10 blur-3xl -bottom-20 -left-20 pointer-events-none z-5"></div>

      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="absolute top-[12%] text-center pointer-events-none z-20"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-2xl md:text-3xl font-light tracking-wider text-gray-700/80"
            >
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-xs font-light text-gray-400/80 mt-2 tracking-widest uppercase"
            >
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex items-center justify-center z-20">
        
        <AnimatePresence mode="wait">
          {isOpen && menus.map((menu, index) => {
            const angle = (index * 360) / menus.length - 90;
            const radian = (angle * Math.PI) / 180;
            
            const x = Math.round(radius * Math.cos(radian));
            const y = Math.round(radius * Math.sin(radian));

            return (
              <motion.button
                key={menu.id}
                onClick={() => handleScrollTo(menu.id)}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{ 
                  x: x, 
                  y: y, 
                  scale: 1, 
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 150,
                    damping: 18,
                    mass: 0.5,
                    delay: index * 0.02,
                  }
                }}
                exit={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0, 
                  opacity: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    duration: 0.2
                  }
                }}
                className={`absolute flex flex-col items-center justify-center w-20 h-20 rounded-full 
                           bg-white/95 border border-gray-200/80 hover:border-gray-400 hover:bg-white
                           text-gray-600 text-xs font-light shadow-md hover:shadow-xl 
                           transition-all duration-150 cursor-pointer text-center backdrop-blur-sm
                           hover:scale-110 active:scale-95`}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.1 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl mb-0.5">{menu.icon}</span>
                <span className="text-[10px] tracking-wider font-medium">{t(menu.name)}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>

        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          className={`relative z-20 w-40 h-40 md:w-44 md:h-44 overflow-hidden rounded-full 
                     border-4 ${isOpen ? 'border-gray-400/60 scale-105' : 'border-gray-300/60 hover:border-gray-400/60'} 
                     bg-white shadow-2xl transition-all duration-300 cursor-pointer
                     ring-1 ring-gray-200/30 ring-offset-4 ring-offset-gray-50`}
        >
          {profile?.foto_profile ? (
            <img 
              src={getPhotoUrl(profile.foto_profile)} 
              alt={profile.nama} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div class="flex flex-col items-center justify-center w-full h-full bg-gray-100 text-gray-400">
                    <span class="text-4xl mb-1">📷</span>
                    <span class="text-xs">${t('No Photo')}</span>
                  </div>
                `;
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 text-gray-400">
              <span className="text-4xl mb-1">📷</span>
              <span className="text-xs">{t('No Photo')}</span>
            </div>
          )}
          
          <motion.div 
            className={`absolute inset-0 bg-gray-900/0 hover:bg-gray-900/5 transition-all duration-200 
                        flex items-center justify-center ${isOpen ? 'opacity-100 bg-gray-900/10' : 'opacity-0'}`}
            animate={{ opacity: isOpen ? 1 : 0 }}
          >
            <span className="text-gray-500/60 text-xs tracking-wider font-light">
              {isOpen ? `✕ ${t('close')}` : t('tap')}
            </span>
          </motion.div>
        </motion.button>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="absolute bottom-8 text-center pointer-events-none z-10"
      >
        <p className="text-[10px] tracking-[0.2em] text-gray-400/40 font-light">
          {new Date().getFullYear()} • {t('portfolio')}
        </p>
      </motion.div>
    </section>
  );
}