import { Link } from "react-router-dom";
import AnimatedCounter from "../components/AnimatedCounter";
import { useEffect, useRef, useState } from "react";

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

export default function LandingPage() {
  const sectionsRef = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 }
    );
    sectionsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end pt-32 pb-24 px-6 md:px-12 overflow-hidden -mt-[76px]">
        <div className="absolute inset-0 z-0 bg-stone-950">
          {heroSlides.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
                index === currentSlide ? "opacity-40" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-sans text-primary uppercase tracking-[0.3em] text-xs font-bold">Aurelian Legacy • Class of 2023 to 2026</span>
            </div>
            <h1 className="font-serif italic text-5xl md:text-7xl lg:text-9xl text-on-surface leading-tight -ml-1 md:-ml-2 tracking-tighter">
              The Midnight Gala: <br />
              Our Final Chapter
            </h1>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end gap-8 pb-4">
            <p className="font-body text-on-surface-variant text-lg leading-relaxed">
              A tribute to the moments that defined us, the friendships that shaped us, and the future that awaits us.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/gallery" className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:scale-95 transition-transform inline-block text-center cursor-pointer">
                View Gallery
              </Link>
              <Link to="/videos" className="border border-outline-variant/30 text-primary px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-lg hover:border-primary/50 hover:bg-surface-container-high/30 transition-all inline-block text-center cursor-pointer">
                Watch Videos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section ref={addRef} className="fade-in-section py-20 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { to: "/gallery", icon: "photo_library", label: "Gallery", desc: "Browse moments" },
            { to: "/videos", icon: "movie", label: "Videos", desc: "Watch memories" },
            { to: "/yearbook", icon: "group", label: "People", desc: "Our classmates" },
            { to: "/timeline", icon: "timeline", label: "Timeline", desc: "Our journey" },
            { to: "/messages", icon: "edit_note", label: "Guestbook", desc: "Leave a message" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group bg-surface-container rounded-xl p-6 md:p-8 hover:bg-surface-container-high transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 flex flex-col items-center text-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-surface-container-high group-hover:bg-primary/20 flex items-center justify-center transition-colors duration-500">
                <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-serif italic text-lg text-on-surface">{item.label}</h3>
              <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-widest">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Cake Cutting Moment */}
      <section ref={addRef} className="fade-in-section py-32 px-6 md:px-12 bg-surface relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border border-outline-variant/15 rounded-xl group-hover:border-primary/20 transition-colors duration-500" />
            <img
              alt="Cake Cutting Celebration"
              className="relative rounded-lg hover:scale-[1.02] transition-all duration-700 w-full aspect-[4/5] object-cover object-top shadow-2xl"
              src="/images/sliding images/WhatsApp Image 2026-04-10 at 1.05.48 PM.jpeg"
            />
          </div>
          <div>
            <h2 className="font-serif italic text-4xl md:text-5xl text-primary mb-8">
              The Sweet Goodbye
            </h2>
            <div className="space-y-6">
              <span className="material-symbols-outlined text-primary-container text-5xl opacity-30">celebration</span>
              <p className="font-serif text-2xl text-on-surface leading-relaxed italic">
                "Every chapter must end so the next one can begin. This cake wasn't just a celebration — it was a promise. A promise that no matter where life takes us, the bonds we formed here will never dissolve."
              </p>
              <div className="pt-6">
                <p className="font-sans font-bold text-on-surface uppercase tracking-widest">Farewell Day — April 10, 2026</p>
                <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest">End of Chapter • Class of 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown / Stats */}
      <section ref={addRef} className="fade-in-section py-32 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="font-serif italic text-4xl md:text-5xl text-on-surface mb-4">By the Numbers</h2>
          <p className="font-body text-on-surface-variant text-lg">The statistics of four unforgettable years.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <AnimatedCounter end={1095} label="Days Together" icon="calendar_today" />
          <AnimatedCounter end={11} label="Videos" icon="movie" />
          <AnimatedCounter end={242} label="Photos Taken" icon="photo_camera" />
          <AnimatedCounter end="∞" label="Inside Jokes" icon="sentiment_very_satisfied" />
        </div>
      </section>

      {/* Guestbook CTA */}
      <section ref={addRef} className="fade-in-section py-32 px-6 md:px-12 bg-surface-container relative flex flex-col items-center text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute -top-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-2xl relative z-10">
          <span className="material-symbols-outlined text-primary text-5xl mb-6">history_edu</span>
          <h2 className="font-serif italic text-4xl md:text-6xl text-on-surface mb-6 leading-tight">Leave Your Signature</h2>
          <p className="font-body text-on-surface-variant text-lg mb-12 leading-relaxed font-light">
            Every great story needs a beautiful epilogue. Before we turn the final page, take a moment to sign our digital legacy. Share a memory, an inside joke, or a simple goodbye.
          </p>
          <Link to="/messages" className="inline-flex items-center justify-center gap-3 bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-5 text-sm font-bold uppercase tracking-widest rounded-xl hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 transition-all cursor-pointer">
            Open the Guestbook <span className="material-symbols-outlined text-lg">edit_note</span>
          </Link>
        </div>
      </section>
    </>
  );
}
