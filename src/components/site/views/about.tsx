"use client";

import { useRouter } from "../router";
import {
  ShieldIcon,
  KeyIcon,
  UsersIcon,
  AwardIcon,
  HomeIcon,
  BuildingIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
} from "../icons";

export function AboutView() {
  const { navigate } = useRouter();

  const values = [
    {
      Icon: ShieldIcon,
      title: "Trust & verification",
      desc: "We verify every listing, every agent license, and every contact method before publishing. No fake listings, ever.",
    },
    {
      Icon: KeyIcon,
      title: "Licensed local agents",
      desc: "You always work with a real, licensed agent in your state — never a call center or commission-only salesperson.",
    },
    {
      Icon: UsersIcon,
      title: "Family-first approach",
      desc: "We treat every client like family. From first call to signed keys, your agent knows your story, your timeline, your budget.",
    },
    {
      Icon: AwardIcon,
      title: "15+ years of service",
      desc: "Founded in 2008, EstateUSA has helped more than 50,000 American families find their next home across all 50 states.",
    },
  ];

  const timeline = [
    { year: "2008", title: "Founded in Washington, D.C.", desc: "EstateUSA opens its first office serving the D.C. metro area." },
    { year: "2012", title: "Expanded to all 50 states", desc: "Licensed agents in every U.S. state plus the District of Columbia." },
    { year: "2017", title: "10,000 families served", desc: "Milestone reached after a strong year in California, Texas, and Florida." },
    { year: "2021", title: "Mobile-first website launched", desc: "Our responsive site makes home search easy from any device." },
    { year: "2026", title: "50,000 families and counting", desc: "Today, EstateUSA is one of the most trusted names in American real estate." },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            About EstateUSA
          </p>
          <h1 className="mt-1 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl leading-[1.05]">
            American homes, found by American agents.
          </h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl leading-relaxed">
            EstateUSA is a full-service residential real estate platform covering all 50 U.S. states
            plus the District of Columbia. We connect families with licensed local agents and
            verified homes for rent or sale — without the noise of national portal spam leads.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/listings")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 text-sm font-semibold"
            >
              <HomeIcon size={16} /> Browse 320+ listings
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-transparent px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Talk to an agent <ArrowRightIcon size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { value: "320+", label: "Active listings" },
          { value: "50 + DC", label: "U.S. states" },
          { value: "50,000+", label: "Families served" },
          { value: "15+", label: "Years of service" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-emerald-700 tracking-tight">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-slate-600 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24 grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Our story
          </p>
          <h2 className="mt-1 text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            From a D.C. office to all 50 states
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            EstateUSA was founded in 2008 by a small group of licensed agents in Washington, D.C.
            who were frustrated by the impersonal, lead-driven nature of national real estate
            portals. They believed families deserved a real conversation with a real local agent —
            someone who knew the neighborhood, the schools, the commute, and the local market.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Eighteen years later, we cover every U.S. state and D.C. with a network of licensed
            agents who share that same commitment. We do not sell your data, we do not pass your
            inquiry to ten different people, and we do not list a home we have not verified.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Every inquiry goes directly to the agent who listed the home — and you will hear from a
            real, licensed human within 24 hours.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3]">
          <img
            src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/72a86e03f3fe.jpg"
            alt="EstateUSA American home"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              What we stand for
            </p>
            <h2 className="mt-1 text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Four values that shape every transaction
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-white border border-slate-200 p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <v.Icon size={22} />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Our journey
          </p>
          <h2 className="mt-1 text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            A timeline of milestones
          </h2>
        </div>
        <ol className="relative max-w-3xl mx-auto">
          <div className="absolute left-3 sm:left-1/2 top-0 bottom-0 w-px bg-slate-200" />
          {timeline.map((t, idx) => (
            <li
              key={t.year}
              className="relative flex items-start gap-6 pb-10 last:pb-0"
            >
              <div className="flex-1">
                <div
                  className={`rounded-2xl border border-slate-200 bg-white p-5 ${
                    idx % 2 === 0 ? "sm:ml-auto sm:w-[calc(50%-2rem)]" : "sm:mr-auto sm:w-[calc(50%-2rem)]"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                    {t.year}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-slate-900">{t.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{t.desc}</p>
                </div>
              </div>
              <span className="absolute left-3 sm:left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white ring-4 ring-white">
                <BuildingIcon size={12} />
              </span>
              <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
            </li>
          ))}
        </ol>
      </section>

      {/* Team teaser */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Meet the agents
            </p>
            <h2 className="mt-1 text-3xl lg:text-4xl font-bold tracking-tight">
              Real people, real licenses, real results
            </h2>
            <p className="mt-3 text-slate-300">
              Our agent roster is built on years of local experience, a track record of successful
              closings, and a commitment to families first.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { initials: "SM", name: "Sarah Mitchell", title: "Senior Real Estate Agent", state: "New York" },
              { initials: "JC", name: "James Carter", title: "Property Consultant", state: "California" },
              { initials: "ER", name: "Emily Rodriguez", title: "Luxury Specialist", state: "Illinois" },
              { initials: "MC", name: "Michael Chen", title: "Residential Agent", state: "Washington" },
            ].map((a) => (
              <div
                key={a.initials}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white text-xl font-bold">
                  {a.initials}
                </div>
                <p className="mt-3 text-base font-bold">{a.name}</p>
                <p className="text-xs text-slate-400">{a.title}</p>
                <p className="text-xs text-emerald-400 flex items-center justify-center gap-1 mt-1">
                  <CheckIcon size={11} /> Licensed in {a.state}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600">
        <div className="mx-auto max-w-7xl px-6 py-14 grid gap-6 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Ready to find your home?
            </h2>
            <p className="mt-2 text-emerald-50">
              Browse {`320+`} listings across all 50 states, or talk to a licensed agent today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <button
              onClick={() => navigate("/listings")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-emerald-700"
            >
              Browse listings <ArrowRightIcon size={14} />
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 text-white px-5 py-3 text-sm font-semibold"
            >
              Contact an agent
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
