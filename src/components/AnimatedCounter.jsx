import { useState, useEffect, useRef } from "react";

export default function AnimatedCounter({ end, duration = 2000, suffix = "", label, icon }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-4 group">
      <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
        <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
      </div>
      <div className="text-center">
        <p className="font-serif italic text-5xl md:text-6xl text-primary tabular-nums">
          {typeof end === "string" ? end : count.toLocaleString()}
          {suffix}
        </p>
        <p className="font-sans text-xs text-on-surface-variant uppercase tracking-[0.3em] mt-3">
          {label}
        </p>
      </div>
    </div>
  );
}
