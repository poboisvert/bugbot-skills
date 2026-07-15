"use client";

import { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  ctaHref: string;
  ctaLabel: string;
  kind: "plant" | "forest";
};

type HeroCarouselProps = {
  slides: HeroSlide[];
};

const KIND_LABEL: Record<HeroSlide["kind"], string> = {
  forest: "Wild canopy",
  plant: "Featured plant",
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const active = slides[index] ?? slides[0];

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      startTransition(() => {
        setIndex((current) => (current + 1) % slides.length);
      });
    }, 5000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  function go(delta: number) {
    startTransition(() => {
      setIndex((current) => (current + delta + slides.length) % slides.length);
    });
  }

  if (!active) return null;

  return (
    <section
      id='hero-carousel-root'
      className='relative isolate flex min-h-[72svh] w-full scroll-mt-16 items-end overflow-hidden sm:min-h-[78svh]'
      aria-labelledby='hero-brand'
      aria-roledescription='carousel'
    >
      {/* Fixed-size media plane from first paint — one still at a time (min LCP, zero CLS) */}
      <div className='absolute inset-0'>
        <Image
          key={active.id}
          src={active.imageSrc}
          alt={active.imageAlt}
          fill
          sizes='100vw'
          className='object-cover'
          // Preload only the initial LCP candidate; later slides load on demand
          priority={index === 0}
          quality={75}
        />
      </div>

      <div
        className='absolute inset-0 bg-gradient-to-t from-surface via-surface/75 to-sky-soft/20'
        aria-hidden='true'
      />
      <div
        className='absolute inset-0 bg-gradient-to-tr from-clay-soft/30 via-transparent to-lemon-soft/25'
        aria-hidden='true'
      />

      <div className='relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 pt-20 sm:px-8 sm:pb-14'>
        <p className='hero-animate hero-font-meta mb-2 text-xs font-medium uppercase tracking-[0.2em] text-forest-muted'>
          {KIND_LABEL[active.kind]} · Seasonal promos
        </p>
        <h1
          id='hero-brand'
          translate='no'
          className='hero-animate hero-font-display text-4xl font-semibold tracking-tight text-balance text-forest sm:text-5xl md:text-6xl'
        >
          Canopy
        </h1>
        <p className='hero-animate hero-animate-delay-1 hero-font-subtitle mt-3 max-w-xl text-lg font-medium leading-snug text-pretty text-forest sm:text-xl'>
          {active.title}
        </p>
        <p className='hero-animate hero-animate-delay-1 hero-font-meta mt-2 max-w-lg text-base text-pretty text-forest-muted sm:text-lg'>
          {active.subtitle}
        </p>
        <div className='hero-animate hero-animate-delay-2 mt-6 flex flex-col gap-4 sm:flex-row sm:items-center'>
          <a
            href={active.ctaHref}
            className='inline-flex min-h-11 touch-manipulation items-center justify-center rounded-full bg-sage px-5 text-sm font-medium text-forest transition-colors hover:bg-sage-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest'
          >
            {active.ctaLabel}
          </a>
          <div className='flex items-center gap-3'>
            <button
              type='button'
              aria-label='Previous slide'
              onClick={() => go(-1)}
              className='inline-flex size-11 touch-manipulation items-center justify-center rounded-full bg-surface-elevated/90 text-forest shadow-sm transition-colors hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest'
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type='button'
              aria-label='Next slide'
              onClick={() => go(1)}
              className='inline-flex size-11 touch-manipulation items-center justify-center rounded-full bg-surface-elevated/90 text-forest shadow-sm transition-colors hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest'
            >
              <ChevronRight size={20} />
            </button>
            <div className='flex items-center gap-2' aria-hidden='true'>
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type='button'
                  onClick={() => startTransition(() => setIndex(i))}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === index ? "bg-forest" : "bg-forest/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
