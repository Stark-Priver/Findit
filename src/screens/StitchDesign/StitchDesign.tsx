import React from "react";
import { HowItWorksSection } from "./sections/HowItWorksSection/HowItWorksSection";
import { RecentlyFoundItemsSection } from "./sections/RecentlyFoundItemsSection";

export const StitchDesign = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full bg-white">
      <section className="flex flex-col w-full bg-[#f7f9fc]">
        <div className="flex flex-col w-full">
          <HowItWorksSection />
          <RecentlyFoundItemsSection />
        </div>
      </section>
    </main>
  );
};