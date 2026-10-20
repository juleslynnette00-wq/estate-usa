"use client";

import { useEffect } from "react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { useRouter, parseRoute } from "@/components/site/router";
import { HomeView } from "@/components/site/views/home";
import { ListingsView } from "@/components/site/views/listings";
import { PropertyDetailView } from "@/components/site/views/property-detail";
import { StatesView } from "@/components/site/views/states";
import { StateDetailView } from "@/components/site/views/state-detail";
import { AboutView } from "@/components/site/views/about";
import { ServicesView } from "@/components/site/views/services";
import { ContactView } from "@/components/site/views/contact";

export default function Home() {
  const { current } = useRouter();
  const { pathname } = parseRoute(current);

  // Update document title based on route
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "EstateUSA · American Homes for Rent or Sale",
      "/listings": "Browse Listings · EstateUSA",
      "/states": "U.S. States Directory · EstateUSA",
      "/about": "About Us · EstateUSA",
      "/services": "Our Services · EstateUSA",
      "/contact": "Contact an Agent · EstateUSA",
    };
    if (pathname.startsWith("/property/")) {
      document.title = "Property Details · EstateUSA";
    } else if (pathname.startsWith("/state/")) {
      document.title = "State Listings · EstateUSA";
    } else {
      document.title = titles[pathname] || "EstateUSA · American Homes";
    }
  }, [pathname]);

  function renderView() {
    if (pathname === "/" || pathname === "") return <HomeView />;
    if (pathname === "/listings") return <ListingsView route={current} />;
    if (pathname.startsWith("/property/")) return <PropertyDetailView route={current} />;
    if (pathname === "/states") return <StatesView />;
    if (pathname.startsWith("/state/")) return <StateDetailView route={current} />;
    if (pathname === "/about") return <AboutView />;
    if (pathname === "/services") return <ServicesView />;
    if (pathname === "/contact") return <ContactView />;
    return <NotFoundView />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <main className="flex-1">{renderView()}</main>
      <Footer />
    </div>
  );
}

function NotFoundView() {
  const { navigate } = useRouter();
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-7xl font-bold text-emerald-600">404</p>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">
        The page you are looking for does not exist or has moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
      >
        Back to home
      </button>
    </div>
  );
}
