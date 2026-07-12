// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Header from "./components/admin/Header";
import HeroRadial from "./components/hero/HeroRadial";
import About from "./pages/About";
import Education from "./pages/Education";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import CrudPage from "./components/admin/CrudPage";
import Certificates from "./pages/Certificates";
import ProjectDetail from "./pages/ProjectDetail";
import { useLanguage } from "./context/LanguageContext";

// ========== KOMPONEN UNTUK LANDING PAGE ==========
const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("admin_auth") === "true";
  return isAuth ? children : <Navigate to="/admin/login" />;
};

// ========== HELPER FUNCTIONS ==========
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
      const parsed = JSON.parse(technologies);
      if (Array.isArray(parsed)) {
        techArray = parsed;
      }
    } catch {
      techArray = technologies.split(",").map((t) => t.trim());
    }
  }
  if (typeof techArray === "string") {
    techArray = techArray.split(",").map((t) => t.trim());
  }
  if (!Array.isArray(techArray) || techArray.length === 0) return null;
  techArray = techArray.filter(t => t !== "" && t !== '""' && t !== "[]");
  if (techArray.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {techArray.map((tech, index) => {
        let cleanTech = tech;
        if (typeof cleanTech === "string") {
          cleanTech = cleanTech.replace(/^["']|["']$/g, "");
        }
        return (
          <span
            key={index}
            className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200"
          >
            {cleanTech}
          </span>
        );
      })}
    </div>
  );
};

// ========== PROJECTS SECTION ==========
const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language, translateData, t } = useLanguage();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://portfolio-2iay-production.up.railway.app/api/project");
        const data = await response.json();
        const translatedData = await translateData(Array.isArray(data) ? data : []);
        setProjects(translatedData);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [language, translateData]);

  if (loading) {
    return (
      <section id="projects" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-light text-gray-800 mb-8">{t('Projects')}</h2>
        <p className="text-gray-400">{t('Loading projects...')}</p>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-light text-gray-800 mb-8">{t('Projects')}</h2>
        <p className="text-gray-400">{t('No projects yet.')}</p>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-light text-gray-800 mb-8">{t('Projects')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
          >
            {project.thumbnail ? (
              <Link to={`/project/${project.id}`}>
                <img
                  src={`https://portfolio-2iay-production.up.railway.app/uploads/images/${project.thumbnail}`}
                  alt={project.judul}
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                  }}
                />
              </Link>
            ) : (
              <Link to={`/project/${project.id}`}>
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <span className="text-gray-400 text-sm">{t('No Image')}</span>
                </div>
              </Link>
            )}

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {project.judul}
              </h3>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                {project.tanggal_mulai && (
                  <span>
                    {formatDate(project.tanggal_mulai)}
                    {project.tanggal_selesai &&
                      ` - ${formatDate(project.tanggal_selesai)}`}
                  </span>
                )}
              </div>

              {project.deskripsi && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
                  {project.deskripsi}
                </p>
              )}

              {renderTechnologies(project.teknologi)}

              <div className="flex gap-3 mt-2 pt-3 border-t border-gray-100">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    🔗 {t('Live Demo')}
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-800 hover:underline transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    📂 GitHub
                  </a>
                )}
              </div>

              <Link
                to={`/project/${project.id}`}
                className="text-sm text-gray-800 hover:text-gray-900 hover:underline transition-colors mt-2 inline-block text-center pt-2 border-t border-gray-50"
              >
                {t('View Details →')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ========== CERTIFICATES SECTION ==========
const CertificatesSection = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { language, translateData, t } = useLanguage();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://portfolio-2iay-production.up.railway.app/api/certificate");
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
      <section id="certificates" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-light text-gray-800 mb-8">{t('Certificates')}</h2>
        <p className="text-gray-400">{t('Loading certificates...')}</p>
      </section>
    );
  }

  const displayCertificates = certificates.slice(0, 5);
  const hasMore = certificates.length > 5;

  if (certificates.length === 0) {
    return (
      <section id="certificates" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-light text-gray-800 mb-8">{t('Certificates')}</h2>
        <p className="text-gray-400">{t('No certificates yet.')}</p>
      </section>
    );
  }

  return (
    <section id="certificates" className="py-16 px-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-light text-gray-800">{t('Certificates')}</h2>
        {hasMore && (
          <a 
            href="/certificates" 
            className="text-sm text-gray-800 hover:text-gray-900 transition-colors"
          >
            {t('View All')} ({certificates.length})
          </a>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCertificates.map((cert) => (
          <div 
            key={cert.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedImage(cert.gambar)}
          >
            {cert.gambar && (
              <img 
                src={`https://portfolio-2iay-production.up.railway.app/uploads/images/${cert.gambar}`} 
                alt={cert.nama}
                className="w-full h-40 object-contain mb-3 hover:scale-105 transition-transform"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                }}
              />
            )}
            <h3 className="font-semibold text-gray-800">{cert.nama}</h3>
            <p className="text-sm text-gray-600">{cert.penyelenggara}</p>
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
              src={`https://portfolio-2iay-production.up.railway.app/uploads/images/${selectedImage}`}
              alt="Certificate"
              className="w-full h-auto max-h-[80vh] object-contain bg-white rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};

// ========== CONTACT SECTION ==========
const ContactSection = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language, translateData, t } = useLanguage();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://portfolio-2iay-production.up.railway.app/api/profile");
        const data = await response.json();
        const translatedData = await translateData(Array.isArray(data) ? data[0] : data);
        setProfile(translatedData);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [language, translateData]);

  if (loading) {
    return (
      <section id="contact" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-light text-gray-800 mb-8 tracking-wide">{t('Contact')}</h2>
        <p className="text-gray-400">{t('Loading contact info...')}</p>
      </section>
    );
  }

  if (!profile) {
    return (
      <section id="contact" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-light text-gray-800 mb-8 tracking-wide">{t('Contact')}</h2>
        <p className="text-gray-400">{t('No contact info available.')}</p>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 px-4 max-w-6xl mx-auto border-t border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light text-gray-800 tracking-wide mb-3">{t('Get in Touch')}</h2>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          {t('Please contact me through the platforms below for project collaboration or any feedback.')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        
        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="p-2.5 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{t('Email')}</p>
              <p className="text-sm text-gray-700 font-medium truncate group-hover:text-blue-600 transition-colors">{profile.email}</p>
            </div>
          </a>
        )}

        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="p-2.5 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">LinkedIn</p>
              <p className="text-sm text-gray-700 font-medium truncate group-hover:text-blue-700 transition-colors">
                {profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '')}
              </p>
            </div>
          </a>
        )}

        {profile.github && (
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="p-2.5 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">GitHub</p>
              <p className="text-sm text-gray-700 font-medium truncate group-hover:text-gray-900 transition-colors">
                {profile.github.replace(/^https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '')}
              </p>
            </div>
          </a>
        )}

        {profile.nomor_hp && (
          <a
            href={`https://wa.me/${profile.nomor_hp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="p-2.5 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{t('Phone')}</p>
              <p className="text-sm text-gray-700 font-medium truncate group-hover:text-green-600 transition-colors">{profile.nomor_hp}</p>
            </div>
          </a>
        )}
      </div>
    </section>
  );
};

// ========== EXPERIENCE SECTION ==========
const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language, translateData, t } = useLanguage();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://portfolio-2iay-production.up.railway.app/api/experience");
        const data = await response.json();
        const translatedData = await translateData(Array.isArray(data) ? data : []);
        setExperiences(translatedData);
      } catch (error) {
        console.error("Error fetching experiences:", error);
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, [language, translateData]);

  if (loading) {
    return (
      <section id="experience" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-light text-gray-800 mb-8">{t('Experience')}</h2>
        <p className="text-gray-400">{t('Loading experiences...')}</p>
      </section>
    );
  }

  if (experiences.length === 0) {
    return (
      <section id="experience" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-light text-gray-800 mb-8">{t('Experience')}</h2>
        <p className="text-gray-400">{t('No experience yet.')}</p>
      </section>
    );
  }

  return (
    <section id="experience" className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-light text-gray-800 mb-8">{t('Experience')}</h2>
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{exp.posisi}</h3>
                <p className="text-gray-600">
                  {exp.perusahaan} {exp.lokasi && `• ${exp.lokasi}`}
                </p>
                {exp.tipe && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {exp.tipe}
                  </span>
                )}
              </div>
              
              <div className="text-sm text-gray-500 whitespace-nowrap">
                {exp.tanggal_mulai && formatDate(exp.tanggal_mulai)}
                {exp.masih_bekerja ? (
                  <span className="ml-1"> - {t('Present')}</span>
                ) : (
                  exp.tanggal_selesai && (
                    <span className="ml-1"> - {formatDate(exp.tanggal_selesai)}</span>
                  )
                )}
              </div>
            </div>
            
            {exp.deskripsi && (
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{exp.deskripsi}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// ========== LANDING PAGE ==========
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroRadial />
        <About />
        <Education />
        <ExperienceSection />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection/>
      </main>
    </div>
  );
};

// ========== APP ==========
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/certificates" element={<Certificates />} /> 
        <Route path="/project/:id" element={<ProjectDetail />} /> 
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path=":resource" element={<CrudPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;