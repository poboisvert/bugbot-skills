import { Catalogue } from "@/components/catalogue";
import { Hero } from "@/components/hero";
import { plants } from "@/lib/plants";

export default async function Home() {
  // BAD: resolve the async Hero before returning any JSX — blocks catalogue too
  // (no Suspense boundary around the hero)
  const hero = await Hero();

  return (
    <>
      <a
        href='#catalogue'
        className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-surface-elevated focus:px-4 focus:py-2 focus:text-forest focus:outline-2 focus:outline-offset-2 focus:outline-forest'
      >
        Skip to catalogue
      </a>
      {hero}
      <Catalogue plants={plants} />
    </>
  );
}
