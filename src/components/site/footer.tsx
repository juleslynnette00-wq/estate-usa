"use client";

import { useRouter } from "./router";
import { US_STATES } from "@/data/states";
import {
  HomeIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  ArrowRightIcon,
} from "./icons";

export function Footer() {
  const { navigate } = useRouter();

  const popularStates = US_STATES.slice(0, 12);

  return (
    <footer className="mt-auto bg-slate-950 text-slate-300">
      {/* CTA band */}
      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Ready to find your next home?
            </h3>
            <p className="mt-2 text-slate-400 max-w-xl">
              Browse over 300 verified listings across all 50 U.S. states, or talk to a licensed
              agent who can match you with the perfect property today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <button
              onClick={() => navigate("/listings")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors"
            >
              Browse Listings <ArrowRightIcon size={16} />
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-transparent px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              Contact an Agent
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5"
            aria-label="EstateUSA home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
              <HomeIcon size={22} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-bold text-white tracking-tight">
                Estate<span className="text-emerald-400">USA</span>
              </span>
              <span className="text-[10px] tracking-[0.18em] text-slate-400 uppercase">
                American Homes · Rent or Buy
              </span>
            </span>
          </button>
          <p className="mt-5 text-sm text-slate-400 max-w-md leading-relaxed">
            EstateUSA is a full-service American real estate platform connecting families with
            homes for rent or sale across all 50 states. From coast to coast, our licensed agents
            help you find a place to call home.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPinIcon size={16} className="mt-0.5 text-emerald-400 shrink-0" />
              <span>1100 Connecticut Ave NW, Suite 1200, Washington, DC 20036</span>
            </li>
            <li className="flex items-center gap-2.5">
              <PhoneIcon size={16} className="text-emerald-400 shrink-0" />
              <a href="tel:+18005550100" className="hover:text-white transition-colors">
                (800) 555-0100
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MailIcon size={16} className="text-emerald-400 shrink-0" />
              <a href="mailto:hello@estateusa.com" className="hover:text-white transition-colors">
                hello@estateusa.com
              </a>
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            {[
              { Icon: FacebookIcon, label: "Facebook" },
              { Icon: TwitterIcon, label: "X (Twitter)" },
              { Icon: InstagramIcon, label: "Instagram" },
              { Icon: LinkedinIcon, label: "LinkedIn" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase mb-4">
            Explore
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Home", route: "/" },
              { label: "Buy a Home", route: "/listings?type=sale" },
              { label: "Rent a Home", route: "/listings?type=rent" },
              { label: "Browse All Listings", route: "/listings" },
              { label: "States Directory", route: "/states" },
              { label: "Services", route: "/services" },
              { label: "About Us", route: "/about" },
              { label: "Contact", route: "/contact" },
            ].map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => navigate(l.route)}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular states */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase mb-4">
            Popular States
          </h4>
          <ul className="space-y-2.5 text-sm">
            {popularStates.map((s) => (
              <li key={s.code}>
                <button
                  onClick={() => navigate(`/state/${s.code}`)}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left"
                >
                  {s.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigate("/states")}
                className="text-emerald-400 hover:text-emerald-300 font-medium"
              >
                View all 50 states →
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase mb-4">
            Stay in the loop
          </h4>
          <p className="text-sm text-slate-400 mb-3">
            Get weekly market reports and new listings in your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem("email") as HTMLInputElement);
              if (input?.value) {
                alert(`Thanks! We'll send market updates to ${input.value}.`);
                input.value = "";
              }
            }}
            className="flex flex-col gap-2"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-3 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              Subscribe <ArrowRightIcon size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EstateUSA. All rights reserved. Licensed in all 50 U.S. states.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Accessibility</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Fair Housing</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
