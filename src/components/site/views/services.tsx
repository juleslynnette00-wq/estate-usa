"use client";

import { useRouter } from "../router";
import {
  KeyIcon,
  HomeIcon,
  TrendingIcon,
  ShieldIcon,
  UsersIcon,
  DollarIcon,
  CheckIcon,
  ArrowRightIcon,
  AwardIcon,
} from "../icons";

export function ServicesView() {
  const { navigate } = useRouter();

  const services = [
    {
      Icon: KeyIcon,
      title: "Buy a Home",
      tagline: "Find the right place, make a confident offer",
      desc: "Our buyer agents work with first-timers, growing families, and seasoned investors. We help you understand local markets, line up financing, tour homes, and submit a strong, well-negotiated offer. From the first showing to the closing table, we are your advocate.",
      deliverables: [
        "Personalized listing alerts by state, city, or ZIP",
        "Pre-approval and lender introductions",
        "Private tours scheduled within 24 hours",
        "Comparable market analysis on every offer",
        "Negotiation, inspection, and closing support",
      ],
      cta: "Browse homes for sale",
      route: "/listings?type=sale",
    },
    {
      Icon: HomeIcon,
      title: "Rent a Home",
      tagline: "Move-in ready rentals across the country",
      desc: "Find single-family rentals, townhomes, condos, and apartments in cities and suburbs nationwide. Every landlord and listing is verified, so you can tour with confidence and sign a lease that fits your timeline.",
      deliverables: [
        "Verified landlord listings, no scams",
        "Flexible lease terms (3, 6, 12 months+)",
        "Same-day tour requests in most markets",
        "Lease review and rent negotiation",
        "Move-in coordination and key handoff",
      ],
      cta: "Browse rentals",
      route: "/listings?type=rent",
    },
    {
      Icon: TrendingIcon,
      title: "Sell Your Property",
      tagline: "Maximize your sale with a local expert",
      desc: "List with an agent who knows your market block by block. We start with a free comparative market analysis, then build a marketing plan — professional photos, listing syndication, open houses, and outreach to qualified buyers in our network.",
      deliverables: [
        "Free, no-obligation home valuation",
        "Professional staging and photography",
        "Listing on top national portals",
        "Open house and private showing plan",
        "Offer review, negotiation, and escrow support",
      ],
      cta: "Request a valuation",
      route: "/contact",
    },
  ];

  const additionalServices = [
    {
      Icon: ShieldIcon,
      title: "Listing verification",
      desc: "Every property on EstateUSA is checked for ownership, listing accuracy, and current availability before going live.",
    },
    {
      Icon: DollarIcon,
      title: "Financing introductions",
      desc: "Connect with trusted local lenders and mortgage brokers who can pre-approve you fast and at competitive rates.",
    },
    {
      Icon: UsersIcon,
      title: "Relocation support",
      desc: "Moving across the country? We help families relocate state-to-state with a dedicated relocation specialist.",
    },
    {
      Icon: AwardIcon,
      title: "Investment guidance",
      desc: "For landlords and investors: cap-rate analysis, rental projections, and 1031 exchange referrals.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Our services
          </p>
          <h1 className="mt-1 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl leading-[1.05]">
            Real estate services for every American family
          </h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl leading-relaxed">
            Whether you are buying, renting, selling, or relocating — our licensed agents cover all
            50 U.S. states with the same family-first approach we started with in 2008.
          </p>
        </div>
      </section>

      {/* Main services */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="space-y-10">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`grid gap-8 lg:grid-cols-2 items-start ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <s.Icon size={24} />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-emerald-600">
                  {s.tagline}
                </p>
                <h2 className="mt-1 text-3xl font-bold text-slate-900 tracking-tight">{s.title}</h2>
                <p className="mt-3 text-slate-700 leading-relaxed">{s.desc}</p>
                <ul className="mt-5 space-y-2">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <CheckIcon size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate(s.route)}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-sm font-semibold"
                >
                  {s.cta} <ArrowRightIcon size={14} />
                </button>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  What is included
                </p>
                <h3 className="mt-1 text-base font-bold text-slate-900">
                  {s.title} engagement package
                </h3>
                <ul className="mt-4 space-y-3">
                  {s.deliverables.map((d, idx) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 rounded-lg bg-slate-50 border border-slate-100 p-3"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-slate-700">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional services */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Beyond the basics
            </p>
            <h2 className="mt-1 text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Additional services included free
            </h2>
            <p className="mt-3 text-slate-600">
              Every EstateUSA client gets access to these supporting services, at no extra cost.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl bg-white border border-slate-200 p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <s.Icon size={22} />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 grid gap-6 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Talk to an agent today
            </h2>
            <p className="mt-2 text-emerald-50">
              Tell us what you need — buying, renting, selling, or relocating — and a licensed agent
              will follow up within 24 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-emerald-700 px-5 py-3 text-sm font-semibold"
            >
              Contact an agent <ArrowRightIcon size={14} />
            </button>
            <button
              onClick={() => navigate("/listings")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 text-white px-5 py-3 text-sm font-semibold"
            >
              Browse listings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
