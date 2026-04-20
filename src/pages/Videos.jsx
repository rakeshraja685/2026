import { useRef, useState } from "react";
import { galleryVideos } from "../data/gallery";

export default function Videos() {
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});

  function handleVideoClick(id) {
    if (playingVideo && playingVideo !== id && videoRefs.current[playingVideo]) {
      videoRefs.current[playingVideo].pause();
    }
    setPlayingVideo(id);
  }

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
            {/* Video Element */}
            <div className="relative aspect-video bg-black">
              <video
                ref={(el) => { videoRefs.current[video.id] = el; }}
                src={video.src}
                controls
                preload="metadata"
                onClick={() => handleVideoClick(video.id)}
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              >
                Your browser does not support the video tag.
              </video>

              {/* Play overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 opacity-100 transition-opacity duration-300 bg-black/20">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <span className="material-symbols-outlined text-white text-3xl ml-1">play_arrow</span>
                </div>
              </div>
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
