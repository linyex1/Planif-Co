import { ArrowUpRight, CheckCircle2, Lock, ShoppingCart } from 'lucide-react';

function ModuleCard({ module, isLocked, onOpenModule, onChoosePremium, onUnlockPremiumDemo }) {
  const Icon = module.icon;

  return (
    <article className="group relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[1.75rem] border border-black/10 bg-white p-5 shadow-[0_18px_55px_rgba(3,7,18,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(3,7,18,0.14)]">
      <div className={isLocked ? 'flex h-full flex-col blur-[2px] opacity-45' : 'flex h-full flex-col'}>
        <div className={`mb-8 grid size-14 place-items-center rounded-2xl ${module.accent} text-[#030712]`}>
          <Icon size={25} />
        </div>
        <h3 className="text-2xl font-black leading-tight text-[#030712]">{module.title}</h3>
        <p className="mt-4 flex-1 leading-7 text-[#6B7280]">{module.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {module.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/10 bg-[#FAF8F3] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#111827]"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href="#cours"
          onClick={(event) => {
            event.preventDefault();
            onOpenModule(module.id);
          }}
          className="mt-8 inline-flex items-center justify-between rounded-full bg-[#030712] px-4 py-3 text-sm font-bold text-white transition group-hover:bg-[#D7FF4F] group-hover:text-[#030712]"
        >
          Voir le module
          <ArrowUpRight size={17} />
        </a>
      </div>

      {isLocked && (
        <div className="absolute inset-0 flex items-end bg-gradient-to-b from-white/35 via-white/80 to-white p-5">
          <div className="w-full rounded-[1.35rem] border border-white/10 bg-[#030712] p-4 text-white shadow-[0_22px_55px_rgba(3,7,18,0.28)]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-[#D7FF4F]">
              <Lock size={14} />
              Premium verrouillé
            </span>
            <h3 className="mt-4 text-xl font-black leading-tight">
              Module réservé à la formule Premium
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Pour la démo, le paiement simulé débloque automatiquement les trois modules.
            </p>
            <div className="mt-4 grid gap-2">
              <button
                type="button"
                onClick={onChoosePremium}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D7FF4F] px-4 py-3 text-sm font-black text-[#030712] transition hover:scale-[1.02]"
              >
                Débloquer Premium
                <ShoppingCart size={17} />
              </button>
              <button
                type="button"
                onClick={onUnlockPremiumDemo}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm font-black text-white transition hover:border-white/35 hover:bg-white/10"
              >
                J’ai déjà Premium
                <CheckCircle2 size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default ModuleCard;
