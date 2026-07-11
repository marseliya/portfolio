import React, { createContext, useState, useContext, useCallback } from "react";

// ========== TERJEMAHAN STATIS UNTUK UI ==========
const translations = {
  id: {
    Home: "Beranda",
    About: "Tentang",
    Education: "Pendidikan",
    Experience: "Pengalaman",
    Projects: "Proyek",
    Certificates: "Sertifikat",
    Contact: "Kontak",
    "Loading...": "Memuat...",
    "No Photo": "Tidak Ada Foto",
    tap: "ketuk",
    close: "tutup",
    portfolio: "portofolio",
    "About Me": "Tentang Saya",
    "Full Stack Developer": "Pengembang Full Stack",
    "Loading profile...": "Memuat profil...",
    "No profile data available.": "Data profil tidak tersedia.",
    Profile: "Profil",
    "Loading education...": "Memuat pendidikan...",
    "No education data available.": "Data pendidikan tidak tersedia.",
    "Loading experiences...": "Memuat pengalaman...",
    "No experience yet.": "Belum ada pengalaman.",
    Present: "Sekarang",
    "Loading projects...": "Memuat proyek...",
    "No projects yet.": "Belum ada proyek.",
    "No Image": "Tidak Ada Gambar",
    "Live Demo": "Demo Langsung",
    "View Details →": "Lihat Detail →",
    "Back to Projects": "Kembali ke Proyek",
    Description: "Deskripsi",
    Technologies: "Teknologi",
    "View on GitHub": "Lihat di GitHub",
    "Project Not Found": "Proyek Tidak Ditemukan",
    "project not found": "proyek tidak ditemukan",
    "Back to Home": "Kembali ke Beranda",
    "Loading certificates...": "Memuat sertifikat...",
    "No certificates yet.": "Belum ada sertifikat.",
    "View All": "Lihat Semua",
    "All Certificates": "Semua Sertifikat",
    certificates: "sertifikat",
    Issued: "Diterbitkan",
    Expires: "Kadaluarsa",
    Verify: "Verifikasi",
    Close: "Tutup",
    "Get in Touch": "Hubungi Saya",
    "Please contact me through the platforms below for project collaboration or any feedback.":
      "Silakan hubungi saya melalui platform di bawah ini untuk kolaborasi proyek atau jika ada masukan yang ingin disampaikan.",
    Email: "Email",
    Phone: "Telepon",
    "Loading contact info...": "Memuat info kontak...",
    "No contact info available.": "Info kontak tidak tersedia.",
    All: "Semua",
    Dashboard: "Dasbor",
    Manage: "Kelola",
    "Add New": "Tambah Baru",
    Edit: "Edit",
    Delete: "Hapus",
    Save: "Simpan",
    Cancel: "Batal",
    "Are you sure?": "Apakah Anda yakin?",
    "This action cannot be undone.": "Tindakan ini tidak dapat dibatalkan.",
    Status: "Status",
    Category: "Kategori",
    Technologies: "Teknologi",
    "Back to Projects": "Kembali ke Proyek",
    Description: "Deskripsi",
    Address: "Alamat",
    Connect: "Terhubung",
    Portfolio: "Portofolio",
  },
  en: {
    Home: "Home",
    About: "About",
    Education: "Education",
    Experience: "Experience",
    Projects: "Projects",
    Certificates: "Certificates",
    Contact: "Contact",
    "Loading...": "Loading...",
    "No Photo": "No Photo",
    tap: "tap",
    close: "close",
    portfolio: "portfolio",
    "About Me": "About Me",
    "Full Stack Developer": "Full Stack Developer",
    "Loading profile...": "Loading profile...",
    "No profile data available.": "No profile data available.",
    Profile: "Profile",
    "Loading education...": "Loading education...",
    "No education data available.": "No education data available.",
    "Loading experiences...": "Loading experiences...",
    "No experience yet.": "No experience yet.",
    Present: "Present",
    "Loading projects...": "Loading projects...",
    "No projects yet.": "No projects yet.",
    "No Image": "No Image",
    "Live Demo": "Live Demo",
    "View Details →": "View Details →",
    "Back to Projects": "Back to Projects",
    Description: "Description",
    Technologies: "Technologies",
    "View on GitHub": "View on GitHub",
    "Project Not Found": "Project Not Found",
    "project not found": "project not found",
    "Back to Home": "Back to Home",
    "Loading certificates...": "Loading certificates...",
    "No certificates yet.": "No certificates yet.",
    "View All": "View All",
    "All Certificates": "All Certificates",
    certificates: "certificates",
    Issued: "Issued",
    Expires: "Expires",
    Verify: "Verify",
    Close: "Close",
    "Get in Touch": "Get in Touch",
    "Please contact me through the platforms below for project collaboration or any feedback.":
      "Please contact me through the platforms below for project collaboration or any feedback.",
    Email: "Email",
    Phone: "Phone",
    "Loading contact info...": "Loading contact info...",
    "No contact info available.": "No contact info available.",
    All: "All",
    Dashboard: "Dashboard",
    Manage: "Manage",
    "Add New": "Add New",
    Edit: "Edit",
    Delete: "Delete",
    Save: "Save",
    Cancel: "Cancel",
    "Are you sure?": "Are you sure?",
    "This action cannot be undone.": "This action cannot be undone.",
    Status: "Status",
    Category: "Category",
    Technologies: "Technologies",
    "Back to Projects": "Back to Projects",
    Description: "Description",
    Address: "Address",
    Connect: "Connect",
    Portfolio: "Portfolio",
  },
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("id");
  const [translating, setTranslating] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  };

  // Fungsi untuk teks statis
  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  // 🔥 FUNGSI UTAMA: Terjemahkan data dinamis dari API
  const translateData = useCallback(
    async (data) => {
      if (!data) return data;
      if (language === "id") return data;

      setTranslating(true);

      try {
        // Field yang sering muncul di semua tabel
        const fields = [
          "nama",
          "judul",
          "deskripsi",
          "perusahaan",
          "posisi",
          "penyelenggara",
          "kategori",
          "status",
          "bio",      
          "alamat",
        ];

        const translateText = async (text) => {
          if (!text || typeof text !== "string") return text;
          if (text.length < 2) return text;

          try {
            // Pakai Google Translate gratis (tanpa API key)
            const response = await fetch(
              `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q=${encodeURIComponent(
                text
              )}`
            );

            if (!response.ok) throw new Error("Translation failed");

            const result = await response.json();
            return result[0][0][0] || text;
          } catch (error) {
            console.warn("Translation error:", error);
            return text;
          }
        };

        // Handle Array
        if (Array.isArray(data)) {
          const translated = await Promise.all(
            data.map(async (item) => {
              const newItem = { ...item };
              for (let field of fields) {
                if (newItem[field] && typeof newItem[field] === "string") {
                  newItem[field] = await translateText(newItem[field]);
                }
              }
              return newItem;
            })
          );
          setTranslating(false);
          return translated;
        }

        // Handle Object
        const newData = { ...data };
        for (let field of fields) {
          if (newData[field] && typeof newData[field] === "string") {
            newData[field] = await translateText(newData[field]);
          }
        }
        setTranslating(false);
        return newData;
      } catch (error) {
        console.error("Translation error:", error);
        setTranslating(false);
        return data;
      }
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, t, translateData, translating }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
