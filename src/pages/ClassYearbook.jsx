import { useState, useMemo, useRef } from "react";
import { people, categories } from "../data/people";

function shareCard(person) {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 750;
  const ctx = canvas.getContext("2d");

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 600, 750);
  grad.addColorStop(0, "#1c1917");
  grad.addColorStop(1, "#292524");
  ctx.fillStyle = grad;
  ctx.roundRect(0, 0, 600, 750, 16);
  ctx.fill();

  // Gold accent line
  ctx.strokeStyle = "#d4a847";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 40);
  ctx.lineTo(560, 40);
  ctx.stroke();

  // Load and draw the person's photo
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    // Draw photo (centered, clipped to circle)
    const photoX = 200, photoY = 70, photoSize = 200;
    ctx.save();
    ctx.beginPath();
    ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, photoX, photoY, photoSize, photoSize);
    ctx.restore();

    // Circle border
    ctx.strokeStyle = "#d4a847";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
    ctx.stroke();

    // Name
    ctx.fillStyle = "#fafaf9";
    ctx.font = "bold 30px Georgia";
    ctx.textAlign = "center";
    ctx.fillText(person.name, 300, 310);

    // Nickname
    ctx.fillStyle = "#d4a847";
    ctx.font = "italic 18px Georgia";
    ctx.fillText(`"${person.nickname}"`, 300, 345);

    // Superlative
    ctx.fillStyle = "#a8a29e";
    ctx.font = "13px Arial";
    ctx.fillText(person.superlative.toUpperCase(), 300, 380);

    // Divider
    ctx.strokeStyle = "#d4a847";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(80, 405);
    ctx.lineTo(520, 405);
    ctx.stroke();
    ctx.setLineDash([]);

    // Quote (word wrap)
    ctx.fillStyle = "#d6d3d1";
    ctx.font = "italic 16px Georgia";
    ctx.textAlign = "center";
    const quote = `"${person.quote}"`;
    const words = quote.split(" ");
    let line = "", y = 440;
    for (const word of words) {
      const test = line + word + " ";
      if (ctx.measureText(test).width > 480 && line) {
        ctx.fillText(line.trim(), 300, y);
        line = word + " ";
        y += 28;
      } else { line = test; }
    }
    ctx.fillText(line.trim(), 300, y);

    // Footer
    ctx.fillStyle = "#d4a847";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("FAREWELL 2026 • CLASS OF 2023–2026 • AURELIAN LEGACY", 300, 715);

    // Gold accent line bottom
    ctx.strokeStyle = "#d4a847";
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(40, 710);
    ctx.lineTo(560, 710);
    ctx.stroke();

    // Download
    const link = document.createElement("a");
    link.download = `${person.name.replace(/\s/g, "_")}_farewell_card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  img.onerror = () => {
    // If image fails (CORS), just download without photo
    ctx.fillStyle = "#d4a847";
    ctx.font = "bold 28px Georgia";
    ctx.textAlign = "center";
    ctx.fillText(person.name, 300, 310);
    ctx.fillStyle = "#a8a29e";
    ctx.font = "italic 18px Georgia";
    ctx.fillText(`"${person.nickname}"`, 300, 345);
    const link = document.createElement("a");
    link.download = `${person.name.replace(/\s/g, "_")}_farewell_card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  img.src = person.photo;
}

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
              <div className="pt-4 border-t border-outline-variant/10 mb-4">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary/50 text-sm mt-0.5">auto_awesome</span>
                  <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">{person.funFact}</p>
                </div>
              </div>
              {/* Share My Card Button */}
              <button
                onClick={() => shareCard(person)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant text-xs font-sans uppercase tracking-widest transition-all duration-300 border border-outline-variant/20 hover:border-primary cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">share</span>
                Share My Card
              </button>
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
