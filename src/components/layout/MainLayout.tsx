import { PropsWithChildren } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { AdSlot } from "./AdSlot";
import { toolRoutes } from "../../router";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-500 to-brand-700 shadow-soft">
              <span className="h-4 w-4 bg-slate-950 rounded-sm rotate-45" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-semibold tracking-tight">Pixeloop Tools</span>
              <span className="text-xs text-slate-400">
                Free in-browser image utilities
              </span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-brand-300 transition ${
                  isActive ? "text-brand-300" : "text-slate-300"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-brand-300 transition ${
                  isActive ? "text-brand-300" : "text-slate-300"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-brand-300 transition ${
                  isActive ? "text-brand-300" : "text-slate-300"
                }`
              }
            >
              Contact
            </NavLink>
            <div className="relative group">
              <button className="text-slate-300 hover:text-brand-300 transition text-sm">
                Tools
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition absolute right-0 mt-2 w-72 glass-panel p-3 space-y-1">
                {toolRoutes.map((tool) => (
                  <NavLink
                    key={tool.path}
                    to={tool.path}
                    className="block rounded-lg px-2 py-1.5 text-xs text-slate-200 hover:bg-slate-800/70"
                  >
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-[11px] text-slate-400">
                      {tool.shortDescription}
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <AdSlot position="top" />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
      </main>
      <footer className="border-t border-slate-800/80 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-slate-400">
          <div>© {new Date().getFullYear()} Pixeloop Tools. All rights reserved.</div>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-brand-300">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-brand-300">
              About
            </Link>
            <Link to="/contact" className="hover:text-brand-300">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

