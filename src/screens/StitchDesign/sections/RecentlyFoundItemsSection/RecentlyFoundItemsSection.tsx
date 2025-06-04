import React from "react";

export const RecentlyFoundItemsSection = (): JSX.Element => {
  // Footer navigation links data
  const footerLinks = [
    { title: "About", href: "#" },
    { title: "Contact", href: "#" },
    { title: "Terms of Service", href: "#" },
    { title: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="w-full flex items-start justify-center">
      <div className="flex-1 max-w-[960px] flex flex-col items-start">
        <div className="w-full py-10 px-5 flex flex-col items-start gap-6">
          <nav className="w-full flex flex-wrap items-center justify-between gap-[24px_24px]">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="w-40 flex flex-col items-center"
              >
                <span className="w-full text-center font-normal text-base text-[#4f7096] leading-6 font-sans">
                  {link.title}
                </span>
              </a>
            ))}
          </nav>

          <div className="w-full flex items-center flex-col">
            <p className="w-full text-center font-normal text-base text-[#4f7096] leading-6 font-sans">
              © 2023 Mbeya University of Science and Technology. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
