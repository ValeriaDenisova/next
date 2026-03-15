import type { Metadata } from "next";
import NationalCuisines from "@components/pages/NationalCuisines";

export const metadata: Metadata = {
  title: "Recipes — National cuisines",
  description:
    "An overview of recipes for world national cuisines: Italian, Japanese, Mexican, Indian and others. Quick meals for every day, authentic recipes and menu ideas.",
};

export default async function DietsPage() {
  return <NationalCuisines />;
}
