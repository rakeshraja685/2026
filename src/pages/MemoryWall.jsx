import { useState } from "react";
import { memories, memoryCategories } from "../data/memories";
import Lightbox from "../components/Lightbox";

export default function MemoryWall() {
  const [activeCategory, setActiveCategory] = useState("All Memories");
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = activeCategory === "All Memories"
    ? memories
    : memories.filter((m) => m.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="pt-12 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
      {/* Hero Section */}
      <header className="mb-20 space-y-4">
        <h1 className="font-headline text-6xl md:text-8xl italic tracking-tight text-primary-fixed-dim">
          Memory Wall
        </h1>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <p className="font-body text-on-surface-variant text-lg max-w-2xl leading-relaxed">
            A curated anthology of shared moments, whispered secrets, and the vibrant echoes of our journey. This is where the past meets the forever.
          </p>
          <button className="flex items-center gap-3 bg-surface-container-high border border-outline-variant/15 hover:border-primary/50 text-primary px-8 py-4 rounded-lg group transition-all duration-300 cursor-pointer">
            <span className="material-symbols-outlined">add_photo_alternate</span>
            <span className="font-label uppercase tracking-widest text-sm">Upload a Memory</span>
          </button>
        </div>
      </header>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        {memoryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
            className={`px-6 py-2 rounded-full text-xs font-label uppercase tracking-widest cursor-pointer transition-colors border-none outline-none ${
              activeCategory === cat
                ? "bg-primary text-on-primary"
                : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest mb-8">
        Showing {visible.length} of {filtered.length} memories
      </p>

      {/* Masonry Gallery */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
        {visible.map((memory, idx) => (
          <div
            key={memory.id}
            className="break-inside-avoid mb-8 group relative bg-surface-container-low rounded-lg overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-500 cursor-pointer"
            onClick={() => setLightboxIndex(idx)}
          >
            <img
              className="w-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              src={memory.image}
              alt={memory.title}
              loading="lazy"
            />
            <div className="p-6 space-y-2 bg-surface-container-low">
              <h3 className="font-headline text-xl italic text-primary">{memory.title}</h3>
              <p className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase">
                {memory.author} • {memory.year}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <span className="material-symbols-outlined text-primary text-5xl mb-4">photo_library</span>
          <p className="font-serif italic text-xl text-on-surface-variant">No memories in this category yet.</p>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="font-label uppercase tracking-[0.3em] text-[10px] text-on-surface-variant border-b border-outline-variant/30 pb-2 hover:text-primary hover:border-primary transition-all duration-300 bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer"
          >
            Reveal More Memories
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={visible}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((prev) => Math.min(prev + 1, visible.length - 1))}
          onPrev={() => setLightboxIndex((prev) => Math.max(prev - 1, 0))}
        />
      )}
    </div>
  );
}
