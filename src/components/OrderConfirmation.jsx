import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

function OrderConfirmation({ orderNumber, onBackHome }) {
  return (
    <main className="min-h-screen bg-[#F7F4EF] px-4 pb-20 pt-32 sm:px-6 lg:pt-36">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-[2.25rem] bg-[#030712] text-white shadow-[0_30px_110px_rgba(3,7,18,0.22)]">
        <div className="relative p-8 sm:p-12 lg:p-16">
          <div className="absolute right-[-4rem] top-[-4rem] h-64 w-64 rounded-full bg-[#D7FF4F]/30 blur-3xl" />
          <div className="absolute bottom-[-5rem] left-[-3rem] h-72 w-72 rounded-full bg-[#A7A5FF]/25 blur-3xl" />

          <div className="relative">
            <div className="grid size-20 place-items-center rounded-full bg-[#D7FF4F] text-[#030712]">
              <CheckCircle2 size={42} />
            </div>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-[#D7FF4F]">
              <Sparkles size={16} />
              Commande validée
            </span>
            <h1 className="mt-6 max-w-3xl text-balance text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              Merci pour ta commande.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
              Ton accès Premium Planif&Co est validé dans cette démonstration. Dans la version
              finale, cette page pourra rediriger vers l’espace étudiant et les contenus Premium.
            </p>

            <div className="mt-9 grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 sm:grid-cols-2">
              <div>
                <p className="text-sm font-black uppercase text-white/44">Référence</p>
                <p className="mt-2 text-2xl font-black">{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm font-black uppercase text-white/44">Paiement</p>
                <p className="mt-2 text-2xl font-black">Simulation acceptée</p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-6 text-white/52">
              Aucun paiement réel n’a été prélevé et aucune donnée bancaire ou personnelle n’a
              été enregistrée.
            </p>

            <button
              type="button"
              onClick={onBackHome}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 font-black text-[#030712] transition hover:-translate-y-1 hover:bg-[#D7FF4F]"
            >
              Retour à l’accueil
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OrderConfirmation;
