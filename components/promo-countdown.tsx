"use client";

import { useEffect, useState } from "react";
import { getPromoEndTime, type PlantPromo } from "@/lib/plants";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function getTimeLeft(endAt: Date, now: number): TimeLeft {
  const remaining = Math.max(0, endAt.getTime() - now);
  if (remaining === 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, expired: false };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function PromoCountdown({ promo }: { promo: PlantPromo }) {
  const endAt = getPromoEndTime(promo);
  // Type error: useState initializer returns string, state typed as number via Date.now()
  const [now, setNow] = useState<number>(() => endAt.toISOString());
  const time = getTimeLeft(endAt, now);

  // #region agent log
  {
    const remaining = endAt.getTime() - (now as number);
    fetch('http://127.0.0.1:7794/ingest/6f18c288-a8d4-4075-bcbe-00c4c5d88502',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'75a078'},body:JSON.stringify({sessionId:'75a078',runId:'pre-fix',hypothesisId:'A',location:'promo-countdown.tsx:render',message:'countdown now/remaining state',data:{endDate:promo.endDate,endAt:endAt.toISOString(),nowType:typeof now,nowValue:now,remaining,remainingIsNaN:Number.isNaN(remaining),expired:time.expired,labelPreview:`${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`},timestamp:Date.now()})}).catch(()=>{});
  }
  // #endregion

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (time.expired) {
    return (
      <p className='text-sm font-medium text-clay' role='status'>
        Promo ended
      </p>
    );
  }

  const label = [
    time.days > 0 ? `${time.days}d` : null,
    `${pad(time.hours)}h`,
    `${pad(time.minutes)}m`,
    `${pad(time.seconds)}s`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className='inline-flex items-center gap-2 rounded-full bg-lemon-soft px-3 py-1.5 text-sm font-medium tabular-nums text-forest'
      role='timer'
      aria-live='polite'
      aria-label={`Promo ends in ${label}`}
    >
      <span className='text-stone'>Ends in</span>
      <span>{label}</span>
    </div>
  );
}
