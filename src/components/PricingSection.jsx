import { Check, ShoppingCart } from 'lucide-react';
import { pricingPlans } from '../data/content.js';

function PricingSection({ onChoosePremium, onStartFree }) {
  return (
    <section id="tarifs" className="bg-[#F7F4EF] px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <span className="rounded-full bg-[#D8F3FF] px-4 py-2 text-sm font-bold text-[#0A2342]">
            Deux formules
          </span>
          <h2 className="mt-6 text-balance text-4xl font-black leading-tight tracking-tight text-[#030712] sm:text-5xl">
            Choisis ton niveau d’accès, de la découverte au parcours complet.
          </h2>
        </div>

        <div id="panier" className="grid overflow-hidden rounded-[2rem] border border-black/10 shadow-[0_28px_90px_rgba(3,7,18,0.14)] lg:grid-cols-2">
          {pricingPlans.map((plan) => {
            const isDark = plan.variant === 'dark';
            return (
              <article
                key={plan.name}
                className={`relative p-8 transition duration-300 hover:-translate-y-1 sm:p-10 ${
                  isDark
                    ? 'bg-[#030712] text-white'
                    : 'bg-[radial-gradient(circle_at_15%_10%,#D7FF4F_0,#F7F4EF_34%,#D8F3FF_100%)] text-[#030712]'
                }`}
              >
                {plan.badge && (
                  <span className="absolute right-6 top-6 rounded-full bg-[#D7FF4F] px-4 py-2 text-sm font-black text-[#030712]">
                    {plan.badge}
                  </span>
                )}
                <h3 className="max-w-[16rem] text-3xl font-black">{plan.name}</h3>
                <p className={`mt-4 max-w-md leading-7 ${isDark ? 'text-white/64' : 'text-[#4B5563]'}`}>
                  {plan.description}
                </p>
                <div className="mt-8 flex items-end gap-3">
                  <span className="text-6xl font-black tracking-tight">{plan.price}</span>
                </div>
                <ul className="mt-9 grid gap-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span
                        className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
                          isDark ? 'bg-[#D7FF4F] text-[#030712]' : 'bg-[#030712] text-white'
                        }`}
                      >
                        <Check size={15} />
                      </span>
                      <span className={isDark ? 'text-white/82' : 'text-[#111827]'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.href}
                  onClick={(event) => {
                    if (isDark) {
                      event.preventDefault();
                      onChoosePremium();
                    } else {
                      event.preventDefault();
                      onStartFree();
                    }
                  }}
                  className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-black transition hover:-translate-y-1 sm:w-auto ${
                    isDark
                      ? 'bg-white text-[#030712] hover:bg-[#D7FF4F]'
                      : 'bg-[#030712] text-white hover:bg-[#0A2342]'
                  }`}
                >
                  {plan.cta}
                  {isDark && <ShoppingCart size={18} />}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
