import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-stone-950 w-full py-16 px-6 md:px-12 border-t border-stone-800/20">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-serif italic text-xl text-yellow-500 mb-4">Farewell 2026</div>
            <p className="font-sans text-stone-500 text-xs leading-relaxed max-w-xs">
              A digital commemorative for the Class of 2023 to 2026. Preserving memories, celebrating bonds, and honoring the Aurelian Legacy.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-widest text-stone-400 mb-4">Explore</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="font-sans text-stone-500 text-xs hover:text-yellow-500 transition-colors">Home</Link>
              <Link to="/gallery" className="font-sans text-stone-500 text-xs hover:text-yellow-500 transition-colors">Gallery</Link>
              <Link to="/videos" className="font-sans text-stone-500 text-xs hover:text-yellow-500 transition-colors">Videos</Link>
              <Link to="/yearbook" className="font-sans text-stone-500 text-xs hover:text-yellow-500 transition-colors">Yearbook</Link>
              <Link to="/3d-model" className="font-sans text-stone-500 text-xs hover:text-yellow-500 transition-colors">3D Model</Link>
              <Link to="/messages" className="font-sans text-stone-500 text-xs hover:text-yellow-500 transition-colors">Messages</Link>
            </div>
          </div>

          {/* Share */}
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-widest text-stone-400 mb-4">Share the Memories</h4>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Farewell 2026',
                      text: 'Check out our Class of 2026 Farewell Website!',
                      url: window.location.href,
                    }).catch(console.error);
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="w-10 h-10 border-none outline-none cursor-pointer rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all shadow-sm"
                title="Share Website"
              >
                <span className="material-symbols-outlined text-lg">share</span>
              </button>
              
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                    .then(() => alert("Link copied to clipboard!"))
                    .catch(console.error);
                }}
                className="w-10 h-10 border-none outline-none cursor-pointer rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all shadow-sm"
                title="Copy Link"
              >
                <span className="material-symbols-outlined text-lg">link</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800/30 pt-8 text-center">
          <div className="font-sans text-stone-500 text-[10px] tracking-widest uppercase">
            © Class of 2023 to 2026 • Farewell 2026 • Forging Futures
          </div>
        </div>
      </div>
    </footer>
  );
}
