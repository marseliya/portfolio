// src/pages/admin/CrudPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminTable from "../../components/admin/AdminTable";

// ========== KONFIGURASI FIELD PER TABLE ==========
const tableFields = {
  profile: {
    columns: [
      { key: "id", label: "ID" },
      { key: "nama", label: "Nama" },
      { key: "email", label: "Email" },
      { key: "ttl", label: "Tempat Tanggal Lahir" },
      { key: "nomor_hp", label: "No HP" },
      { key: "foto_profile", label: "Foto" },
      { key: "alamat", label: "Alamat" },
      { key: "bio", label: "Bio" },
      { key: "linkedin", label: "LinkedIn" },
      { key: "github", label: "GitHub" },
      { key: "porto", label: "Portfolio" },
    ],
    formFields: [
      { key: "nama", label: "Nama", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "ttl", label: "Tempat Tanggal Lahir", type: "text" },
      { key: "nomor_hp", label: "No HP", type: "text" },
      { key: "foto_profile", label: "Foto Profil", type: "file" },
      { key: "alamat", label: "Alamat", type: "text" },
      { key: "bio", label: "Bio", type: "textarea" },
      { key: "linkedin", label: "LinkedIn URL", type: "url" },
      { key: "github", label: "GitHub URL", type: "url" },
      { key: "porto", label: "Portfolio URL", type: "url" },
    ],
  },
  education: {
    columns: [
      { key: "id", label: "ID" },
      { key: "institusi", label: "Institusi" },
      { key: "jurusan", label: "Jurusan" },
      { key: "jenjang", label: "Jenjang" },
      { key: "deskripsi", label: "Deskripsi" },
      { key: "tanggal_mulai", label: "Mulai" },
      { key: "tanggal_selesai", label: "Selesai" },
      { key: "ipk", label: "IPK" },
    ],
    formFields: [
      { key: "institusi", label: "Institusi", type: "text", required: true },
      { key: "jurusan", label: "Jurusan", type: "text", required: true },
      { key: "jenjang", label: "Jenjang (S1/S2/dll)", type: "text" },
      { key: "deskripsi", label: "Deskripsi", type: "textarea" },
      { key: "tanggal_mulai", label: "Tanggal Mulai", type: "date" },
      { key: "tanggal_selesai", label: "Tanggal Selesai", type: "date" },
      { key: "ipk", label: "IPK", type: "number" },
    ],
  },
  experience: {
    columns: [
      { key: "id", label: "ID" },
      { key: "posisi", label: "Posisi" },
      { key: "perusahaan", label: "Perusahaan" },
      { key: "lokasi", label: "Lokasi" },
      { key: "tipe", label: "Tipe" },
      { key: "deskripsi", label: "Deskripsi" },
      { key: "tanggal_mulai", label: "Mulai" },
      { key: "tanggal_selesai", label: "Selesai" },
      { key: "masih_bekerja", label: "Masih Bekerja" },
    ],
    formFields: [
      { key: "posisi", label: "Posisi", type: "text", required: true },
      { key: "perusahaan", label: "Perusahaan", type: "text", required: true },
      { key: "lokasi", label: "Lokasi", type: "text" },
      { key: "tipe", label: "Tipe (Fulltime/Freelance)", type: "text" },
      { key: "deskripsi", label: "Deskripsi", type: "textarea" },
      { key: "tanggal_mulai", label: "Tanggal Mulai", type: "date" },
      { key: "tanggal_selesai", label: "Tanggal Selesai", type: "date" },
      { key: "masih_bekerja", label: "Masih Bekerja", type: "checkbox" },
    ],
  },
  project: {
    columns: [
      { key: "id", label: "ID" },
      { key: "judul", label: "Judul" },
      { key: "deskripsi", label: "Deskripsi" },
      { key: "kategori", label: "Kategori" },
      { key: "thumbnail", label: "Thumbnail" },
      { key: "demo_url", label: "Demo URL" },
      { key: "github_url", label: "GitHub URL" },
      { key: "teknologi", label: "Teknologi" },
      { key: "status", label: "Status" },
      { key: "tanggal_mulai", label: "Mulai" },
      { key: "tanggal_selesai", label: "Selesai" },
    ],
    formFields: [
      { key: "judul", label: "Judul", type: "text", required: true },
      { key: "deskripsi", label: "Deskripsi", type: "textarea" },
      { key: "kategori", label: "Kategori", type: "text" },
      { key: "thumbnail", label: "Thumbnail (Upload)", type: "file" },
      { key: "demo_url", label: "Demo URL", type: "url" },
      { key: "github_url", label: "GitHub URL", type: "url" },
      { key: "teknologi", label: "Teknologi (pisahkan koma)", type: "text" },
      { key: "status", label: "Status", type: "text" },
      { key: "tanggal_mulai", label: "Tanggal Mulai", type: "date" },
      { key: "tanggal_selesai", label: "Tanggal Selesai", type: "date" },
    ],
  },
  certificate: {
    columns: [
      { key: "id", label: "ID" },
      { key: "nama", label: "Nama Sertifikat" },
      { key: "penyelenggara", label: "Penyelenggara" },
      { key: "tanggal_terbit", label: "Terbit" },
      { key: "tanggal_kadaluarsa", label: "Kadaluarsa" },
      { key: "credential_id", label: "Credential ID" },
      { key: "credential_url", label: "Credential URL" },
      { key: "gambar", label: "Gambar" },
    ],
    formFields: [
      { key: "nama", label: "Nama Sertifikat", type: "text", required: true },
      { key: "penyelenggara", label: "Penyelenggara", type: "text", required: true },
      { key: "tanggal_terbit", label: "Tanggal Terbit", type: "date" },
      { key: "tanggal_kadaluarsa", label: "Tanggal Kadaluarsa", type: "date" },
      { key: "credential_id", label: "Credential ID", type: "text" },
      { key: "credential_url", label: "Credential URL", type: "url" },
      { key: "gambar", label: "Gambar (Upload)", type: "file" },
    ],
  },
  contact: {
    columns: [
      { key: "id", label: "ID" },
      { key: "nama", label: "Nama" },
      { key: "email", label: "Email" },
      { key: "subjek", label: "Subjek" },
      { key: "pesan", label: "Pesan" },
      { key: "sudah_dibaca", label: "Dibaca" },
      { key: "created_at", label: "Dikirim" },
    ],
    formFields: [
      { key: "nama", label: "Nama", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "subjek", label: "Subjek", type: "text", required: true },
      { key: "pesan", label: "Pesan", type: "textarea", required: true },
      { key: "sudah_dibaca", label: "Sudah Dibaca", type: "checkbox" },
    ],
  },
  skills: {
    columns: [
      { key: "id", label: "ID" },
      { key: "nama_skill", label: "Skill" },
    ],
    formFields: [{ key: "nama_skill", label: "Nama Skill", type: "text", required: true }],
  },
};

const apiEndpoints = {
  profile: "profile",
  education: "education",
  experience: "experience",
  project: "project",
  certificate: "certificate",
  contact: "contact",
  skills: "profile/1/skills", // 🔥 Profile ID = 1 (ubah sesuai ID profile yang ada)
  // Aliases
  projects: "project",
  certificates: "certificate",
  messages: "contact",
};

export default function CrudPage() {
  const { resource } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const config = tableFields[resource] || { columns: [], formFields: [] };

  const getApiUrl = () => {
    const endpoint = apiEndpoints[resource];
    if (!endpoint) {
      console.error(`Resource "${resource}" tidak ditemukan di apiEndpoints`);
      return null;
    }
    return `https://porto-1vix539u.b4a.run/api/${endpoint}`;
  };

  const fetchData = async () => {
    const url = getApiUrl();
    if (!url) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error(`Error fetching ${resource}:`, error);
      setError(error.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [resource]);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
    setShowForm(true);
    setError(null);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Hapus data ini?`)) return;
    
    try {
      const url = `${getApiUrl()}/${item.id}`;
      const response = await fetch(url, { method: "DELETE" });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      await fetchData();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Gagal menghapus data: " + error.message);
    }
  };

  // ========== FULL handleSubmit ==========
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const method = editingId ? "PUT" : "POST";
    const endpoint = apiEndpoints[resource];
    const url = editingId
      ? `https://porto-1vix539u.b4a.run/api/${endpoint}/${editingId}`
      : `https://porto-1vix539u.b4a.run/api/${endpoint}`;

    try {
      // ========== PROSES DATA SEBELUM DIKIRIM ==========
      const processedData = { ...formData };
      
      // 🔥 KHUSUS UNTUK PROJECT - ubah teknologi string menjadi array
      if (resource === "project" && processedData.teknologi) {
        if (typeof processedData.teknologi === 'string') {
          processedData.teknologi = processedData.teknologi
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "");
        }
      }

      const hasFile = formData._file instanceof File;

      if (hasFile) {
        // ========== KIRIM SEBAGAI FormData ==========
        const formDataToSend = new FormData();

        Object.keys(processedData).forEach((key) => {
          if (key !== "_file" && processedData[key] !== "" && processedData[key] !== null && processedData[key] !== undefined) {
            
            if (Array.isArray(processedData[key])) {
              formDataToSend.append(key, JSON.stringify(processedData[key]));
            } else if (typeof processedData[key] === 'boolean') {
              formDataToSend.append(key, processedData[key] ? 'true' : 'false');
            } else {
              formDataToSend.append(key, processedData[key]);
            }
          }
        });

        formDataToSend.append(getFileFieldName(resource), formData._file);

        const response = await fetch(url, {
          method,
          body: formDataToSend,
        });

        if (!response.ok) {
          const text = await response.text();
          try {
            const errorData = JSON.parse(text);
            throw new Error(errorData.message || `HTTP ${response.status}`);
          } catch {
            throw new Error(`Gagal menyimpan: ${text.substring(0, 100)}`);
          }
        }

        setShowForm(false);
        setFormData({});
        setEditingId(null);
        await fetchData();
        
      } else {
        // ========== KIRIM SEBAGAI JSON ==========
        const cleanData = {};
        Object.keys(processedData).forEach((key) => {
          if (key !== "_file" && processedData[key] !== "" && processedData[key] !== null && processedData[key] !== undefined) {
            cleanData[key] = processedData[key];
          }
        });

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanData),
        });

        if (!response.ok) {
          const text = await response.text();
          try {
            const errorData = JSON.parse(text);
            throw new Error(errorData.message || `HTTP ${response.status}`);
          } catch {
            throw new Error(`Gagal menyimpan: ${text.substring(0, 100)}`);
          }
        }

        setShowForm(false);
        setFormData({});
        setEditingId(null);
        await fetchData();
      }
      
    } catch (error) {
      console.error("Error saving:", error);
      setError(error.message);
      alert("Gagal menyimpan data: " + error.message);
    }
  };

  const getFileFieldName = (resource) => {
    switch (resource) {
      case "profile":
        return "foto_profile";
      case "project":
        return "thumbnail";
      case "certificate":
        return "gambar";
      default:
        return "file";
    }
  };

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    if (error) setError(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error && !showForm) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchData} 
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-light text-gray-800 capitalize">
          {resource}
        </h2>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({});
            setShowForm(true);
            setError(null);
          }}
          className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
        >
          + Add New
        </button>
      </div>

      <AdminTable
        data={data}
        columns={config.columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        title={resource}
      />

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-lg font-light mb-4">
              {editingId ? "Edit" : "Add"} {resource}
            </h3>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.formFields.map((field) => (
                  <div
                    key={field.key}
                    className={field.type === "textarea" ? "md:col-span-2" : ""}
                  >
                    <label className="block text-sm text-gray-600 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    {field.type === "file" ? (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFormData({
                              ...formData,
                              _file: file,
                              [field.key]: file.name,
                            });
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                      />
                    ) : field.type === "textarea" ? (
                      <textarea
                        value={formData[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        rows={3}
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    ) : field.type === "checkbox" ? (
                      <input
                        type="checkbox"
                        checked={formData[field.key] || false}
                        onChange={(e) => handleChange(field.key, e.target.checked)}
                        className="w-5 h-5 border-gray-300 rounded focus:ring-gray-500"
                      />
                    ) : field.type === "date" ? (
                      <input
                        type="date"
                        value={formData[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    ) : field.type === "number" ? (
                      <input
                        type="number"
                        step="0.01"
                        value={formData[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    ) : field.type === "email" ? (
                      <input
                        type="email"
                        value={formData[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    ) : field.type === "url" ? (
                      <input
                        type="url"
                        value={formData[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    ) : (
                      <input
                        type="text"
                        value={formData[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-6 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({});
                    setEditingId(null);
                    setError(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}