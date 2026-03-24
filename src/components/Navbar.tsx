"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, Menu, User, Briefcase, MapPin } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Jobs", path: "/jobs" },
    { label: "Services", path: "/#services" },
    { label: "Contact", path: "/#contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/logo.jpg"
                alt="Green Jobs"
                className="h-10 w-auto rounded"
              />
              <div className="flex items-center text-green-600 font-bold text-xl ml-2">
                Green Jobs HR
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${pathname === item.path ? "text-green-600" : "text-gray-600"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
                  className="text-gray-600 hover:text-green-600 font-medium flex items-center"
                >
                  <User className="w-4 h-4 mr-1" />
                  {session.user.role === "ADMIN" ? "Admin" : "Dashboard"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-500 hover:text-red-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-green-600 font-medium hover:text-green-700 transition"
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  className="bg-green-600 text-white px-5 py-2 rounded-full font-medium hover:bg-green-700 transition shadow-md shadow-green-200"
                >
                  Register Now
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100">
            {session ? (
              <>
                <Link
                  onClick={() => setIsOpen(false)}
                  href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
                >
                  {session.user.role === "ADMIN"
                    ? "Admin Dashboard"
                    : "My Dashboard"}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-green-600 hover:bg-green-50"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/login"
                  className="block px-3 py-2 text-base font-medium bg-green-600 text-white rounded-md mt-2"
                >
                  Register Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
