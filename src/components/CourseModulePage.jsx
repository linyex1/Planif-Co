import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Calculator,
  Clock3,
  Download,
  FileText,
  Route,
  Table2,
} from 'lucide-react';
import CorrectionReveal from './CorrectionReveal.jsx';

function ModuleBadge({ children }) {
  return (
    <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-black uppercase tracking-wide text-[#111827]">
      {children}
    </span>
  );
}

function ObjectiveText({ text }) {
  if (!text.includes('Conseil :')) {
    return <p className="mt-5 font-bold leading-6 text-[#111827]">{text}</p>;
  }

  const [description, advice] = text.split('Conseil :');

  return (
    <div className="mt-5 font-bold leading-6 text-[#111827]">
      <p>{description.trim()}</p>
      <p className="mt-4">Conseil : {advice.trim()}</p>
    </div>
  );
}

function BcgMatrixPreview({ compact = false }) {
  return (
    <div className="relative rounded-[1.5rem] border border-white/10 bg-[#070A12] p-4">
      <div className="mb-3 flex items-center justify-between text-[11px] font-black uppercase text-white/52">
        <span>Part de marché relative</span>
        <span>PMR</span>
      </div>
      <div className="grid overflow-hidden rounded-2xl border border-white/18 sm:grid-cols-2">
        {[
          ['Vedette', 'Leader + marché en croissance', '#D7FF4F'],
          ['Dilemme', 'Challenger + marché en croissance', '#A7A5FF'],
          ['Vache à lait', 'Leader + marché mature', '#D8F3FF'],
          ['Poid mort', 'Challenger + marché mature', '#FFFFFF'],
        ].map(([title, detail, color]) => (
          <div key={title} className="min-h-[104px] border-white/12 p-4 odd:border-r even:border-r-0 [&:nth-child(-n+2)]:border-b">
            <p className="text-[11px] font-black uppercase text-white/45">{detail}</p>
            <p className="mt-3 text-2xl font-black text-[#030712]">
              <span className="rounded-2xl px-3 py-2" style={{ backgroundColor: color }}>
                {title}
              </span>
            </p>
          </div>
        ))}
      </div>
      {!compact && (
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold text-white/55">
          <span>Haut : croissance élevée</span>
          <span className="text-right">Bas : croissance faible</span>
        </div>
      )}
    </div>
  );
}

function SimpleDataTable({ table, dark = false }) {
  return (
    <div className={`overflow-x-auto rounded-[1.5rem] border ${dark ? 'border-white/10 bg-white/[0.06]' : 'border-black/10 bg-white'} p-4`}>
      {table.title && (
        <h4 className={`mb-4 text-xl font-black ${dark ? 'text-[#D7FF4F]' : 'text-[#030712]'}`}>{table.title}</h4>
      )}
      <table className="w-full min-w-[640px] border-separate border-spacing-y-2 text-left">
        <thead className={`text-xs uppercase ${dark ? 'text-white/44' : 'text-[#6B7280]'}`}>
          <tr>
            {table.columns.map((column) => (
              <th key={column} className="px-3 py-2">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.join('-')} className={dark ? 'bg-white/[0.08]' : 'bg-[#FAF8F3]'}>
              {row.map((cell, index) => (
                <td
                  key={`${cell}-${index}`}
                  className={`px-3 py-3 font-semibold ${dark ? 'text-white/78' : 'text-[#111827]'} ${
                    index === 0 ? 'rounded-l-2xl font-black' : ''
                  } ${index === row.length - 1 ? 'rounded-r-2xl' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ModulePreview({ module }) {
  const Icon = module.icon;

  return (
    <div className="rounded-[2.25rem] bg-[#030712] p-5 shadow-[0_30px_100px_rgba(3,7,18,0.20)]">
      <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#05070D] p-5">
        <div
          className="absolute right-[-4rem] top-[-4rem] h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: `${module.accent}55` }}
        />
        <div className="absolute left-[-3rem] bottom-[-4rem] h-64 w-64 rounded-full bg-[#A7A5FF]/25 blur-3xl" />

        <div className="relative flex h-full min-h-[320px] flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/70">
                {module.preview.title}
              </span>
              <h2 className="mt-5 max-w-sm text-4xl font-black leading-tight text-white">{module.title}</h2>
            </div>
            <div className="grid size-16 place-items-center rounded-3xl text-[#030712]" style={{ backgroundColor: module.accent }}>
              <Icon size={30} />
            </div>
          </div>

          {module.preview.type === 'bcgMatrix' ? (
            <BcgMatrixPreview compact />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {module.preview.items.map(([title, detail, color]) => (
                <div key={title} className="rounded-3xl p-4 text-[#030712]" style={{ backgroundColor: color }}>
                  <p className="text-xs font-black uppercase text-[#6B7280]">{title}</p>
                  <p className="mt-2 text-2xl font-black">{detail}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BcgBubbleMatrix({ matrix }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <div className="relative h-[520px] min-w-[760px] rounded-[1.5rem] border border-white/12 bg-[#070A12] p-8">
        <div className="absolute left-8 top-8 rounded-2xl bg-[#D7FF4F] px-4 py-2 text-sm font-black text-[#030712]">
          Vedette
        </div>
        <div className="absolute right-8 top-8 rounded-2xl bg-[#A7A5FF] px-4 py-2 text-sm font-black text-[#030712]">
          Dilemme
        </div>
        <div className="absolute bottom-8 left-8 rounded-2xl bg-[#D8F3FF] px-4 py-2 text-sm font-black text-[#030712]">
          Vache à lait
        </div>
        <div className="absolute bottom-8 right-8 rounded-2xl bg-white px-4 py-2 text-sm font-black text-[#030712]">
          Poid mort
        </div>

        <div className="absolute left-1/2 top-8 h-[420px] w-px -translate-x-1/2 bg-white/22" />
        <div className="absolute left-8 top-1/2 h-px w-[calc(100%-4rem)] -translate-y-1/2 bg-white/22" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+1.25rem)] rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/64">
          PMR = 1
        </div>
        <div className="absolute left-10 top-1/2 -translate-y-[calc(50%+1.25rem)] rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/64">
          TC = 10 %
        </div>

        <div className="absolute -left-9 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-xs font-black uppercase tracking-wide text-white/58">
          Taux de croissance
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-black uppercase tracking-wide text-white/44">
          Part de marché relative
        </div>
        <div className="absolute bottom-10 left-10 text-xs font-bold text-white/46">PMR élevée</div>
        <div className="absolute bottom-10 right-10 text-xs font-bold text-white/46">PMR faible</div>
        <div className="absolute left-10 top-20 text-xs font-bold text-white/46">TC élevée</div>
        <div className="absolute left-10 bottom-20 text-xs font-bold text-white/46">TC faible</div>

        {matrix.bubbles.map((bubble) => (
          <div
            key={bubble.label}
            className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white/80 text-center shadow-[0_0_35px_rgba(255,255,255,0.12)]"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: bubble.size,
              height: bubble.size,
              backgroundColor: bubble.color,
            }}
          >
            <div className="px-3 text-[#030712]">
              <p className="text-2xl font-black">{bubble.label}</p>
              <p className="mt-1 text-xs font-black">{bubble.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BcgCorrection({ correction }) {
  if (!correction) return null;

  return (
    <div className="mt-6 grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        {correction.tables.map((table) => (
          <SimpleDataTable key={table.title} table={table} dark />
        ))}
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
        <h4 className="text-xl font-black text-[#D7FF4F]">{correction.matrix.title}</h4>
        <p className="mt-2 text-sm font-bold text-white/54">{correction.matrix.subtitle}</p>
        <BcgBubbleMatrix matrix={correction.matrix} />
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
        <h4 className="text-xl font-black text-[#D7FF4F]">{correction.analysis.title}</h4>
        <ul className="mt-4 grid gap-3">
          {correction.analysis.items.map((item) => (
            <li key={item} className="rounded-2xl bg-white/10 p-4 font-semibold leading-7 text-white/78">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CourseModulePage({ module, onBackHome }) {
  if (!module) return null;

  return (
    <main className="bg-[#F7F4EF]">
      <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:pt-36">
        <div
          className="absolute left-[-8rem] top-28 h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: `${module.accent}66` }}
        />
        <div className="absolute right-[-7rem] top-24 h-80 w-80 rounded-full bg-[#A7A5FF]/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <button
            type="button"
            onClick={onBackHome}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-[#030712] transition hover:-translate-y-0.5 hover:border-[#030712]"
          >
            <ArrowLeft size={16} />
            Retour aux modules
          </button>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <ModuleBadge>{module.eyebrow}</ModuleBadge>
                {module.badges.map((badge) => (
                  <ModuleBadge key={badge}>{badge}</ModuleBadge>
                ))}
              </div>
              <h1 className="mt-7 max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight text-[#030712] sm:text-6xl lg:text-7xl">
                {module.title.replace(module.italic, '')}
                <em className="font-serif font-semibold italic">{module.italic}</em>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4B5563] sm:text-xl">
                {module.subtitle}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#fiche-module"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#030712] px-6 py-4 font-black text-white transition hover:-translate-y-1"
                >
                  Lire la fiche
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#exercice-module"
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-4 font-black text-[#030712] transition hover:-translate-y-1 hover:border-[#030712]"
                >
                  Voir l’exercice corrigé
                </a>
              </div>
            </div>

            <ModulePreview module={module} />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className={`grid gap-5 ${module.objectivesGridClass || 'md:grid-cols-5'}`}>
            {module.objectives.map((objective, index) => (
              <article
                key={objective}
                className="rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-[0_16px_45px_rgba(3,7,18,0.07)]"
              >
                <span
                  className="grid size-10 place-items-center rounded-full text-sm font-black text-[#030712]"
                  style={{ backgroundColor: module.accent }}
                >
                  {index + 1}
                </span>
                <ObjectiveText text={objective} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="fiche-module" className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#D8F3FF] px-4 py-2 text-sm font-black text-[#0A2342]">
              <FileText size={16} />
              Fiche technique
            </span>
            <h2 className="mt-6 text-balance text-4xl font-black leading-tight tracking-tight text-[#030712] sm:text-5xl">
              {module.ficheTitle || 'Les notions à maîtriser.'}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6B7280]">
              {module.ficheDescription ||
                'Cette fiche reprend les définitions et réflexes utiles pour traiter les exercices sans réciter le cours mécaniquement.'}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {module.concepts.map(({ term, definition }) => (
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
                Le raisonnement à suivre en contrôle.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {module.steps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-full text-sm font-black text-[#030712]"
                    style={{ backgroundColor: index % 2 === 0 ? '#D7FF4F' : module.accent }}
                  >
                    {index + 1}
                  </span>
                  <p className="self-center font-bold leading-6">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {module.formulas.map(({ title, value, items }) => (
              <article key={title} className="rounded-[1.5rem] bg-white p-5 text-[#030712]">
                <Calculator size={22} />
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                {value && <p className="mt-3 whitespace-pre-line font-semibold leading-7 text-[#4B5563]">{value}</p>}
                {items && (
                  <ul className="mt-3 list-disc space-y-3 pl-5 font-semibold leading-7 text-[#4B5563]">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          {module.calculationBlocks && (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {module.calculationBlocks.map((block) => (
                <article key={block.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5">
                  <h3 className="text-xl font-black text-[#D7FF4F]">{block.title}</h3>
                  <div className="mt-4 grid gap-3">
                    {block.lines.map((line) => (
                      <p key={line} className="rounded-2xl bg-white/10 p-3 font-semibold leading-7 text-white/78">
                        {line}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}

          {module.deepDive && (
            <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6">
              <h3 className="text-2xl font-black text-[#D7FF4F]">{module.deepDive.title}</h3>
              <p className="mt-3 leading-7 text-white/64">{module.deepDive.description}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {module.deepDive.items.map((item) => (
                  <article key={item.title} className="rounded-3xl bg-white/10 p-4">
                    <p className="font-black text-white">{item.title}</p>
                    <p className="mt-2 font-semibold text-[#D7FF4F]">{item.formula}</p>
                    <p className="mt-2 leading-7 text-white/64">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_22px_70px_rgba(3,7,18,0.10)]">
            <div className="overflow-hidden rounded-[1.5rem] bg-[#030712]">
              <iframe
                className="aspect-video w-full"
                src={module.videoEmbedUrl}
                title={module.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#A7A5FF]/30 px-4 py-2 text-sm font-black text-[#0A2342]">
              <Clock3 size={16} />
              Mini-vidéo
            </span>
            <h2 className="mt-6 text-balance text-4xl font-black leading-tight tracking-tight text-[#030712] sm:text-5xl">
              Regarder la mini-vidéo du module.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6B7280]">{module.videoDescription}</p>
          </div>
        </div>
      </section>

      <section id="exercice-module" className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black text-[#030712]"
              style={{ backgroundColor: module.accent }}
            >
              <Table2 size={16} />
              Exercice corrigé
            </span>
            <h2 className="mt-6 text-balance text-4xl font-black leading-tight tracking-tight text-[#030712] sm:text-5xl">
              {module.exerciseTitle}
            </h2>
            {!module.exerciseIntroInStatement && (
              <p className="mt-5 text-lg leading-8 text-[#6B7280]">{module.exerciseIntro}</p>
            )}
          </div>

          <div className={`grid gap-6 ${module.exerciseFullWidth ? 'lg:grid-cols-1' : 'lg:grid-cols-2'}`}>
            <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_22px_70px_rgba(3,7,18,0.08)]">
              <h3 className="text-2xl font-black text-[#030712]">Énoncé</h3>
              {module.exerciseIntroInStatement && (
                <p className="mt-3 leading-7 text-[#6B7280]">{module.exerciseIntro}</p>
              )}
              {module.exerciseContext && (
                <p className="mt-3 whitespace-pre-line leading-7 text-[#6B7280]">{module.exerciseContext}</p>
              )}
              {module.exerciseTables ? (
                <div className="mt-6 grid gap-5">
                  {module.exerciseTables.map((table) => (
                    <SimpleDataTable key={table.title} table={table} />
                  ))}
                  {module.exerciseQuestions && (
                    <div className="rounded-[1.5rem] bg-[#FAF8F3] p-5">
                      <h4 className="text-xl font-black text-[#030712]">Questions</h4>
                      <ol className="mt-4 grid gap-3">
                        {module.exerciseQuestions.map((question, index) => (
                          <li key={question} className="flex gap-3 font-semibold leading-7 text-[#111827]">
                            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#0A2342] text-sm font-black text-white">
                              {index + 1}
                            </span>
                            {question}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[560px] border-separate border-spacing-y-2 text-left">
                    <thead className="text-sm uppercase text-[#6B7280]">
                      <tr>
                        <th className="px-4 py-2">Élément</th>
                        <th className="px-4 py-2">Donnée</th>
                        <th className="px-4 py-2">Méthode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.exerciseRows.map((row) => (
                        <tr key={`${row.item}-${row.detail}`} className="bg-[#FAF8F3]">
                          <td className="rounded-l-2xl px-4 py-3 font-black">{row.item}</td>
                          <td className="px-4 py-3 font-semibold">{row.detail}</td>
                          <td className="rounded-r-2xl px-4 py-3">{row.method}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>

            <CorrectionReveal>
              {module.bcgCorrection ? (
                <BcgCorrection correction={module.bcgCorrection} />
              ) : (
                <div className="mt-6 grid gap-3">
                  {module.correctionRows.map((row) => (
                    <div key={row.label} className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
                      <p className="font-black text-[#D7FF4F]">{row.label}</p>
                      <p className="mt-2 leading-7 text-white/72">{row.result}</p>
                    </div>
                  ))}
                </div>
              )}

              {module.correctionTable && (
                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                  <h4 className="text-xl font-black text-[#D7FF4F]">{module.correctionTable.title}</h4>
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full min-w-[820px] border-separate border-spacing-y-2 text-left">
                      <thead className="text-xs uppercase text-white/44">
                        <tr>
                          {module.correctionTable.columns.map((column) => (
                            <th key={column} className="px-3 py-2">
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {module.correctionTable.rows.map((row) => (
                          <tr key={row.join('-')} className="bg-white/[0.08]">
                            {row.map((cell, index) => (
                              <td
                                key={`${cell}-${index}`}
                                className={`px-3 py-3 font-semibold text-white/78 ${
                                  index === 0 ? 'rounded-l-2xl text-white' : ''
                                } ${index === row.length - 1 ? 'rounded-r-2xl text-[#FFB4BE]' : ''}`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {module.varianceChart && (
                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                  <h4 className="text-xl font-black">Analyse graphique des écarts</h4>
                  <div className="mt-5 grid gap-4">
                    {module.varianceChart.map((item) => {
                      const width = Math.max(18, Math.min(100, Math.abs(item.value) / 3));
                      const isBad = item.kind === 'bad';

                      return (
                        <div key={item.label}>
                          <div className="mb-2 flex items-center justify-between gap-4 text-sm font-bold text-white/70">
                            <span>{item.label}</span>
                            <span className={isBad ? 'text-[#FFB4BE]' : 'text-[#D7FF4F]'}>
                              {item.value > 0 ? '+' : ''}
                              {item.value} €
                            </span>
                          </div>
                          <div className="h-3 rounded-full bg-white/12">
                            <div
                              className={`h-full rounded-full ${isBad ? 'bg-[#D72638]' : 'bg-[#D7FF4F]'}`}
                              style={{ width: `${width}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
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
              {module.takeaways.map(([text, Icon]) => (
                <div key={text} className="rounded-3xl bg-[#FAF8F3] p-5">
                  <Icon size={24} className="text-[#D72638]" />
                  <p className="mt-4 font-bold leading-7 text-[#111827]">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3 rounded-3xl bg-[#FFF1D6] p-4">
              <AlertTriangle size={22} className="shrink-0 text-[#D72638]" />
              <p className="font-semibold leading-7 text-[#111827]">{module.warning}</p>
            </div>
          </article>

          <aside className="rounded-[2rem] bg-[#030712] p-6 text-white shadow-[0_22px_70px_rgba(3,7,18,0.14)] sm:p-8">
            <FileText size={28} className="text-[#D7FF4F]" />
            <h2 className="mt-5 text-3xl font-black">Fiche du module</h2>
            <p className="mt-4 leading-7 text-white/62">
              Cette fiche fait partie du parcours Premium. Le téléchargement PDF sera ajouté
              plus tard pour faciliter les révisions hors ligne.
            </p>
            <div className="mt-7 grid gap-3">
              <a
                href={module.pdfPath}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D7FF4F] px-6 py-4 font-black text-[#030712]"
              >
                Télécharger la fiche PDF
                <Download size={18} />
              </a>
              <button
                type="button"
                onClick={onBackHome}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-4 font-black text-white/80 transition hover:-translate-y-1 hover:border-[#D7FF4F] hover:text-[#D7FF4F]"
              >
                Retour aux modules
                <ArrowLeft size={18} />
              </button>
            </div>
            <p className="mt-4 text-sm text-white/44">La fiche PDF inclut le rappel de cours, l’exercice et sa correction.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default CourseModulePage;
