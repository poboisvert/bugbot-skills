import { DealCard } from "@/components/deal-card";
import { getPromoPlants } from "@/lib/plants";

export function Deals() {
  const deals = getPromoPlants();

  // #region agent log
  fetch('http://127.0.0.1:7794/ingest/6f18c288-a8d4-4075-bcbe-00c4c5d88502',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'75a078'},body:JSON.stringify({sessionId:'75a078',runId:'pre-fix',hypothesisId:'C',location:'deals.tsx:Deals',message:'deals page render',data:{dealsCount:deals.length,dealIds:deals.map((d)=>d.plant.id),soonestEnd:deals[0]?{id:deals[0].plant.id,endDate:deals[0].promo.endDate}:null},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  return (
    <section
      id='deals'
      className='mx-auto w-full max-w-7xl scroll-mt-20 px-5 py-12 sm:px-8 sm:py-16'
      aria-labelledby='deals-heading'
    >
      <div className='max-w-2xl'>
        <h1
          id='deals-heading'
          className='font-display text-3xl font-semibold tracking-tight text-balance text-forest sm:text-4xl'
        >
          Deals
        </h1>
        <p className='mt-3 text-base leading-relaxed text-stone sm:text-lg'>
          Active promos only — each countdown shows time left before the offer
          ends.
        </p>
      </div>

      <p className='mt-6 text-sm text-stone' aria-live='polite'>
        {deals.length} {deals.length === 1 ? "deal" : "deals"}
      </p>

      {deals.length === 0 ? (
        <p className='mt-10 text-stone'>
          No active promos right now. Check back soon.
        </p>
      ) : (
        <ul className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {deals.map(({ plant, promo }) => (
            <li key={plant.id} className='[content-visibility:auto]'>
              <DealCard plant={plant} promo={promo} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
