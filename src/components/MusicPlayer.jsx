import { useState, useRef, useEffect } from "react";

const tracks = [
  { title: "Golden Memories", artist: "Ambient Dreams" },
  { title: "Midnight Serenade", artist: "Piano Nocturne" },
  { title: "The Final Waltz", artist: "Legacy Ensemble" },
];

export default function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      {/* Expanded Player */}
      {isExpanded && (
        <div className="mb-3 bg-surface-container-high/90 backdrop-blur-xl border border-outline-variant/15 rounded-2xl shadow-2xl shadow-black/60 p-6 w-72 animate-slideUp">
          {/* Track Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 min-w-0">
              <p className="font-serif italic text-sm text-on-surface truncate">
                {tracks[currentTrack].title}
              </p>
              <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-widest">
                {tracks[currentTrack].artist}
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors bg-transparent border-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Fake Progress Bar */}
          <div className="w-full h-1 bg-surface-container-lowest rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-300"
              style={{ width: isPlaying ? "45%" : "0%" }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <button
              onClick={prevTrack}
              className="text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              <span className="material-symbols-outlined">skip_previous</span>
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center hover:scale-95 transition-transform border-none cursor-pointer shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-2xl">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
            <button
              onClick={nextTrack}
              className="text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              <span className="material-symbols-outlined">skip_next</span>
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-on-surface-variant text-sm">
              volume_down
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1 accent-primary cursor-pointer"
              style={{
                background: `linear-gradient(to right, #f2ca50 0%, #f2ca50 ${volume * 100}%, #353534 ${volume * 100}%, #353534 100%)`,
              }}
            />
            <span className="material-symbols-outlined text-on-surface-variant text-sm">
              volume_up
            </span>
          </div>
        </div>
      )}

      {/* Floating Pill Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-3 bg-surface-container-high/90 backdrop-blur-xl border border-outline-variant/15 rounded-full px-5 py-3 shadow-2xl shadow-black/40 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
      >
        <span className={`material-symbols-outlined text-primary text-xl ${isPlaying ? "animate-pulse" : ""}`}>
          music_note
        </span>
        {!isExpanded && (
          <span className="font-sans text-xs text-on-surface-variant group-hover:text-on-surface transition-colors hidden sm:inline">
            {tracks[currentTrack].title}
          </span>
        )}
      </button>
    </div>
  );
}
