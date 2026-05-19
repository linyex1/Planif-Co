import { ArrowLeft, Check, CreditCard, ShoppingBag, Trash2 } from 'lucide-react';

function CartPage({ item, onBackToPricing, onCheckout, onRemove }) {
  const hasItem = Boolean(item);

  return (
    <main className="min-h-screen bg-[#F7F4EF] px-4 pb-20 pt-32 sm:px-6 lg:pt-36">
      <section className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={onBackToPricing}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-[#030712] transition hover:-translate-y-0.5 hover:border-[#030712]"
        >
          <ArrowLeft size={16} />
          Retour aux formules
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_22px_70px_rgba(3,7,18,0.10)] sm:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-[#030712] text-[#D7FF4F]">
                <ShoppingBag size={23} />
              </div>
              <div>
                <p className="text-sm font-black uppercase text-[#6B7280]">Panier</p>
                <h1 className="text-4xl font-black tracking-tight text-[#030712]">Vérifier la commande</h1>
              </div>
            </div>

            {hasItem ? (
              <article className="rounded-[1.5rem] border border-black/10 bg-[#FAF8F3] p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="rounded-full bg-[#D7FF4F] px-3 py-1 text-xs font-black text-[#030712]">
                      Premium
                    </span>
                    <h2 className="mt-4 text-2xl font-black text-[#030712]">{item.name}</h2>
                    <p className="mt-2 text-[#6B7280]">{item.subtitle}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-4xl font-black text-[#030712]">{item.price} €</p>
                    <p className="font-semibold text-[#6B7280]">{item.billing}</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {item.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 rounded-2xl bg-white p-3">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#030712] text-[#D7FF4F]">
                        <Check size={15} />
                      </span>
                      <span className="font-semibold text-[#111827]">{feature}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={onRemove}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-[#D72638] transition hover:-translate-y-0.5 hover:border-[#D72638]"
                >
                  <Trash2 size={16} />
                  Retirer du panier
                </button>
              </article>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-black/20 bg-[#FAF8F3] p-8 text-center">
                <p className="text-2xl font-black text-[#030712]">Ton panier est vide.</p>
                <p className="mt-3 text-[#6B7280]">Ajoute la formule Premium pour lancer le paiement simulé.</p>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-[2rem] bg-[#030712] p-6 text-white shadow-[0_22px_70px_rgba(3,7,18,0.18)] sm:p-8">
            <h2 className="text-3xl font-black">Résumé</h2>
            <div className="mt-8 grid gap-4 text-white/72">
              <div className="flex justify-between gap-4">
                <span>Formation Premium</span>
                <span>{hasItem ? `${item.price} €` : '0 €'}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Frais</span>
                <span>0 €</span>
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-end justify-between gap-4">
                  <span className="font-bold text-white">Total simulé</span>
                  <span className="text-4xl font-black text-white">{hasItem ? `${item.price} €` : '0 €'}</span>
                </div>
                <p className="mt-2 text-sm text-white/52">Abonnement mensuel fictif pour la démonstration.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onCheckout}
              disabled={!hasItem}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D7FF4F] px-6 py-4 font-black text-[#030712] transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Confirmer la commande
              <CreditCard size={18} />
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default CartPage;
