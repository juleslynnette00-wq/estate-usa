"use client";

import { useMemo, useState } from "react";
import { useRouter } from "../router";
import { HOUSES, getHouseById, formatPrice } from "@/data/houses";
import {
  BedIcon,
  BathIcon,
  RulerIcon,
  CarIcon,
  MapPinIcon,
  CalendarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckIcon,
  HomeIcon,
  ShieldIcon,
  UserIcon,
  ArrowRightIcon,
  BuildingIcon,
  ClockIcon,
  TagIcon,
} from "../icons";
import { PropertyCard } from "../property-card";
import { InquiryForm } from "../inquiry-form";

export function PropertyDetailView({ route }: { route: string }) {
  const { navigate } = useRouter();
  const id = route.split("/").pop() || "";
  const house = useMemo(() => getHouseById(id), [id]);
  const [activeImg, setActiveImg] = useState(0);

  if (!house) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Property not found</h1>
        <p className="mt-2 text-slate-600">
          The listing you are looking for may have been removed or is no longer available.
        </p>
        <button
          onClick={() => navigate("/listings")}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Back to all listings <ArrowRightIcon size={14} />
        </button>
      </div>
    );
  }

  // Related: same state, exclude current
  const related = HOUSES.filter((h) => h.state === house.state && h.id !== house.id).slice(0, 4);

  // Quick specs
  const specs = [
    { Icon: BedIcon, label: "Bedrooms", value: house.beds },
    { Icon: BathIcon, label: "Bathrooms", value: house.baths },
    { Icon: RulerIcon, label: "Living area", value: `${house.sqft.toLocaleString()} sqft` },
    { Icon: RulerIcon, label: "Lot size", value: `${house.lotSize.toLocaleString()} sqft` },
    { Icon: CarIcon, label: "Garage", value: `${house.garage} cars` },
    { Icon: CalendarIcon, label: "Year built", value: house.yearBuilt },
    { Icon: HomeIcon, label: "Property type", value: house.propertyType },
    { Icon: ClockIcon, label: "Available", value: new Date(house.available).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
  ];

  const breadcrumb = (
    <nav className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
      <button onClick={() => navigate("/")} className="hover:text-emerald-700">Home</button>
      <ChevronRightIcon size={12} />
      <button onClick={() => navigate("/listings")} className="hover:text-emerald-700">Listings</button>
      <ChevronRightIcon size={12} />
      <button
        onClick={() => navigate(`/state/${house.state}`)}
        className="hover:text-emerald-700"
      >
        {house.stateName}
      </button>
      <ChevronRightIcon size={12} />
      <span className="text-slate-700 truncate">{house.title}</span>
    </nav>
  );

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-3">{breadcrumb}</div>
      </div>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr] sm:grid-rows-2">
          {/* Main image */}
          <button
            onClick={() => setActiveImg(0)}
            className="relative sm:row-span-2 aspect-[4/3] sm:aspect-auto rounded-xl overflow-hidden bg-slate-100 group"
          >
            <img
              src={house.images[0]}
              alt={`${house.title} — main view`}
              className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </button>
          {/* Secondary images */}
          {[1, 2, 3, 4].map((idx) => (
            <button
              key={idx}
              onClick={() => setActiveImg(idx)}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 group hidden sm:block"
            >
              {house.images[idx] && (
                <img
                  src={house.images[idx]}
                  alt={`${house.title} — view ${idx + 1}`}
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              )}
              {idx === 4 && house.images.length > 5 && (
                <span className="absolute inset-0 flex items-center justify-center bg-slate-950/60 text-white text-sm font-semibold">
                  +{house.images.length - 5} more
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile gallery scroller */}
        <div className="sm:hidden mt-3 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {house.images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`shrink-0 w-20 h-16 rounded-md overflow-hidden bg-slate-100 ${
                i === activeImg ? "ring-2 ring-emerald-500" : ""
              }`}
            >
              <img src={src} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-12 grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left column */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
            {house.propertyType} · {house.listingType === "sale" ? "For Sale" : "For Rent"}
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            {house.title}
          </h1>
          <p className="mt-2 flex items-start gap-1.5 text-sm text-slate-600">
            <MapPinIcon size={16} className="mt-0.5 shrink-0 text-emerald-600" />
            {house.address}, {house.city}, {house.stateName} {house.zip}
          </p>

          {/* Price + status */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <p className="text-3xl sm:text-4xl font-bold text-emerald-700">
              {formatPrice(house)}
            </p>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 text-white px-3 py-1 text-xs font-semibold uppercase">
              {house.status}
            </span>
            {house.listingType === "sale" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold">
                <TagIcon size={12} />
                ${(house.price / house.sqft).toFixed(0)}/sqft
              </span>
            )}
          </div>

          {/* Quick stats row */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <QuickStat icon={<BedIcon size={18} />} value={house.beds} label="Beds" />
            <QuickStat icon={<BathIcon size={18} />} value={house.baths} label="Baths" />
            <QuickStat icon={<RulerIcon size={18} />} value={`${house.sqft.toLocaleString()}`} label="Sqft" />
            <QuickStat icon={<CarIcon size={18} />} value={house.garage} label="Garage" />
          </div>

          {/* Description */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">About this home</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">{house.description}</p>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Located in {house.city}, {house.stateName}, this {house.propertyType.toLowerCase()} is positioned
              near everyday essentials — grocery stores, schools, parks, and major commuting routes.
              The home has been maintained to a high standard and is ready for its next chapter,
              whether you are looking to settle in long-term or invest in a solid American market.
            </p>
          </div>

          {/* Specs grid */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">Property details</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
                >
                  <span className="flex items-center gap-2 text-sm text-slate-600">
                    <s.Icon size={16} className="text-emerald-600" />
                    {s.label}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">Features & amenities</h2>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {house.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"
                >
                  <CheckIcon size={16} className="text-emerald-600 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Map placeholder (using lat/long) */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">Location</h2>
            <p className="mt-1 text-sm text-slate-600">
              {house.address}, {house.city}, {house.stateName} {house.zip}
            </p>
            <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-200 aspect-[16/9] bg-slate-100">
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${house.latitude},${house.longitude}&zoom=12&size=1280x720&maptype=roadmap&markers=color:red%7C${house.latitude},${house.longitude}&key=PLACEHOLDER`}
                alt={`Map of ${house.address}`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Hide the static map and show fallback
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const fallback = (e.currentTarget.parentElement?.querySelector(".map-fallback") as HTMLElement);
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div className="map-fallback absolute inset-0 hidden flex-col items-center justify-center text-slate-500 bg-slate-50">
                <MapPinIcon size={36} className="text-emerald-600 mb-2" />
                <p className="text-sm font-semibold text-slate-700">{house.city}, {house.stateName}</p>
                <p className="text-xs">Lat {house.latitude.toFixed(4)}, Lng {house.longitude.toFixed(4)}</p>
                <p className="text-xs mt-2 px-4 text-center">
                  Full map unavailable in demo. A licensed agent will share precise directions during your tour.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: agent + inquiry form */}
        <aside className="lg:sticky lg:top-24 self-start space-y-4">
          {/* Agent card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Your agent for this listing
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white text-base font-bold">
                {house.agent.initials}
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">{house.agent.name}</p>
                <p className="text-xs text-slate-500">{house.agent.title}</p>
                <p className="text-xs text-emerald-700 mt-0.5 flex items-center gap-1">
                  <ShieldIcon size={12} /> Licensed in {house.stateName}
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Use the inquiry form below — your details go directly to {house.agent.name}.
            </p>
          </div>

          {/* Inquiry form */}
          <InquiryForm
            house={house}
            context="property"
            title="Request a tour"
            subtitle="Fill in your details and our agent will reach out within 24 hours."
          />
        </aside>
      </section>

      {/* Related listings */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              More homes in {house.stateName}
            </h2>
            <button
              onClick={() => navigate(`/state/${house.state}`)}
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View all →
            </button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((h) => (
              <PropertyCard key={h.id} house={h} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function QuickStat({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col items-center justify-center text-center">
      <span className="text-emerald-600">{icon}</span>
      <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  );
}
