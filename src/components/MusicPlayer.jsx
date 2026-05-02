import { useState, useRef, useEffect } from "react";

// Free-to-use ambient/nostalgic tracks from Pixabay CDN
const tracks = [
  {
    title: "Golden Memories",
    artist: "Ambient Dreams",
    src: "https://cdn.pixabay.com/audio/2022/10/16/audio_12a5a71869.mp3",
  },
  {
    title: "Nostalgic Piano",
    artist: "Peaceful Moments",
    src: "https://cdn.pixabay.com/audio/2023/06/05/audio_9461de3e7b.mp3",
  },
  {
    title: "Farewell Strings",
    artist: "Legacy Ensemble",
    src: "https://cdn.pixabay.com/audio/2022/10/16/audio_aae4a08d26.mp3",
  },
];

export default function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Load new track when currentTrack changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrack]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress(dur > 0 ? (cur / dur) * 100 : 0);
  };

  const handleEnded = () => {
    nextTrack();
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    audioRef.current.currentTime = ratio * duration;
  };

  const formatTime = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
        preload="metadata"
      >
        <source src={tracks[currentTrack].src} type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-6 right-6 z-[80]">
        {/* Expanded Player */}
        {isExpanded && (
          <div
            className="mb-3 bg-surface-container-high/90 backdrop-blur-xl border border-outline-variant/15 rounded-2xl shadow-2xl shadow-black/60 p-6 w-72 animate-slideUp"
            style={{ animation: "slideUp 0.25s ease-out" }}
          >
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

            {/* Progress Bar (clickable) */}
            <div
              className="w-full h-2 bg-surface-container-lowest rounded-full mb-1 overflow-hidden cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(to right, #f2ca50, #e8a020)",
                }}
              />
            </div>

            {/* Time display */}
            <div className="flex justify-between mb-4">
              <span className="text-[10px] text-on-surface-variant font-sans">
                {formatTime(currentTime)}
              </span>
              <span className="text-[10px] text-on-surface-variant font-sans">
                {formatTime(duration)}
              </span>
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
                className="w-12 h-12 rounded-full text-on-primary flex items-center justify-center hover:scale-95 transition-transform border-none cursor-pointer shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #f2ca50, #e8a020)",
                  boxShadow: "0 4px 15px rgba(242,202,80,0.3)",
                }}
              >
                <span className="material-symbols-outlined text-2xl" style={{ color: "#1a1a1a" }}>
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
                className="flex-1 h-1 cursor-pointer"
                style={{
                  accentColor: "#f2ca50",
                  background: `linear-gradient(to right, #f2ca50 0%, #f2ca50 ${volume * 100}%, #353534 ${volume * 100}%, #353534 100%)`,
                  height: "4px",
                  borderRadius: "4px",
                  outline: "none",
                  border: "none",
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
          className="flex items-center gap-3 backdrop-blur-xl border rounded-full px-5 py-3 shadow-2xl transition-all duration-300 group cursor-pointer"
          style={{
            background: "rgba(30,30,30,0.88)",
            borderColor: isPlaying ? "rgba(242,202,80,0.45)" : "rgba(255,255,255,0.08)",
            boxShadow: isPlaying
              ? "0 4px 24px rgba(242,202,80,0.18), 0 2px 8px rgba(0,0,0,0.5)"
              : "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{
              color: "#f2ca50",
              animation: isPlaying ? "pulse 2s infinite" : "none",
            }}
          >
            music_note
          </span>
          {!isExpanded && (
            <span className="font-sans text-xs text-on-surface-variant group-hover:text-on-surface transition-colors hidden sm:inline">
              {tracks[currentTrack].title}
            </span>
          )}
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}
