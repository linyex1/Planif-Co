import { ArrowRight } from 'lucide-react';
import { journeySteps } from '../data/content.js';

function StudentJourney() {
  return (
    <section className="bg-[#FAF8F3] px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-[#A7A5FF]/30 px-4 py-2 text-sm font-bold text-[#0A2342]">
            Parcours étudiant
          </span>
          <h2 className="mt-6 text-balance text-4xl font-black leading-tight tracking-tight text-[#030712] sm:text-5xl">
            Une routine simple pour transformer la révision en réflexes.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {journeySteps.map(({ title, description, icon: Icon, badge }, index) => (
            <article
              key={title}
              className="group relative rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-[0_18px_55px_rgba(3,7,18,0.08)] transition hover:-translate-y-2"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full bg-[#D7FF4F] px-3 py-1 text-xs font-black text-[#030712]">
                  {badge}
                </span>
                <div className="grid size-12 place-items-center rounded-2xl bg-[#030712] text-white">
                  <Icon size={22} />
                </div>
              </div>
              <h3 className="mt-10 text-2xl font-black text-[#030712]">{title}</h3>
              <p className="mt-4 leading-7 text-[#6B7280]">{description}</p>
              {index < journeySteps.length - 1 && (
                <div className="absolute -right-6 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-[#030712] text-[#D7FF4F] shadow-xl lg:grid">
                  <ArrowRight size={20} />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudentJourney;
