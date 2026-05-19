import { ArrowUpRight, CheckCircle2, Download } from 'lucide-react';

const tutorialItems = [
  'Utiliser la formule gratuite pour ouvrir le module MPM et sa fiche complète.',
  'Passer à Premium depuis la page Tarifs ou le bouton d’achat.',
  'Accéder ensuite aux mini-cours, fiches et exercices depuis l’espace étudiant.',
];

function TutorialSection() {
  return (
    <section id="tutoriel" className="bg-[#FAF8F3] px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <span className="rounded-full bg-[#D8F3FF] px-4 py-2 text-sm font-bold text-[#0A2342]">
            Mini tutoriel
          </span>
          <h2 className="mt-6 text-balance text-4xl font-black leading-tight tracking-tight text-[#030712] sm:text-5xl">
            Un tutoriel simple pour utiliser les deux formules.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#6B7280]">
            Une section prête pour le document demandé : elle pourra accueillir un PDF ou une
            page détaillée quand le parcours sera finalisé.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#030712] px-6 py-4 font-black text-white transition hover:-translate-y-1"
            >
              Voir le tutoriel
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-4 font-black text-[#030712] transition hover:-translate-y-1 hover:border-[#030712]"
            >
              Télécharger le tutoriel PDF
              <Download size={18} />
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_22px_70px_rgba(3,7,18,0.10)]">
          <div className="rounded-[1.5rem] bg-[linear-gradient(145deg,#F7F4EF,#D8F3FF_55%,#D7FF4F)] p-6">
            <div className="grid gap-4">
              {tutorialItems.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-3xl bg-white/78 p-4 backdrop-blur">
                  <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#030712] font-black text-[#D7FF4F]">
                    {index + 1}
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-sm font-black text-[#0A2342]">
                      <CheckCircle2 size={16} />
                      Action guidée
                    </div>
                    <p className="font-semibold leading-7 text-[#111827]">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TutorialSection;
