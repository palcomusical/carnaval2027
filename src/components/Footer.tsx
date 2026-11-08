import React from 'react';
import { Mail, MapPin, Instagram, Youtube, Facebook, Database } from 'lucide-react';
import { EVENT_INFO } from '../data/carnivalData';

interface FooterProps {
  onOpenAdminModal: () => void;
  onOpenLeadModal: () => void;
  onOpenDeckModal: () => void;
  totalLeadsCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdminModal,
  onOpenLeadModal,
  onOpenDeckModal,
  totalLeadsCount,
}) => {
  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <span className="text-lg font-bold text-white font-display block">
              Circuito Folia Brasil
            </span>
            <p className="text-neutral-400 text-xs leading-relaxed">
              O carnaval de rua oficial que une cultura, alegria, segurança e a maior constelação de artistas em 4 dias inesquecíveis.
            </p>
            <div className="pt-2 text-neutral-500 text-[11px]">
              Realização oficial:{' '}
              <strong className="text-neutral-300 font-semibold">{EVENT_INFO.organizer}</strong>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-3">
              Navegação
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#programacao" className="hover:text-amber-400 transition-colors">
                  Programação dos Blocos
                </a>
              </li>
              <li>
                <a href="#circuito" className="hover:text-amber-400 transition-colors">
                  Mapa Interativo do Circuito
                </a>
              </li>
              <li>
                <a href="#estrutura" className="hover:text-amber-400 transition-colors">
                  Estrutura & Segurança
                </a>
              </li>
              <li>
                <a href="#gastronomia" className="hover:text-amber-400 transition-colors">
                  Vila Gastronômica & Bares
                </a>
              </li>
              <li>
                <a href="#patrocinio" className="hover:text-amber-400 transition-colors font-medium text-amber-300">
                  Cotas de Patrocínio
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Lead & Commercial Links */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-3">
              Inscrições & Negócios
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenLeadModal}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Pré-Venda Camarote VIP
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDeckModal}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer font-medium text-amber-300"
                >
                  Book Comercial 2026 (Slides)
                </button>
              </li>
              <li>
                <a href="#patrocinio" className="hover:text-amber-400 transition-colors">
                  Cotas para Marcas & Patrocínios
                </a>
              </li>
              <li>
                <a href="#captacao-leads" className="hover:text-amber-400 transition-colors">
                  Credenciamento de Food Trucks
                </a>
              </li>
              <li>
                <a href="#captacao-leads" className="hover:text-amber-400 transition-colors">
                  Credenciamento de Imprensa
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdminModal}
                  className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-amber-400 font-medium transition-colors cursor-pointer mt-1"
                >
                  <Database className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gestor Geral ADM & CRM ({totalLeadsCount})</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts & Institutional */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-3">
              Contato & Produção
            </span>
            <div className="space-y-2 text-neutral-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${EVENT_INFO.organizerEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {EVENT_INFO.organizerEmail}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{EVENT_INFO.location}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3 text-neutral-400">
              <span className="hover:text-amber-400 transition-colors cursor-pointer" title="Instagram Oficial">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="hover:text-amber-400 transition-colors cursor-pointer" title="YouTube do Evento">
                <Youtube className="w-4 h-4" />
              </span>
              <span className="hover:text-amber-400 transition-colors cursor-pointer" title="Facebook">
                <Facebook className="w-4 h-4" />
              </span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © 2026 Circuito Folia Brasil · Produzido por Palco Musical Entretenimento. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Protocolo Não é Não</span>
            <span>·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Política de Privacidade</span>
            <span>·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Termos do Folião</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
