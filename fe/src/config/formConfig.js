// fe/src/config/formConfig.js

const formConfig = {
    // Profile
    profile: [
      { name: "nama", label: "Nama Lengkap", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "ttl", label: "Tempat, Tanggal Lahir", type: "text", required: true },
      { name: "nomor_hp", label: "Nomor HP", type: "text", required: false },
      { name: "foto_profile", label: "Foto Profil", type: "file", required: false },
      { name: "alamat", label: "Alamat", type: "textarea", required: false },
      { name: "bio", label: "Bio / Deskripsi Diri", type: "textarea", required: false },
      { name: "linkedin", label: "LinkedIn URL", type: "url", required: false },
      { name: "github", label: "GitHub URL", type: "url", required: false },
      { name: "porto", label: "Portfolio URL", type: "url", required: false },
    ],
  
    // Project
    project: [
      { name: "judul", label: "Judul Project", type: "text", required: true },
      { name: "deskripsi", label: "Deskripsi", type: "textarea", required: true },
      { name: "kategori", label: "Kategori", type: "text", required: false },
      { name: "thumbnail", label: "Thumbnail", type: "file", required: false },
      { name: "demo_url", label: "Demo URL", type: "url", required: false },
      { name: "github_url", label: "GitHub URL", type: "url", required: false },
      { name: "teknologi", label: "Teknologi (pisahkan dengan koma)", type: "text", required: false },
      { name: "status", label: "Status", type: "text", required: false },
      { name: "tanggal_mulai", label: "Tanggal Mulai", type: "date", required: false },
      { name: "tanggal_selesai", label: "Tanggal Selesai", type: "date", required: false },
    ],
  
    // Experience
    experience: [
      { name: "posisi", label: "Posisi / Jabatan", type: "text", required: true },
      { name: "perusahaan", label: "Nama Perusahaan", type: "text", required: true },
      { name: "lokasi", label: "Lokasi", type: "text", required: false },
      { name: "tipe", label: "Tipe Pekerjaan", type: "text", required: false },
      { name: "deskripsi", label: "Deskripsi", type: "textarea", required: false },
      { name: "tanggal_mulai", label: "Tanggal Mulai", type: "date", required: true },
      { name: "tanggal_selesai", label: "Tanggal Selesai", type: "date", required: false },
      { name: "masih_bekerja", label: "Masih Bekerja", type: "checkbox", required: false },
    ],
  
    // Education
    education: [
      { name: "institusi", label: "Institusi / Universitas", type: "text", required: true },
      { name: "jurusan", label: "Jurusan", type: "text", required: false },
      { name: "jenjang", label: "Jenjang (S1, S2, dll)", type: "text", required: false },
      { name: "deskripsi", label: "Deskripsi", type: "textarea", required: false },
      { name: "tanggal_mulai", label: "Tanggal Mulai", type: "date", required: false },
      { name: "tanggal_selesai", label: "Tanggal Selesai", type: "date", required: false },
      { name: "ipk", label: "IPK", type: "number", required: false },
    ],
  
    // Certificate
    certificate: [
      { name: "nama", label: "Nama Sertifikat", type: "text", required: true },
      { name: "penyelenggara", label: "Penyelenggara", type: "text", required: false },
      { name: "tanggal_terbit", label: "Tanggal Terbit", type: "date", required: false },
      { name: "tanggal_kadaluarsa", label: "Tanggal Kadaluarsa", type: "date", required: false },
      { name: "credential_id", label: "Credential ID", type: "text", required: false },
      { name: "credential_url", label: "Credential URL", type: "url", required: false },
      { name: "gambar", label: "Gambar Sertifikat", type: "file", required: false },
    ],
  
    // Contact Message (untuk admin melihat pesan)
    contact: [
      { name: "nama", label: "Nama Pengirim", type: "text", required: true },
      { name: "email", label: "Email Pengirim", type: "email", required: true },
      { name: "subjek", label: "Subjek", type: "text", required: false },
      { name: "pesan", label: "Pesan", type: "textarea", required: true },
      { name: "sudah_dibaca", label: "Sudah Dibaca", type: "checkbox", required: false },
    ],
  
    // Skill
    skill: [
      { name: "nama_skill", label: "Nama Skill", type: "text", required: true },
    ],
  };
  
  export default formConfig;