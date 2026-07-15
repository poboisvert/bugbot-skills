import { Suspense } from "react";
import { Catalogue } from "@/components/catalogue";
import { Hero, HeroFallback } from "@/components/hero";
import { plants } from "@/lib/plants";

export default function Home() {
  return (
    <>
      <a
        href='#catalogue'
        className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-surface-elevated focus:px-4 focus:py-2 focus:text-forest focus:outline-2 focus:outline-offset-2 focus:outline-forest'
      >
        Skip to catalogue
      </a>
      <Suspense fallback={<HeroFallback />}>
        <Hero />
      </Suspense>
      <Catalogue plants={plants} />
    </>
  );
}
