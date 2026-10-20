"use client";

import { useMemo, useState } from "react";
import { useRouter } from "../router";
import { US_STATES } from "@/data/states";
import { HOUSES, getFeaturedHouses, getHouseCountByState, formatPrice } from "@/data/houses";
import { PropertyCard } from "../property-card";
import {
  SearchIcon,
  HomeIcon,
  MapPinIcon,
  ArrowRightIcon,
  ShieldIcon,
  KeyIcon,
  TrendingIcon,
  AwardIcon,
  UsersIcon,
  StarIcon,
  CheckIcon,
  BuildingIcon,
  DollarIcon,
  ChevronRightIcon,
} from "../icons";

export function HomeView() {
  const { navigate } = useRouter();
  const [searchState, setSearchState] = useState("");
  const [searchType, setSearchType] = useState<"sale" | "rent" | "any">("any");
  const [searchBeds, setSearchBeds] = useState("0");

  const featured = useMemo(() => getFeaturedHouses(8), []);
  const recent = useMemo(() => HOUSES.slice(0, 6), []);
  const countsByState = useMemo(() => getHouseCountByState(), []);
  const popularStates = useMemo(
    () => US_STATES.slice(0, 12).map((s) => ({ ...s, count: countsByState[s.code] || 0 })),
    [countsByState]
  );

  const stats = useMemo(
    () => [
      { Icon: HomeIcon, label: "Active Listings", value: "320+" },
      { Icon: MapPinIcon, label: "U.S. States", value: "50 + DC" },
      { Icon: UsersIcon, label: "Happy Families", value: "50k+" },
      { Icon: AwardIcon, label: "Years of Service", value: "15+" },
    ],
    []
  );

  const services = [
    {
      Icon: KeyIcon,
      title: "Buy a Home",
      desc: "Browse thousands of homes for sale across all 50 U.S. states. Our licensed agents help you make confident offers, negotiate terms, and close on time.",
      points: ["Pre-approval guidance", "Personalized property tours", "Negotiation & closing support"],
      cta: "Browse homes for sale",
      route: "/listings?type=sale",
    },
    {
      Icon: HomeIcon,
      title: "Rent a Home",
      desc: "Find apartments, condos, townhouses, and single-family rentals in cities and suburbs nationwide. Verified listings and responsive landlords.",
      points: ["Verified landlord listings", "Flexible lease terms", "Same-day tour requests"],
      cta: "Browse rentals",
      route: "/listings?type=rent",
    },
    {
      Icon: TrendingIcon,
      title: "Sell Your Property",
      desc: "List with a local expert who knows your market. Get a free comparative market analysis and a marketing plan built for your timeline.",
      points: ["Free home valuation", "Professional photography", "Listing on top portals"],
      cta: "Request a valuation",
      route: "/contact",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <img
            src={HOUSES[0].images[0]}
            alt="Featured American home"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Trusted American Real Estate Platform · Since 2008
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Find your next home
              <span className="block text-emerald-400">across the United States</span>
            </h1>
            <p className="mt-5 text-lg text-slate-300 max-w-2xl leading-relaxed">
              Browse over 300 verified listings for sale or rent across all 50 states. Connect with
              licensed local agents, request private tours, and find the place that fits your life.
            </p>
          </div>

          {/* Search panel */}
          <div className="mt-10 rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl ring-1 ring-white/30 p-4 sm:p-6 text-slate-900">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <SearchField label="State">
                <select
                  value={searchState}
                  onChange={(e) => setSearchState(e.target.value)}
                  className="w-full bg-transparent text-slate-900 focus:outline-none text-sm py-1"
                >
                  <option value="">All U.S. states</option>
                  {US_STATES.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </SearchField>
              <SearchField label="I want to">
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as typeof searchType)}
                  className="w-full bg-transparent text-slate-900 focus:outline-none text-sm py-1"
                >
                  <option value="any">Buy or rent</option>
                  <option value="sale">Buy a home</option>
                  <option value="rent">Rent a home</option>
                </select>
              </SearchField>
              <SearchField label="Min. beds">
                <select
                  value={searchBeds}
                  onChange={(e) => setSearchBeds(e.target.value)}
                  className="w-full bg-transparent text-slate-900 focus:outline-none text-sm py-1"
                >
                  <option value="0">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </SearchField>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (searchState) params.set("state", searchState);
                    if (searchType !== "any") params.set("type", searchType);
                    if (searchBeds !== "0") params.set("beds", searchBeds);
                    const qs = params.toString();
                    navigate(`/listings${qs ? `?${qs}` : ""}`);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 text-sm font-semibold transition-colors"
                >
                  <SearchIcon size={16} />
                  Search homes
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Tip: pick a state to filter listings regionally. Try{" "}
              <button
                onClick={() => navigate("/state/CA")}
                className="text-emerald-700 font-medium hover:underline"
              >
                California
              </button>
              ,{" "}
              <button
                onClick={() => navigate("/state/TX")}
                className="text-emerald-700 font-medium hover:underline"
              >
                Texas
              </button>
              , or{" "}
              <button
                onClick={() => navigate("/state/FL")}
                className="text-emerald-700 font-medium hover:underline"
              >
                Florida
              </button>
              .
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {stats.map(({ Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
                <Icon size={22} className="text-emerald-400" />
                <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
                <p className="text-xs text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Handpicked for you
            </p>
            <h2 className="mt-1 text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              Featured properties
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl">
              A curated selection of standout homes for sale or rent across the United States,
              updated weekly by our agents.
            </p>
          </div>
          <button
            onClick={() => navigate("/listings")}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            View all listings <ArrowRightIcon size={14} />
          </button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((h) => (
            <PropertyCard key={h.id} house={h} />
          ))}
        </div>
      </section>

      {/* States band */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                Browse by location
              </p>
              <h2 className="mt-1 text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Homes in every U.S. state
              </h2>
              <p className="mt-2 text-slate-600 max-w-2xl">
                From coastal Florida to the mountains of Colorado, our agents cover all 50 states
                plus the District of Columbia.
              </p>
            </div>
            <button
              onClick={() => navigate("/states")}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              All 50 states <ArrowRightIcon size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {popularStates.map((s) => (
              <button
                key={s.code}
                onClick={() => navigate(`/state/${s.code}`)}
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left hover:border-emerald-400 hover:shadow-md transition-all"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 text-xs font-bold group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    {s.code}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                      {s.name}
                    </span>
                    <span className="block text-xs text-slate-500">{s.count} listings</span>
                  </span>
                </span>
                <ChevronRightIcon size={16} className="text-slate-400 group-hover:text-emerald-600" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            What we do
          </p>
          <h2 className="mt-1 text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Real estate services for every stage
          </h2>
          <p className="mt-3 text-slate-600">
            Whether you are buying your first home, upgrading for a growing family, or investing
            in a rental, our agents offer end-to-end support across the United States.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <svc.Icon size={24} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{svc.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{svc.desc}</p>
              <ul className="mt-4 space-y-2">
                {svc.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckIcon size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate(svc.route)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 self-start"
              >
                {svc.cta} <ArrowRightIcon size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Recent listings */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                Just listed
              </p>
              <h2 className="mt-1 text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Recently added homes
              </h2>
            </div>
            <button
              onClick={() => navigate("/listings")}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              See more <ArrowRightIcon size={14} />
            </button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((h) => (
              <PropertyCard key={h.id} house={h} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust / why us */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Why families choose EstateUSA
            </p>
            <h2 className="mt-1 text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              A safer, faster way to find your next home
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              We built EstateUSA around the things that matter to families: verified listings,
              licensed agents, transparent pricing, and responsive support across every U.S. state.
              No spam leads, no surprise fees.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                { Icon: ShieldIcon, title: "Verified listings", desc: "Every property is checked for ownership and listing accuracy before going live." },
                { Icon: KeyIcon, title: "Licensed local agents", desc: "Work with a real agent licensed in your state — not a call center." },
                { Icon: DollarIcon, title: "Transparent pricing", desc: "See the asking rent or sale price up front with no hidden markup." },
                { Icon: UsersIcon, title: "Personalized support", desc: "Your agent follows your search from first tour to signed lease or deed." },
              ].map((f) => (
                <li key={f.title} className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                    <f.Icon size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">{f.title}</span>
                    <span className="block text-sm text-slate-600">{f.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
            <img
              src={HOUSES[5].images[0]}
              alt="American home"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 backdrop-blur p-4 shadow-lg">
              <p className="text-xs text-slate-500">Featured listing</p>
              <p className="text-sm font-bold text-slate-900">{HOUSES[5].title}</p>
              <p className="text-xs text-slate-600">
                {HOUSES[5].address}, {HOUSES[5].city}, {HOUSES[5].stateName}
              </p>
              <p className="mt-1 text-lg font-bold text-emerald-700">{formatPrice(HOUSES[5])}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              From our clients
            </p>
            <h2 className="mt-1 text-3xl lg:text-4xl font-bold tracking-tight">
              Families who found their home with us
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "We were relocating from Boston to Austin with two kids and three weeks to find a place. Our EstateUSA agent lined up six tours in two days and we closed on a rental before our flight home.",
                name: "Priya & Aaron K.",
                location: "Austin, TX",
              },
              {
                quote:
                  "As a first-time buyer I had a million questions. My agent was patient, honest about which houses were overpriced, and helped me negotiate $14k off asking. I cannot recommend them enough.",
                name: "Marcus T.",
                location: "Charlotte, NC",
              },
              {
                quote:
                  "We sold our late mother's house in Phoenix from across the country. EstateUSA handled staging, photos, listing, and an offer within nine days. Professional from start to finish.",
                name: "Diane R.",
                location: "Phoenix, AZ",
              },
            ].map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col"
              >
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} size={16} />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-slate-200 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 pt-4 border-t border-slate-800">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.location}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-emerald-600">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20 grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Start your home search today
            </h2>
            <p className="mt-3 text-emerald-50 text-lg max-w-xl">
              Talk to a licensed agent, request private tours, and get matched with the right home —
              whether you are renting, buying, or selling.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <button
              onClick={() => navigate("/listings")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              <BuildingIcon size={16} /> Browse 320+ listings
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 text-white px-5 py-3 text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              <UsersIcon size={16} /> Talk to an agent
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SearchField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block rounded-lg border border-slate-200 bg-white px-3 py-2 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
      <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}
