import { HeroCarousel, type HeroSlide } from "@/components/hero-carousel";
import { plants, type Plant } from "@/lib/plants";

const FOREST_IMAGE =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=75";

function pickHeroPlants(list: Plant[]): Plant[] {
  const seen = new Set<string>();
  const picked: Plant[] = [];

  for (const plant of list) {
    if (picked.length >= 3) break;
    const match =
      plant.category === "Statement" ||
      plant.careLevel === "Easy" ||
      plant.price > 40;
    if (!match || seen.has(plant.id)) continue;
    seen.add(plant.id);
    picked.push(plant);
  }

  return picked;
}

function buildSlides(heroPlants: Plant[]): HeroSlide[] {
  const plantSlides: HeroSlide[] = heroPlants.map((plant) => ({
    id: plant.id,
    title: plant.name,
    subtitle: plant.blurb,
    imageSrc: plant.imageSrc,
    imageAlt: plant.imageAlt,
    ctaHref: "#catalogue",
    ctaLabel: "Browse plants",
    kind: "plant" as const,
  }));

  const forestSlide: HeroSlide = {
    id: "forest-canopy",
    title: "Bring the forest indoors",
    subtitle: "Quiet rooms, soft light, and greenery priced for this week.",
    imageSrc: FOREST_IMAGE,
    imageAlt: "Sunlight filtering through a dense green forest canopy",
    ctaHref: "/deals",
    ctaLabel: "Shop promos",
    kind: "forest",
  };

  // Still-image lead slide — one optimized LCP candidate, no remote video
  const greenhouseSlide: HeroSlide = {
    id: "greenhouse-tour",
    title: "Greenhouse calm",
    subtitle: "Thoughtfully chosen indoor plants with seasonal promo pricing.",
    imageSrc: FOREST_IMAGE,
    imageAlt: "Dense indoor plants filling a greenhouse aisle",
    ctaHref: "#catalogue",
    ctaLabel: "See the catalogue",
    kind: "forest",
  };

  return [greenhouseSlide, ...plantSlides, forestSlide];
}

export function Hero() {
  const slides = buildSlides(pickHeroPlants(plants));
  return <HeroCarousel slides={slides} />;
}

/** Matches hero reserved height so Suspense fallback does not shift layout. */
export function HeroFallback() {
  return (
    <section
      className='relative isolate flex min-h-[72svh] w-full scroll-mt-16 items-end overflow-hidden bg-sky-soft sm:min-h-[78svh]'
      aria-hidden='true'
    >
      <div className='relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 pt-20 sm:px-8 sm:pb-14'>
        <div className='mb-2 h-3 w-40 rounded bg-forest/10' />
        <div className='h-12 w-48 rounded bg-forest/15 sm:h-14 md:h-16' />
        <div className='mt-3 h-6 max-w-xl rounded bg-forest/10' />
        <div className='mt-2 h-5 max-w-lg rounded bg-forest/10' />
        <div className='mt-6 h-11 w-36 rounded-full bg-sage/80' />
      </div>
    </section>
  );
}
