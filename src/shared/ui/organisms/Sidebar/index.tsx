"use client";
import { Button } from "@shared/ui/atoms";
import { Home, LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Perfil",
    href: "/dashboard/profile",
    icon: User,
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden bg-gray-800 text-white hover:bg-gray-700"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-800 shadow-lg transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* User info */}
          <div className="flex flex-col items-center justify-center space-y-2 border-b border-gray-700 p-6">
            <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-white">
                {/* {user?.nombre} {user?.apellido} */}
                Franco Ghilardi
              </h3>
              <p className="text-sm text-gray-400">
                {/* {user?.email} */}
                test@test.com
              </p>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={`flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
          {/* Logout button */}
          <div className="border-t border-gray-700 p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:bg-red-900/20 hover:text-red-300"
              //   onClick={logout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
