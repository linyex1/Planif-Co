import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Calculator,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  Flag,
  Network,
  Play,
  Route,
  Sparkles,
  Table2,
  Target,
} from 'lucide-react';
import CorrectionReveal from './CorrectionReveal.jsx';

const objectives = [
  'Décomposer un projet en tâches simples et mesurables.',
  'Identifier les antériorités entre les tâches.',
  'Construire un graphe MPM lisible.',
  'Calculer les dates au plus tôt et au plus tard.',
  'Repérer les marges et le chemin critique.',
];

const steps = [
  'Analyser les tâches antérieures',
  'Établir la matrice des niveaux',
  'Tracer le graphe MPM',
  'Calculer les dates au plus tôt',
  'Calculer les dates au plus tard',
  'Déterminer la durée minimale du projet',
  'Identifier le chemin critique',
  'Calculer les marges',
];

const glossary = [
  {
    term: 'Tâche',
    definition: 'Action à réaliser dans le projet, représentée par un sommet dans le graphe MPM.',
  },
  {
    term: 'Antériorité',
    definition: 'Relation indiquant qu’une tâche doit être terminée avant qu’une autre puisse commencer.',
  },
  {
    term: 'Date au plus tôt',
    definition: 'Première date à laquelle une tâche peut commencer si tout ce qui la précède est terminé.',
  },
  {
    term: 'Date au plus tard',
    definition: 'Dernière date possible pour commencer une tâche sans retarder la fin du projet.',
  },
  {
    term: 'Marge',
    definition: 'Délai de flexibilité dont dispose une tâche.',
  },
  {
    term: 'Marge totale (MT)',
    definition:
      'Retard maximum que peut prendre une tâche sans retarder la date de fin globale du projet. Si elle est nulle, la tâche est critique.',
  },
  {
    term: 'Marge libre (ML)',
    definition:
      'Retard maximum que peut prendre une tâche sans retarder le début au plus tôt des tâches suivantes.',
  },
  {
    term: 'Chemin critique',
    definition: 'Suite de tâches sans marge : tout retard sur ce chemin retarde le projet.',
  },
];

const exerciseRows = [
  { task: 'A', label: 'Analyser le besoin', duration: '2 j', previous: '-' },
  { task: 'B', label: 'Rédiger le cahier des charges', duration: '3 j', previous: 'A' },
  { task: 'C', label: 'Choisir les outils', duration: '2 j', previous: 'A' },
  { task: 'D', label: 'Construire le prototype', duration: '4 j', previous: 'B, C' },
  { task: 'E', label: 'Tester la solution', duration: '2 j', previous: 'D' },
  { task: 'F', label: 'Présenter le projet', duration: '1 j', previous: 'E' },
];

const correctionRows = [
  { task: 'Début', early: '0', late: '0', margin: '0', status: 'Critique' },
  { task: 'A', early: '0', late: '0', margin: '0', status: 'Critique' },
  { task: 'B', early: '2', late: '2', margin: '0', status: 'Critique' },
  { task: 'C', early: '2', late: '3', margin: '1', status: 'Avec marge' },
  { task: 'D', early: '5', late: '5', margin: '0', status: 'Critique' },
  { task: 'E', early: '9', late: '9', margin: '0', status: 'Critique' },
  { task: 'F', early: '11', late: '11', margin: '0', status: 'Critique' },
  { task: 'Fin', early: '12', late: '12', margin: '0', status: 'Critique' },
];

const formulas = [
  {
    title: 'Date au plus tôt',
    value:
      'Date au plus tôt = max(DTO(i) + Durée(i)) ; i = tâches antécédentes.\n\nEn clair : on prend la plus grande fin au plus tôt des tâches qui précèdent.',
  },
  {
    title: 'Date au plus tard',
    value:
      'Date au plus tard = min(DTA(j) - Durée(j)) ; j = tâches suivantes.\n\nEn clair : on part des tâches suivantes et on retient la plus petite date possible.',
  },
  {
    title: 'Marge totale',
    value: 'date au plus tard - date au plus tôt',
  },
];

function ModuleBadge({ children }) {
  return (
    <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-black uppercase tracking-wide text-[#111827]">
      {children}
    </span>
  );
}

function MpmNetworkPreview() {
  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#05070D] p-5">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 360" aria-hidden="true">
        <path d="M70 178 C112 128 134 104 178 96" stroke="#D7FF4F" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M178 96 C250 78 290 82 342 118" stroke="#D7FF4F" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M178 96 C238 220 274 246 334 248" stroke="#D8F3FF" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="9 13" />
        <path d="M342 118 C400 118 434 144 470 178" stroke="#D7FF4F" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M334 248 C394 246 432 218 470 178" stroke="#A7A5FF" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M470 178 C504 188 524 204 542 236" stroke="#D7FF4F" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M542 236 C566 226 582 206 594 178" stroke="#D7FF4F" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>

      {[
        { id: 'Début', pos: 'left-2 top-[42%]', color: 'bg-white', small: true },
        { id: 'A', pos: 'left-[18%] top-8', color: 'bg-[#D8F3FF]' },
        { id: 'B', pos: 'left-[43%] top-14', color: 'bg-[#D7FF4F]' },
        { id: 'C', pos: 'left-[39%] bottom-10', color: 'bg-white' },
        { id: 'D', pos: 'right-[22%] top-[40%]', color: 'bg-[#A7A5FF]' },
        { id: 'E', pos: 'right-[10%] bottom-8', color: 'bg-[#D7FF4F]' },
        { id: 'Fin', pos: 'right-1 top-[24%]', color: 'bg-white', small: true },
      ].map((task) => (
        <div
          key={task.id}
          className={`absolute ${task.pos} grid place-items-center rounded-3xl ${task.color} text-[#030712] shadow-2xl ${
            task.small ? 'h-16 w-20 sm:h-18 sm:w-24' : 'size-20 sm:size-24'
          }`}
        >
          <div className="text-center">
            {!task.small && <p className="text-[10px] font-black uppercase text-[#6B7280]">Tâche</p>}
            <p className={`${task.small ? 'text-lg sm:text-xl' : 'text-3xl sm:text-4xl'} font-black`}>{task.id}</p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-5 left-5 rounded-full bg-[#D7FF4F] px-4 py-2 text-sm font-black text-[#030712]">
        Chemin critique : Début - A - B - D - E - Fin
      </div>
    </div>
  );
}

function MpmFinalNetworkDiagram() {
  const nodes = [
    {
      id: 'DÉBUT',
      x: 28,
      y: 246,
      width: 100,
      height: 118,
      early: '0',
      late: '0',
      border: 'border-white/45',
    },
    {
      id: 'A',
      label: ['Analyser', 'le besoin'],
      x: 190,
      y: 218,
      width: 135,
      height: 170,
      early: '0',
      late: '0',
      border: 'border-[#60A5FA]',
    },
    {
      id: 'B',
      label: ['Rédiger le cahier', 'des charges'],
      x: 395,
      y: 44,
      width: 170,
      height: 180,
      early: '2',
      late: '2',
      border: 'border-[#7ED957]',
    },
    {
      id: 'C',
      label: ['Choisir les outils'],
      x: 395,
      y: 354,
      width: 170,
      height: 172,
      early: '2',
      late: '3',
      border: 'border-[#D6A400]',
    },
    {
      id: 'D',
      label: ['Construire', 'le prototype'],
      x: 665,
      y: 252,
      width: 135,
      height: 170,
      early: '5',
      late: '5',
      border: 'border-[#C084FC]',
    },
    {
      id: 'E',
      label: ['Tester', 'la solution'],
      x: 860,
      y: 252,
      width: 135,
      height: 170,
      early: '9',
      late: '9',
      border: 'border-[#F87171]',
    },
    {
      id: 'F',
      label: ['Présenter', 'le projet'],
      x: 1045,
      y: 252,
      width: 135,
      height: 170,
      early: '11',
      late: '11',
      border: 'border-[#5EEAD4]',
    },
    {
      id: 'FIN',
      x: 1210,
      y: 246,
      width: 100,
      height: 118,
      early: '12',
      late: '12',
      border: 'border-white/45',
    },
  ];

  const durations = [
    { text: '0 j', x: 145, y: 286 },
    { text: '2 j', x: 345, y: 156 },
    { text: '2 j', x: 345, y: 423 },
    { text: '3 j', x: 590, y: 156 },
    { text: '2 j', x: 590, y: 423 },
    { text: '4 j', x: 818, y: 316 },
    { text: '2 j', x: 1006, y: 316 },
    { text: '1 j', x: 1188, y: 316 },
  ];

  return (
    <div className="mt-7 overflow-x-auto rounded-[1.75rem] border border-white/10 bg-[#090B12] p-4">
      <div className="relative h-[560px] min-w-[1320px] overflow-hidden rounded-[1.35rem] bg-[radial-gradient(circle_at_25%_15%,rgba(216,243,255,0.12),transparent_32%),radial-gradient(circle_at_65%_75%,rgba(167,165,255,0.13),transparent_30%),#080A0F]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1320 560" aria-hidden="true">
          <defs>
            <marker id="mpm-arrow" markerHeight="10" markerWidth="10" orient="auto" refX="8" refY="5">
              <path d="M0,0 L10,5 L0,10 Z" fill="#F8FAFC" />
            </marker>
          </defs>
          <g fill="none" stroke="#F8FAFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5">
            <path d="M128 305 H190" markerEnd="url(#mpm-arrow)" />
            <path d="M325 274 H352 Q365 274 365 258 V143 Q365 130 378 130 H395" markerEnd="url(#mpm-arrow)" />
            <path d="M325 350 H352 Q365 350 365 364 V436 Q365 449 378 449 H395" markerEnd="url(#mpm-arrow)" />
            <path d="M565 136 H625 Q645 136 645 156 V292 Q645 310 665 310" markerEnd="url(#mpm-arrow)" />
            <path d="M565 440 H625 Q645 440 645 420 V348 Q645 334 665 334" markerEnd="url(#mpm-arrow)" />
            <path d="M800 337 H860" markerEnd="url(#mpm-arrow)" />
            <path d="M995 337 H1045" markerEnd="url(#mpm-arrow)" />
            <path d="M1180 337 H1210" markerEnd="url(#mpm-arrow)" />
          </g>
        </svg>

        {durations.map((duration) => (
          <span
            key={`${duration.text}-${duration.x}-${duration.y}`}
            className="absolute rounded-full bg-[#080A0F]/80 px-2 text-lg font-black text-white"
            style={{ left: duration.x, top: duration.y }}
          >
            {duration.text}
          </span>
        ))}

        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute overflow-hidden rounded-2xl border-2 ${node.border} bg-[#10131A]/88 text-white shadow-[0_0_30px_rgba(255,255,255,0.08)]`}
            style={{ left: node.x, top: node.y, width: node.width, height: node.height }}
          >
            <div className="flex h-full flex-col">
              <div className="flex flex-1 flex-col items-center justify-center px-3 text-center">
                <p className={node.label ? 'text-4xl font-black leading-none' : 'text-xl font-black'}>
                  {node.id}
                </p>
                {node.label && (
                  <p className="mt-3 text-sm font-black leading-tight text-white/88">
                    {node.label.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 border-t border-white/35 text-center text-xs font-black text-white/90">
                <span className="border-r border-white/35 py-2">DTO</span>
                <span className="py-2">DTA</span>
              </div>
              <div className="grid grid-cols-2 border-t border-white/35 text-center text-xl font-black">
                <span className="border-r border-white/35 py-2">{node.early}</span>
                <span className="py-2">{node.late}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-8 rounded-2xl border border-dashed border-[#A7A5FF] bg-white/[0.06] p-4 text-sm font-bold leading-7 text-white">
          <p className="font-black">Légende :</p>
          <p>DTO : date au plus tôt</p>
          <p>DTA : date au plus tard</p>
        </div>

        <div className="absolute bottom-6 left-[590px] rounded-2xl border border-white/35 bg-[#080A0F]/88 px-10 py-4 text-center text-white">
          <p className="text-lg font-black">CHEMIN CRITIQUE :</p>
          <p className="mt-2 text-xl font-black text-[#F87171]">A → B → D → E → F</p>
          <p className="mt-2 text-base font-black">DURÉE TOTALE DU PROJET : 12 jours</p>
        </div>
      </div>
    </div>
  );
}

function MpmModulePage({ onBackHome, onChoosePremium }) {
  return (
    <main className="bg-[#F7F4EF]">
      <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:pt-36">
        <div className="absolute left-[-8rem] top-28 h-80 w-80 rounded-full bg-[#D7FF4F]/40 blur-3xl" />
        <div className="absolute right-[-7rem] top-24 h-80 w-80 rounded-full bg-[#A7A5FF]/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <button
            type="button"
            onClick={onBackHome}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-[#030712] transition hover:-translate-y-0.5 hover:border-[#030712]"
          >
            <ArrowLeft size={16} />
            Retour à l’accueil
          </button>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <ModuleBadge>Module gratuit</ModuleBadge>
                <ModuleBadge>Fiche complète</ModuleBadge>
                <ModuleBadge>Vidéo à venir</ModuleBadge>
                <ModuleBadge>Exercice corrigé</ModuleBadge>
              </div>
              <h1 className="mt-7 max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight text-[#030712] sm:text-6xl lg:text-7xl">
                Planification de projet / <em className="font-serif font-semibold italic">MPM</em>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4B5563] sm:text-xl">
                Construire un schéma permettant de visualiser les tâches, leur durée, leur marge
                d’erreur, le chemin critique et la durée totale du projet.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#fiche-mpm"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#030712] px-6 py-4 font-black text-white transition hover:-translate-y-1"
                >
                  Lire la fiche
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#exercice-mpm"
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-4 font-black text-[#030712] transition hover:-translate-y-1 hover:border-[#030712]"
                >
                  Voir l’exercice corrigé
                </a>
              </div>
            </div>

            <div className="rounded-[2.25rem] bg-[#030712] p-5 shadow-[0_30px_100px_rgba(3,7,18,0.20)]">
              <MpmNetworkPreview />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-5">
            {objectives.map((objective, index) => (
              <article
                key={objective}
                className="rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-[0_16px_45px_rgba(3,7,18,0.07)]"
              >
                <span className="grid size-10 place-items-center rounded-full bg-[#D7FF4F] text-sm font-black text-[#030712]">
                  {index + 1}
                </span>
                <p className="mt-5 font-bold leading-6 text-[#111827]">{objective}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="fiche-mpm" className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#D8F3FF] px-4 py-2 text-sm font-black text-[#0A2342]">
              <FileText size={16} />
              Fiche technique
            </span>
            <h2 className="mt-6 text-balance text-4xl font-black leading-tight tracking-tight text-[#030712] sm:text-5xl">
              La méthode MPM en version claire.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6B7280]">
              La méthode MPM permet de représenter un projet sous forme de réseau. Elle aide à
              visualiser l’ordre des tâches, la durée totale du projet, les marges et les tâches
              critiques à surveiller.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {glossary.map(({ term, definition }) => (
              <article key={term} className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                <h3 className="text-xl font-black text-[#030712]">{term}</h3>
                <p className="mt-3 leading-7 text-[#6B7280]">{definition}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#030712] px-4 py-16 text-white sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-[#D7FF4F]">
                <Route size={16} />
                Méthode pas à pas
              </span>
              <h2 className="mt-6 text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                Le réflexe à suivre à chaque exercice.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {steps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#D7FF4F] text-sm font-black text-[#030712]">
                    {index + 1}
                  </span>
                  <p className="self-center font-bold leading-6">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {formulas.map(({ title, value }) => (
              <article key={title} className="rounded-[1.5rem] bg-white p-5 text-[#030712]">
                <Calculator size={22} />
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 whitespace-pre-line font-semibold leading-7 text-[#4B5563]">{value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_22px_70px_rgba(3,7,18,0.10)]">
            <div className="aspect-video rounded-[1.5rem] bg-[linear-gradient(145deg,#0A2342,#030712_55%,#D7FF4F)] p-5">
              <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/15 bg-black/25 p-5 text-white backdrop-blur">
                <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-black">
                  Vidéo bientôt intégrée
                </span>
                <div className="grid place-items-center">
                  <div className="grid size-20 place-items-center rounded-full bg-white text-[#030712] shadow-2xl">
                    <Play size={30} fill="currentColor" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white/60">Durée prévue : 3 à 4 minutes</p>
                  <h2 className="mt-1 text-2xl font-black">Comprendre le réseau MPM sans se perdre</h2>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#A7A5FF]/30 px-4 py-2 text-sm font-black text-[#0A2342]">
              <Clock3 size={16} />
              Mini-vidéo
            </span>
            <h2 className="mt-6 text-balance text-4xl font-black leading-tight tracking-tight text-[#030712] sm:text-5xl">
              La vidéo viendra compléter la fiche.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6B7280]">
              Pour l’instant, ce bloc sert d’emplacement propre. Quand la vidéo sera prête, elle
              pourra être intégrée ici avec un lecteur ou un lien privé.
            </p>
          </div>
        </div>
      </section>

      <section id="exercice-mpm" className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#D7FF4F] px-4 py-2 text-sm font-black text-[#030712]">
              <Table2 size={16} />
              Exercice corrigé
            </span>
            <h2 className="mt-6 text-balance text-4xl font-black leading-tight tracking-tight text-[#030712] sm:text-5xl">
              Construire et corriger un réseau MPM.
            </h2>
          </div>

          <div className="grid gap-6">
            <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_22px_70px_rgba(3,7,18,0.08)]">
              <h3 className="text-2xl font-black text-[#030712]">Énoncé</h3>
              <p className="mt-3 leading-7 text-[#6B7280]">
                Un groupe doit préparer une présentation de projet. Les tâches, durées et
                antériorités sont les suivantes.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[560px] border-separate border-spacing-y-2 text-left">
                  <thead className="text-sm uppercase text-[#6B7280]">
                    <tr>
                      <th className="px-4 py-2">Tâche</th>
                      <th className="px-4 py-2">Description</th>
                      <th className="px-4 py-2">Durée</th>
                      <th className="px-4 py-2">Antécédents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exerciseRows.map((row) => (
                      <tr key={row.task} className="bg-[#FAF8F3]">
                        <td className="rounded-l-2xl px-4 py-3 font-black">{row.task}</td>
                        <td className="px-4 py-3 font-semibold">{row.label}</td>
                        <td className="px-4 py-3">{row.duration}</td>
                        <td className="rounded-r-2xl px-4 py-3">{row.previous}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <CorrectionReveal>
              <p className="mt-3 leading-7 text-white/64">
                Le projet dure 12 jours. La tâche C possède une marge d’un jour ; les autres
                tâches forment le chemin critique. Les repères “Début” et “Fin” permettent de
                fermer proprement le réseau sans être comptés comme des tâches du projet.
              </p>
              <MpmFinalNetworkDiagram />
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[520px] border-separate border-spacing-y-2 text-left">
                  <thead className="text-sm uppercase text-white/44">
                    <tr>
                      <th className="px-4 py-2">Tâche</th>
                      <th className="px-4 py-2">Plus tôt</th>
                      <th className="px-4 py-2">Plus tard</th>
                      <th className="px-4 py-2">Marge</th>
                      <th className="px-4 py-2">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {correctionRows.map((row) => (
                      <tr key={row.task} className="bg-white/[0.08]">
                        <td className="rounded-l-2xl px-4 py-3 font-black">{row.task}</td>
                        <td className="px-4 py-3">{row.early}</td>
                        <td className="px-4 py-3">{row.late}</td>
                        <td className="px-4 py-3">{row.margin}</td>
                        <td className="rounded-r-2xl px-4 py-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black ${
                              row.status === 'Critique'
                                ? 'bg-[#D7FF4F] text-[#030712]'
                                : 'bg-white/10 text-white'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CorrectionReveal>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-6 sm:px-6 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.8fr]">
          <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_22px_70px_rgba(3,7,18,0.08)] sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#D8F3FF] px-4 py-2 text-sm font-black text-[#0A2342]">
              <BookOpenCheck size={16} />
              À retenir
            </span>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                ['Le réseau montre l’ordre logique des tâches.', Network],
                ['Une marge nulle signale une tâche critique.', Target],
                ['Un retard sur le chemin critique retarde tout le projet.', Flag],
              ].map(([text, Icon]) => (
                <div key={text} className="rounded-3xl bg-[#FAF8F3] p-5">
                  <Icon size={24} className="text-[#D72638]" />
                  <p className="mt-4 font-bold leading-7 text-[#111827]">{text}</p>
                </div>
              ))}
            </div>
              <div className="mt-6 flex gap-3 rounded-3xl bg-[#FFF1D6] p-4">
                <AlertTriangle size={22} className="mt-1 shrink-0 text-[#D72638]" />
                <div className="font-semibold leading-7 text-[#111827]">
                  <p className="font-black">Erreurs fréquentes :</p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>Ne pas ajouter une tâche “Début” et une tâche “Fin”.</li>
                    <li>
                      Calculer les dates au plus tard dans le mauvais sens : les dates au plus tôt
                      se calculent du début vers la fin, tandis que les dates au plus tard se
                      calculent de la fin vers le début.
                    </li>
                  </ul>
                </div>
              </div>
          </article>

          <aside className="rounded-[2rem] bg-[#030712] p-6 text-white shadow-[0_22px_70px_rgba(3,7,18,0.14)] sm:p-8">
            <Sparkles size={28} className="text-[#D7FF4F]" />
            <h2 className="mt-5 text-3xl font-black">Continuer après le module gratuit</h2>
            <p className="mt-4 leading-7 text-white/62">
              Le Premium donnera accès aux autres chapitres, fiches et exercices corrigés en
              mini-vidéos.
            </p>
            <div className="mt-7 grid gap-3">
              <button
                type="button"
                onClick={onChoosePremium}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D7FF4F] px-6 py-4 font-black text-[#030712] transition hover:-translate-y-1"
              >
                Passer à Premium
                <ArrowRight size={18} />
              </button>
              <a
                href="/pdfs/planification-projet-mpm.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-4 font-black text-white/80"
              >
                Télécharger la fiche PDF
                <Download size={18} />
              </a>
            </div>
            <p className="mt-4 text-sm text-white/44">La fiche PDF inclut le rappel de cours, l’exercice et sa correction.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default MpmModulePage;
