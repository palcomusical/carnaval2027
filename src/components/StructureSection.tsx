import React from 'react';
import { ShieldCheck, Droplets, HeartPulse, Recycle, HeartHandshake, Accessibility, CheckCircle2 } from 'lucide-react';

export const StructureSection: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Segurança Integrada & Monitoramento 360°',
      description: 'Pórticos com detectores de metal em todas as entradas, central de câmeras em tempo real integrada à Polícia Militar e 600 agentes particulares treinados em acolhimento e mediação.',
      highlights: ['Pórticos de Acesso Seguro', 'Drones de Vigilância Aérea', 'Canal Direto de Emergência'],
    },
    {
      icon: <Droplets className="w-6 h-6 text-cyan-400" />,
      title: 'Hidratação Gratuita & Conforto Térmico',
      description: '8 estações com distribuição ilimitada de água potável gelada para reabastecer garrafas reutilizáveis, além de caminhões-pipa com jatos nebulizadores nos horários mais quentes.',
      highlights: ['Água Potável 100% Gratuita', 'Torres de Nebulização de Água', 'Áreas Sombreadas'],
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-rose-400" />,
      title: 'Atendimento Médico & UTIs Móveis',
      description: '3 postos médicos completos ao longo do percurso com 16 leitos de estabilização, desfibriladores, médicos socorristas e 4 ambulâncias UTI com faixa de escape exclusiva.',
      highlights: ['Médicos Emergencistas', 'Triagem de Insolação', 'Ambulâncias com Corredor Livre'],
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-amber-400" />,
      title: 'Protocolo "Não é Não" & Acolhimento',
      description: 'Tenda exclusiva de proteção à mulher com psicólogas, assistentes sociais e advogadas de plantão, além de brigadistas identificadas circulando pela multidão.',
      highlights: ['Apoio Psicológico Imediato', 'Encaminhamento com Delegacia da Mulher', 'Brigada Violeta Ativa'],
    },
    {
      icon: <Accessibility className="w-6 h-6 text-indigo-400" />,
      title: 'Acessibilidade PCD Completa',
      description: 'Plataforma elevada com visão ampla dos trios elétricos reservada para foliões com deficiência e seus acompanhantes, rampas suaves e sanitários químicos adaptados.',
      highlights: ['Deck Elevado Acessível', 'Sanitários PCD Higienizados', 'Intérpretes de Libras nos Trios'],
    },
    {
      icon: <Recycle className="w-6 h-6 text-emerald-300" />,
      title: 'Eco-Folia: Limpeza & Sustentabilidade',
      description: 'Coleta seletiva imediata em parceria com 80 catadores de materiais recicláveis remunerados com dignidade, copos oficiais reutilizáveis e neutralização de carbono.',
      highlights: ['Reciclagem em Tempo Real', 'Remuneração Justa de Catadores', 'Zero Garrafas de Vidro'],
    },
  ];

  return (
    <section id="estrutura" className="py-20 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
            Infraestrutura de Primeiro Mundo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-4">
            Estrutura Completa para a Sua Segurança e Conforto
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Um evento pensado nos mínimos detalhes pela equipe da Palco Musical para proporcionar a máxima celebração com paz, respeito e assistência imediata.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700/80 p-6 rounded-2xl flex flex-col justify-between transition-all hover:bg-neutral-900"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-5">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 space-y-2">
                {pillar.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
