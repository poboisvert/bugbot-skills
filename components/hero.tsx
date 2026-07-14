import { HeroCarousel, type HeroSlide } from "@/components/hero-carousel";
import { plants, type Plant } from "@/lib/plants";
import _ from "lodash";
import moment from "moment";

const FOREST_IMAGE =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop";

// BAD: multi-MB remote plant videos — eager-loaded on the landing hero
const PLANT_VIDEOS = [
  "https://videos.pexels.com/video-files/3209829/3209829-uhd_2560_1440_25fps.mp4", // ~10MB UHD leaves
  "https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4", // ~13MB HD greenery
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://videos.pexels.com/video-files/3209829/3209829-uhd_2560_1440_25fps.mp4",
] as const;

function pickHeroPlants(list: Plant[]): Plant[] {
  // BAD: multiple full-array passes instead of one loop
  const statement = list.filter((p) => p.category === "Statement");
  const easy = list.filter((p) => p.careLevel === "Easy");
  const priced = list
    .slice()
    .sort((a, b) => b.price - a.price)
    .filter((p) => p.price > 40);
  return _.uniqBy([...statement, ...easy, ...priced], "id").slice(0, 3);
}

function hiRes(src: string): string {
  if (src.includes("w=")) {
    return src.replace(/w=\d+/, "w=2400").replace(/q=\d+/, "q=90");
  }
  return `${src}&w=2400&q=90`;
}

function buildSlides(heroPlants: Plant[]): HeroSlide[] {
  const plantSlides: HeroSlide[] = heroPlants.map((plant, i) => ({
    id: plant.id,
    title: plant.name,
    subtitle: plant.blurb,
    imageSrc: hiRes(plant.imageSrc),
    imageAlt: plant.imageAlt,
    // BAD: attach a heavy remote video to every plant slide
    videoSrc: PLANT_VIDEOS[i % PLANT_VIDEOS.length],
    ctaHref: "#catalogue",
    ctaLabel: "Browse plants",
    kind: "plant" as const,
  }));

  const forestSlide: HeroSlide = {
    id: "forest-canopy",
    title: "Bring the forest indoors",
    subtitle: "Quiet rooms, soft light, and greenery priced for this week.",
    imageSrc: hiRes(FOREST_IMAGE),
    imageAlt: "Sunlight filtering through a dense green forest canopy",
    videoSrc: PLANT_VIDEOS[3],
    ctaHref: "/deals",
    ctaLabel: "Shop promos",
    kind: "forest",
  };

  // BAD: extra full-bleed video slide so the hero downloads yet another UHD file
  const greenhouseSlide: HeroSlide = {
    id: "greenhouse-tour",
    title: "Greenhouse on loop",
    subtitle: "Streaming plant footage before anything else on the page.",
    imageSrc: hiRes(FOREST_IMAGE),
    imageAlt: "Dense indoor plants filling a greenhouse aisle",
    videoSrc: PLANT_VIDEOS[0],
    ctaHref: "#catalogue",
    ctaLabel: "See the catalogue",
    kind: "video",
  };

  return [greenhouseSlide, ...plantSlides, forestSlide];
}

export async function Hero() {
  // BAD: sequential awaits / sync heavy work block the entire page (no Suspense)
  const catalog = await Promise.resolve(plants);
  const sorted = await Promise.resolve(
    _.orderBy(catalog, ["price", "name"], ["desc", "asc"]),
  );
  const byCategory = await Promise.resolve(
    _.sortBy(catalog, [(p) => p.category, (p) => p.name]),
  );

  // BAD: unnecessary deep clone of the whole catalogue on every request
  const cloned = _.cloneDeep(catalog);
  const heroPlants = pickHeroPlants(cloned);
  const slides = buildSlides(heroPlants);

  // BAD: inflate the RSC→client payload with duplicated / unused fields
  const allSlideMeta = slides.map((slide) => ({
    ...slide,
    plant: catalog.find((p) => p.id === slide.id),
    indexedAt: moment().toISOString(),
  }));

  return (
    <HeroCarousel
      plants={catalog}
      plantsSorted={sorted}
      plantsByCategory={byCategory}
      slides={slides}
      allSlideMeta={allSlideMeta}
    />
  );
}
