"use client";

import { useRouter } from "../router";
import { InquiryForm } from "../inquiry-form";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  ChevronRightIcon,
  HomeIcon,
  BuildingIcon,
  UsersIcon,
} from "../icons";

export function ContactView() {
  const { navigate } = useRouter();

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
          <nav className="text-xs text-slate-400 flex items-center gap-1.5">
            <button onClick={() => navigate("/")} className="hover:text-emerald-400">Home</button>
            <ChevronRightIcon size={12} />
            <span className="text-white">Contact</span>
          </nav>
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Get in touch
          </p>
          <h1 className="mt-1 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Talk to a licensed agent
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl text-lg">
            Tell us what you are looking for and we will match you with a licensed EstateUSA agent
            in your state. Expect a response within 24 hours — no spam, no lead auctions.
          </p>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        {/* Contact info */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">How to reach us</h2>
          <p className="mt-2 text-slate-600">
            Our team is available Monday through Saturday, 8am to 8pm Eastern. For urgent listing
            questions, please call your listing agent directly.
          </p>

          <ul className="mt-6 space-y-4">
            <ContactRow
              Icon={PhoneIcon}
              title="Phone"
              primary="(800) 555-0100"
              secondary="Mon – Sat, 8am – 8pm EST"
              href="tel:+18005550100"
            />
            <ContactRow
              Icon={MailIcon}
              title="Email"
              primary="hello@estateusa.com"
              secondary="Replies within 24 hours"
              href="mailto:hello@estateusa.com"
            />
            <ContactRow
              Icon={MapPinIcon}
              title="Headquarters"
              primary="1100 Connecticut Ave NW, Suite 1200"
              secondary="Washington, DC 20036"
            />
            <ContactRow
              Icon={ClockIcon}
              title="Office hours"
              primary="Monday – Friday: 8:00am – 8:00pm"
              secondary="Saturday: 9:00am – 6:00pm · Sunday: closed"
            />
          </ul>

          {/* Quick links */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Quick links
            </p>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Browse all listings", route: "/listings", Icon: HomeIcon },
                { label: "Homes for sale", route: "/listings?type=sale", Icon: BuildingIcon },
                { label: "Homes for rent", route: "/listings?type=rent", Icon: HomeIcon },
                { label: "States directory", route: "/states", Icon: MapPinIcon },
                { label: "Talk to an agent", route: "/contact", Icon: UsersIcon },
              ].map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => navigate(l.route)}
                    className="group flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-700"
                  >
                    <l.Icon size={14} className="text-emerald-600" />
                    {l.label}
                    <ChevronRightIcon size={12} className="ml-auto text-slate-400 group-hover:text-emerald-600" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form */}
        <div>
          <InquiryForm
            context="general"
            title="Send us a message"
            subtitle="A licensed agent in your state will reach out within 24 hours."
          />
        </div>
      </section>

      {/* Coverage band */}
      <section className="bg-emerald-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "50 + DC", label: "U.S. states covered" },
            { value: "320+", label: "Active listings" },
            { value: "50k+", label: "Families served" },
            { value: "< 24h", label: "Agent response time" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold tracking-tight">{s.value}</p>
              <p className="text-xs text-emerald-50 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ContactRow({
  Icon,
  title,
  primary,
  secondary,
  href,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  primary: string;
  secondary?: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
        <p className="text-sm font-semibold text-slate-900">{primary}</p>
        {secondary && <p className="text-xs text-slate-500">{secondary}</p>}
      </div>
    </div>
  );
  if (href) {
    return (
      <li>
        <a href={href} className="block hover:opacity-80 transition-opacity">
          {inner}
        </a>
      </li>
    );
  }
  return <li>{inner}</li>;
}
