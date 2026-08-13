DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS contact_message CASCADE;
DROP TABLE IF EXISTS project CASCADE;
DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS experience CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS certificate CASCADE;

CREATE TABLE certificate (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    penyelenggara VARCHAR(150),
    tanggal_terbit DATE,
    tanggal_kadaluarsa DATE,
    credential_id VARCHAR(100),
    credential_url TEXT,
    gambar TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    institusi VARCHAR(150) NOT NULL,
    jurusan VARCHAR(100),
    jenjang VARCHAR(50),
    deskripsi TEXT,
    tanggal_mulai DATE,
    tanggal_selesai DATE,
    ipk NUMERIC(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE experience (
    id SERIAL PRIMARY KEY,
    posisi VARCHAR(100) NOT NULL,
    perusahaan VARCHAR(150) NOT NULL,
    lokasi VARCHAR(100),
    tipe VARCHAR(50),
    deskripsi TEXT,
    tanggal_mulai DATE NOT NULL,
    tanggal_selesai DATE,
    masih_bekerja BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    ttl VARCHAR(100) NOT NULL,
    nomor_hp VARCHAR(20),
    foto_profile TEXT,
    alamat TEXT,
    bio TEXT,
    linkedin TEXT,
    github TEXT,
    porto TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(150) NOT NULL,
    deskripsi TEXT NOT NULL,
    kategori VARCHAR(50),
    thumbnail TEXT,
    demo_url TEXT,
    github_url TEXT,
    teknologi TEXT[],
    status VARCHAR(30) DEFAULT 'Selesai',
    tanggal_mulai DATE,
    tanggal_selesai DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_message (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subjek VARCHAR(150),
    pesan TEXT NOT NULL,
    sudah_dibaca BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profile(id) ON DELETE CASCADE,
    nama_skill VARCHAR(100) NOT NULL
);