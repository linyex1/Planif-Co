import { benefits } from '../data/content.js';
import { Play, Video } from 'lucide-react';

function DarkIntroSection() {
  return (
    <section className="bg-[#030712] px-4 py-20 text-white sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-[#D7FF4F]">
            Learning designed for M1 MSI
          </span>
          <h2 className="mt-7 max-w-4xl text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Une méthode pensée pour aider les M1 à{' '}
            <em className="font-serif font-semibold italic">comprendre vraiment.</em>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
            Chaque notion est transformée en fiche claire, vidéo courte et exercice corrigé
            pour passer du cours théorique à l’application.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {benefits.map(({ title, icon: Icon }) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                <Icon size={22} className="text-[#D7FF4F]" />
                <p className="mt-4 font-bold leading-snug">{title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-[#D7FF4F]/35 blur-3xl" />
          <div className="absolute -right-3 bottom-12 h-36 w-36 rounded-full bg-[#A7A5FF]/30 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            <div className="aspect-video rounded-[1.5rem] bg-[linear-gradient(145deg,#0A2342,#030712_55%,#D7FF4F)] p-5">
              <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/15 bg-black/25 p-5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-black text-[#030712]">
                    <Video size={14} />
                    Contrôle budgétaire
                  </span>
                  <span className="rounded-full bg-[#D7FF4F] px-3 py-1 text-xs font-black text-[#030712]">
                    2:48
                  </span>
                </div>
                <div className="grid place-items-center">
                  <button className="grid size-20 place-items-center rounded-full bg-white text-[#030712] shadow-2xl">
                    <Play size={30} fill="currentColor" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-bold text-white/60">Épisode Premium</p>
                  <h3 className="mt-1 text-2xl font-black">Analyser un écart sur coût direct</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DarkIntroSection;
