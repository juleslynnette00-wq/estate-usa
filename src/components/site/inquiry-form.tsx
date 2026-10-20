"use client";

import { useState } from "react";
import { House } from "@/data/houses";
import { useRouter } from "./router";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  ClockIcon,
} from "./icons";

// Web3Forms integration.
// Two ways to set your access key (get one free at https://web3forms.com):
//   1. Locally: edit this file and replace "YOUR_ACCESS_KEY_HERE" below.
//   2. On Vercel (recommended): set a NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY env var
//      in Project Settings → Environment Variables. The value below will be
//      used as a fallback if the env var is not set.
//
// Until a real key is supplied, the form runs in DEMO MODE: it shows the
// success state and logs the would-be Web3Forms payload to the browser
// console so you can review what would have been emailed to the listing agent.
export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface InquiryFormProps {
  house?: House;
  context: "property" | "general";
  title?: string;
  subtitle?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  moveInDate: string;
  financing: string;
  message: string;
  consent: boolean;
}

const FINANCING_OPTIONS = [
  "I'm pre-approved for a mortgage",
  "I'm not yet pre-approved",
  "Cash buyer",
  "Renting — no financing needed",
  "Not sure yet",
];

export function InquiryForm({ house, context, title, subtitle }: InquiryFormProps) {
  const { navigate } = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    moveInDate: "",
    financing: "",
    message: house
      ? `Hi, I'm interested in ${house.title} at ${house.address}, ${house.city}, ${house.stateName} ${house.zip}. Please reach out to schedule a private tour.`
      : "",
    consent: false,
  });

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const payload: Record<string, string> = {
        access_key: WEB3FORMS_ACCESS_KEY,
        // Identify the form so you can filter in your Web3Forms dashboard
        subject: house
          ? `New inquiry for ${house.id} — ${house.title}`
          : "New inquiry from EstateUSA contact form",
        from_name: "EstateUSA Website",
        // Contact info
        fullname: form.fullName,
        email: form.email,
        phone: form.phone,
        // Inquiry details
        move_in_date: form.moveInDate,
        financing: form.financing,
        message: form.message,
        consent: form.consent ? "Yes — I agree to be contacted by an agent." : "No",
        // Property context (if any)
        ...(house
          ? {
              property_id: house.id,
              property_title: house.title,
              property_address: `${house.address}, ${house.city}, ${house.stateName} ${house.zip}`,
              property_price:
                house.listingType === "rent"
                  ? `$${house.price.toLocaleString()}/mo (rent)`
                  : `$${house.price.toLocaleString()}`,
              property_listing_type: house.listingType,
              property_url: `${window.location.origin}/#/property/${house.id}`,
              agent_name: house.agent.name,
              agent_email: house.agent.email,
            }
          : {}),
      };

      // Demo mode: when the access key is still the placeholder, simulate a
      // successful submission so reviewers can see the full UX. To enable
      // real email delivery, sign up at https://web3forms.com and replace
      // WEB3FORMS_ACCESS_KEY in src/components/site/inquiry-form.tsx with
      // your own access key — the form will then POST to Web3Forms for real.
      if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
        console.info(
          "[EstateUSA] Demo mode: inquiry would be submitted to Web3Forms with this payload:",
          payload
        );
        await new Promise((r) => setTimeout(r, 900));
        setStatus("success");
        setForm((f) => ({
          ...f,
          fullName: "",
          email: "",
          phone: "",
          moveInDate: "",
          financing: "",
          consent: false,
        }));
        return;
      }

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        // Reset only the contact fields, keep message context
        setForm((f) => ({ ...f, fullName: "", email: "", phone: "", moveInDate: "", financing: "", consent: false }));
      } else {
        setStatus("error");
        setError(data.message || "We couldn't submit your inquiry. Please try again or call us.");
      }
    } catch (err) {
      setStatus("error");
      setError(
        "We couldn't reach the submission service. Please check your connection and try again, or call (800) 555-0100."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
          <CheckIcon size={24} />
        </div>
        <h3 className="mt-3 text-lg font-bold text-emerald-900">Inquiry submitted!</h3>
        <p className="mt-1 text-sm text-emerald-800">
          {house ? (
            <>
              Your request for{" "}
              <span className="font-semibold">{house.title}</span> has been received.
              <span className="block mt-1">
                <span className="font-semibold">{house.agent.name}</span> ({house.agent.title}) will
                contact you within 24 hours at the email or phone you provided.
              </span>
            </>
          ) : (
            <>
              Thanks for reaching out. A licensed EstateUSA agent will contact you within 24 hours
              at the email or phone you provided.
            </>
          )}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
          <button
            onClick={() => setStatus("idle")}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-700"
          >
            Submit another request
          </button>
          <button
            onClick={() => navigate(house ? `/state/${house.state}` : "/listings")}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-300 text-emerald-800 px-4 py-2 text-sm font-semibold hover:bg-emerald-100"
          >
            {house ? `Browse more in ${house.stateName}` : "Browse listings"} <ArrowRightIcon size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title || "Get in touch"}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-slate-600">{subtitle}</p>}
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
          <ClockIcon size={11} /> Reply within 24h
        </span>
      </div>

      {/* Honeypot field for spam protection (Web3Forms recommends this) */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <input
        type="hidden"
        name="from_name"
        value="EstateUSA Website"
      />

      <div className="space-y-3">
        {/* Full name */}
        <Field label="Full name" required>
          <div className="relative">
            <UserIcon
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Jane Doe"
              className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </Field>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Email" required>
            <div className="relative">
              <MailIcon
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </Field>
          <Field label="Phone" required>
            <div className="relative">
              <PhoneIcon
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="(555) 555-0100"
                className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </Field>
        </div>

        {/* Move-in date + financing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Preferred move-in date" required>
            <div className="relative">
              <CalendarIcon
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="date"
                required
                value={form.moveInDate}
                onChange={(e) => update("moveInDate", e.target.value)}
                className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </Field>
          <Field label="Financing" required>
            <div className="relative">
              <select
                required
                value={form.financing}
                onChange={(e) => update("financing", e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-300 pl-3 pr-9 py-2.5 text-sm bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">Select…</option>
                {FINANCING_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </Field>
        </div>

        {/* Message */}
        <Field label="Message">
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Tell the agent about your timeline, must-haves, and any questions."
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-y"
          />
        </Field>

        {/* Consent */}
        <label className="flex items-start gap-2 text-xs text-slate-600">
          <input
            type="checkbox"
            required
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span>
            I agree to be contacted by {house ? `the listing agent (${house.agent.name})` : "a licensed EstateUSA agent"}
            regarding this inquiry, and I have read and accept the privacy policy.
          </span>
        </label>

        {/* Property context summary (display only) */}
        {house && (
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 space-y-0.5">
            <p className="font-semibold text-slate-800">You are inquiring about:</p>
            <p>{house.title}</p>
            <p>{house.address}, {house.city}, {house.stateName} {house.zip}</p>
            <p className="font-semibold text-emerald-700">
              {house.listingType === "rent"
                ? `$${house.price.toLocaleString()}/mo`
                : `$${house.price.toLocaleString()}`}
              {" · "}{house.beds} bd · {house.baths} ba · {house.sqft.toLocaleString()} sqft
            </p>
          </div>
        )}

        {status === "error" && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-4 py-3 text-sm font-semibold transition-colors"
        >
          {status === "submitting" ? (
            <>
              <span className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit inquiry <ArrowRightIcon size={16} />
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-500 text-center">
          We respect your privacy. Your details are only used to contact you about this listing and
          are never sold to third parties.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
        {label}
        {required && <span className="text-emerald-600 ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}
