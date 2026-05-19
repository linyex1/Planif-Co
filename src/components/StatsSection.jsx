import { Quote } from 'lucide-react';
import { stats } from '../data/content.js';

function StatsSection() {
  return (
    <section className="bg-[#F7F4EF] px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-5">
          {stats.map(({ value, label, icon: Icon }) => (
            <article
              key={label}
              className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-[0_18px_55px_rgba(3,7,18,0.08)] transition hover:-translate-y-2"
            >
              <div className="mb-8 grid size-12 place-items-center rounded-2xl bg-[#030712] text-[#D7FF4F]">
                <Icon size={22} />
              </div>
              <p className="text-5xl font-black tracking-tight text-[#030712]">{value}</p>
              <p className="mt-2 font-semibold text-[#6B7280]">{label}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-5 overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_22px_70px_rgba(3,7,18,0.10)] lg:grid-cols-[0.75fr_1.25fr]">
          <div className="bg-[#D7FF4F] p-8 text-[#030712]">
            <Quote size={36} />
            <p className="mt-8 text-2xl font-black leading-tight">
              “Enfin une façon simple de comprendre les budgets, les écarts et la méthode MPM
              avant le contrôle.”
            </p>
          </div>
          <div className="grid content-center gap-5 p-8 sm:grid-cols-3">
            {['Fiches courtes', 'Mini-vidéos', 'Cas corrigés'].map((item) => (
              <div key={item} className="rounded-3xl bg-[#FAF8F3] p-5">
                <p className="text-sm font-black uppercase text-[#D72638]">Planif&Co</p>
                <p className="mt-2 text-xl font-black text-[#030712]">{item}</p>
                <p className="mt-3 leading-7 text-[#6B7280]">
                  Un format pensé pour réviser sans perdre la logique du cours.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
