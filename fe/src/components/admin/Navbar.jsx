// fe/src/components/admin/Navbar.jsx
import { getUser } from "../../service/auth";

export default function Navbar() {
  const user = getUser();

  return (
    <header className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Portfolio Admin</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          {user?.name?.charAt(0)?.toUpperCase() || "A"}
        </div>

        <div className="text-right">
          <h3 className="font-semibold text-gray-800">
            {user?.name || "Administrator"}
          </h3>

          <p className="text-sm text-gray-500">
            {user?.email || ""}
          </p>
        </div>
      </div>
    </header>
  );
}