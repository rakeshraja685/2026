import { useState, useEffect } from "react";

export default function Toast({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[90] animate-slideUp">
      <div className="bg-surface-container-high/95 backdrop-blur-lg border border-primary/20 text-on-surface px-8 py-4 rounded-xl shadow-2xl shadow-black/40 flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
        <p className="font-sans text-sm">{message}</p>
      </div>
    </div>
  );
}
