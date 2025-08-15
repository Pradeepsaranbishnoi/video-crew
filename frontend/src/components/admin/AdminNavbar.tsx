import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Upload,
  LogOut,
  Menu,
  X,
  User
} from "lucide-react";

export default function AdminNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const role = localStorage.getItem("user_role");

    if (!token || role !== "admin") {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  const menuItems = [
    {
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      label: "대시보드",
      active: location.pathname === "/admin/dashboard"
    },
    {
      href: "/admin/portfolio",
      icon: FolderOpen,
      label: "포트폴리오",
      active: location.pathname === "/admin/portfolio"
    },
    {
      href: "/admin/contacts",
      icon: MessageSquare,
      label: "문의 관리",
      active: location.pathname === "/admin/contacts"
    },
    {
      href: "/admin/media",
      icon: Upload,
      label: "미디어 관리",
      active: location.pathname === "/admin/media"
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white font-korean">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-950 text-white">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight font-english">VIDEO</span>
              <span className="text-xs bg-white text-black px-2 py-0.5 rounded font-medium font-english">
                CREW
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1 font-korean">관리자 패널</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        item.active
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-korean">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
                             <div>
                 <p className="text-sm font-medium font-korean">관리자</p>
                 <p className="text-xs text-gray-400 font-english">admin@videocrew.com</p>
               </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
                             <span className="font-korean">로그아웃</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
                         <h1 className="text-xl font-semibold font-korean">
               {menuItems.find((item) => item.active)?.label || "관리자 패널"}
             </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                {new Date().toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </span>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
