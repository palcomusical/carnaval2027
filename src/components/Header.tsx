import React, { useState } from 'react';
import { Menu, X, Ticket, Database, Presentation, Sliders } from 'lucide-react';

interface HeaderProps {
  onOpenLeadModal: () => void;
  onOpenAdminModal: () => void;
  onOpenDeckModal: () => void;
  totalLeadsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLeadModal,
  onOpenAdminModal,
  onOpenDeckModal,
  totalLeadsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-purple-950/95 backdrop-blur-md border-b-2 border-yellow-400/40 transition-colors shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark with flyer typography */}
        <a
          href="#"
          className="flex items-center gap-2 group whitespace-nowrap shrink-0"
        >
          <span className="text-xl md:text-2xl font-black tracking-tight text-white font-display group-hover:text-yellow-400 transition-colors">
            <span className="text-yellow-400">PRÉVIA</span> CARNAVAL
          </span>
          <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-lg bg-yellow-400 text-purple-950 font-black uppercase tracking-wider border border-yellow-300 shadow-sm">
            Satubinha - MA
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a
            href="#programacao"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Programação
          </a>
          <a
            href="#circuito"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Circuito & Mapa
          </a>
          <a
            href="#estrutura"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Estrutura
          </a>
          <a
            href="#patrocinio"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 font-semibold text-amber-300"
          >
            Patrocínios
          </a>
          <a
            href="#faq"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Dúvidas
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDeckModal}
            title="Abrir Apresentação Comercial Oficial em formato de Slides / Pitch Deck"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-yellow-300 hover:text-white bg-purple-900/80 hover:bg-purple-800 border border-yellow-400/40 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Presentation className="w-3.5 h-3.5 text-yellow-400" />
            <span>Book Comercial (Slides)</span>
          </button>

          <button
            onClick={onOpenAdminModal}
            title="Acessar Gestor Geral ADM, CRM e Configurações do Bot de IA"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white hover:text-yellow-300 bg-purple-900/60 hover:bg-purple-800 border border-purple-700 hover:border-yellow-400 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-yellow-400" />
            <span>Gestor ADM & CRM ({totalLeadsCount})</span>
          </button>

          <button
            onClick={onOpenLeadModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-black text-purple-950 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 hover:from-yellow-200 hover:to-yellow-300 rounded-xl shadow-lg border-2 border-yellow-200 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Ticket className="w-4 h-4 text-purple-950" />
            <span>Garantir Entrada / VIP</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg focus:outline-none"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-neutral-950 px-4 py-4 space-y-3">
          <a
            href="#programacao"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-amber-400 py-1.5"
          >
            Programação dos Blocos
          </a>
          <a
            href="#circuito"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-amber-400 py-1.5"
          >
            Circuito & Mapa Interativo
          </a>
          <a
            href="#estrutura"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-amber-400 py-1.5"
          >
            Estrutura & Segurança
          </a>
          <a
            href="#gastronomia"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-amber-400 py-1.5"
          >
            Gastronomia & Experiência
          </a>
          <a
            href="#patrocinio"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-amber-300 hover:text-amber-400 py-1.5"
          >
            Patrocínios & Marcas
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-amber-400 py-1.5"
          >
            Dúvidas Frequentes
          </a>
          <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDeckModal();
              }}
              className="text-xs font-semibold text-amber-300 hover:text-white flex items-center gap-1.5 py-1 text-left"
            >
              <Presentation className="w-4 h-4 text-amber-400" />
              <span>Ver Book Comercial em Slides</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="text-xs font-semibold text-amber-400 hover:text-white flex items-center gap-1.5 py-1 text-left"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Gestor Geral ADM & CRM ({totalLeadsCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
