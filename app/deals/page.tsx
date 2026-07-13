import type { Metadata } from "next";
import { Deals } from "@/components/deals";

export const metadata: Metadata = {
  title: "Deals — Canopy",
  description:
    "Active plant promos with live countdowns until each offer ends.",
};

export default function DealsPage() {
  return <Deals />;
}
