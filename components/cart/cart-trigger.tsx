"use client";

import { useCart } from "@/components/cart/cart-context";

export function CartTrigger() {
  const {
    actions: { open },
    meta: { itemCount },
  } = useCart();

  return (
    <button
      type='button'
      onClick={open}
      className='relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-forest/10 bg-lemon-soft px-4 text-sm font-medium text-forest transition-colors hover:bg-lemon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest'
      aria-label={itemCount > 0 ? `Open cart, ${itemCount} items` : "Open cart"}
    >
      Cart
      {itemCount > 0 ? (
        <span
          className='ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-clay-soft px-1.5 text-xs font-semibold text-forest'
          aria-hidden='true'
        >
          {itemCount}
        </span>
      ) : null}
    </button>
  );
}
