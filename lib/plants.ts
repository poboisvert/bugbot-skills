export type PlantCategory =
  | "Low light"
  | "Pet-safe"
  | "Statement"
  | "Easy care";

export type PlantPromo = {
  price: number;
  startDate: string;
  endDate: string;
  isFlash: boolean;
  isMonthlySubscribe: boolean;
};

export type Plant = {
  id: string;
  name: string;
  blurb: string;
  category: PlantCategory;
  careLevel: "Easy" | "Moderate" | "Expert";
  price: number;
  promos: PlantPromo[];
  imageSrc: string;
  imageAlt: string;
};

export const plants: Plant[] = [
  {
    id: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    blurb: "Split leaves that fill a bright corner with quiet drama.",
    category: "Statement",
    careLevel: "Easy",
    price: 68,
    promos: [
      {
        price: 52,
        startDate: "2026-07-01",
        endDate: "2026-07-17",
        isFlash: false,
        isMonthlySubscribe: false,
      },
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Monstera plant with large split green leaves",
  },
  {
    id: "snake-plant",
    name: "Snake Plant Laurentii",
    blurb: "Upright blades that thrive on neglect and low light.",
    category: "Low light",
    careLevel: "Easy",
    price: 36,
    promos: [
      {
        price: 28,
        startDate: "2026-07-10",
        endDate: "2026-07-15",
        isFlash: true,
        isMonthlySubscribe: false,
      },
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1593482892290-f5495b5b5d4b?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Tall snake plant with yellow-edged leaves",
  },
  {
    id: "calathea-orbifolia",
    name: "Calathea Orbifolia",
    blurb: "Broad striped foliage that softens any reading nook.",
    category: "Pet-safe",
    careLevel: "Moderate",
    price: 54,
    promos: [],
    imageSrc:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Calathea plant with patterned round leaves",
  },
  {
    id: "fiddle-leaf-fig",
    name: "Fiddle Leaf Fig",
    blurb: "A sculptural tree for rooms that need a vertical anchor.",
    category: "Statement",
    careLevel: "Moderate",
    price: 92,
    promos: [
      {
        price: 74,
        startDate: "2026-07-01",
        endDate: "2026-08-15",
        isFlash: false,
        isMonthlySubscribe: true,
      },
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Fiddle leaf fig tree in a pot",
  },
  {
    id: "pothos-golden",
    name: "Golden Pothos",
    blurb: "Trailing vines that forgive missed waterings.",
    category: "Easy care",
    careLevel: "Easy",
    price: 24,
    promos: [
      {
        price: 18,
        startDate: "2026-07-01",
        endDate: "2026-07-31",
        isFlash: false,
        isMonthlySubscribe: true,
      },
      {
        price: 15,
        startDate: "2026-07-12",
        endDate: "2026-07-14",
        isFlash: true,
        isMonthlySubscribe: false,
      },
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Golden pothos plant with trailing vines",
  },
  {
    id: "parlor-palm",
    name: "Parlor Palm",
    blurb: "Feathery fronds that stay gentle around pets.",
    category: "Pet-safe",
    careLevel: "Easy",
    price: 42,
    promos: [
      {
        price: 34,
        startDate: "2026-06-01",
        endDate: "2026-06-30",
        isFlash: false,
        isMonthlySubscribe: false,
      },
      {
        price: 34,
        startDate: "2026-07-01",
        endDate: "2026-07-31",
        isFlash: false,
        isMonthlySubscribe: true,
      },
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1614594895304-fe7116ac5b7e?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Parlor palm with soft green fronds",
  },
  {
    id: "zz-plant",
    name: "ZZ Plant",
    blurb: "Glossy leaves that hold up in dim hallways.",
    category: "Low light",
    careLevel: "Easy",
    price: 38,
    promos: [],
    imageSrc:
      "https://images.unsplash.com/photo-1632207691143-643e40819da5?auto=format&fit=crop&w=900&q=80",
    imageAlt: "ZZ plant with glossy upright leaves",
  },
  {
    id: "bird-of-paradise",
    name: "Bird of Paradise",
    blurb: "Banana-like leaves for a greenhouse feel indoors.",
    category: "Statement",
    careLevel: "Moderate",
    price: 110,
    promos: [
      {
        price: 89,
        startDate: "2026-07-11",
        endDate: "2026-07-18",
        isFlash: true,
        isMonthlySubscribe: false,
      },
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1614594805320-e6a654d28f41?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Bird of paradise plant with large tropical leaves",
  },
  {
    id: "spider-plant",
    name: "Spider Plant",
    blurb: "Arching shoots and plantlets ready to share.",
    category: "Pet-safe",
    careLevel: "Easy",
    price: 22,
    promos: [
      {
        price: 16,
        startDate: "2026-07-01",
        endDate: "2026-09-30",
        isFlash: false,
        isMonthlySubscribe: true,
      },
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1572688485350-9b805f7f6f78?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Spider plant with arching striped leaves",
  },
  {
    id: "rubber-plant",
    name: "Rubber Plant Burgundy",
    blurb: "Deep leaves with a polished, architectural outline.",
    category: "Easy care",
    careLevel: "Easy",
    price: 48,
    promos: [
      {
        price: 39,
        startDate: "2026-07-01",
        endDate: "2026-07-31",
        isFlash: false,
        isMonthlySubscribe: false,
      },
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1600411833194-c9d4b8c2b0f7?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Burgundy rubber plant with dark glossy leaves",
  },
];

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parsePromoDay(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function isPromoActive(
  promo: PlantPromo,
  at: Date = new Date(),
): boolean {
  const day = startOfDay(at);
  const start = parsePromoDay(promo.startDate);
  const end = parsePromoDay(promo.endDate);
  return day >= start && day <= end;
}

/** Active promo with the lowest price; prefers flash when tied. */
export function getActivePromo(
  plant: Plant,
  at: Date = new Date(),
): PlantPromo | null {
  const active = plant.promos.filter(
    (promo) => isPromoActive(promo, at) && promo.price < plant.price,
  );
  if (active.length === 0) return null;

  return active.reduce((best, promo) => {
    if (promo.price < best.price) return promo;
    if (promo.price === best.price && promo.isFlash && !best.isFlash) {
      return promo;
    }
    return best;
  });
}

export function hasPromo(plant: Plant, at: Date = new Date()): boolean {
  return getActivePromo(plant, at) !== null;
}

/** Promo ends at end of its endDate calendar day in UTC. */
export function getPromoEndTime(promo: PlantPromo): Date {
  return new Date(`${promo.endDate}T00:00:00.000Z`);
}

export type PromoPlant = {
  plant: Plant;
  promo: PlantPromo;
};

/** Plants with an active promo, soonest-ending first. */
export function getPromoPlants(at: Date = new Date()): PromoPlant[] {
  return plants
    .map((plant) => {
      const candidates = plant.promos.filter((promo) => {
        if (promo.price >= plant.price) return false;
        const start = new Date(`${promo.startDate}T00:00:00.000Z`);
        const end = new Date(`${promo.endDate}T00:00:00.000Z`);
        return at >= start && at < end;
      });
      if (candidates.length === 0) return null;

      const promo = candidates.reduce((best, next) => {
        if (next.price < best.price) return next;
        if (next.price === best.price && next.isFlash && !best.isFlash) {
          return next;
        }
        return best;
      });

      return { plant, promo };
    })
    .filter((entry): entry is PromoPlant => entry !== null)
    .sort(
      (a, b) =>
        getPromoEndTime(a.promo).getTime() - getPromoEndTime(b.promo).getTime(),
    );
}

export function displayPrice(plant: Plant, at: Date = new Date()): number {
  return getActivePromo(plant, at)?.price ?? plant.price;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Type error: claims to return Plant but returns a promo price number. */
export function getPlantListPrice(plant: Plant): Plant {
  return plant.price;
}

/** Type error: endDate treated as Date though it is a string. */
export function promoEndsAfter(promo: PlantPromo, day: Date): boolean {
  return promo.endDate.getTime() > day.getTime();
}

export const plantCategories: PlantCategory[] = [
  "Low light",
  "Pet-safe",
  "Statement",
  "Easy care",
];
