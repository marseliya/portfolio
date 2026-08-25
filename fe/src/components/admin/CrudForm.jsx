// fe/src/components/admin/CrudForm.jsx
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import formConfig from "../../config/formConfig";
import PhotoUpload from "./PhotoUpload";

export default function CrudForm({
  resource,
  initialData,
  onSubmit,
  onClose,
}) {
  const fields = formConfig[resource] || [];
  const [form, setForm] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      return;
    }

    const initial = {};
    fields.forEach((field) => {
      if (field.type === "checkbox") {
        initial[field.name] = false;
      } else {
        initial[field.name] = "";
      }
    });
    setForm(initial);
  }, [resource, initialData, fields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : (type === "number" ? Number(value) : value),
    });
  };

  const handlePhotoChange = (file) => {
    setPhotoFile(file);
    // Update form dengan nama file untuk ditampilkan
    setForm({
      ...form,
      foto_profile: file ? file.name : null,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Cek apakah ini upload file (profile dengan foto)
      const isFileUpload = resource === 'profile' && photoFile;

      if (isFileUpload) {
        // Kirim sebagai FormData
        const formData = new FormData();
        
        // Append semua field kecuali foto_profile (karena kita kirim file terpisah)
        Object.keys(form).forEach((key) => {
          if (key !== 'foto_profile' && form[key] !== null && form[key] !== undefined) {
            // Handle checkbox
            if (typeof form[key] === 'boolean') {
              formData.append(key, form[key] ? 'true' : 'false');
            } else {
              formData.append(key, form[key]);
            }
          }
        });
        
        // Append file foto
        if (photoFile) {
          formData.append('foto_profile', photoFile);
        }

        // Panggil onSubmit dengan formData dan flag isFormData = true
        await onSubmit(formData, true);
      } else {
        // Kirim sebagai JSON biasa
        await onSubmit(form);
      }
      
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
      alert("Gagal menyimpan data: " + error.message);
    }
  };

  // Helper untuk mendapatkan URL foto
  const getPhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    if (photoPath.startsWith('http://') || photoPath.startsWith('https://')) {
      return photoPath;
    }
    // Jika hanya nama file, tambahkan base URL
    return `/uploads/profile/${photoPath}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData ? "Edit" : "Tambah"} {resource}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={loading}
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={submit} className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "file" ? (
                // Komponen upload foto
                <PhotoUpload
                  currentPhoto={getPhotoUrl(form.foto_profile)}
                  onPhotoChange={handlePhotoChange}
                  label={initialData ? "Ganti Foto" : "Pilih Foto"}
                />
              ) : field.type === "checkbox" ? (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={form[field.name] || false}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Centang jika ya</span>
                </div>
              ) : field.type === "textarea" ? (
                <textarea
                  rows={4}
                  name={field.name}
                  value={form[field.name] ?? ""}
                  onChange={handleChange}
                  required={field.required}
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow disabled:bg-gray-100"
                  placeholder={`Masukkan ${field.label.toLowerCase()}`}
                />
              ) : field.type === "number" ? (
                <input
                  type="number"
                  name={field.name}
                  value={form[field.name] ?? ""}
                  onChange={handleChange}
                  required={field.required}
                  disabled={loading}
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow disabled:bg-gray-100"
                  placeholder={`Masukkan ${field.label.toLowerCase()}`}
                />
              ) : field.type === "date" ? (
                <input
                  type="date"
                  name={field.name}
                  value={form[field.name] ?? ""}
                  onChange={handleChange}
                  required={field.required}
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow disabled:bg-gray-100"
                />
              ) : field.type === "url" ? (
                <input
                  type="url"
                  name={field.name}
                  value={form[field.name] ?? ""}
                  onChange={handleChange}
                  required={field.required}
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow disabled:bg-gray-100"
                  placeholder={`https://...`}
                />
              ) : field.type === "email" ? (
                <input
                  type="email"
                  name={field.name}
                  value={form[field.name] ?? ""}
                  onChange={handleChange}
                  required={field.required}
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow disabled:bg-gray-100"
                  placeholder={`Masukkan ${field.label.toLowerCase()}`}
                />
              ) : (
                <input
                  type="text"
                  name={field.name}
                  value={form[field.name] ?? ""}
                  onChange={handleChange}
                  required={field.required}
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow disabled:bg-gray-100"
                  placeholder={`Masukkan ${field.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

CrudForm.propTypes = {
  resource: PropTypes.string.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};