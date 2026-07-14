import { Cart } from "@/components/cart";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <Cart.Provider>
      <div className='flex min-h-full flex-1 flex-col bg-background'>
        <SiteHeader />
        <main className='flex-1'>{children}</main>
        <footer className='border-t border-forest/8 px-5 py-8 sm:px-8'>
          <div className='mx-auto flex w-full max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <p
              className='font-display text-lg font-semibold text-forest'
              translate='no'
            >
              Canopy
            </p>
            <p className='text-sm text-stone'>
              Indoor plants with promo pricing. Checkout is a reservation mock.
            </p>
          </div>
        </footer>
        <Cart.Drawer />
      </div>
    </Cart.Provider>
  );
}
