import { galleryVideos } from "../data/gallery";

export default function Videos() {
  return (
    <div className="pt-12 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
      {/* Header */}
      <header className="mb-16 space-y-4">
        <h1 className="font-headline text-6xl md:text-8xl italic tracking-tight text-primary-fixed-dim">
          Videos
        </h1>
        <p className="font-body text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          Watch the moments come alive — celebrations, candid clips and memories worth replaying forever.
        </p>
      </header>

      {/* Video count */}
      <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest mb-10">
        {galleryVideos.length} {galleryVideos.length === 1 ? "video" : "videos"}
      </p>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryVideos.map((video) => (
          <div
            key={video.id}
            className="group relative rounded-2xl overflow-hidden bg-surface-container-low border border-surface-container-highest hover:border-primary/40 transition-all duration-500 shadow-lg hover:shadow-primary/10 hover:shadow-2xl"
          >
            {/* Video Element (Google Drive iFrame) */}
            <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
              <iframe
                src={video.src}
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={video.title}
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="font-serif italic text-base text-on-surface group-hover:text-primary transition-colors duration-300">
                {video.title}
              </h3>
              <p className="font-sans text-[11px] text-on-surface-variant uppercase tracking-widest mt-1">
                <span className="material-symbols-outlined text-xs mr-1 align-middle">calendar_today</span>
                {video.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
