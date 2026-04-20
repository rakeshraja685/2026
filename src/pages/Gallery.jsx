import { useState } from "react";
import { galleryPhotos, galleryCategories } from "../data/gallery";
import Lightbox from "../components/Lightbox";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = activeCategory === "All"
    ? galleryPhotos
    : galleryPhotos.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-12 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
      {/* Header */}
      <header className="mb-16 space-y-4">
        <h1 className="font-headline text-6xl md:text-8xl italic tracking-tight text-primary-fixed-dim">
          Gallery
        </h1>
        <p className="font-body text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          Every photograph tells a story. Browse through the moments that made us who we are — from grand events to quiet, candid instants.
        </p>
      </header>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-xs font-sans uppercase tracking-widest cursor-pointer transition-colors border-none outline-none ${
              activeCategory === cat
                ? "bg-primary text-on-primary"
                : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo count */}
      <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest mb-8">
        {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
      </p>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
        {filtered.map((photo, idx) => (
          <div
            key={photo.id}
            className="break-inside-avoid mb-6 group relative rounded-lg overflow-hidden cursor-pointer bg-surface-container-low border border-transparent hover:border-primary/30 transition-all duration-500"
            onClick={() => setLightboxIndex(idx)}
          >
            <img
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              className="w-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="font-serif italic text-lg text-on-surface">{photo.title}</h3>
              <p className="font-sans text-[10px] text-stone-400 uppercase tracking-widest mt-1">
                {photo.photographer} • {photo.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <span className="material-symbols-outlined text-primary text-5xl mb-4">photo_library</span>
          <p className="font-serif italic text-xl text-on-surface-variant">No photos in this category yet.</p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((prev) => Math.min(prev + 1, filtered.length - 1))}
          onPrev={() => setLightboxIndex((prev) => Math.max(prev - 1, 0))}
        />
      )}
    </div>
  );
}
