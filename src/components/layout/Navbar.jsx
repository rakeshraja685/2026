import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const navLinks = [
  { to: "/gallery",   label: "Gallery"  },
  { to: "/videos",    label: "Videos"   },
  { to: "/yearbook",  label: "Yearbook" },
  { to: "/classroom", label: "Classroom" },
  { to: "/messages",  label: "Messages" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  const isActive = (path) => location.pathname === path;

  // Add shadow + stronger blur after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 nav-premium ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-12 max-w-screen-2xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif italic text-xl md:text-2xl text-gradient-gold hover:opacity-80 transition-opacity duration-300 leading-none"
          >
            Farewell 2026
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans uppercase tracking-widest text-[11px] transition-all duration-300 link-underline ${
                  isActive(link.to)
                    ? "text-primary"
                    : "text-stone-400 hover:text-stone-100"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="block h-px w-full bg-gradient-to-r from-primary/60 to-transparent mt-0.5" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* CTA Button */}
            <Link
              to="/messages"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded-lg border-none cursor-pointer transition-all duration-300 bg-gradient-to-br from-primary to-primary-container text-on-primary hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 active:scale-95"
            >
              Sign Guestbook
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] bg-transparent border-none cursor-pointer group"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-6 h-px bg-stone-400 group-hover:bg-primary rounded-full transition-colors duration-300" />
              <span className="w-6 h-px bg-stone-400 group-hover:bg-primary rounded-full transition-colors duration-300" />
              <span className="w-4 h-px bg-stone-400 group-hover:bg-primary rounded-full transition-colors duration-300 self-start ml-[5px]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden animate-fadeIn">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] glass-card flex flex-col animate-slideInRight">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
              <span className="font-serif italic text-lg text-gradient-gold">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 flex items-center justify-center bg-surface-container-high rounded-full border-none cursor-pointer hover:bg-surface-container-highest transition-colors"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-lg">close</span>
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col py-4 flex-1 overflow-y-auto">
              <Link
                to="/"
                className={`px-8 py-4 font-sans uppercase tracking-widest text-xs transition-all duration-200 flex items-center gap-3 ${
                  isActive("/")
                    ? "text-primary bg-surface-container-high border-r-2 border-primary"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                }`}
              >
                <span className="material-symbols-outlined text-base">home</span>
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-8 py-4 font-sans uppercase tracking-widest text-xs transition-all duration-200 flex items-center gap-3 ${
                    isActive(link.to)
                      ? "text-primary bg-surface-container-high border-r-2 border-primary"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {link.to === "/gallery" ? "photo_library" : link.to === "/videos" ? "movie" : link.to === "/yearbook" ? "group" : link.to === "/classroom" ? "view_in_ar" : "edit_note"}
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="p-6 border-t border-outline-variant/10">
              <Link
                to="/messages"
                className="block w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-3.5 text-xs font-bold uppercase tracking-widest rounded-xl text-center hover:shadow-lg hover:shadow-primary/20 transition-shadow"
              >
                Sign Guestbook
              </Link>
              <p className="text-center text-[10px] text-stone-600 uppercase tracking-widest mt-4">
                Farewell 2026 • Class of 2023–2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
