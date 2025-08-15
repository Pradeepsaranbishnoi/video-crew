import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LazyImage from "./LazyImage";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      setScrolled(scrollPercent > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/about", label: "회사소개" },
    { to: "/process", label: "프로세스​" },
    { to: "/portfolio", label: "차별점​" },
    { to: "/differentiation", label: "포트폴리오​" },
    { to: "/contact", label: "문의하기​" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/50 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1273px] mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <LazyImage src="./logo.svg" alt="logo" width={167} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 text-white text-[20px]">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-medium hover:text-gray-300 transition-colors font-korean"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4 text-white text-lg bg-black/80 backdrop-blur-md p-4 rounded-lg">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="font-medium hover:text-gray-300 transition-colors font-korean"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
