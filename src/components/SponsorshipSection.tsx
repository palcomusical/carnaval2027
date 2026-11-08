import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Eye, 
  Users, 
  Award, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  Crown, 
  Share2, 
  Presentation 
} from 'lucide-react';
import { 
  CARNIVAL_IMAGES, 
  SPONSORSHIP_METRICS, 
  SPONSORSHIP_TIERS, 
  ACTIVATION_EXAMPLES,
  EVENT_INFO 
} from '../data/carnivalData';

interface SponsorshipSectionProps {
  onOpenLeadModalWithTier: (tierName: string) => void;
  onOpenDeckModal: () => void;
}

export const SponsorshipSection: React.FC<SponsorshipSectionProps> = ({ 
  onOpenLeadModalWithTier,
  onOpenDeckModal 
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>('master');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('bebidas');

  const selectedTier = SPONSORSHIP_TIERS.find((t) => t.id === selectedTierId) || SPONSORSHIP_TIERS[0];

  // Dynamic impact estimation calculator
  const getIndustryMultiplier = (ind: string) => {
    switch (ind) {
      case 'bebidas': return { sampling: '35.000 degustações', engagement: '94% de conversão no bar' };
      case 'telecom': return { sampling: '50.000 conexões Wi-Fi gratuitas com login patrocinado', engagement: '30.000 cadastros qualificados' };
      case 'fintech': return { sampling: '100% de exclusividade nos terminais de cartão cashless', engagement: '600.000 transações de compra' };
      case 'beleza': return { sampling: '20.000 kits de glitter e protetor solar aplicados', engagement: '+18.000 menções com hashtags' };
      default: return { sampling: '40.000 brindes colecionáveis entregues', engagement: 'Exposição contínua de 6,5h' };
    }
  };

  const industryData = getIndustryMultiplier(selectedIndustry);

  return (
    <section id="patrocinio" className="py-24 bg-neutral-950 border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
            Oportunidade Comercial de Grande Porte
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display mb-4">
            Conecte sua Marca à Maior Paixão Cultural do Brasil
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-6">
            O Carnaval de Rua é o maior momento de conexão emocional do país. Posicione sua marca frente a mais de 720.000 pessoas no coração da cidade com ativações memoráveis e alta visibilidade multiplataforma.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenDeckModal}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-neutral-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <Presentation className="w-4 h-4 text-neutral-950" />
              <span>Ver Book Comercial em Formato de Apresentação (Slides)</span>
            </button>
          </div>
        </div>

        {/* Quantified Impact Numbers Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-16">
          <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl text-center md:text-left">
            <span className="block text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
              {SPONSORSHIP_METRICS.totalAudience}
            </span>
            <span className="text-xs text-neutral-400 mt-1 block">
              {SPONSORSHIP_METRICS.audienceLabel}
            </span>
          </div>

          <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl text-center md:text-left">
            <span className="block text-2xl sm:text-3xl font-black text-amber-400 font-mono tabular-nums">
              {SPONSORSHIP_METRICS.digitalImpressions}
            </span>
            <span className="text-xs text-neutral-400 mt-1 block">
              {SPONSORSHIP_METRICS.impressionsLabel}
            </span>
          </div>

          <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl text-center md:text-left">
            <span className="block text-2xl sm:text-3xl font-black text-emerald-400 font-mono tabular-nums">
              {SPONSORSHIP_METRICS.prValue}
            </span>
            <span className="text-xs text-neutral-400 mt-1 block">
              {SPONSORSHIP_METRICS.prLabel}
            </span>
          </div>

          <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl text-center md:text-left">
            <span className="block text-2xl sm:text-3xl font-black text-cyan-400 font-mono tabular-nums">
              {SPONSORSHIP_METRICS.avgDwellTime}
            </span>
            <span className="text-xs text-neutral-400 mt-1 block">
              {SPONSORSHIP_METRICS.dwellTimeLabel}
            </span>
          </div>

          <div className="col-span-2 md:col-span-1 bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl text-center md:text-left">
            <span className="block text-2xl sm:text-3xl font-black text-purple-400 font-mono tabular-nums">
              {SPONSORSHIP_METRICS.brandRecall}
            </span>
            <span className="text-xs text-neutral-400 mt-1 block">
              {SPONSORSHIP_METRICS.brandRecallLabel}
            </span>
          </div>
        </div>

        {/* Feature Split: Visual Showcase of Brand Activation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20 bg-neutral-900/50 border border-neutral-800 p-6 sm:p-10 rounded-3xl">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 aspect-[16/9] shadow-2xl">
            <img
              src={CARNIVAL_IMAGES.patrocinio}
              alt="Pavilhão de ativação e rooftop de marca patrocinadora no Circuito Folia com multidão"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-[11px] font-bold text-amber-400 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-neutral-800 uppercase tracking-wider">
                Case de Sucesso & Ativação Imersiva
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-neutral-950/90 backdrop-blur-md rounded-xl border border-neutral-800 text-xs text-neutral-300">
              <strong className="text-white block font-semibold">Exposição 360° em Mezanino e Avenida</strong>
              Rooftops corporativos, lounges com ar-condicionado e ativações experimentais de alta conversão.
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
                Por Que Investir no Circuito Folia?
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Muito Além de um Banner: Experiência Real e Afeto de Marca
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mt-3">
                No carnaval, as pessoas estão desarmadas, felizes e receptivas a novas marcas e produtos. Nossos formatos de patrocínio combinam impacto de massa com hospitalidade corporativa VIP de altíssimo nível.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Garantia de Exclusividade de Segmento</strong>
                  Proteção contratual contra marcas concorrentes no circuito oficial da avenida.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Relacionamento B2B Premium</strong>
                  Credenciais VIP para o Camarote Oficial Palco Musical para levar clientes-chave, diretores e parceiros comerciais.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Relatório Pós-Evento com Auditoria de Mídia</strong>
                  Métricas certificadas de audiência, fotos profissionais em alta resolução e clippings de imprensa.
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenDeckModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
              >
                <Presentation className="w-4 h-4 text-neutral-950" />
                <span>Abrir Apresentação em Slides</span>
              </button>
              <button
                onClick={() => onOpenLeadModalWithTier('Cota Master · Naming Rights')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-700 hover:border-amber-400 rounded-xl transition-colors cursor-pointer"
              >
                <span>Solicitar Proposta Formal</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
              <a
                href={`mailto:${EVENT_INFO.organizerEmail}?subject=Interesse%20em%20Cotas%20de%20Patrocínio%20Carnaval%202026`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"
              >
                <span>Diretoria</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sponsorship Tiers Grid */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
              Cotas Comerciais Oficiais
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Escolha a Cota Ideal para os Objetivos da sua Marca
            </h3>
            <p className="text-neutral-400 text-sm mt-1">
              Pacotes modulares com cotas limitadas para preservar a qualidade de exposição de cada parceiro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPONSORSHIP_TIERS.map((tier) => {
              const isSelected = selectedTierId === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`relative bg-neutral-900 border rounded-3xl p-6 flex flex-col justify-between transition-all cursor-pointer ${
                    tier.highlighted
                      ? 'border-amber-400 ring-1 ring-amber-400/40 shadow-xl shadow-amber-500/10'
                      : isSelected
                      ? 'border-neutral-500 ring-1 ring-neutral-500/30'
                      : 'border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-amber-400 text-neutral-950 px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <Crown className="w-3 h-3 text-neutral-950" /> Cota Principal
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                      <span className="text-amber-400 font-semibold">{tier.quotaCount}</span>
                      <span className="text-neutral-500">{tier.badge}</span>
                    </div>

                    <h4 className="text-lg font-bold text-white font-display mb-2">
                      {tier.name}
                    </h4>

                    <p className="text-xs text-neutral-400 leading-relaxed mb-5 min-h-[48px]">
                      {tier.description}
                    </p>

                    <div className="space-y-2 mb-6 p-3 bg-neutral-950 rounded-xl border border-neutral-800/80 text-xs">
                      <div className="flex justify-between text-neutral-300">
                        <span className="text-neutral-400">Credenciais VIP:</span>
                        <strong className="text-white font-mono">{tier.vipPasses} convites</strong>
                      </div>
                      <div className="flex justify-between text-neutral-300">
                        <span className="text-neutral-400">Ativação Física:</span>
                        <strong className="text-white font-semibold">{tier.activationSpace}</strong>
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-xs text-neutral-300 mb-6">
                      {tier.deliverables.slice(0, 4).map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{d}</span>
                        </li>
                      ))}
                      {tier.deliverables.length > 4 && (
                        <li className="text-[11px] text-neutral-400 font-medium pl-5">
                          + {tier.deliverables.length - 4} outros entregáveis exclusivos
                        </li>
                      )}
                    </ul>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLeadModalWithTier(tier.name);
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tier.highlighted
                        ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                    }`}
                  >
                    Receber Proposta Desta Cota
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive ROI & Impact Simulator for Marketing Directors */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 sm:p-10 mb-16 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-neutral-800">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" /> Simulador de Retorno de Ativação
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Estime o Impacto Direto para o seu Segmento
              </h3>
            </div>

            {/* Segment Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'bebidas', label: 'Bebidas & Cervejas' },
                { id: 'telecom', label: 'Telecom & Tech' },
                { id: 'fintech', label: 'Bancos & Meios de Pagamento' },
                { id: 'beleza', label: 'Beleza & Cosméticos' },
              ].map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedIndustry === ind.id
                      ? 'bg-amber-400 text-neutral-950 font-bold'
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {ind.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800/80">
              <span className="text-xs text-neutral-400 block mb-1">Capacidade de Experimentação:</span>
              <span className="text-lg font-bold text-white block mb-1">{industryData.sampling}</span>
              <span className="text-xs text-neutral-500">Contato direto e sensorial com o produto no circuito</span>
            </div>

            <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800/80">
              <span className="text-xs text-neutral-400 block mb-1">Engajamento Estimado:</span>
              <span className="text-lg font-bold text-amber-400 block mb-1">{industryData.engagement}</span>
              <span className="text-xs text-neutral-500">Adesão espontânea gerada durante os momentos de euforia</span>
            </div>

            <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800/80 flex flex-col justify-between">
              <div>
                <span className="text-xs text-neutral-400 block mb-1">Cota Recomendada:</span>
                <span className="text-base font-bold text-emerald-400 block">Cota Master ou Ouro</span>
              </div>
              <button
                onClick={() => onOpenLeadModalWithTier(`Simulação Segmento: ${selectedIndustry.toUpperCase()}`)}
                className="mt-3 text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Solicitar Estudo de Viabilidade Customizado</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Activation Formats Showcase */}
        <div>
          <div className="text-center mb-8">
            <h4 className="text-xl font-bold text-white font-display">
              Formatos de Ativação Disponíveis no Circuito
            </h4>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">
              Como a sua marca pode se destacar ao longo dos 3,4 km do circuito carnavalesco.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ACTIVATION_EXAMPLES.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-amber-400 font-mono mb-2">
                    {item.metric}
                  </div>
                  <h5 className="text-sm font-bold text-white mb-2 font-display">
                    {item.title}
                  </h5>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-neutral-800/80 text-[11px] text-neutral-500">
                  Totalmente customizável pelo patrocinador
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
