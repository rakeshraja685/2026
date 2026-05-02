import { useState, useMemo } from "react";
import { people, categories } from "../data/people";

export default function ClassYearbook() {
  const [activeCategory, setActiveCategory] = useState("All Scholars");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAlpha, setSortAlpha] = useState(false);

  const filtered = useMemo(() => {
    let result = people;
    if (activeCategory !== "All Scholars") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.nickname.toLowerCase().includes(q) ||
        p.superlative.toLowerCase().includes(q)
      );
    }
    if (sortAlpha) {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [activeCategory, searchQuery, sortAlpha]);

  return (
    <div className="pt-12 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
      {/* Header */}
      <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h1 className="font-headline italic text-5xl md:text-7xl tracking-tight text-primary mb-4 leading-none">
            Class of <br />2026
          </h1>
          <p className="font-body text-on-surface-variant text-lg max-w-md">
            The faces behind the memories. A curated collection celebrating the people who made these past years truly unforgettable.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
          {/* Search */}
          <div className="relative w-full sm:w-72 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-primary/50 group-focus-within:text-primary transition-colors">search</span>
            </div>
            <input
              className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-primary text-on-surface pl-12 py-4 font-body placeholder:text-stone-600 tracking-wide transition-all outline-none text-sm"
              placeholder="Search classmates..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Sort Toggle */}
          <button
            onClick={() => setSortAlpha(!sortAlpha)}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-sans uppercase tracking-widest transition-all border-none cursor-pointer ${
              sortAlpha
                ? "bg-primary text-on-primary"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            }`}
          >
            <span className="material-symbols-outlined text-lg">sort_by_alpha</span>
            A–Z
          </button>
        </div>
      </header>



      {/* Results count */}
      <div className="mb-10">
        <span className="inline-flex items-center gap-2 bg-surface-container-high text-primary px-6 py-2.5 rounded-full text-xs font-bold font-sans uppercase tracking-widest shadow-sm border border-outline-variant/30">
          <span className="material-symbols-outlined text-sm">person</span>
          {filtered.length} {filtered.length === 1 ? "person" : "people"}
        </span>
      </div>

      {/* Student Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((person) => (
          <div key={person.id} className="group bg-surface-container-low rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/60">
            <div className="aspect-[4/5] overflow-hidden relative">
              <img
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                src={person.photo}
                alt={person.name}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-60" />
              {/* Nickname badge */}
              <div className="absolute top-4 right-4 bg-surface-container-high/80 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="font-sans text-[10px] text-primary uppercase tracking-widest">{person.nickname}</span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <span className="font-sans uppercase tracking-[0.2em] text-[10px] text-primary mb-2 block">
                {person.superlative}
              </span>
              <h3 className="font-headline italic text-2xl text-on-surface mb-3">{person.name}</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed italic mb-4">
                "{person.quote}"
              </p>
              {/* Fun Fact */}
              <div className="pt-4 border-t border-outline-variant/10">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary/50 text-sm mt-0.5">auto_awesome</span>
                  <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">{person.funFact}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <span className="material-symbols-outlined text-primary text-5xl mb-4">search_off</span>
          <p className="font-serif italic text-xl text-on-surface-variant">No classmates match your search.</p>
        </div>
      )}
    </div>
  );
}
