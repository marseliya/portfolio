// src/pages/ProjectDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

const renderTechnologies = (technologies) => {
  if (!technologies) return null;
  let techArray = technologies;
  if (typeof technologies === "string") {
    try {
      techArray = JSON.parse(technologies);
    } catch {
      techArray = technologies.split(",").map((t) => t.trim());
    }
  }
  if (!Array.isArray(techArray) || techArray.length === 0) return null;
  techArray = techArray.filter(t => t !== "");
  if (techArray.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {techArray.map((tech, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200"
        >
          {tech}
        </span>
      ))}
    </div>
  );
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language, translateData, t } = useLanguage();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://porto-1q3zep5t.b4a.run/api/project/${id}`);
        if (!response.ok) {
          throw new Error("Project not found");
        }
        const data = await response.json();
        const translatedData = await translateData(data);
        setProject(translatedData);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError(error.message);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, language, translateData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-400">{t('Loading...')}</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-light text-gray-800 mb-4">{t('Project Not Found')}</h1>
          <p className="text-gray-500">{error || t('project not found')}</p>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            ← {t('Back to Home')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        <Link to="/#projects" className="text-gray-800 hover:underline mb-6 inline-block">
          ← {t('Back to Projects')}
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          {project.thumbnail && (
            <div className="w-full bg-gray-100 border-b border-gray-100">
              <img
                src={`https://porto-1q3zep5t.b4a.run/uploads/images/${project.thumbnail}`}
                alt={project.judul}
                className="w-full h-72 sm:h-96 md:h-[450px] lg:h-[550px] object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/1200x500?text=No+Image";
                }}
              />
            </div>
          )}

          <div className="p-6 md:p-10 lg:p-12 max-w-5xl">
            <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              {project.judul}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-8">
              {project.kategori && (
                <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full">
                  {project.kategori}
                </span>
              )}
              {project.tanggal_mulai && (
                <span className="flex items-center gap-1">
                  📅 {formatDate(project.tanggal_mulai)}
                  {project.tanggal_selesai && ` - ${formatDate(project.tanggal_selesai)}`}
                </span>
              )}
            </div>

            {project.deskripsi && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">{t('Description')}</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-base md:text-lg">
                  {project.deskripsi}
                </p>
              </div>
            )}

            {project.teknologi && (
              <div className="mb-10 pt-6 border-t border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">{t('Technologies')}</h2>
                {renderTechnologies(project.teknologi)}
              </div>
            )}

            {(project.demo_url || project.github_url) && (
              <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-sm"
                  >
                    <span>🔗</span> {t('Live Demo')}
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium flex items-center gap-2 shadow-sm"
                  >
                    <span>📂</span> {t('View on GitHub')}
                  </a>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}