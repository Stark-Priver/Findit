import React from "react";
import { Link } from "react-router-dom";

const footerLinks = [
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "Terms of Service", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy" },
];

export const Footer = (): JSX.Element => (
  <footer className="w-full flex items-start justify-center">
    <div className="flex-1 max-w-[960px] flex flex-col items-start">
      <div className="w-full py-10 px-5 flex flex-col items-start gap-6">
        <nav className="w-full flex flex-wrap items-center justify-between gap-[24px_24px]">
          {footerLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="w-40 flex flex-col items-center"
            >
              <span className="w-full text-center font-normal text-base text-[#4f7096] leading-6 font-sans">
                {link.title}
              </span>
            </Link>
          ))}
        </nav>
        <div className="w-full flex items-center flex-col">
          <p className="w-full text-center font-normal text-base text-[#4f7096] leading-6 font-sans">
            © 2023 Mbeya University of Science and Technology. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);
