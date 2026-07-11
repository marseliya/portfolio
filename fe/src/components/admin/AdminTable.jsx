// src/components/admin/AdminTable.jsx
import React from 'react';

export default function AdminTable({ 
  data = [], 
  columns, 
  onEdit, 
  onDelete,
  loading = false,
  title = 'Data'
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600"></div>
        <p className="text-gray-400 text-sm mt-2">Loading...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
        <p className="text-gray-400 text-sm">No {title} found</p>
      </div>
    );
  }

  // Filter columns yang ada di data
  const availableColumns = columns.filter(col => 
    data.some(item => item[col.key] !== undefined)
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {availableColumns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {availableColumns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                    {renderValue(item[col.key])}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="px-3 py-1 text-xs bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="px-3 py-1 text-xs bg-red-50 text-red-700 hover:bg-red-100 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderValue(value) {
  if (value === null || value === undefined) return <span className="text-gray-400">-</span>;
  if (typeof value === 'boolean') return value ? '✓ Yes' : '✗ No';
  if (typeof value === 'object') {
    if (Array.isArray(value)) return value.join(', ');
    return JSON.stringify(value);
  }
  if (typeof value === 'string' && value.length > 100) return value.substring(0, 100) + '...';
  if (typeof value === 'string' && value.startsWith('http')) {
    return <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link</a>;
  }
  return value;
}