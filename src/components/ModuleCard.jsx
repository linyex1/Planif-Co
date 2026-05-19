import { ArrowUpRight } from 'lucide-react';

function ModuleCard({ module, onOpenModule }) {
  const Icon = module.icon;

  return (
    <article className="group flex h-full flex-col rounded-[1.75rem] border border-black/10 bg-white p-5 shadow-[0_18px_55px_rgba(3,7,18,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(3,7,18,0.14)]">
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
    </article>
  );
}

export default ModuleCard;
