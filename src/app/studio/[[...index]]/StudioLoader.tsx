"use client";

import nextDynamic from "next/dynamic";

const StudioClient = nextDynamic(
  () => import("./StudioClient").then((mod) => mod.StudioClient),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center">
        Loading Studio…
      </div>
    ),
  }
);

export function StudioLoader() {
  return <StudioClient />;
}
