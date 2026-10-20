"use client";

import { useEffect, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  MenuIcon,
  CloseIcon,
  PhoneIcon,
  ChevronDownIcon,
} from "./icons";
import { cn } from "@/lib/utils";
import { useRouter } from "./router"; // hash router

const NAV_LINKS = [
  { label: "Home", route: "/" },
  { label: "Buy", route: "/listings?type=sale" },
  { label: "Rent", route: "/listings?type=rent" },
  { label: "States", route: "/states" },
  { label: "Services", route: "/services" },
  { label: "About", route: "/about" },
  { label: "Contact", route: "/contact" },
];

export function Header() {
  const { navigate, current } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (route: string) => {
    if (route === "/") return current === "/" || current === "";
    const base = route.split("?")[0];
    return current.startsWith(base);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200"
          : "bg-white border-b border-slate-100"
      )}
    >
      {/* Top utility bar */}
      <div className="hidden lg:block bg-slate-900 text-slate-200">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-9 text-xs">
          <p className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Trusted by 50,000+ American families since 2008
          </p>
          <div className="flex items-center gap-6">
            <a href="tel:+18005550100" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneIcon size={12} /> (800) 555-0100
            </a>
            <a href="mailto:hello@estateusa.com" className="hover:text-white transition-colors">
              hello@estateusa.com
            </a>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
              Mon – Sat · 8am to 8pm EST
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 group"
            aria-label="EstateUSA home"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md group-hover:shadow-lg transition-all">
              <HomeIcon size={22} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Estate<span className="text-emerald-600">USA</span>
              </span>
              <span className="text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                American Homes · Rent or Buy
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.route)}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative",
                  isActive(link.route)
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-slate-700 hover:text-emerald-700 hover:bg-slate-50"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => navigate("/listings")}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-all"
            >
              <SearchIcon size={16} /> Search
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all"
            >
              List Your Property
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  navigate(link.route);
                  setMobileOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-all",
                  isActive(link.route)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {link.label}
                <ChevronDownIcon size={14} className="-rotate-90" />
              </button>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  navigate("/listings");
                  setMobileOpen(false);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium"
              >
                <SearchIcon size={16} /> Search Homes
              </button>
              <button
                onClick={() => {
                  navigate("/contact");
                  setMobileOpen(false);
                }}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white"
              >
                List Your Property
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <a href="tel:+18005550100" className="flex items-center gap-1.5">
                <PhoneIcon size={12} /> (800) 555-0100
              </a>
              <span>Mon – Sat · 8am to 8pm EST</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
