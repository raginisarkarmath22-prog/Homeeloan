import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  LogOut,
  LayoutDashboard,
  BarChart2,
  NotebookText,
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "lucide-react";
import { FcCustomerSupport } from "react-icons/fc";

import { AiOutlineBank } from "react-icons/ai";

const AdminSidebar = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, path: "/admin" },
    { name: "Home", icon: <Home />, path: "/admin/" },
    { name: "Users", icon: <Users />, path: "/admin/Users" },
    { name: "Customer", icon: < FcCustomerSupport size={25} />, path: "/admin/Eligibility" },
    { name: "Banks", icon: <AiOutlineBank size={20} />, path: "/admin/banks" },
    { name: "SEO", icon: <BarChart2 />, path: "/admin/Seo" },
    { name: "Blog", icon: <NotebookText />, path: "/" },
  ];

  return (
    <div
      className={`h-screen fixed top-0 left-0 z-50 bg-blue-600 text-white border-r border-gray-700 transition-all duration-300 ${collapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Header */}
      <div className="flex  items-center justify-between p-4 border-b border-blue-700">
        {!collapsed && <span className="text-xl font-bold">Admin Panel</span>}
        <button
          onClick={toggleSidebar}
          className="px-2 rounded cursor-pointer hidden md:block "
        >
          {collapsed ? <ArrowRightCircleIcon /> : <ArrowLeftCircleIcon />}
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex  flex-col p-2 mt-10 gap-8">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 cursor-pointer p-2 hover:bg-blue-500 rounded transition"
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="fixed left-2 md:left-0 bottom-10 md:bottom-4 w-full px-2">
        <button
          onClick={() => navigate("/logout")}
          className="flex items-center gap-3 p-2 w-fit cursor-pointer text-white rounded transition "
        >
          <LogOut className="text-red-500" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
