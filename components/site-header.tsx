import Link from "next/link";
import { Cart } from "@/components/cart";

const navLinkClass =
  "inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-forest transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-30 border-b border-forest/8 bg-surface/80 backdrop-blur-md'>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 sm:px-8'>
        <Link
          href='/'
          className='font-display text-xl font-semibold tracking-tight text-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest'
          translate='no'
        >
          Canopy
        </Link>
        <nav aria-label='Primary' className='flex items-center gap-2 sm:gap-3'>
          <Link
            href='/#catalogue'
            className={`hidden bg-sky-soft hover:bg-sky sm:inline-flex ${navLinkClass}`}
          >
            Catalogue
          </Link>
          <Link
            href='/deals'
            className={`bg-clay-soft hover:bg-lemon ${navLinkClass}`}
          >
            Deals
          </Link>
          <Cart.Trigger />
        </nav>
      </div>
    </header>
  );
}
