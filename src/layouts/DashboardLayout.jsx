import { useState } from "react";
import {
  Home,
  Package,
  Truck,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Wallet,
  Bike,
} from "lucide-react";
import { Link, Outlet } from "react-router";
import logo from "./../assets/logo.png";
import useRole from "../hooks/useRole";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const { role } = useRole();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Package, label: "My Parcels", path: "/dashboard/my-parcels" },
    { icon: Wallet, label: "Payments", path: "/dashboard/payment-history" },
    { icon: Truck, label: "Deliveries", path: "/deliveries" },
    ...(role === "admin"
      ? [
          {
            icon: Bike,
            label: "Approve Riders",
            path: "/dashboard/approve-rider",
          },
          {
            icon: Users,
            label: "Manage Users",
            path: "/dashboard/manage-user",
          },
        ]
      : []),

    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${isOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <Link
            to="/"
            className={`btn btn-ghost text-xl flex items-center gap-2 font-bold text-xl ${!isOpen && "hidden"}`}
          >
            <img
              className="h-10 w-10 rounded-full"
              src={logo}
              alt="Shifto Logo"
            />
            <span className="font-semibold">Shifto</span>
          </Link>

          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? "←" : "→"}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-100 ${item.active ? "bg-blue-50 text-blue-600" : ""}`}
            >
              <item.icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-4 py-3 text-red-600 cursor-pointer hover:bg-gray-100 rounded-lg">
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow-sm h-14 flex items-center px-6 justify-between">
          <h2 className="font-semibold text-lg">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span>Welcome, Admin</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">Total Parcels: 1248</div>
            <div className="bg-white p-6 rounded-xl shadow">In Transit: 342</div>
            <div className="bg-white p-6 rounded-xl shadow">Delivered Today: 89</div>
          </div> */}
          {/* Add more components here */}
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}
