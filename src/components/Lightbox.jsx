import { useEffect, useCallback } from "react";

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const current = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high/80 text-on-surface hover:bg-primary hover:text-on-primary transition-all border-none outline-none cursor-pointer"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <span className="material-symbols-outlined text-2xl">close</span>
      </button>

      {/* Previous */}
      {currentIndex > 0 && (
        <button
          className="absolute left-4 md:left-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high/60 text-on-surface hover:bg-primary hover:text-on-primary transition-all border-none outline-none cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
        >
          <span className="material-symbols-outlined text-2xl">chevron_left</span>
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.src || current.image}
          alt={current.title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl animate-scaleIn"
          loading="lazy"
        />
        <div className="text-center">
          <h3 className="font-serif italic text-xl text-on-surface">{current.title}</h3>
          {current.photographer && (
            <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest mt-1">
              by {current.photographer}
            </p>
          )}
          {current.author && !current.photographer && (
            <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest mt-1">
              by {current.author}
            </p>
          )}
          <p className="font-sans text-xs text-stone-600 mt-2">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Next */}
      {currentIndex < images.length - 1 && (
        <button
          className="absolute right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high/60 text-on-surface hover:bg-primary hover:text-on-primary transition-all border-none outline-none cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          <span className="material-symbols-outlined text-2xl">chevron_right</span>
        </button>
      )}
    </div>
  );
}
