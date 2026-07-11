// fe/src/components/admin/CrudTable.jsx
import PropTypes from "prop-types";

export default function CrudTable({
  data = [],
  loading = false,
  onEdit,
  onDelete,
  title = "Data",
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-500">Memuat data...</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-lg font-semibold text-gray-700">Tidak ada data</h3>
        <p className="text-gray-500 mt-2">Belum ada {title} yang tersimpan</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]).filter(
    (key) =>
      key !== "password" &&
      key !== "__v" &&
      key !== "createdAt" &&
      key !== "updatedAt" &&
      key !== "id"
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                No
              </th>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {column.replace(/_/g, " ").toUpperCase()}
                </th>
              ))}
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr 
                key={row.id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-3 text-sm text-gray-500">
                  {index + 1}
                </td>
                {columns.map((column) => (
                  <td
                    key={column}
                    className="px-4 py-3 text-sm text-gray-700"
                  >
                    {renderValue(row[column])}
                  </td>
                ))}

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(row)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200 transition-colors duration-150 flex items-center gap-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(row)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors duration-150 flex items-center gap-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Hapus
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
  if (value === null || value === undefined) {
    return <span className="text-gray-400">-</span>;
  }

  if (typeof value === "boolean") {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {value ? "Ya" : "Tidak"}
      </span>
    );
  }

  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((item, i) => (
            <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
              {item}
            </span>
          ))}
        </div>
      );
    }
    return <span className="text-gray-500 text-xs">{JSON.stringify(value)}</span>;
  }

  if (typeof value === "string" && value.startsWith("http") && 
      (value.includes(".png") || value.includes(".jpg") || value.includes(".jpeg") || 
       value.includes(".gif") || value.includes(".webp") || value.includes("via.placeholder.com"))) {
    return (
      <img
        src={value}
        alt=""
        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
        onError={(e) => e.target.style.display = 'none'}
      />
    );
  }

  if (typeof value === "string" && value.length > 60) {
    return (
      <span className="block max-w-xs truncate" title={value}>
        {value.substring(0, 60)}...
      </span>
    );
  }

  return value;
}

CrudTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string,
};