import React from 'react';
import { Check, X, ShieldAlert, Train, Car, Footprints, Download } from 'lucide-react';

interface FoliaoGuideSectionProps {
  onOpenLeadModal: () => void;
}

export const FoliaoGuideSection: React.FC<FoliaoGuideSectionProps> = ({ onOpenLeadModal }) => {
  const allowedItems = [
    'Protetor solar e protetor labial',
    'Doleira ou pochete justa ao corpo',
    'Garrafa plástica/térmica vazia para reabastecimento',
    'Documento oficial com foto (RG, CNH ou e-Título)',
    'Calçado fechado e tênis confortável',
    'Carregador portátil (powerbank) para o celular',
    'Capa de chuva leve e compacta',
    'Fantasias criativas e adereços leves',
  ];

  const prohibitedItems = [
    'Garrafas ou recipientes de vidro de qualquer tipo',
    'Objetos cortantes, canivetes ou perfurantes',
    'Sinalizadores, fogos de artifício ou inflamáveis',
    'Coolers grandes ou caixas térmicas rígidas',
    'Mastros de bandeiras de madeira ou metal',
    'Substâncias ilícitas ou armas de fogo',
    'Sprays de espuma ou tintas tóxicas',
    'Drones sem autorização prévia da organização',
  ];

  return (
    <section className="py-20 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
              Orientações Essenciais · Curta Sem Perrengue
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Guia Prático de Sobrevivência do Folião
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Fique atento ao que é permitido entrar pelos portões de revista e planeje seu deslocamento com tranquilidade.
            </p>
          </div>

          <button
            onClick={onOpenLeadModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Guia Oficial em PDF</span>
          </button>
        </div>

        {/* 2-Column: Allowed vs Prohibited */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Permitidos */}
          <div className="bg-neutral-950/80 border border-emerald-900/40 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">Itens Permitidos e Recomendados</h3>
                <span className="text-xs text-neutral-400">Leve o essencial para curtir o dia com segurança</span>
              </div>
            </div>

            <ul className="space-y-3">
              {allowedItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-neutral-300">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Proibidos */}
          <div className="bg-neutral-950/80 border border-red-900/40 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <X className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">Itens Proibidos no Circuito</h3>
                <span className="text-xs text-neutral-400">Retidos obrigatoriamente na triagem dos portões</span>
              </div>
            </div>

            <ul className="space-y-3">
              {prohibitedItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-neutral-300">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Mobility & Transport Cards */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white font-display mb-6 flex items-center gap-2">
            <Footprints className="w-5 h-5 text-amber-400" />
            <span>Como Chegar e Voltar com Segurança</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-neutral-900/70 border border-neutral-800/80 rounded-2xl">
              <div className="flex items-center gap-2.5 mb-2.5 text-amber-400">
                <Train className="w-5 h-5" />
                <h4 className="text-sm font-bold text-white">Metrô & Trens 24 Horas</h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Estações de Metrô e terminais integrados com intervalo reduzido e reforço de segurança nos 4 dias de folia. Desembarque direto a 200m da concentração.
              </p>
            </div>

            <div className="p-4 bg-neutral-900/70 border border-neutral-800/80 rounded-2xl">
              <div className="flex items-center gap-2.5 mb-2.5 text-amber-400">
                <Car className="w-5 h-5" />
                <h4 className="text-sm font-bold text-white">Bolsão para Aplicativos & Táxis</h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Áreas exclusivas de parada sinalizadas na Av. Perimetral Sul e Rua das Palmeiras, livres de bloqueio de trânsito e com iluminação policial.
              </p>
            </div>

            <div className="p-4 bg-neutral-900/70 border border-neutral-800/80 rounded-2xl">
              <div className="flex items-center gap-2.5 mb-2.5 text-amber-400">
                <ShieldAlert className="w-5 h-5" />
                <h4 className="text-sm font-bold text-white">Pontos de Encontro Marcados</h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Combine previamente pontos de referência com amigos (Totem 1 Concentração, Totem 3 Camarote ou Totem 5 Apoteose) caso o sinal de celular oscile.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
