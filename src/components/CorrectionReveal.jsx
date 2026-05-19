import { Eye, Sparkles } from 'lucide-react';
import { useState } from 'react';

function CorrectionReveal({ children, description = 'Essaie de résoudre l’exercice avant de regarder la correction.' }) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <article className="relative overflow-hidden rounded-[2rem] bg-[#030712] p-6 text-white shadow-[0_22px_70px_rgba(3,7,18,0.14)]">
      <div
        className={`transition-all duration-700 ease-out ${
          isRevealed
            ? 'translate-y-0 scale-100 opacity-100 blur-0'
            : 'pointer-events-none translate-y-2 scale-[0.985] select-none opacity-35 blur-[6px]'
        }`}
        aria-hidden={!isRevealed}
      >
        <h3 className="text-2xl font-black">Correction synthétique</h3>
        {children}
      </div>

      {!isRevealed && (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_36%,rgba(215,255,79,0.18),transparent_28%),linear-gradient(180deg,rgba(3,7,18,0.56),rgba(3,7,18,0.94))] p-6 backdrop-blur-sm">
          <div className="max-w-sm text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#D7FF4F] text-[#030712] shadow-[0_18px_45px_rgba(215,255,79,0.28)]">
              <Sparkles size={28} />
            </div>
            <p className="mt-5 text-sm font-black uppercase tracking-wide text-[#D7FF4F]">
              Correction masquée
            </p>
            <h3 className="mt-3 text-3xl font-black leading-tight">À toi d’essayer d’abord.</h3>
            <p className="mt-3 leading-7 text-white/70">{description}</p>
            <button
              type="button"
              onClick={() => setIsRevealed(true)}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-black text-[#030712] transition hover:-translate-y-1 hover:bg-[#D7FF4F]"
            >
              Voir la correction
              <Eye size={18} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default CorrectionReveal;
