import { useState, useRef, useEffect } from "react";

// Local audio files from public/music/
const tracks = [
  {
    title: "Farewell Theme I",
    artist: "Our Class · 2026",
    src: "/music/theme1.mp3",
  },
  {
    title: "Farewell Theme II",
    artist: "Our Class · 2026",
    src: "/music/theme2.mp3",
  },
];

export default function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const audioRef = useRef(null);
  const startedRef = useRef(false);

  // Attempt autoplay on mount
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      })
      .catch(() => {
        // Browser blocked autoplay — wait for first user interaction
        setAutoplayBlocked(true);
      });
  }, []);

  // On first user interaction anywhere on the page, start music
  useEffect(() => {
    if (!autoplayBlocked) return;
    const startOnInteraction = () => {
      if (startedRef.current) return;
      if (!audioRef.current) return;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
          startedRef.current = true;
        })
        .catch(() => {});
    };
    window.addEventListener("click", startOnInteraction, { once: true });
    window.addEventListener("touchstart", startOnInteraction, { once: true });
    window.addEventListener("keydown", startOnInteraction, { once: true });
    return () => {
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
    };
  }, [autoplayBlocked]);

  // Sync volume whenever it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // When track changes: load + play if already playing
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    audioRef.current.volume = volume;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress(dur > 0 ? (cur / dur) * 100 : 0);
  };

  // When a track ends, move to next (loops back to first after last)
  const handleEnded = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
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
    // If more than 3 seconds in, restart current track instead
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    }
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
      {/* Audio Element — local files, no loop (we manually loop across tracks) */}
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
        preload="auto"
      />

      <div className="fixed bottom-6 right-6 z-[80]">
        {/* Expanded Player Panel */}
        {isExpanded && (
          <div
            className="mb-3 rounded-2xl shadow-2xl p-6 w-72"
            style={{
              background: "rgba(22,22,22,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(242,202,80,0.15)",
              animation: "slideUp 0.25s ease-out",
              boxShadow: "0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(242,202,80,0.08)",
            }}
          >
            {/* Track Info + Close */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Animated Music Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #f2ca50, #e8a020)" }}
                >
                  <span
                    className="material-symbols-outlined text-base"
                    style={{
                      color: "#1a1a1a",
                      animation: isPlaying ? "spin 3s linear infinite" : "none",
                    }}
                  >
                    album
                  </span>
                </div>
                <div className="min-w-0">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: "#f5f0e8", fontFamily: "serif", fontStyle: "italic" }}
                  >
                    {tracks[currentTrack].title}
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-widest truncate"
                    style={{ color: "#f2ca50", opacity: 0.8 }}
                  >
                    {tracks[currentTrack].artist}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full transition-colors bg-transparent border-none cursor-pointer"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div
              className="w-full rounded-full mb-1 cursor-pointer overflow-hidden"
              style={{ height: "4px", background: "rgba(255,255,255,0.08)" }}
              onClick={handleSeek}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(to right, #f2ca50, #e8a020)",
                  transition: "width 0.1s linear",
                }}
              />
            </div>

            {/* Time */}
            <div className="flex justify-between mb-5">
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>
                {formatTime(currentTime)}
              </span>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>
                {formatTime(duration)}
              </span>
            </div>

            {/* Track dots indicator */}
            <div className="flex justify-center gap-2 mb-5">
              {tracks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTrack(i)}
                  className="border-none cursor-pointer p-0 transition-all duration-300"
                  style={{
                    width: i === currentTrack ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background: i === currentTrack ? "#f2ca50" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mb-5">
              <button
                onClick={prevTrack}
                className="bg-transparent border-none cursor-pointer transition-opacity hover:opacity-100"
                style={{ color: "rgba(255,255,255,0.5)", opacity: 0.7 }}
              >
                <span className="material-symbols-outlined">skip_previous</span>
              </button>

              <button
                onClick={togglePlay}
                className="w-13 h-13 rounded-full flex items-center justify-center border-none cursor-pointer transition-transform hover:scale-95 active:scale-90"
                style={{
                  width: "52px",
                  height: "52px",
                  background: "linear-gradient(135deg, #f2ca50, #e8a020)",
                  boxShadow: "0 4px 20px rgba(242,202,80,0.4)",
                }}
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ color: "#1a1a1a", fontSize: "26px" }}
                >
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
              </button>

              <button
                onClick={nextTrack}
                className="bg-transparent border-none cursor-pointer transition-opacity hover:opacity-100"
                style={{ color: "rgba(255,255,255,0.5)", opacity: 0.7 }}
              >
                <span className="material-symbols-outlined">skip_next</span>
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined"
                style={{ color: "rgba(255,255,255,0.35)", fontSize: "16px" }}
              >
                volume_down
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 cursor-pointer"
                style={{
                  height: "4px",
                  borderRadius: "4px",
                  outline: "none",
                  border: "none",
                  accentColor: "#f2ca50",
                  background: `linear-gradient(to right, #f2ca50 0%, #f2ca50 ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`,
                }}
              />
              <span
                className="material-symbols-outlined"
                style={{ color: "rgba(255,255,255,0.35)", fontSize: "16px" }}
              >
                volume_up
              </span>
            </div>

            {/* Loop badge */}
            <div className="flex justify-center mt-4">
              <span
                className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] uppercase tracking-widest"
                style={{
                  background: "rgba(242,202,80,0.1)",
                  color: "#f2ca50",
                  border: "1px solid rgba(242,202,80,0.2)",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>
                  repeat
                </span>
                Looping Playlist
              </span>
            </div>
          </div>
        )}

        {/* Floating Pill Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 rounded-full px-5 py-3 border-none cursor-pointer transition-all duration-300 group relative"
          style={{
            background: "rgba(22,22,22,0.92)",
            backdropFilter: "blur(20px)",
            border: isPlaying
              ? "1px solid rgba(242,202,80,0.5)"
              : "1px solid rgba(255,255,255,0.08)",
            boxShadow: isPlaying
              ? "0 4px 24px rgba(242,202,80,0.2), 0 2px 8px rgba(0,0,0,0.6)"
              : "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          {/* Pulsing ring hint when autoplay is blocked */}
          {autoplayBlocked && (
            <span
              className="absolute inset-0 rounded-full"
              style={{ animation: "ringPulse 1.8s ease-out infinite", border: "2px solid rgba(242,202,80,0.6)" }}
            />
          )}
          <span
            className="material-symbols-outlined text-xl"
            style={{
              color: "#f2ca50",
              animation: isPlaying ? "pulse 1.5s ease-in-out infinite" : "none",
            }}
          >
            music_note
          </span>
          {!isExpanded && (
            <span
              className="text-xs hidden sm:inline transition-colors"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "sans-serif" }}
            >
              {autoplayBlocked ? "Tap anywhere to play 🎵" : tracks[currentTrack].title}
            </span>
          )}
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.15); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ringPulse {
          0%   { transform: scale(1);    opacity: 0.8; }
          70%  { transform: scale(1.18); opacity: 0; }
          100% { transform: scale(1.18); opacity: 0; }
        }
      `}</style>
    </>
  );
}
