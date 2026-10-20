"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, parseRoute } from "../router";
import { US_STATES } from "@/data/states";
import { HOUSES, PropertyType, ListingType } from "@/data/houses";
import { PropertyCard } from "../property-card";
import { FilterIcon, GridIcon, ListIcon, SearchIcon, ChevronDownIcon, CloseIcon } from "../icons";
import { cn } from "@/lib/utils";

const PROPERTY_TYPES: PropertyType[] = [
  "Single Family", "Townhouse", "Condo", "Apartment", "Villa", "Cottage", "Loft", "Ranch",
];

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "beds-desc", label: "Most beds" },
  { value: "sqft-desc", label: "Largest" },
] as const;

type SortKey = (typeof SORTS)[number]["value"];

export function ListingsView({ route }: { route: string }) {
  const { navigate } = useRouter();
  const { query } = parseRoute(route);

  // Filters synced to URL
  const [stateFilter, setStateFilter] = useState<string>(query.get("state") || "");
  const [typeFilter, setTypeFilter] = useState<ListingType | "any">(
    (query.get("type") as ListingType) || "any"
  );
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>(query.get("ptype") || "");
  const [minBeds, setMinBeds] = useState<number>(Number(query.get("beds") || "0"));
  const [minPrice, setMinPrice] = useState<number>(Number(query.get("minPrice") || "0"));
  const [maxPrice, setMaxPrice] = useState<number>(Number(query.get("maxPrice") || "0"));
  const [search, setSearch] = useState<string>(query.get("q") || "");
  const [sort, setSort] = useState<SortKey>("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync local filter state from URL query params when the route changes.
  // This is intentional: we read once on URL change rather than continuously
  // deriving state, so users can locally adjust filters without immediately
  // pushing every keystroke to the URL hash.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setStateFilter(query.get("state") || "");
    setTypeFilter((query.get("type") as ListingType) || "any");
    setPropertyTypeFilter(query.get("ptype") || "");
    setMinBeds(Number(query.get("beds") || "0"));
    setMinPrice(Number(query.get("minPrice") || "0"));
    setMaxPrice(Number(query.get("maxPrice") || "0"));
    setSearch(query.get("q") || "");
  }, [route]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const filtered = useMemo(() => {
    let arr = HOUSES.slice();
    if (stateFilter) arr = arr.filter((h) => h.state === stateFilter);
    if (typeFilter !== "any") arr = arr.filter((h) => h.listingType === typeFilter);
    if (propertyTypeFilter) arr = arr.filter((h) => h.propertyType === propertyTypeFilter);
    if (minBeds > 0) arr = arr.filter((h) => h.beds >= minBeds);
    if (minPrice > 0) arr = arr.filter((h) => h.price >= minPrice);
    if (maxPrice > 0) arr = arr.filter((h) => h.price <= maxPrice);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      arr = arr.filter(
        (h) =>
          h.title.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          h.stateName.toLowerCase().includes(q) ||
          h.address.toLowerCase().includes(q) ||
          h.zip.includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "beds-desc":
        arr.sort((a, b) => b.beds - a.beds);
        break;
      case "sqft-desc":
        arr.sort((a, b) => b.sqft - a.sqft);
        break;
      default:
        // newest = default order
        break;
    }
    return arr;
  }, [stateFilter, typeFilter, propertyTypeFilter, minBeds, minPrice, maxPrice, search, sort]);

  const hasActiveFilters =
    !!stateFilter ||
    typeFilter !== "any" ||
    !!propertyTypeFilter ||
    minBeds > 0 ||
    minPrice > 0 ||
    maxPrice > 0 ||
    !!search.trim();

  function clearFilters() {
    setStateFilter("");
    setTypeFilter("any");
    setPropertyTypeFilter("");
    setMinBeds(0);
    setMinPrice(0);
    setMaxPrice(0);
    setSearch("");
    navigate("/listings");
  }

  const title = stateFilter
    ? `Homes in ${US_STATES.find((s) => s.code === stateFilter)?.name}`
    : typeFilter === "sale"
      ? "Homes for sale"
      : typeFilter === "rent"
        ? "Homes for rent"
        : "All listings";

  return (
    <div>
      {/* Page header */}
      <div className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Browse the catalog
          </p>
          <h1 className="mt-1 text-3xl lg:text-4xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-slate-300 max-w-2xl">
            Filter {HOUSES.length}+ verified listings across all 50 U.S. states by price, beds,
            property type, and listing type. Tap any home to view full details and contact the
            agent.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4 flex items-center gap-2">
          <button
            onClick={() => setShowFiltersMobile(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium"
          >
            <FilterIcon size={16} /> Filters
            {hasActiveFilters && (
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                {(stateFilter ? 1 : 0) +
                  (typeFilter !== "any" ? 1 : 0) +
                  (propertyTypeFilter ? 1 : 0) +
                  (minBeds > 0 ? 1 : 0) +
                  (minPrice > 0 ? 1 : 0) +
                  (maxPrice > 0 ? 1 : 0) +
                  (search.trim() ? 1 : 0)}
              </span>
            )}
          </button>
          <span className="text-sm text-slate-500">{filtered.length} homes</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar Filters (desktop) */}
          <aside className="hidden lg:block">
            <FilterPanel
              stateFilter={stateFilter}
              setStateFilter={setStateFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              propertyTypeFilter={propertyTypeFilter}
              setPropertyTypeFilter={setPropertyTypeFilter}
              minBeds={minBeds}
              setMinBeds={setMinBeds}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              search={search}
              setSearch={setSearch}
              onClear={clearFilters}
              hasActive={hasActiveFilters}
            />
          </aside>

          {/* Results */}
          <div>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{" "}
                {HOUSES.length} homes
              </p>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-9 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-500"
                  >
                    {SORTS.map((s) => (
                      <option key={s.value} value={s.value}>
                        Sort: {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
                <div className="hidden sm:flex rounded-lg border border-slate-300 overflow-hidden">
                  <button
                    onClick={() => setView("grid")}
                    className={cn(
                      "p-2",
                      view === "grid" ? "bg-slate-900 text-white" : "bg-white text-slate-600"
                    )}
                    aria-label="Grid view"
                  >
                    <GridIcon size={16} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={cn(
                      "p-2",
                      view === "list" ? "bg-slate-900 text-white" : "bg-white text-slate-600"
                    )}
                    aria-label="List view"
                  >
                    <ListIcon size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filters chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {stateFilter && (
                  <Chip
                    label={`State: ${US_STATES.find((s) => s.code === stateFilter)?.name}`}
                    onClear={() => setStateFilter("")}
                  />
                )}
                {typeFilter !== "any" && (
                  <Chip
                    label={typeFilter === "sale" ? "For sale" : "For rent"}
                    onClear={() => setTypeFilter("any")}
                  />
                )}
                {propertyTypeFilter && (
                  <Chip
                    label={`Type: ${propertyTypeFilter}`}
                    onClear={() => setPropertyTypeFilter("")}
                  />
                )}
                {minBeds > 0 && (
                  <Chip label={`${minBeds}+ beds`} onClear={() => setMinBeds(0)} />
                )}
                {minPrice > 0 && (
                  <Chip
                    label={`Min $${minPrice.toLocaleString()}`}
                    onClear={() => setMinPrice(0)}
                  />
                )}
                {maxPrice > 0 && (
                  <Chip
                    label={`Max $${maxPrice.toLocaleString()}`}
                    onClear={() => setMaxPrice(0)}
                  />
                )}
                {search.trim() && (
                  <Chip label={`Search: ${search}`} onClear={() => setSearch("")} />
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-emerald-700 hover:text-emerald-800 underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Listings */}
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                <p className="text-slate-700 font-semibold">No homes match your filters.</p>
                <p className="mt-1 text-sm text-slate-500">
                  Try widening the price range or removing the state filter.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Clear filters
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((h) => (
                  <PropertyCard key={h.id} house={h} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((h) => (
                  <ListRow key={h.id} house={h} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFiltersMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-slate-900/60"
            onClick={() => setShowFiltersMobile(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                onClick={() => setShowFiltersMobile(false)}
                className="p-2 -mr-2 rounded-md hover:bg-slate-100"
                aria-label="Close filters"
              >
                <CloseIcon size={20} />
              </button>
            </div>
            <FilterPanel
              stateFilter={stateFilter}
              setStateFilter={setStateFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              propertyTypeFilter={propertyTypeFilter}
              setPropertyTypeFilter={setPropertyTypeFilter}
              minBeds={minBeds}
              setMinBeds={setMinBeds}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              search={search}
              setSearch={setSearch}
              onClear={clearFilters}
              hasActive={hasActiveFilters}
            />
            <button
              onClick={() => setShowFiltersMobile(false)}
              className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Show {filtered.length} homes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-700">
      {label}
      <button
        onClick={onClear}
        className="ml-1 inline-flex items-center justify-center h-4 w-4 rounded-full hover:bg-emerald-200"
        aria-label="Remove filter"
      >
        <CloseIcon size={12} />
      </button>
    </span>
  );
}

interface FilterPanelProps {
  stateFilter: string;
  setStateFilter: (v: string) => void;
  typeFilter: ListingType | "any";
  setTypeFilter: (v: ListingType | "any") => void;
  propertyTypeFilter: string;
  setPropertyTypeFilter: (v: string) => void;
  minBeds: number;
  setMinBeds: (v: number) => void;
  minPrice: number;
  setMinPrice: (v: number) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  search: string;
  setSearch: (v: string) => void;
  onClear: () => void;
  hasActive: boolean;
}

function FilterPanel(p: FilterPanelProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-5 sticky top-24">
      {/* Search */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Keyword search
        </label>
        <div className="relative">
          <SearchIcon
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={p.search}
            onChange={(e) => p.setSearch(e.target.value)}
            placeholder="City, address, ZIP"
            className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Listing type */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Listing type
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {(["any", "sale", "rent"] as const).map((t) => (
            <button
              key={t}
              onClick={() => p.setTypeFilter(t)}
              className={cn(
                "rounded-md py-2 text-xs font-medium capitalize border",
                p.typeFilter === t
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-700 border-slate-300 hover:border-emerald-500"
              )}
            >
              {t === "any" ? "Any" : t === "sale" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>
      </div>

      {/* State */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          U.S. state
        </label>
        <select
          value={p.stateFilter}
          onChange={(e) => p.setStateFilter(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
        >
          <option value="">All 50 states + DC</option>
          {US_STATES.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Property type */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Property type
        </label>
        <select
          value={p.propertyTypeFilter}
          onChange={(e) => p.setPropertyTypeFilter(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
        >
          <option value="">All property types</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Beds */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Minimum beds
        </label>
        <div className="grid grid-cols-6 gap-1">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => p.setMinBeds(n)}
              className={cn(
                "rounded-md py-2 text-xs font-semibold border",
                p.minBeds === n
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-700 border-slate-300 hover:border-emerald-500"
              )}
            >
              {n === 0 ? "Any" : `${n}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Price range (USD)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            min={0}
            step={500}
            value={p.minPrice || ""}
            onChange={(e) => p.setMinPrice(Number(e.target.value) || 0)}
            placeholder="Min"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
          />
          <input
            type="number"
            min={0}
            step={500}
            value={p.maxPrice || ""}
            onChange={(e) => p.setMaxPrice(Number(e.target.value) || 0)}
            placeholder="Max"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>
        <p className="mt-1 text-[11px] text-slate-500">
          For rentals, prices are monthly.
        </p>
      </div>

      {p.hasActive && (
        <button
          onClick={p.onClear}
          className="w-full rounded-lg border border-slate-300 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

function ListRow({ house }: { house: (typeof HOUSES)[number] }) {
  const { navigate } = useRouter();
  return (
    <article
      className="rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row"
    >
      <button
        onClick={() => navigate(`/property/${house.id}`)}
        className="block relative sm:w-72 shrink-0 aspect-video sm:aspect-auto bg-slate-100"
        aria-label={`View ${house.title}`}
      >
        <img
          src={house.images[0]}
          alt={house.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-slate-950/85 text-white px-2 py-0.5 text-[10px] font-semibold uppercase">
          {house.listingType === "sale" ? "For Sale" : "For Rent"}
        </span>
      </button>
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
          {house.propertyType}
        </p>
        <h3
          className="mt-0.5 text-lg font-bold text-slate-900 cursor-pointer hover:text-emerald-700"
          onClick={() => navigate(`/property/${house.id}`)}
        >
          {house.title}
        </h3>
        <p className="text-sm text-slate-500 mt-0.5">
          {house.address}, {house.city}, {house.stateName} {house.zip}
        </p>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{house.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1">
            <b className="text-slate-900">{house.beds}</b> beds
          </span>
          <span className="inline-flex items-center gap-1">
            <b className="text-slate-900">{house.baths}</b> baths
          </span>
          <span className="inline-flex items-center gap-1">
            <b className="text-slate-900">{house.sqft.toLocaleString()}</b> sqft
          </span>
          <span className="inline-flex items-center gap-1">
            <b className="text-slate-900">{house.garage}</b> garage
          </span>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <p className="text-xl font-bold text-emerald-700">
            {house.listingType === "rent"
              ? `$${house.price.toLocaleString()}/mo`
              : house.price >= 1_000_000
                ? `$${(house.price / 1_000_000).toFixed(2)}M`
                : `$${house.price.toLocaleString()}`}
          </p>
          <button
            onClick={() => navigate(`/property/${house.id}`)}
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            View details →
          </button>
        </div>
      </div>
    </article>
  );
}
