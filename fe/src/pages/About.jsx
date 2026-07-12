// src/pages/About.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language, translateData, t } = useLanguage();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://portfolio-2iay-production.up.railway.app/api/profile');
        const data = await response.json();
        
        if (data && data.length > 0) {
          const translatedData = await translateData(data[0]);
          setProfile(translatedData);
        }
      } catch (error) {
        console.error("Gagal mengambil data profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [language, translateData]);

  const getPhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    if (photoPath.startsWith('http://') || photoPath.startsWith('https://')) {
      return photoPath;
    }
    return `https://portfolio-2iay-production.up.railway.app/uploads/profile/${photoPath}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          <p className="text-gray-400 font-light tracking-wider">{t('Loading...')}</p>
        </div>
      </div>
    );
  }

  return (
    <section id="about" className="py-16 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 max-w-6xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            
            {/* Foto Profile - Kiri */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex-shrink-0 w-full md:w-64"
            >
              <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                {profile?.foto_profile ? (
                  <img 
                    src={getPhotoUrl(profile.foto_profile)} 
                    alt={profile.nama} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                    <span className="text-6xl mb-2">📷</span>
                    <span className="text-sm">{t('No Photo')}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Informasi - Kanan */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex-1 space-y-6"
            >
              {/* Nama & Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-light text-gray-800">
                  {profile?.nama || 'Nama'}
                </h1>
                <p className="text-gray-400 text-sm font-light tracking-wider mt-1">
                  {profile?.ttl || 'Tempat, Tanggal Lahir'}
                </p>
              </div>

              {/* Bio */}
              {profile?.bio && (
                <div>
                  <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
                    {t('About Me')}
                  </h2>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {profile.bio}
                  </p>
                </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                {profile?.email && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {t('Email')}
                    </h3>
                    <p className="text-gray-700 text-sm mt-1">{profile.email}</p>
                  </div>
                )}
                
                {profile?.nomor_hp && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {t('Phone')}
                    </h3>
                    <p className="text-gray-700 text-sm mt-1">{profile.nomor_hp}</p>
                  </div>
                )}
                
                {profile?.alamat && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {t('Address')}
                    </h3>
                    <p className="text-gray-700 text-sm mt-1">{profile.alamat}</p>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {(profile?.linkedin || profile?.github || profile?.porto) && (
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                    {t('Connect')}
                  </h3>
                  <div className="flex gap-3">
                    {profile?.linkedin && (
                      <a 
                        href={profile.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {profile?.github && (
                      <a 
                        href={profile.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {profile?.porto && (
                      <a 
                        href={profile.porto} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                      >
                        {t('Portfolio')}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}