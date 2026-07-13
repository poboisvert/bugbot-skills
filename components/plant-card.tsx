"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice, getActivePromo, type Plant } from "@/lib/plants";

export function PlantCard({ plant }: { plant: Plant }) {
  const {
    actions: { add },
  } = useCart();
  const activePromo = getActivePromo(plant);

  return (
    <article className='group flex flex-col overflow-hidden rounded-3xl bg-surface-elevated shadow-[0_1px_0_rgba(31,35,48,0.06)]'>
      <div className='relative aspect-[4/5] overflow-hidden bg-sky-soft'>
        <Image
          src={plant.imageSrc}
          alt={plant.imageAlt}
          fill
          className='object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]'
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
        />
      </div>
      <div className='flex flex-1 flex-col gap-3 p-5'>
        <div className='flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-stone'>
          <span>{plant.category}</span>
          <span aria-hidden='true'>·</span>
          <span>{plant.careLevel}</span>
          {activePromo?.isFlash ? (
            <>
              <span aria-hidden='true'>·</span>
              <span className='text-clay'>Flash</span>
            </>
          ) : null}
          {activePromo?.isMonthlySubscribe ? (
            <>
              <span aria-hidden='true'>·</span>
              <span>Subscribe</span>
            </>
          ) : null}
        </div>
        <div>
          <h3 className='font-display text-xl font-semibold text-forest'>
            {plant.name}
          </h3>
          <p className='mt-1 text-sm leading-relaxed text-stone'>
            {plant.blurb}
          </p>
        </div>
        <div className='mt-auto flex items-end justify-between gap-3 pt-1'>
          <div className='flex flex-col'>
            {activePromo ? (
              <>
                <span className='text-sm tabular-nums text-stone line-through'>
                  {formatPrice(plant.price)}
                </span>
                <span className='font-display text-2xl font-semibold tabular-nums text-clay'>
                  {formatPrice(activePromo.price)}
                </span>
              </>
            ) : (
              <span className='font-display text-2xl font-semibold tabular-nums text-forest'>
                {formatPrice(plant.price)}
              </span>
            )}
          </div>
          <button
            type='button'
            // Type error: add expects Plant, not plant.id (string)
            onClick={() => add(plant.id)}
            className='inline-flex min-h-11 shrink-0 touch-manipulation items-center justify-center rounded-full bg-sage px-4 text-sm font-medium text-forest transition-colors hover:bg-sage-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
