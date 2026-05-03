import { useState } from "react";
import { createPortal } from "react-dom";
import { galleryPhotos, galleryCategories } from "../data/gallery";
import Lightbox from "../components/Lightbox";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeCategory === "All"
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeCategory);

  function openLightbox(idx) {
    setLightboxIndex(idx);
  }

  return (
    <div className="pt-12 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto route-transition">
      {/* Header */}
      <header className="mb-16 space-y-5">
        <div className="pill-badge">
          <span className="material-symbols-outlined text-xs">photo_library</span>
          Memory Archive
        </div>
        <h1 className="font-serif italic text-6xl md:text-8xl tracking-tight text-gradient-gold leading-none">
          Gallery
        </h1>
        <p className="font-body text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          Every photograph tells a story. Browse through the moments that made us
          who we are — from grand events to quiet, candid instants.
        </p>
      </header>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-[11px] font-sans font-bold uppercase tracking-widest cursor-pointer transition-all duration-300 border outline-none ${
              activeCategory === cat
                ? "bg-primary text-on-primary border-primary filter-pill-active"
                : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high border-outline-variant/20 hover:border-primary/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo count */}
      <p className="font-sans text-[11px] text-on-surface-variant uppercase tracking-widest mb-10">
        <span className="text-primary font-bold">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "photo" : "photos"}
      </p>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((photo, idx) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => openLightbox(idx)}
            className="group relative rounded-xl overflow-hidden cursor-pointer bg-surface-container-low border border-transparent hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-black/50 text-left p-0"
            style={{ aspectRatio: "1 / 1" }}
          >
            <img
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <p className="font-serif italic text-sm text-white leading-tight truncate">
                {photo.title}
              </p>
              <p className="font-sans text-[9px] text-stone-300 uppercase tracking-wider mt-0.5 truncate">
                {photo.photographer}
              </p>
            </div>
            {/* Expand icon */}
            <div className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="material-symbols-outlined text-white text-sm">open_in_full</span>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <span className="material-symbols-outlined text-primary text-5xl mb-4">
            photo_library
          </span>
          <p className="font-serif italic text-xl text-on-surface-variant">
            No photos in this category yet.
          </p>
        </div>
      )}

      {/* Lightbox — rendered in portal to avoid any z-index/overflow clipping */}
      {lightboxIndex !== null &&
        createPortal(
          <Lightbox
            images={filtered}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNext={() =>
              setLightboxIndex((prev) => Math.min(prev + 1, filtered.length - 1))
            }
            onPrev={() =>
              setLightboxIndex((prev) => Math.max(prev - 1, 0))
            }
          />,
          document.body
        )}
    </div>
  );
}
