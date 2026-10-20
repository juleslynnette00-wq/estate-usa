"use client";

import { House, formatPrice } from "@/data/houses";
import { useRouter } from "./router";
import {
  BedIcon,
  BathIcon,
  RulerIcon,
  CarIcon,
  MapPinIcon,
  HeartIcon,
  TagIcon,
  CalendarIcon,
} from "./icons";
import { cn } from "@/lib/utils";

export function PropertyCard({ house }: { house: House }) {
  const { navigate } = useRouter();

  const statusColor =
    house.status === "New"
      ? "bg-emerald-500 text-white"
      : house.status === "Pending"
        ? "bg-amber-500 text-white"
        : "bg-slate-900/85 text-white";

  return (
    <article
      className="group rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xl shadow-sm transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <button
        onClick={() => navigate(`/property/${house.id}`)}
        className="relative block aspect-[4/3] overflow-hidden bg-slate-100"
        aria-label={`View ${house.title}`}
      >
        <img
          src={house.images[0]}
          alt={`${house.title} — ${house.address}, ${house.city}, ${house.stateName}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide", statusColor)}>
            {house.status}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 text-slate-800 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide">
            {house.listingType === "sale" ? "For Sale" : "For Rent"}
          </span>
        </div>
        {/* Save (decorative) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            const btn = e.currentTarget;
            if (btn.classList.contains("saved")) {
              btn.classList.remove("saved");
              btn.style.background = "rgba(255,255,255,0.85)";
              btn.style.color = "#0f172a";
            } else {
              btn.classList.add("saved");
              btn.style.background = "#ef4444";
              btn.style.color = "#fff";
            }
          }}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full transition-colors"
          style={{ background: "rgba(255,255,255,0.85)", color: "#0f172a" }}
          aria-label="Save property"
        >
          <HeartIcon size={16} />
        </button>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950/80 backdrop-blur-sm text-white px-2.5 py-1.5 text-sm font-bold">
            <TagIcon size={14} className="text-emerald-400" />
            {formatPrice(house)}
          </span>
        </div>
      </button>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
            {house.propertyType} · {house.listingType === "sale" ? "For Sale" : "For Rent"}
          </p>
          <h3
            className="mt-0.5 text-base font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors cursor-pointer"
            onClick={() => navigate(`/property/${house.id}`)}
          >
            {house.title}
          </h3>
          <p className="mt-1 flex items-start gap-1.5 text-xs text-slate-500 line-clamp-1">
            <MapPinIcon size={14} className="mt-0.5 shrink-0" />
            {house.address}, {house.city}, {house.stateName} {house.zip}
          </p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-4 gap-1.5 text-slate-700 text-xs border-t border-slate-100 pt-3">
          <Spec icon={<BedIcon size={14} />} value={house.beds} label="Beds" />
          <Spec icon={<BathIcon size={14} />} value={house.baths} label="Baths" />
          <Spec icon={<RulerIcon size={14} />} value={house.sqft.toLocaleString()} label="SqFt" />
          <Spec icon={<CarIcon size={14} />} value={house.garage} label="Garage" />
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-100">
          <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <CalendarIcon size={12} />
            Avail. {new Date(house.available).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </p>
          <button
            onClick={() => navigate(`/property/${house.id}`)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            View details →
          </button>
        </div>
      </div>
    </article>
  );
}

function Spec({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-slate-50 py-2 px-1">
      <span className="flex items-center gap-1 text-slate-700">{icon}</span>
      <span className="mt-0.5 font-semibold text-slate-900 text-[11px]">{value}</span>
      <span className="text-[10px] uppercase tracking-wider text-slate-500">{label}</span>
    </div>
  );
}
