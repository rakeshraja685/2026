import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navLinks = [
  { to: "/gallery", label: "Gallery" },
  { to: "/videos", label: "Videos" },
  { to: "/yearbook", label: "Yearbook" },
  { to: "/timeline", label: "Timeline" },
  { to: "/messages", label: "Messages" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-stone-950/70 backdrop-blur-xl shadow-2xl shadow-black/40">
        <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-screen-2xl mx-auto">
          <Link to="/" className="font-serif italic text-2xl text-yellow-500">
            The Midnight Gala
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans uppercase tracking-widest text-xs transition-colors ${
                  isActive(link.to)
                    ? "text-yellow-500 border-b border-yellow-500/50 pb-1"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/messages"
              className="hidden md:inline-block bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-lg hover:scale-95 duration-200 ease-in-out border-none text-center cursor-pointer"
            >
              Sign Guestbook
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-transparent border-none cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-6 h-0.5 bg-on-surface-variant rounded-full"></span>
              <span className="w-6 h-0.5 bg-on-surface-variant rounded-full"></span>
              <span className="w-4 h-0.5 bg-on-surface-variant rounded-full self-start ml-[7px]"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden animate-fadeIn">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-surface-container shadow-2xl shadow-black/80 flex flex-col animate-slideInRight">
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/15">
              <span className="font-serif italic text-lg text-primary">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-transparent border-none cursor-pointer"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>

            <div className="flex flex-col py-6 flex-1">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={`px-8 py-4 font-sans uppercase tracking-widest text-xs transition-colors ${
                  isActive("/") ? "text-primary bg-surface-container-high" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                }`}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-8 py-4 font-sans uppercase tracking-widest text-xs transition-colors ${
                    isActive(link.to) ? "text-primary bg-surface-container-high" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="p-6 border-t border-outline-variant/15">
              <Link
                to="/messages"
                onClick={() => setMobileOpen(false)}
                className="block w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-3 text-xs font-bold uppercase tracking-widest rounded-lg text-center"
              >
                Sign Guestbook
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
