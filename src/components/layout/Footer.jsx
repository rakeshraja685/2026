import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-stone-950 w-full overflow-hidden">
      {/* Top gold divider */}
      <div className="section-divider" />

      {/* Ambient glow orbs */}
      <div className="glow-orb w-96 h-96 -top-24 left-1/4 opacity-5" />
      <div className="glow-orb w-64 h-64 bottom-0 right-1/4 opacity-4" />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="font-serif italic text-2xl text-gradient-gold mb-5 leading-none">
              Farewell 2026
            </div>
            <p className="font-sans text-stone-500 text-xs leading-relaxed max-w-sm mb-8">
              A digital commemorative for the Class of 2023–2026. Preserving memories, celebrating bonds, and honoring the Aurelian Legacy beyond these walls.
            </p>
            {/* Social / share actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Farewell 2026",
                      text: "Check out our Class of 2026 Farewell Website!",
                      url: window.location.href,
                    }).catch(console.error);
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="w-10 h-10 border border-outline-variant/20 bg-transparent cursor-pointer rounded-full flex items-center justify-center text-stone-500 hover:border-primary/40 hover:text-primary transition-all duration-300"
                title="Share Website"
              >
                <span className="material-symbols-outlined text-base">share</span>
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="w-10 h-10 border border-outline-variant/20 bg-transparent cursor-pointer rounded-full flex items-center justify-center text-stone-500 hover:border-primary/40 hover:text-primary transition-all duration-300"
                title="Copy Link"
              >
                <span className="material-symbols-outlined text-base">link</span>
              </button>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-5">Explore</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: "/",        label: "Home"     },
                { to: "/gallery", label: "Gallery"  },
                { to: "/videos",  label: "Videos"   },
                { to: "/yearbook",label: "Yearbook" },
                { to: "/classroom",label: "Classroom" },
                { to: "/messages",label: "Messages" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="font-sans text-stone-500 text-xs hover:text-primary transition-colors duration-300 link-underline w-fit"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Quote Column */}
          <div className="md:col-span-3 md:col-start-10">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-5">A Parting Thought</h4>
            <blockquote className="font-serif italic text-stone-400 text-sm leading-relaxed border-l border-primary/20 pl-4">
              "Do not go where the path may lead, go instead where there is no path and leave a trail."
              <footer className="mt-3 font-sans text-[10px] not-italic text-stone-600 uppercase tracking-wider">— Ralph Waldo Emerson</footer>
            </blockquote>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="pulse-dot" />
            <span className="font-sans text-stone-600 text-[10px] tracking-widest uppercase">
              Class of 2023–2026 • Aurelian Legacy
            </span>
          </div>
          <span className="font-sans text-stone-700 text-[10px] tracking-widest uppercase">
            © {year} Farewell 2026 • Forging Futures
          </span>
        </div>
      </div>
    </footer>
  );
}
