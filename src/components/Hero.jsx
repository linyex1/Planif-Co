import { ArrowRight, CheckCircle2, Clock3, Play, Sparkles } from 'lucide-react';

function ProgressBar({ label, value, color }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[#111827]">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-black/10">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Hero({ onStartFree }) {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-[#F7F4EF] px-4 pb-20 pt-32 sm:px-6 lg:pb-28 lg:pt-36"
    >
      <div className="absolute left-[-10%] top-28 h-72 w-72 rounded-full bg-[#D7FF4F]/50 blur-3xl" />
      <div className="absolute right-[-6%] top-20 h-80 w-80 rounded-full bg-[#A7A5FF]/35 blur-3xl" />
      <div className="absolute bottom-8 left-1/3 h-64 w-64 rounded-full bg-[#D8F3FF]/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-[#0A2342] shadow-sm">
            <Sparkles size={16} className="text-[#D72638]" />
            Master 1 MSI - Paris 1 Panthéon-Sorbonne
          </div>
          <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight text-[#030712] sm:text-6xl lg:text-7xl">
            Réussir Planification & Contrôle{' '}
            <em className="font-serif font-semibold italic">sans se perdre</em> dans les calculs.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4B5563] sm:text-xl">
            Fiches synthétiques, mini-vidéos et exercices corrigés pour maîtriser les budgets,
            les écarts, la méthode MPM et les choix d’investissement.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#exercices"
              onClick={(event) => {
                event.preventDefault();
                onStartFree();
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#030712] px-6 py-4 font-bold text-white shadow-[0_20px_45px_rgba(3,7,18,0.22)] transition hover:-translate-y-1"
            >
              Tester gratuitement
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="#tarifs"
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/80 px-6 py-4 font-bold text-[#030712] transition hover:-translate-y-1 hover:border-[#030712]"
            >
              Voir les formules
            </a>
          </div>
        </div>

        <div className="relative min-h-[660px] sm:min-h-[560px] lg:min-h-[620px]">
          <div className="absolute left-0 top-8 w-[58%] rounded-[2rem] border border-white/70 bg-white p-4 shadow-[0_28px_80px_rgba(3,7,18,0.15)] transition duration-300 hover:-translate-y-2 sm:p-5">
            <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[linear-gradient(145deg,#D8F3FF,#FAF8F3_46%,#D7FF4F)] p-4">
              <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/80 bg-white/55 p-4 backdrop-blur">
                <div>
                  <span className="whitespace-nowrap rounded-full bg-[#030712] px-2.5 py-1 text-[9px] font-bold text-white sm:px-3 sm:text-xs">
                    Module MPM ouvert
                  </span>
                  <h2 className="mt-5 text-3xl font-black leading-none text-[#030712]">Réseau de tâches</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['A', 'B', 'C', 'D'].map((task, index) => (
                    <div key={task} className="rounded-2xl bg-white p-3 shadow-sm">
                      <span className="text-xs font-bold text-[#6B7280]">Tâche {task}</span>
                      <p className="mt-1 text-xl font-black text-[#030712]">{index + 2} j</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 w-[45%] rounded-[2rem] bg-[#030712] p-5 text-white shadow-[0_28px_80px_rgba(3,7,18,0.24)] transition duration-300 hover:-translate-y-2">
            <div className="mb-12 flex items-center justify-between">
              <span className="whitespace-nowrap rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                Vidéo 4 min
              </span>
              <div className="grid size-10 place-items-center rounded-full bg-[#D7FF4F] text-[#030712]">
                <Play size={17} fill="currentColor" />
              </div>
            </div>
            <p className="text-5xl font-black">30€</p>
            <p className="mt-2 text-sm text-white/60">par mois pour le parcours Premium</p>
          </div>

          <div className="absolute bottom-0 right-4 w-[70%] rounded-[2rem] border border-white/70 bg-white p-5 shadow-[0_28px_80px_rgba(3,7,18,0.15)] transition duration-300 hover:-translate-y-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#6B7280]">Mini-dashboard</p>
                <h3 className="text-2xl font-black text-[#030712]">Progression contrôle</h3>
              </div>
              <span className="rounded-full bg-[#A7A5FF]/30 px-3 py-1 text-xs font-bold text-[#0A2342]">
                M1 MSI Sorbonne
              </span>
            </div>
            <div className="grid gap-4">
              <ProgressBar label="Budgets" value={78} color="bg-[#D7FF4F]" />
              <ProgressBar label="Écarts" value={64} color="bg-[#A7A5FF]" />
              <ProgressBar label="Module MPM" value={92} color="bg-[#D72638]" />
            </div>
          </div>

          <div className="absolute bottom-64 left-2 rounded-3xl bg-[#D7FF4F] p-4 text-[#030712] shadow-[0_18px_50px_rgba(3,7,18,0.18)] sm:bottom-32">
            <CheckCircle2 size={24} />
            <p className="mt-3 max-w-32 text-sm font-black leading-tight">Fiche complète ouverte</p>
          </div>

          <div className="absolute left-[38%] top-[45%] hidden rounded-full bg-white px-4 py-2 text-sm font-black text-[#030712] shadow-xl sm:block">
            30€/mois
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
