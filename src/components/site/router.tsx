"use client";

import { useEffect, useState, useCallback } from "react";

// Hash-based router. We can only expose `/` (Next.js route),
// so all sub-pages live behind `#route` and we render the right view in-page.

export function useHashRoute(): [string, (to: string) => void] {
  const [path, setPath] = useState<string>("/");

  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace(/^#/, "");
      setPath(h || "/");
    };
    read();
    window.addEventListener("hashchange", read);
    window.addEventListener("popstate", read);
    return () => {
      window.removeEventListener("hashchange", read);
      window.removeEventListener("popstate", read);
    };
  }, []);

  const navigate = useCallback((to: string) => {
    let target = to;
    if (target.startsWith("#")) target = target.slice(1);
    if (!target.startsWith("/")) target = "/" + target;
    window.location.hash = target;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return [path, navigate];
}

export function useRouter() {
  const [current, navigate] = useHashRoute();
  return { current, navigate };
}

export function parseRoute(path: string): { pathname: string; query: URLSearchParams } {
  const clean = path.startsWith("/") ? path : "/" + path;
  const [pathname, queryString] = clean.split("?");
  return {
    pathname,
    query: new URLSearchParams(queryString || ""),
  };
}
