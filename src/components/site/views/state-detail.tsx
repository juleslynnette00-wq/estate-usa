"use client";

import { useMemo, useState } from "react";
import { useRouter } from "../router";
import { US_STATES, getStateByCode } from "@/data/states";
import { HOUSES, getHousesByState } from "@/data/houses";
import { PropertyCard } from "../property-card";
import {
  ChevronRightIcon,
  MapPinIcon,
  HomeIcon,
  BuildingIcon,
  UsersIcon,
  FilterIcon,
  ChevronDownIcon,
} from "../icons";
import { cn } from "@/lib/utils";

export function StateDetailView({ route }: { route: string }) {
  const { navigate } = useRouter();
  const code = route.split("/").pop()?.toUpperCase() || "";
  const state = getStateByCode(code);
  const [typeFilter, setTypeFilter] = useState<"any" | "sale" | "rent">("any");

  const allInState = useMemo(
    () => (state ? getHousesByState(state.code) : []),
    [state]
  );

  const filtered = useMemo(() => {
    if (typeFilter === "any") return allInState;
    return allInState.filter((h) => h.listingType === typeFilter);
  }, [allInState, typeFilter]);

  if (!state) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900">State not found</h1>
        <p className="mt-2 text-slate-600">
          We could not find that state in our directory.
        </p>
        <button
          onClick={() => navigate("/states")}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white"
        >
          View all states
        </button>
      </div>
    );
  }

  const salesCount = allInState.filter((h) => h.listingType === "sale").length;
  const rentsCount = allInState.filter((h) => h.listingType === "rent").length;
  const avgPrice = allInState.length
    ? Math.round(allInState.reduce((a, b) => a + b.price, 0) / allInState.length)
    : 0;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          {allInState[0] && (
            <img
              src={allInState[0].images[0]}
              alt={`Homes in ${state.name}`}
              className="h-full w-full object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:py-20">
          <nav className="text-xs text-slate-400 flex items-center gap-1.5">
            <button onClick={() => navigate("/")} className="hover:text-emerald-400">Home</button>
            <ChevronRightIcon size={12} />
            <button onClick={() => navigate("/states")} className="hover:text-emerald-400">States</button>
            <ChevronRightIcon size={12} />
            <span className="text-white">{state.name}</span>
          </nav>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Homes in {state.name}
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl text-lg">
            Browse {allInState.length}+ verified homes for sale or rent in {state.name}.
            From the capital {state.capital} to surrounding cities, our licensed agents cover the
            entire state.
          </p>

          {/* Quick stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            {[
              { Icon: HomeIcon, value: allInState.length, label: "Active listings" },
              { Icon: BuildingIcon, value: salesCount, label: "For sale" },
              { Icon: UsersIcon, value: rentsCount, label: "For rent" },
              { Icon: MapPinIcon, value: state.capital, label: "State capital" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4"
              >
                <s.Icon size={20} className="text-emerald-400" />
                <p className="mt-1.5 text-xl font-bold tracking-tight">{s.value}</p>
                <p className="text-xs text-slate-300 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {filtered.length} {filtered.length === 1 ? "home" : "homes"} in {state.name}
            </h2>
            <p className="text-sm text-slate-500">
              Avg. listing price:{" "}
              <span className="font-semibold text-slate-700">
                ${avgPrice.toLocaleString()}
              </span>{" "}
              {filtered.some((h) => h.listingType === "rent") && "(rental prices are monthly)"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FilterIcon size={14} className="text-slate-400" />
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
                className="appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-9 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="any">All listings</option>
                <option value="sale">For sale only</option>
                <option value="rent">For rent only</option>
              </select>
              <ChevronDownIcon
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Listings */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <p className="text-slate-700 font-semibold">No homes in this category right now.</p>
            <p className="mt-1 text-sm text-slate-500">
              Try the other listing type, or browse nearby states.
            </p>
            <button
              onClick={() => setTypeFilter("any")}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Show all listings
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((h) => (
              <PropertyCard key={h.id} house={h} />
            ))}
          </div>
        )}

        {/* Nearby states */}
        <div className="mt-14">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Browse nearby states</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {US_STATES.filter((s) => s.code !== state.code)
              .sort(() => Math.random() - 0.5)
              .slice(0, 4)
              .map((s) => (
                <button
                  key={s.code}
                  onClick={() => navigate(`/state/${s.code}`)}
                  className={cn(
                    "group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-emerald-400 hover:shadow-md transition-all"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 text-xs font-bold group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      {s.code}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                      {s.name}
                    </span>
                  </span>
                  <ChevronRightIcon size={16} className="text-slate-400 group-hover:text-emerald-600" />
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
