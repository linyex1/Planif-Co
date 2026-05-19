import { footerLinks } from '../data/content.js';

function Footer({ onNavigateHome }) {
  const handleClick = (event, href) => {
    if (!onNavigateHome) return;
    event.preventDefault();
    onNavigateHome(href);
  };

  return (
    <footer className="bg-[#030712] px-4 py-14 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <a
              href="#accueil"
              className="flex items-center gap-2 font-semibold"
              onClick={(event) => handleClick(event, '#accueil')}
            >
              <span className="grid size-10 place-items-center rounded-full bg-[#D7FF4F] text-sm font-black text-[#030712]">
                P&
              </span>
              <span className="text-xl tracking-tight">Planif&Co</span>
            </a>
            <p className="mt-5 max-w-xl text-3xl font-black leading-tight tracking-tight">
              Révise mieux. Comprends plus vite. Progresse vraiment.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => handleClick(event, link.href)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/74 transition hover:border-[#D7FF4F] hover:text-[#D7FF4F]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-8 text-sm text-white/52 lg:flex-row lg:items-center lg:justify-between">
          <p>Projet étudiant — Master 1 MSI — Université Paris 1 Panthéon-Sorbonne</p>
          <p>Site pédagogique réalisé dans le cadre du cours de Planification & Contrôle.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
