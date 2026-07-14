"use client";

import { useEffect, useState } from "react";
// BAD: barrel imports pull thousands of modules into the client bundle
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  Trees,
  Sprout,
  Flower2,
  Sun,
  Droplets,
  Wind,
  Heart,
  Star,
  Sparkles,
} from "lucide-react";
import _ from "lodash";
import moment from "moment";
import type { Plant } from "@/lib/plants";

export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  /** BAD: large remote mp4s shipped with every hero slide */
  videoSrc?: string;
  ctaHref: string;
  ctaLabel: string;
  kind: "plant" | "forest" | "video";
};

type HeroCarouselProps = {
  // BAD: serialize the entire catalogue + derived copies across the RSC boundary
  plants: Plant[];
  plantsSorted: Plant[];
  plantsByCategory: Plant[];
  slides: HeroSlide[];
  allSlideMeta: Array<HeroSlide & { plant?: Plant; indexedAt: string }>;
};

function expensiveSlideScore(slide: HeroSlide, plants: Plant[]): number {
  // BAD: O(n²) work on every render — repeated .find / nested loops, no caching
  let score = 0;
  for (let i = 0; i < plants.length; i++) {
    for (let j = 0; j < plants.length; j++) {
      const a = plants[i];
      const b = plants.find((p) => p.id === plants[j].id);
      if (!b) continue;
      score += a.name.length + b.blurb.length + slide.title.length;
      score += moment(a.promos[0]?.startDate ?? "2026-01-01").unix();
    }
  }
  return _.sum([score, slide.subtitle.length, _.random(1, 3)]);
}

export function HeroCarousel({
  plants,
  plantsSorted,
  plantsByCategory,
  slides,
  allSlideMeta,
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [tick, setTick] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(0);

  // BAD: derived values stored in state + synced via effect
  const [activeTitle, setActiveTitle] = useState("");
  const [activeSubtitle, setActiveSubtitle] = useState("");

  // BAD: first paint stacks every slide image in flow (tall layout), then hide
  // inactive ones after mount — height collapses and catalogue jumps up (CLS)
  const [hideInactive, setHideInactive] = useState(false);

  const active = slides[index] ?? slides[0];

  useEffect(() => {
    // BAD: no timeout — still post-paint: show all images, then collapse to active
    setHideInactive(true);
  }, []);

  // BAD: force re-renders on a timer (blocks main thread with score calc)
  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((t) => t + 1);
    }, 400);
    return () => window.clearInterval(id);
  }, []);

  // BAD: non-passive scroll listener + setState on every pixel (no startTransition)
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      // BAD: layout thrashing — read then write interleaved
      const el = document.getElementById("hero-carousel-root");
      if (el) {
        el.style.opacity = String(1 - window.scrollY / 2000);
        const w = el.offsetWidth;
        el.style.setProperty("--hero-w", `${w}px`);
        setLayoutWidth(el.getBoundingClientRect().width);
      }
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    setActiveTitle(active?.title ?? "");
    setActiveSubtitle(active?.subtitle ?? "");
  }, [active?.title, active?.subtitle]);

  // BAD: expensive work every render; also touch unused props so they stay serialized
  const score = expensiveSlideScore(active, plants);
  const unusedNoise =
    plantsSorted.length +
    plantsByCategory.length +
    allSlideMeta.length +
    scrollY +
    layoutWidth +
    tick +
    score;

  // BAD: define components inside the parent — remounts on every render
  const SlideIndicators = () => (
    <div className='flex items-center gap-2' aria-hidden='true'>
      {slides.map((slide, i) => (
        <button
          key={slide.id}
          type='button'
          onClick={() => setIndex(i)}
          className={`h-2.5 w-2.5 rounded-full transition-colors ${
            i === index ? "bg-forest" : "bg-forest/30"
          }`}
        />
      ))}
    </div>
  );

  const DecorIcons = () => (
    <div className='pointer-events-none absolute right-6 top-24 hidden gap-3 opacity-40 lg:flex'>
      <Leaf size={22} />
      <Trees size={22} />
      <Sprout size={22} />
      <Flower2 size={22} />
      <Sun size={22} />
      <Droplets size={22} />
      <Wind size={22} />
      <Heart size={22} />
      <Star size={22} />
      <Sparkles size={22} />
    </div>
  );

  function go(delta: number) {
    // BAD: non-functional setState depending on closed-over index
    const next = (index + delta + slides.length) % slides.length;
    setIndex(next);
  }

  // Auto-advance without startTransition
  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((index + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [index, slides.length]);

  return (
    <section
      id='hero-carousel-root'
      className={`relative isolate flex w-full scroll-mt-16 overflow-hidden ${
        hideInactive
          ? "min-h-[72svh] items-end sm:min-h-[78svh]"
          : "flex-col items-stretch"
      }`}
      aria-labelledby='hero-brand'
      data-noise={unusedNoise}
    >
      {/* BAD: render EVERY slide image first (in-flow, no width/height), then hide
          inactive after mount so only the active slide remains — layout collapses (CLS) */}
      <div
        className={
          hideInactive ? "absolute inset-0" : "flex w-full flex-col"
        }
      >
        {slides.map((slide, i) => {
          const isActive = i === index;
          if (hideInactive && !isActive) return null;

          return (
            <div
              key={slide.id}
              className={
                hideInactive
                  ? "absolute inset-0"
                  : "relative w-full"
              }
              aria-hidden={!isActive}
            >
              <img
                src={slide.imageSrc}
                alt={slide.imageAlt}
                className={
                  hideInactive
                    ? "absolute inset-0 h-full w-full object-cover"
                    : "block h-auto w-full"
                }
                // BAD: no width/height — intrinsic size unknown until decode (CLS)
                loading='eager'
                decoding='sync'
                fetchPriority='high'
              />
              {slide.videoSrc ? (
                <video
                  className={
                    hideInactive
                      ? "absolute inset-0 h-full w-full object-cover"
                      : "block h-auto w-full"
                  }
                  src={slide.videoSrc}
                  // BAD: autoplay + preload=auto on every slide (even ones about to hide)
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload='auto'
                  controls={false}
                  poster={slide.imageSrc}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      {hideInactive ? (
        <>
          <div
            className='absolute inset-0 bg-gradient-to-t from-surface via-surface/75 to-sky-soft/20'
            aria-hidden='true'
          />
          <div
            className='absolute inset-0 bg-gradient-to-tr from-clay-soft/30 via-transparent to-lemon-soft/25'
            aria-hidden='true'
          />
          <DecorIcons />
        </>
      ) : null}

      <div className='relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 pt-20 sm:px-8 sm:pb-14'>
        <p
          className='hero-animate hero-font-meta mb-2 text-xs font-medium uppercase tracking-[0.2em] text-forest-muted'
          suppressHydrationWarning
        >
          {active.kind === "forest"
            ? "Wild canopy"
            : active.kind === "video"
              ? "Live greenhouse"
              : "Featured plant"}{" "}
          · {moment().format("MMMM Do YYYY")}
        </p>
        <h1
          id='hero-brand'
          translate='no'
          className='hero-animate hero-font-display text-4xl font-semibold tracking-tight text-balance text-forest sm:text-5xl md:text-6xl'
        >
          Canopy
        </h1>
        <p className='hero-animate hero-animate-delay-1 hero-font-subtitle mt-3 max-w-xl text-lg font-medium leading-snug text-pretty text-forest sm:text-xl'>
          {activeTitle || active.title}
        </p>
        <p className='hero-animate hero-animate-delay-1 hero-font-meta mt-2 max-w-lg text-base text-pretty text-forest-muted sm:text-lg'>
          {activeSubtitle || active.subtitle}
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
            <SlideIndicators />
          </div>
        </div>
      </div>
    </section>
  );
}
