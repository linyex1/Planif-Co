import { modules } from '../data/content.js';
import ModuleCard from './ModuleCard.jsx';

function ModulesSection({ premiumUnlocked, onOpenModule, onChoosePremium, onUnlockPremiumDemo }) {
  return (
    <section id="cours" className="bg-[#FAF8F3] px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-[#D7FF4F] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#030712]">
              {premiumUnlocked ? 'Accès Premium actif' : 'Modules Premium verrouillés'}
            </span>
            <h2 className="mt-5 text-balance text-4xl font-black leading-tight tracking-tight text-[#030712] sm:text-5xl">
              Explore les chapitres clés pour construire de vraies compétences.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#6B7280] lg:justify-self-end">
            Du diagnostic stratégique au contrôle budgétaire, ces modules sont réservés au parcours
            Premium. La fiche MPM complète reste accessible gratuitement.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {modules.map((module) => (
            <ModuleCard
              key={module.title}
              module={module}
              isLocked={!premiumUnlocked}
              onOpenModule={onOpenModule}
              onChoosePremium={onChoosePremium}
              onUnlockPremiumDemo={onUnlockPremiumDemo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ModulesSection;
