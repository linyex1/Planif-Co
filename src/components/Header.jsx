import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { navLinks } from '../data/content.js';

function Header({ cartCount = 0, onCartOpen, onNavigateHome }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleNavClick = (event, href) => {
    event.preventDefault();
    setIsOpen(false);
    onNavigateHome(href);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/10 bg-[#FAF8F3]/85 px-4 py-3 shadow-[0_18px_55px_rgba(3,7,18,0.10)] backdrop-blur-xl">
        <a
          href="#accueil"
          className="flex items-center gap-2 font-semibold text-[#030712]"
          onClick={(event) => handleNavClick(event, '#accueil')}
        >
          <span className="grid size-9 place-items-center rounded-full bg-[#030712] text-sm font-black text-[#D7FF4F]">
            P&
          </span>
          <span className="text-lg tracking-tight">Planif&Co</span>
        </a>

        <div className="hidden items-center gap-1 rounded-full bg-white/75 p-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#111827] transition hover:bg-[#030712] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="#panier"
            aria-label="Panier"
            onClick={(event) => {
              event.preventDefault();
              onCartOpen();
            }}
            className="relative grid size-11 place-items-center rounded-full border border-black/10 bg-white text-[#030712] transition hover:-translate-y-0.5 hover:border-[#030712] hover:shadow-lg"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#D72638] text-[10px] font-black text-white">
                {cartCount}
              </span>
            )}
          </a>
          <a
            href="#tarifs"
            onClick={(event) => handleNavClick(event, '#tarifs')}
            className="rounded-full bg-[#D7FF4F] px-5 py-3 text-sm font-bold text-[#030712] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(215,255,79,0.45)]"
          >
            Commencer
          </a>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full bg-[#030712] text-white lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-label="Ouvrir le menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-black/10 bg-[#FAF8F3] p-4 shadow-2xl lg:hidden">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-2xl px-4 py-3 font-medium text-[#111827] hover:bg-white"
                onClick={(event) => handleNavClick(event, link.href)}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="flex items-center justify-between rounded-2xl px-4 py-3 text-left font-medium text-[#111827] hover:bg-white"
              onClick={() => {
                setIsOpen(false);
                onCartOpen();
              }}
            >
              <span>Panier</span>
              {cartCount > 0 && (
                <span className="grid size-6 place-items-center rounded-full bg-[#D72638] text-xs font-black text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href="#tarifs"
              className="mt-2 rounded-full bg-[#D7FF4F] px-4 py-3 text-center font-bold text-[#030712]"
              onClick={(event) => handleNavClick(event, '#tarifs')}
            >
              Commencer
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
