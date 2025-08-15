import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="bg-gray-950 text-white">
      <AdminNavbar />
      <div className="lg:ml-64">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
