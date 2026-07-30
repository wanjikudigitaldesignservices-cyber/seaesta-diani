import { ShieldCheck, CreditCard, Zap } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'No OTA Commissions',
    description: 'Book direct and save. No Airbnb or Booking.com fees.',
  },
  {
    icon: Zap,
    title: 'Instant Confirmation',
    description: 'Pay via M-Pesa STK Push. Confirmed in seconds.',
  },
  {
    icon: CreditCard,
    title: 'Best Price Guarantee',
    description: 'Direct rates are always equal or lower than OTA prices.',
  },
];

export function TrustBar() {
  return (
    <section className="bg-reef-deep py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-2 text-center font-display text-sm font-semibold uppercase tracking-widest text-seafoam">
          Why Book Direct?
        </h2>
        <p className="mb-12 text-center font-display text-3xl font-bold text-white">
          Skip the OTA Fee
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:border-seafoam/30 hover:bg-white/10"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-seafoam/20">
                <item.icon className="h-7 w-7 text-seafoam" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
