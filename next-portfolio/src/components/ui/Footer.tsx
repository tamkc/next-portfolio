import Link from "next/link";
import Wrapper from "../Wrapper";
import { Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white h-24 md:h-28 relative">
      <Wrapper>
        <div className="border-t border-gray-700" />

        <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          {/* Copyright and additional information */}
          <div className="text-center md:text-left pb-2 md:pb-0">
            <p className="text-lg">
              &copy; {new Date().getFullYear()} Peter Tam&apos;s Portfolio.
            </p>
            <p className="text-lg text-gray-400">
              Built with Next.js and Tailwind CSS
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center justify-center space-x-6 md:space-x-8">
            <Link
              href="https://www.linkedin.com/in/kam-chuen-tam-24a8241b7/"
              aria-label="LinkedIn"
              className="hover:text-gray-300"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="https://github.com/tamkc"
              aria-label="GitHub"
              className="hover:text-gray-300"
            >
              <Github size={20} />
            </Link>
            <Link
              href="mailto:tamkc1999@gmail.com"
              aria-label="Email"
              className="hover:text-gray-300"
            >
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
