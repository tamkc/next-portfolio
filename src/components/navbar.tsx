"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
interface NavbarProps {
  scrollToSection: (index: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionIndex: number
  ) => {
    event.preventDefault();
    scrollToSection(sectionIndex);
  };

  return (
    <nav className="bg-gray-100 text-black w-full top-0 z-49 sticky">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Toggle Menu Button (visible on mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center p-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Normal Menu (centered and visible on larger screens) */}
          <div className="hidden md:block w-full">
            <div className="flex justify-center items-baseline space-x-4">
              <Link
                href="/#home"
                className="px-3 py-2 rounded-md border-black hover:border text-lg font-medium hover:bg-gray-300"
                onClick={(e) => handleLinkClick(e, 0)}
              >
                Home
              </Link>
              <Link
                href="/#tech"
                className="px-3 py-2 rounded-md border-black hover:border text-lg font-medium hover:bg-gray-300"
                onClick={(e) => handleLinkClick(e, 1)}
              >
                Tech Stack
              </Link>
              <Link
                href="/#project"
                className="px-3 py-2 rounded-md border-black hover:border text-lg font-medium hover:bg-gray-300"
                onClick={(e) => handleLinkClick(e, 2)}
              >
                Project
              </Link>
              <Link
                href="/#contact"
                className="px-3 py-2 rounded-md border-black hover:border text-lg font-medium hover:bg-gray-300"
                onClick={(e) => handleLinkClick(e, 3)}
              >
                contact
              </Link>
            </div>
          </div>

          {/* Mobile Menu Items (visible when toggle is active) */}
          {isOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-100 z-50">
              <div className="flex flex-col space-y-2 p-4 z-10">
                <Link
                  href="/#tech"
                  className="px-3 py-2 rounded-md border-black hover:border text-lg font-medium hover:bg-gray-300"
                >
                  Tech Stack
                </Link>
                <Link
                  href="/#project"
                  className="px-3 py-2 rounded-md border-black hover:border text-lg font-medium hover:bg-gray-300"
                >
                  Project
                </Link>
                <Link
                  href="/#contact"
                  className="px-3 py-2 rounded-md border-black hover:border text-lg font-medium hover:bg-gray-300"
                >
                  contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
