// src/pages/Certificates.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { language, translateData, t } = useLanguage();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://porto-1vix539u.b4a.run/api/certificate");
        const data = await response.json();
        const translatedData = await translateData(Array.isArray(data) ? data : []);
        setCertificates(translatedData);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, [language, translateData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-light text-gray-800 mb-8">{t('All Certificates')}</h1>
          <p className="text-gray-400">{t('Loading certificates...')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light text-gray-800 mb-8">{t('All Certificates')}</h1>
        <Link to="/#certificates" className="text-blue-600 hover:underline mb-6 inline-block">
          ← {t('Back to Projects')}
        </Link>
        <p className="text-gray-500 mb-8">{certificates.length} {t('certificates')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div 
              key={cert.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedImage(cert.gambar)}
            >
              {cert.gambar && (
                <img 
                  src={`https://porto-1vix539u.b4a.run/uploads/images/${cert.gambar}`} 
                  alt={cert.nama}
                  className="w-full h-48 object-contain mb-3 hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                  }}
                />
              )}
              <h3 className="font-semibold text-gray-800">{cert.nama}</h3>
              <p className="text-sm text-gray-600">{cert.penyelenggara}</p>
              <div className="text-xs text-gray-500 mt-1">
                {cert.tanggal_terbit && (
                  <span>{t('Issued')}: {formatDate(cert.tanggal_terbit)}</span>
                )}
                {cert.tanggal_kadaluarsa && (
                  <span className="ml-2">• {t('Expires')}: {formatDate(cert.tanggal_kadaluarsa)}</span>
                )}
              </div>
              {cert.credential_url && (
                <a 
                  href={cert.credential_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                  onClick={(e) => e.stopPropagation()}
                >
                  🔗 {t('Verify')}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl"
            >
              ✕ {t('Close')}
            </button>
            <img 
              src={`https://porto-1vix539u.b4a.run/uploads/images/${selectedImage}`}
              alt="Certificate"
              className="w-full h-auto max-h-[80vh] object-contain bg-white rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}