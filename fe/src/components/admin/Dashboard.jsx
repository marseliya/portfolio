// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    profile: 0,
    education: 0,
    experience: 0,
    projects: 0,
    certificates: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoints = ['profile', 'education', 'experience', 'project', 'certificate', 'contact'];
        const results = await Promise.all(
          endpoints.map(async (endpoint) => {
            const res = await fetch(`http://localhost:3000/api/${endpoint}`);
            const data = await res.json();
            return { [endpoint]: Array.isArray(data) ? data.length : 0 };
          })
        );
        
        const statsData = Object.assign({}, ...results);
        setStats({
          profile: statsData.profile || 0,
          education: statsData.education || 0,
          experience: statsData.experience || 0,
          projects: statsData.project || 0,
          certificates: statsData.certificate || 0,
          messages: statsData.contact || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    { label: 'Profile', value: stats.profile, icon: '👤', color: 'bg-blue-50' },
    { label: 'Education', value: stats.education, icon: '🎓', color: 'bg-green-50' },
    { label: 'Experience', value: stats.experience, icon: '💼', color: 'bg-purple-50' },
    { label: 'Projects', value: stats.projects, icon: '🚀', color: 'bg-pink-50' },
    { label: 'Certificates', value: stats.certificates, icon: '📜', color: 'bg-amber-50' },
    { label: 'Messages', value: stats.messages, icon: '✉️', color: 'bg-rose-50' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-light text-gray-800 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statItems.map((item) => (
          <div key={item.label} className={`${item.color} rounded-xl p-6 border border-gray-200/50`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-light">{item.label}</p>
                <p className="text-2xl font-light text-gray-800 mt-1">{item.value}</p>
              </div>
              <span className="text-3xl">{item.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}