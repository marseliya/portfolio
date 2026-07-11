// fe/src/components/admin/DeleteModal.jsx
import PropTypes from "prop-types";

export default function DeleteModal({ item, onConfirm, onClose }) {
  // Ambil nama untuk ditampilkan
  const getItemName = () => {
    if (!item) return "data ini";
    return item?.judul || item?.nama || item?.posisi || item?.institusi || item?.title || item?.name || "data ini";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Hapus Data
          </h2>

          <p className="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus{" "}
            <span className="font-semibold text-gray-800">
              {getItemName()}
            </span>
            ? Tindakan ini tidak dapat dibatalkan.
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-colors"
            >
              Batal
            </button>

            <button
              onClick={onConfirm}
              className="px-6 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  item: PropTypes.object,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};