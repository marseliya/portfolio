// fe/src/components/admin/PhotoUpload.jsx
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

export default function PhotoUpload({ 
  currentPhoto, 
  onPhotoChange, 
  label = "Upload Foto",
  className = ""
}) {
  const [preview, setPreview] = useState(currentPhoto);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi tipe file
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Hanya file gambar yang diizinkan (jpeg, png, gif, webp)');
        return;
      }

      // Validasi ukuran (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }

      // Buat preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Kirim file ke parent
      onPhotoChange(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div 
        className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition-colors group"
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <img 
            src={preview} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No Photo
          </div>
        )}
        
        {/* Overlay hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {label}
        </button>
        
        {preview && (
          <button
            type="button"
            onClick={handleRemovePhoto}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Hapus
          </button>
        )}
      </div>
      
      <span className="text-xs text-gray-400 mt-1">
        Maksimal 5MB (JPG, PNG, GIF, WEBP)
      </span>
    </div>
  );
}

PhotoUpload.propTypes = {
  currentPhoto: PropTypes.string,
  onPhotoChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  className: PropTypes.string
};