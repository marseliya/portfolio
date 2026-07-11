// ComponentDemo.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import CrudForm from '../admin/CrudForm';
import CrudPage from '../../pages/crudPage';
import CrudTable from './crudTable';

export default function ComponentDemo() {
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('admin'); // 'admin' atau 'hero'

  // Sample data untuk CrudTable
  const sampleData = [
    {
      id: 1,
      nama: "John Doe",
      email: "john@example.com",
      ttl: "Jakarta, 01 Jan 1990",
      nomor_hp: "081234567890",
      foto_profile: "https://via.placeholder.com/150",
      alamat: "Jl. Merdeka No. 123",
      bio: "Software Engineer dengan pengalaman 5 tahun",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      created_at: "2024-01-01"
    },
    {
      id: 2,
      nama: "Jane Smith",
      email: "jane@example.com",
      ttl: "Bandung, 15 Mar 1995",
      nomor_hp: "087654321098",
      foto_profile: "https://via.placeholder.com/150",
      alamat: "Jl. Asia Afrika No. 45",
      bio: "UI/UX Designer & Frontend Developer",
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
      created_at: "2024-01-02"
    }
  ];

  // Sample data untuk Project (dengan array)
  const projectData = [
    {
      id: 1,
      judul: "E-Commerce Website",
      deskripsi: "Full-stack e-commerce dengan React dan Node.js",
      kategori: "Web Development",
      thumbnail: "https://via.placeholder.com/300x200",
      demo_url: "https://demo.com",
      github_url: "https://github.com/project",
      teknologi: ["React", "Node.js", "PostgreSQL"],
      status: "Selesai",
      tanggal_mulai: "2024-01-01",
      tanggal_selesai: "2024-03-01"
    }
  ];

  // Sample data untuk Experience
  const experienceData = [
    {
      id: 1,
      posisi: "Senior Developer",
      perusahaan: "Tech Corp",
      lokasi: "Jakarta",
      tipe: "Full-time",
      deskripsi: "Mengembangkan aplikasi enterprise",
      tanggal_mulai: "2023-01-01",
      masih_bekerja: true
    }
  ];

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDelete(true);
  };

  const handleSubmit = (formData) => {
    console.log('Submit:', formData);
    setShowForm(false);
    setSelectedItem(null);
  };

  const handleConfirmDelete = () => {
    console.log('Delete:', selectedItem);
    setShowDelete(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tab Navigation */}
      <div className="bg-white shadow-sm p-4 flex gap-4 justify-center sticky top-0 z-50">
        <button
          onClick={() => setActiveTab('admin')}
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === 'admin' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Admin Components
        </button>
        <button
          onClick={() => setActiveTab('hero')}
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === 'hero' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Hero Radial
        </button>
      </div>

      {activeTab === 'admin' ? (
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <Navbar />
            
            <div className="mt-6 space-y-8">
              {/* Section 1: Profile Table */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Profile Table</h2>
                <div className="bg-white p-4 rounded-lg shadow">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      setShowForm(true);
                    }}
                    className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    + Add New Profile
                  </button>
                  <CrudTable
                    data={sampleData}
                    loading={false}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>

              {/* Section 2: Project Table */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Project Table</h2>
                <div className="bg-white p-4 rounded-lg shadow">
                  <CrudTable
                    data={projectData}
                    loading={false}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>

              {/* Section 3: Experience Table */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Experience Table</h2>
                <div className="bg-white p-4 rounded-lg shadow">
                  <CrudTable
                    data={experienceData}
                    loading={false}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>

              {/* Section 4: Empty State */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Empty State</h2>
                <div className="bg-white p-4 rounded-lg shadow">
                  <CrudTable
                    data={[]}
                    loading={false}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>

              {/* Section 5: Loading State */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Loading State</h2>
                <div className="bg-white p-4 rounded-lg shadow">
                  <CrudTable
                    data={[]}
                    loading={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Hero Radial - full screen
        <HeroRadial />
      )}

      {/* Modal Components */}
      {showForm && (
        <CrudForm
          resource="profile"
          initialData={selectedItem}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setSelectedItem(null);
          }}
        />
      )}

      {showDelete && (
        <DeleteModal
          item={selectedItem}
          onConfirm={handleConfirmDelete}
          onClose={() => {
            setShowDelete(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}