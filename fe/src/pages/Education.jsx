// src/pages/Education.jsx
import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

import educationData from "../data/education.json";

const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export default function Education() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language, translateData, t } = useLanguage();

  useEffect(() => {
    const loadEducation = async () => {
      try {
        setLoading(true);
        const translatedData = await translateData(educationData);
        setEducations(translatedData);
      } catch (error) {
        console.error("Error loading education:", error);
        setEducations(educationData);
      } finally {
        setLoading(false);
      }
    };
    loadEducation();
  }, [language, translateData]);
  
  if (loading) {
    return (
      <section id="education" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-light text-gray-800 mb-8">{t('Education')}</h2>
        <p className="text-gray-400">{t('Loading education...')}</p>
      </section>
    );
  }

  if (educations.length === 0) {
    return (
      <section id="education" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-light text-gray-800 mb-8">{t('Education')}</h2>
        <p className="text-gray-400">{t('No education data available.')}</p>
      </section>
    );
  }

  return (
    <section id="education" className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-light text-gray-800 mb-8">{t('Education')}</h2>
      <div className="space-y-4">
        {educations.map((edu) => (
          <div key={edu.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{edu.nama}</h3>
                <p className="text-gray-600">{edu.institusi}</p>
                {edu.jurusan && (
                  <p className="text-sm text-gray-500">{edu.jurusan}</p>
                )}
              </div>
              <div className="text-sm text-gray-500 whitespace-nowrap">
                {edu.tanggal_mulai && formatDate(edu.tanggal_mulai)}
                {edu.masih_studi ? (
                  <span className="ml-1"> - {t('Present')}</span>
                ) : (
                  edu.tanggal_selesai && (
                    <span className="ml-1"> - {formatDate(edu.tanggal_selesai)}</span>
                  )
                )}
              </div>
            </div>
            {edu.deskripsi && (
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{edu.deskripsi}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}