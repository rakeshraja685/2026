import { useEffect, useRef } from "react";
import { timelineEvents } from "../data/timeline";

export default function Timeline() {
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    itemsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-12 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
      {/* Header */}
      <header className="mb-20 space-y-4 text-center">
        <h1 className="font-headline text-6xl md:text-8xl italic tracking-tight text-primary-fixed-dim">
          Our Journey
        </h1>
        <p className="font-body text-on-surface-variant text-lg max-w-2xl leading-relaxed mx-auto">
          Four years of triumphs, traditions, and transformations. Every milestone along the way that shaped the Aurelian Legacy.
        </p>
      </header>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary-container/60 to-transparent md:-translate-x-px" />

        {timelineEvents.map((event, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={event.id}
              ref={(el) => (itemsRef.current[idx] = el)}
              className={`fade-in-section relative flex items-start mb-16 md:mb-24 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              {/* Node */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-surface-container-high border-2 border-primary/40 flex items-center justify-center shadow-lg shadow-primary/10">
                  <span className="material-symbols-outlined text-primary text-xl">{event.icon}</span>
                </div>
              </div>

              {/* Content */}
              <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <span className="font-sans text-primary text-xs uppercase tracking-[0.3em] mb-2 block">
                  {event.date}
                </span>
                <h3 className="font-serif italic text-2xl md:text-3xl text-on-surface mb-4">
                  {event.title}
                </h3>
                <div className="bg-surface-container-low rounded-xl p-6 md:p-8">
                  <p className="font-body text-on-surface-variant leading-relaxed text-sm">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* End Node */}
        <div className="relative flex justify-center">
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-xl shadow-primary/20">
              <span className="material-symbols-outlined text-on-primary text-2xl">auto_awesome</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
