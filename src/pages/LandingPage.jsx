import { Link } from "react-router-dom";
import AnimatedCounter from "../components/AnimatedCounter";
import { useEffect, useRef, useState, useMemo } from "react";
import { galleryPhotos } from "../data/gallery";

const sectionSlides = [
  "/images/sliding images/WhatsApp Image 2026-04-10 at 1.05.48 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-04-10 at 1.05.50 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-04-10 at 1.05.56 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.00 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.01 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.02 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.03 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.04 PM.jpeg",
];

const heroSlides = [
  "/images/sliding images/WhatsApp Image 2026-04-10 at 1.05.48 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-04-10 at 1.05.50 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-04-10 at 1.05.56 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-04-10 at 3.15.03 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-04-10 at 3.15.36 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-04-10 at 3.15.41 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-04-10 at 3.16.19 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-04-10 at 3.16.25 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-04-10 at 3.16.27 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.26.57 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.26.57 PM (1).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.26.58 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.26.58 PM (1).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.26.58 PM (2).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.26.59 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.26.59 PM (1).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.26.59 PM (2).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.26.59 PM (3).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.00 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.00 PM (1).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.00 PM (2).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.00 PM (3).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.01 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.01 PM (1).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.01 PM (2).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.01 PM (3).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.02 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.02 PM (1).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.02 PM (2).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.02 PM (3).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.03 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.03 PM (1).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.03 PM (2).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.03 PM (3).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.04 PM.jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.04 PM (1).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.04 PM (2).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.04 PM (3).jpeg",
  "/images/sliding images/WhatsApp Image 2026-05-02 at 12.27.04 PM (4).jpeg",
];

function getRandomPhoto() {
  return galleryPhotos[Math.floor(Math.random() * galleryPhotos.length)];
}

function getDaysSinceFarewell() {
  const farewell = new Date("2026-04-10T00:00:00");
  const now = new Date();
  const diff = Math.floor((now - farewell) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

const quickNav = [
  { to: "/gallery",  icon: "photo_library", label: "Gallery",   desc: "Browse moments"   },
  { to: "/videos",   icon: "movie",         label: "Videos",    desc: "Watch memories"   },
  { to: "/yearbook", icon: "group",         label: "People",    desc: "Our classmates"   },
  { to: "/classroom", icon: "view_in_ar",    label: "Classroom",  desc: "Explore the room" },
  { to: "/messages", icon: "edit_note",     label: "Guestbook", desc: "Leave a message"  },
];

export default function LandingPage() {
  const sectionsRef = useRef([]);
  const [currentSlide, setCurrentSlide]   = useState(0);
  const [sectionSlide, setSectionSlide]   = useState(0);
  const [daysSince, setDaysSince]         = useState(getDaysSinceFarewell());
  const randomPhoto = useMemo(() => getRandomPhoto(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const sectionTimer = setInterval(() => {
      setSectionSlide((prev) => (prev + 1) % sectionSlides.length);
    }, 3000);
    return () => clearInterval(sectionTimer);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setDaysSince(getDaysSinceFarewell()), 60000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );
    sectionsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  return (
    <div className="route-transition">
      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-end pt-40 pb-32 px-6 md:px-12 overflow-hidden -mt-[76px]">
        {/* Background slideshow */}
        <div className="absolute inset-0 z-0 bg-stone-950">
          {heroSlides.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Slide ${index + 1}`}
              style={{ willChange: "opacity", WebkitTransform: "translateZ(0)", transform: "translateZ(0)" }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2500ms] ease-in-out ${
                index === currentSlide ? "opacity-35" : "opacity-0"
              }`}
            />
          ))}
          {/* Vignette overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent pointer-events-none" />
          {/* Subtle gold ambient glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-primary/5 blur-[80px] pointer-events-none rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-9">
            {/* Eyebrow badge */}
            <div className="pill-badge mb-8">
              <span className="pulse-dot" />
              Aurelian Legacy • Class of 2023 to 2026
            </div>

            {/* Main heading */}
            <h1 className="font-serif italic text-6xl md:text-8xl lg:text-[8.5rem] text-on-surface leading-[0.9] -ml-1 md:-ml-2 tracking-[-0.04em] pb-4">
              Farewell{" "}
              <span className="text-gradient-gold">2026</span>
              <br />
              Our Final Chapter
            </h1>
          </div>

          <div className="md:col-span-8 flex flex-col gap-8 pt-8">
            <p className="font-body text-on-surface-variant text-lg md:text-xl leading-[1.8] max-w-2xl font-light opacity-90">
              A tribute to the moments that defined us, the friendships that shaped us, and the future that awaits us.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-xl hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">photo_library</span>
                View Gallery
              </Link>
              <Link
                to="/videos"
                className="inline-flex items-center gap-2 border border-outline-variant/30 text-primary px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-xl hover:border-primary/50 hover:bg-surface-container-high/30 transition-all duration-300 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">play_circle</span>
                Watch Videos
              </Link>
            </div>

            {/* Slide indicator dots */}
            <div className="flex items-center gap-1.5 mt-2">
              {heroSlides.slice(0, 8).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`rounded-full border-none cursor-pointer transition-all duration-500 ${
                    i === currentSlide % 8
                      ? "w-6 h-1.5 bg-primary"
                      : "w-1.5 h-1.5 bg-stone-700 hover:bg-stone-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-40 hover:opacity-70 transition-opacity">
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-stone-400">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-stone-400 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── Quick Navigation ── */}
      <section ref={addRef} className="fade-in-section py-20 px-6 md:px-12 bg-surface-container-low relative overflow-hidden">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
          {quickNav.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              style={{ animationDelay: `${i * 80}ms` }}
              className="group bg-surface-container rounded-2xl p-6 md:p-7 hover:bg-surface-container-high transition-all duration-500 premium-card flex flex-col items-center text-center gap-3 border border-transparent hover:border-primary/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-surface-container-high group-hover:bg-primary/15 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-serif italic text-base text-on-surface group-hover:text-primary transition-colors duration-300">{item.label}</h3>
              <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-widest">{item.desc}</p>
            </Link>
          ))}
        </div>
        <div className="section-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* ── The Sweet Goodbye ── */}
      <section ref={addRef} className="fade-in-section py-32 px-6 md:px-12 bg-surface relative overflow-hidden">
        {/* Ambient glow */}
        <div className="glow-orb w-[500px] h-[500px] -top-32 -right-32" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Slideshow */}
          <div className="relative group">
            <div className="absolute -inset-3 rounded-2xl border border-primary/10 group-hover:border-primary/25 transition-colors duration-700" />
            <div className="relative rounded-xl overflow-hidden w-full aspect-[4/5] shadow-2xl shadow-black/60">
              {sectionSlides.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
                    i === sectionSlide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              {/* Gold overlay shimmer */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
              {/* Dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                {sectionSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSectionSlide(i)}
                    className={`rounded-full border-none cursor-pointer transition-all duration-300 ${
                      i === sectionSlide ? "w-4 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <div className="pill-badge">
              <span className="material-symbols-outlined text-xs">celebration</span>
              April 10, 2026
            </div>
            <h2 className="font-serif italic text-4xl md:text-5xl text-gradient-gold leading-tight">
              The Sweet Goodbye
            </h2>
            <div className="w-12 h-px bg-primary/40" />
            <blockquote className="font-serif text-xl text-on-surface leading-relaxed italic opacity-90">
              "Every chapter must end so the next one can begin. This cake wasn't just a celebration — it was a promise. A promise that no matter where life takes us, the bonds we formed here will never dissolve."
            </blockquote>
            <div className="pt-4 space-y-1">
              <p className="font-sans font-bold text-on-surface uppercase tracking-widest text-sm">Farewell Day — April 10, 2026</p>
              <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest">End of Chapter • Class of 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── On This Visit — Random Photo ── */}
      <section ref={addRef} className="fade-in-section py-24 px-6 md:px-12 bg-surface-container-low relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-sans text-[10px] text-primary uppercase tracking-[0.4em] block mb-3">A Memory, Just For You</span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-on-surface">On This Visit...</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-0 items-stretch glass-card rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="w-full md:w-1/2 overflow-hidden">
              <img
                src={randomPhoto.src}
                alt={randomPhoto.title}
                className="w-full h-full object-cover min-h-60 hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="p-8 md:p-12 flex-1 flex flex-col justify-center text-center md:text-left gap-4">
              <span className="material-symbols-outlined text-primary text-4xl">photo_album</span>
              <h3 className="font-serif italic text-2xl md:text-3xl text-on-surface">{randomPhoto.title}</h3>
              <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest">
                {randomPhoto.category} • {randomPhoto.photographer}
              </p>
              <p className="font-body text-on-surface-variant leading-relaxed text-sm">
                Every visit reveals a different memory from our gallery. This one was waiting just for you.
              </p>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 text-primary font-sans text-xs uppercase tracking-widest hover:gap-4 transition-all duration-300 mt-2 w-fit"
              >
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                See all 284 photos
              </Link>
            </div>
          </div>
        </div>
        <div className="section-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* ── By the Numbers ── */}
      <section ref={addRef} className="fade-in-section py-32 px-6 md:px-12 bg-surface relative overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-5xl mx-auto text-center mb-16 relative z-10">
          <span className="font-sans text-[10px] text-primary uppercase tracking-[0.4em] block mb-4">Statistics</span>
          <h2 className="font-serif italic text-4xl md:text-5xl text-on-surface mb-4">By the Numbers</h2>
          <p className="font-body text-on-surface-variant text-lg">The statistics of four unforgettable years.</p>
        </div>

        {/* Live counter card */}
        <div className="max-w-sm mx-auto mb-16 relative z-10">
          <div className="glass-card rounded-2xl px-10 py-8 text-center border border-primary/15 shadow-xl shadow-black/30">
            <span className="material-symbols-outlined text-primary text-3xl mb-3 block animate-float">hourglass_top</span>
            <p className="font-sans text-[10px] text-primary uppercase tracking-[0.3em] mb-3">Since Our Farewell</p>
            <div className="font-serif italic text-7xl md:text-8xl text-shimmer tabular-nums">{daysSince}</div>
            <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest mt-2">
              {daysSince === 1 ? "day" : "days"} and counting
            </p>
            <p className="font-sans text-[10px] text-stone-600 uppercase tracking-widest mt-4">April 10, 2026 → Today</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
          <AnimatedCounter end={1095} label="Days Together"   icon="calendar_today"         />
          <AnimatedCounter end={29}   label="Videos"          icon="movie"                  />
          <AnimatedCounter end={284}  label="Photos Taken"    icon="photo_camera"            />
          <AnimatedCounter end="∞"    label="Inside Jokes"    icon="sentiment_very_satisfied"/>
        </div>
      </section>

      {/* ── Guestbook CTA ── */}
      <section
        ref={addRef}
        className="fade-in-section py-32 px-6 md:px-12 bg-surface-container relative flex flex-col items-center text-center overflow-hidden animated-bg-gold"
      >
        {/* Decorative top/bottom dividers */}
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="section-divider absolute bottom-0 left-0 right-0" />

        {/* Ambient glow orbs */}
        <div className="glow-orb w-[500px] h-[500px] -top-48 right-0 opacity-10" />
        <div className="glow-orb w-[400px] h-[400px] -bottom-48 left-0 opacity-10" />

        <div className="max-w-2xl relative z-10">
          <div className="pill-badge mx-auto mb-8">
            <span className="material-symbols-outlined text-xs">history_edu</span>
            Guestbook
          </div>
          <h2 className="font-serif italic text-4xl md:text-6xl text-on-surface mb-6 leading-tight">
            Leave Your{" "}
            <span className="text-gradient-gold">Signature</span>
          </h2>
          <p className="font-body text-on-surface-variant text-lg mb-12 leading-relaxed font-light max-w-lg mx-auto">
            Every great story needs a beautiful epilogue. Before we turn the final page, take a moment to sign our digital legacy.
          </p>
          <Link
            to="/messages"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-5 text-sm font-bold uppercase tracking-widest rounded-2xl hover:scale-[1.04] hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 cursor-pointer"
          >
            Open the Guestbook{" "}
            <span className="material-symbols-outlined text-base">edit_note</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
