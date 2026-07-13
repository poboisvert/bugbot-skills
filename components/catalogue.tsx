"use client";

import { startTransition, useMemo, useState } from "react";
import { PlantCard } from "@/components/plant-card";
import {
  hasPromo,
  plantCategories,
  type Plant,
  type PlantCategory,
} from "@/lib/plants";

type Filter = "All" | "Promo" | PlantCategory;

const FILTERS: Filter[] = ["All", "Promo", ...plantCategories];

export function Catalogue({ plants }: { plants: Plant[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(() => {
    if (filter === "All") return plants;
    if (filter === "Promo") return plants.filter((plant) => hasPromo(plant));
    return plants.filter((plant) => plant.category === filter);
  }, [filter, plants]);

  return (
    <section
      id='catalogue'
      className='mx-auto w-full max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24'
      aria-labelledby='catalogue-heading'
    >
      <div className='max-w-2xl'>
        <h2
          id='catalogue-heading'
          className='font-display text-3xl font-semibold tracking-tight text-balance text-forest sm:text-4xl'
        >
          Catalogue
        </h2>
        <p className='mt-3 text-base leading-relaxed text-stone sm:text-lg'>
          Seasonal promo prices on select plants. Add to cart to reserve — no
          payment required yet.
        </p>
      </div>

      <div
        className='mt-8 flex flex-wrap gap-2'
        role='group'
        aria-label='Filter plants'
      >
        {FILTERS.map((item) => {
          const selected = filter === item;
          return (
            <button
              key={item}
              type='button'
              aria-pressed={selected}
              onClick={() => {
                startTransition(() => {
                  setFilter(item);
                });
              }}
              className={`inline-flex min-h-11 touch-manipulation items-center rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
                selected
                  ? "bg-sage text-forest"
                  : "bg-surface-elevated text-forest hover:bg-sky-soft"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p className='mt-6 text-sm text-stone' aria-live='polite'>
        {visible.length} {visible.length === 1 ? "plant" : "plants"}
      </p>

      {visible.length === 0 ? (
        <p className='mt-10 text-stone'>No plants match this filter.</p>
      ) : (
        <ul className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {visible.map((plant) => (
            <li key={plant.id} className='[content-visibility:auto]'>
              <PlantCard plant={plant} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
