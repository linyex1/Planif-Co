import { ArrowRight, Network, PlayCircle } from 'lucide-react';

const tasks = [
  { id: 'A', x: 'left-4 top-6', color: 'bg-[#D8F3FF]' },
  { id: 'B', x: 'left-[38%] top-4', color: 'bg-[#D7FF4F]' },
  { id: 'C', x: 'left-[28%] bottom-6', color: 'bg-white' },
  { id: 'D', x: 'right-4 top-1/2 -translate-y-1/2', color: 'bg-[#A7A5FF]' },
];

function MpmFocus({ onOpenModule }) {
  return (
    <section id="exercices" className="bg-[#F7F4EF] px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.25rem] bg-[#030712] p-6 text-white shadow-[0_30px_110px_rgba(3,7,18,0.22)] sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-[#D7FF4F]">
            <Network size={16} />
            Module gratuit : MPM
          </span>
          <h2 className="mt-6 text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Fiche technique complète : Planification de projet / MPM
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
            Accède au module MPM ouvert : fiche de rappel, mini-vidéo et exercice corrigé
            pour comprendre le réseau de tâches, les dates et les marges.
          </p>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              onOpenModule();
            }}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#D7FF4F] px-6 py-4 font-black text-[#030712] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(215,255,79,0.35)]"
          >
            Voir le module MPM
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="relative min-h-[360px] rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
          <div className="absolute inset-5 rounded-[1.5rem] bg-[radial-gradient(circle_at_25%_15%,rgba(215,255,79,0.35),transparent_34%),radial-gradient(circle_at_80%_55%,rgba(167,165,255,0.34),transparent_35%)]" />
          <div className="relative h-[320px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#05070D]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 320" aria-hidden="true">
              <path d="M90 88 C170 46 210 52 274 84" stroke="#D7FF4F" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M94 88 C158 206 198 234 232 238" stroke="#D8F3FF" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="10 12" />
              <path d="M274 84 C354 110 388 142 438 162" stroke="#D7FF4F" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M232 238 C322 234 376 210 438 162" stroke="#A7A5FF" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`absolute ${task.x} grid size-24 place-items-center rounded-3xl ${task.color} text-[#030712] shadow-2xl`}
              >
                <div className="text-center">
                  <p className="text-xs font-black uppercase text-[#6B7280]">Tâche</p>
                  <p className="text-4xl font-black">{task.id}</p>
                </div>
              </div>
            ))}
            <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-[#D7FF4F] px-4 py-2 text-sm font-black text-[#030712]">
              <PlayCircle size={17} />
              Chemin critique
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MpmFocus;
