import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

export const HeroSection = (): JSX.Element => {
  // Navigation items data
  const navItems = [
    { label: "Report Lost Item", href: "#" },
    { label: "Search Found Items", href: "/found-items" },
  ];

  return (
    <header className="flex items-center justify-between px-10 py-3 border-b border-[#e5e8ea] w-full">
      {/* Logo and Brand Name */}
      <div className="flex items-center gap-4">
        <div className="flex items-start">
          <div className="w-4 h-4 bg-[url(/vector---0-3.svg)] bg-[100%_100%]" />
        </div>
        <h1 className="font-bold text-lg text-[#0c141c] font-sans leading-[23px]">
          MUST Lost &amp; Found
        </h1>
      </div>

      {/* Navigation and Login Button */}
      <div className="flex items-center justify-end gap-8 flex-1">
        <nav className="h-10 flex items-center gap-9">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="font-medium text-sm text-[#0c141c] leading-[21px] font-sans"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/login">
          <Button className="h-10 px-4 py-0 bg-[#1670d3] text-[#f7f9fc] font-bold text-sm rounded-lg">
            Login / Register
          </Button>
        </Link>
      </div>
    </header>
  );
};