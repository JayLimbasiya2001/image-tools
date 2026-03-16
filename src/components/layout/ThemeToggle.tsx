import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setDark((d) => !d)}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 hover:border-brand-500 hover:text-brand-300 transition"
    >
      {dark ? (
        <span className="text-sm">☾</span>
      ) : (
        <span className="text-sm">☀</span>
      )}
    </button>
  );
}

