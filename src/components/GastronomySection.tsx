import React from 'react';
import { Utensils, CreditCard, Sparkles, Coffee, Beer, Zap, ArrowRight } from 'lucide-react';
import { CARNIVAL_IMAGES } from '../data/carnivalData';

interface GastronomySectionProps {
  onOpenLeadModal: () => void;
}

export const GastronomySection: React.FC<GastronomySectionProps> = ({ onOpenLeadModal }) => {
  const options = [
    {
      category: 'Sabores Regionais',
      icon: <Utensils className="w-5 h-5 text-amber-400" />,
      items: ['Acarajé e Vatapá Baiano tradicional', 'Pastéis crocantes recheados na hora', 'Tapiocas salgadas e doces'],
    },
    {
      category: 'Comida de Rua & BBQ',
      icon: <Coffee className="w-5 h-5 text-amber-400" />,
      items: ['Espetinhos nobres grelhados na brasa', 'Smash burgers artesanais com fritas', 'Hot dogs gourmet prensados'],
    },
    {
      category: 'Bares & Hidratação',
      icon: <Beer className="w-5 h-5 text-amber-400" />,
      items: ['Cervejas e chopes puro malte ultra gelados', 'Drinks refrescantes com gin e frutas tropicais', 'Água de coco natural e sucos energéticos'],
    },
  ];

  return (
    <section id="gastronomia" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Split: Visual & Context */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Visual Canvas */}
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group">
            <img
              src={CARNIVAL_IMAGES.gastronomia}
              alt="Vila Gastronômica iluminada do Circuito Folia com amigos curtindo lanches e bebidas"
              referrerPolicy="no-referrer"
              className="w-full h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800">
              <span className="text-xs uppercase font-semibold text-amber-400 block mb-1">
                Ambiente Aconchegante e Iluminado
              </span>
              <p className="text-xs sm:text-sm text-neutral-300">
                Mesas com sombreamento, lounges de descanso, banheiros exclusivos do setor e pontos de recarga de celular.
              </p>
            </div>
          </div>

          {/* Copy & Cashless System Highlight */}
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
                Gastronomia & Convivência
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                Vila Gastronômica & Sistema Cashless Sem Filas
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                Mais de 25 operações selecionadas com rígido padrão de higiene e segurança alimentar. Nada de dinheiro de papel: todas as compras são feitas com cartão de aproximação, Pix ou o cartão oficial do evento.
              </p>
            </div>

            {/* Cashless Feature Box */}
            <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Tecnologia 100% Cashless</h4>
                  <p className="text-xs text-neutral-400">Recarregue online antes de sair de casa e ganhe cashback em bebidas</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-neutral-300">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Pagamento por aproximação</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Sem filas no caixa</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Reembolso online pós-evento</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Pix aceito em todos os pontos</span>
                </div>
              </div>
            </div>

            {/* Vendor CTA */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={onOpenLeadModal}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Inscrever meu Food Truck</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </button>
              <span className="text-xs text-neutral-400">
                Últimas 5 vagas para o setor de alimentação
              </span>
            </div>
          </div>

        </div>

        {/* Food Categories 3-Col Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/70 border border-neutral-800 p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                  {opt.icon}
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  {opt.category}
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
                {opt.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
