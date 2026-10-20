"use client";

import { useMemo } from "react";
import { useRouter } from "../router";
import { US_STATES, REGIONS } from "@/data/states";
import { getHouseCountByState, HOUSES } from "@/data/houses";
import { MapPinIcon, ChevronRightIcon, ArrowRightIcon, HomeIcon, BuildingIcon } from "../icons";

export function StatesView() {
  const { navigate } = useRouter();
  const counts = useMemo(() => getHouseCountByState(), []);
  const totalHomes = HOUSES.length;

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Coast to coast coverage
          </p>
          <h1 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Find homes in all 50 U.S. states
          </h1>
          <p className="mt-3 text-slate-300 max-w-3xl text-lg">
            Browse our directory of {totalHomes}+ verified listings across all 50 states plus the
            District of Columbia. Tap a state to see homes for sale or rent in that market.
          </p>
        </div>
      </section>

      {/* Quick stats */}
      <section className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { Icon: MapPinIcon, value: "50 + DC", label: "U.S. states covered" },
          { Icon: HomeIcon, value: `${totalHomes}+`, label: "Active listings" },
          { Icon: BuildingIcon, value: "8+", label: "Property types" },
          { Icon: ChevronRightIcon, value: "100%", label: "Agent-verified" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-center"
          >
            <s.Icon size={24} className="mx-auto text-emerald-600" />
            <p className="mt-2 text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Regions */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        {REGIONS.map((region) => {
          const states = US_STATES.filter((s) => s.region === region);
          return (
            <div key={region} className="mb-12">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{region} U.S.</h2>
                  <p className="text-sm text-slate-500">
                    {states.length} states · {states.reduce((acc, s) => acc + (counts[s.code] || 0), 0)} listings
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {states.map((s) => (
                  <button
                    key={s.code}
                    onClick={() => navigate(`/state/${s.code}`)}
                    className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left hover:border-emerald-400 hover:shadow-md transition-all"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-700 text-xs font-bold group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        {s.code}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-slate-900 truncate group-hover:text-emerald-700">
                          {s.name}
                        </span>
                        <span className="block text-xs text-slate-500">
                          {counts[s.code] || 0} listings · Capital: {s.capital}
                        </span>
                      </span>
                    </span>
                    <ChevronRightIcon
                      size={16}
                      className="text-slate-400 group-hover:text-emerald-600 shrink-0"
                    />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA */}
      <section className="bg-emerald-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Can&apos;t find your state?</h3>
            <p className="text-emerald-50 mt-1">
              We cover all 50 states. Tell us where you&apos;re looking and we&apos;ll match you with
              a local agent.
            </p>
          </div>
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 rounded-lg bg-white text-emerald-700 px-5 py-3 text-sm font-semibold hover:bg-emerald-50"
          >
            Contact an agent <ArrowRightIcon size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}
