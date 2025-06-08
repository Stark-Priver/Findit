import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../../hooks/useAuth";

export const Navbar = (): JSX.Element => {
  const { isAuthenticated, logout, user } = useAuth();

  const navItems = [
    { label: "Report Lost Item", href: "/report-lost-item" },
    { label: "Report Found Item", href: "/report-found-item" },
    { label: "Search Found Items", href: "/found-items" },
  ];

  return (
    <header className="flex items-center justify-between px-10 py-3 border-b border-[#e5e8ea] bg-white">
      <Link to="/" className="flex items-center gap-4">
        <div className="w-4 h-4 bg-[url(/vector---0-3.svg)] bg-[100%_100%]" />
        <h1 className="font-bold text-lg text-[#0c141c] font-sans leading-[23px]">
          MUST Lost & Found
        </h1>
      </Link>

      <div className="flex items-center justify-end gap-8 flex-1">
        <nav className="h-10 flex items-center gap-9">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="font-medium text-sm text-[#0c141c] leading-[21px] font-sans hover:text-[#1670d3] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin">
                <Button className="bg-purple-600 hover:bg-purple-700">Admin</Button>
              </Link>
            )}
            <Button 
              onClick={logout}
              variant="ghost"
              className="text-red-600 hover:text-red-700"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button className="h-10 px-4 py-0 bg-[#1670d3] text-[#f7f9fc] font-bold text-sm rounded-lg">
              Login / Register
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};