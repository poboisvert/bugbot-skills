"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "@/components/cart/cart-context";
import { displayPrice, formatPrice, getActivePromo } from "@/lib/plants";

export function CartDrawer() {
  const {
    state: { isOpen, lines, checkoutMessage },
    actions: { close, setQuantity, remove, checkout, clearCheckoutMessage },
    meta: { subtotal },
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50' role='presentation'>
      <button
        type='button'
        className='cart-drawer-backdrop absolute inset-0 bg-forest/25'
        aria-label='Close cart'
        onClick={close}
      />
      <aside
        className='cart-drawer-panel absolute inset-y-0 right-0 flex w-full max-w-md flex-col overscroll-contain bg-surface-elevated shadow-2xl'
        role='dialog'
        aria-modal='true'
        aria-labelledby='cart-drawer-title'
      >
        <div className='flex items-center justify-between border-b border-forest/10 px-5 py-4'>
          <h2
            id='cart-drawer-title'
            className='font-display text-2xl font-semibold text-forest'
          >
            Your cart
          </h2>
          <button
            type='button'
            onClick={close}
            className='inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-stone transition-colors hover:bg-sage-soft hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest'
            aria-label='Close cart'
          >
            ✕
          </button>
        </div>

        <div className='flex-1 overflow-y-auto px-5 py-4'>
          {checkoutMessage ? (
            <div
              className='rounded-2xl bg-sage-soft px-4 py-5 text-forest'
              role='status'
            >
              <p className='font-medium'>{checkoutMessage}</p>
              <button
                type='button'
                className='mt-3 text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest'
                onClick={clearCheckoutMessage}
              >
                Continue shopping
              </button>
            </div>
          ) : null}

          {!checkoutMessage && lines.length === 0 ? (
            <p className='py-10 text-center text-stone'>
              Your cart is empty. Add a plant from the catalogue.
            </p>
          ) : null}

          {!checkoutMessage && lines.length > 0 ? (
            <ul className='flex flex-col gap-5'>
              {lines.map((line) => {
                const unit = displayPrice(line.plant);
                const activePromo = getActivePromo(line.plant);
                return (
                  <li
                    key={line.plant.id}
                    className='flex gap-3 border-b border-forest/8 pb-5 last:border-0'
                  >
                    <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-sage-soft'>
                      <Image
                        src={line.plant.imageSrc}
                        alt={line.plant.imageAlt}
                        fill
                        className='object-cover'
                        sizes='80px'
                      />
                    </div>
                    <div className='flex min-w-0 flex-1 flex-col gap-2'>
                      <div className='flex items-start justify-between gap-2'>
                        <div>
                          <p className='font-medium text-forest'>
                            {line.plant.name}
                          </p>
                          <p className='text-sm text-stone'>
                            {formatPrice(unit)}
                            {activePromo ? (
                              <span className='ml-2 text-clay'>
                                {activePromo.isFlash
                                  ? "Flash"
                                  : activePromo.isMonthlySubscribe
                                    ? "Subscribe"
                                    : "Promo"}
                              </span>
                            ) : null}
                          </p>
                        </div>
                        <button
                          type='button'
                          onClick={() => remove(line.plant.id)}
                          className='text-sm text-stone underline-offset-2 hover:text-forest hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest'
                        >
                          Remove
                        </button>
                      </div>
                      <div className='flex items-center gap-2'>
                        <button
                          type='button'
                          className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-soft text-forest hover:bg-sky focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest'
                          aria-label={`Decrease quantity of ${line.plant.name}`}
                          onClick={() =>
                            setQuantity(line.plant.id, line.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span
                          className='min-w-8 text-center text-sm font-medium text-forest'
                          aria-live='polite'
                        >
                          {line.quantity}
                        </span>
                        <button
                          type='button'
                          className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-soft text-forest hover:bg-sky focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest'
                          aria-label={`Increase quantity of ${line.plant.name}`}
                          onClick={() =>
                            setQuantity(line.plant.id, line.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        {!checkoutMessage && lines.length > 0 ? (
          <div className='border-t border-forest/10 px-5 py-5'>
            <div className='mb-4 flex items-center justify-between text-forest'>
              <span className='text-stone'>Subtotal</span>
              <span className='font-display text-2xl font-semibold tabular-nums'>
                {formatPrice(subtotal)}
              </span>
            </div>
            <button
              type='button'
              onClick={checkout}
              className='flex min-h-12 w-full items-center justify-center rounded-full bg-sage px-5 text-base font-medium text-forest transition-colors hover:bg-sage-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest'
            >
              Checkout
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
