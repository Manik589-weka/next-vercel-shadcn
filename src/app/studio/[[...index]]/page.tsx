import { StudioLoader } from "./StudioLoader";

export const metadata = {
  title: "Sanity Studio",
  robots: "noindex, nofollow",
};

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <StudioLoader />;
}
