import { modules } from '../data/content.js';
import ModuleCard from './ModuleCard.jsx';

function ModulesSection({ onOpenModule }) {
  return (
    <section id="cours" className="bg-[#FAF8F3] px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <h2 className="text-balance text-4xl font-black leading-tight tracking-tight text-[#030712] sm:text-5xl">
            Explore les chapitres clés pour construire de vraies compétences.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-[#6B7280] lg:justify-self-end">
            Du diagnostic stratégique au contrôle budgétaire, chaque chapitre relie les méthodes
            du cours aux réflexes attendus en contrôle.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {modules.map((module) => (
            <ModuleCard key={module.title} module={module} onOpenModule={onOpenModule} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ModulesSection;
