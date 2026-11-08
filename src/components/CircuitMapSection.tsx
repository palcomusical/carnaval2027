import React, { useState } from 'react';
import { 
  MapPin, 
  HeartPulse, 
  Droplets, 
  Crown, 
  UtensilsCrossed, 
  ShieldCheck, 
  Accessibility, 
  Bath, 
  Flag,
  Navigation,
  Info
} from 'lucide-react';
import { MAP_POINTS } from '../data/carnivalData';
import { MapPoint } from '../types';

interface CircuitMapSectionProps {
  onOpenLeadModal: () => void;
}

export const CircuitMapSection: React.FC<CircuitMapSectionProps> = ({ onOpenLeadModal }) => {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint>(MAP_POINTS[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');

  const filteredPoints = categoryFilter === 'todos'
    ? MAP_POINTS
    : MAP_POINTS.filter((p) => p.category === categoryFilter);

  const getPointIcon = (category: string) => {
    switch (category) {
      case 'posto-medico':
        return <HeartPulse className="w-4 h-4 text-rose-400" />;
      case 'hidratacao':
        return <Droplets className="w-4 h-4 text-cyan-400" />;
      case 'camarote':
        return <Crown className="w-4 h-4 text-amber-400" />;
      case 'alimentacao':
        return <UtensilsCrossed className="w-4 h-4 text-orange-400" />;
      case 'seguranca':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'acessibilidade':
        return <Accessibility className="w-4 h-4 text-indigo-400" />;
      case 'banheiros':
        return <Bath className="w-4 h-4 text-blue-400" />;
      default:
        return <Flag className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getPointColor = (category: string) => {
    switch (category) {
      case 'posto-medico':
        return 'bg-rose-500/20 border-rose-500 text-rose-400';
      case 'hidratacao':
        return 'bg-cyan-500/20 border-cyan-500 text-cyan-400';
      case 'camarote':
        return 'bg-amber-500/20 border-amber-400 text-amber-400';
      case 'alimentacao':
        return 'bg-orange-500/20 border-orange-500 text-orange-400';
      case 'seguranca':
        return 'bg-emerald-500/20 border-emerald-500 text-emerald-400';
      case 'acessibilidade':
        return 'bg-indigo-500/20 border-indigo-500 text-indigo-400';
      case 'banheiros':
        return 'bg-blue-500/20 border-blue-500 text-blue-400';
      default:
        return 'bg-yellow-500/20 border-yellow-400 text-yellow-400';
    }
  };

  return (
    <section id="circuito" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
              Itinerário & Serviços · Extensão de 3,4 km
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Mapa Interativo do Circuito
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Localize pontos de hidratação gratuitos, postos médicos com UTI móvel, sanitários higienizados, camarote oficial e rotas de emergência.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLeadModal}
              className="text-xs font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Baixar Mapa Oficial em Alta Resolução
            </button>
          </div>
        </div>

        {/* Filter Pills / Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {[
            { id: 'todos', label: 'Todos os Pontos' },
            { id: 'hidratacao', label: 'Água Grátis' },
            { id: 'posto-medico', label: 'Postos Médicos' },
            { id: 'camarote', label: 'Camarote VIP' },
            { id: 'alimentacao', label: 'Praça de Alimentação' },
            { id: 'seguranca', label: 'Segurança' },
            { id: 'banheiros', label: 'Sanitários' },
            { id: 'acessibilidade', label: 'Acessibilidade PCD' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Map Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Interactive Visual Map Canvas */}
          <div className="lg:col-span-2 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            
            {/* Map Legend Bar */}
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-4 pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">Percurso Oficial: Sentido Praça da Sé → Apoteose</span>
              </div>
              <span className="hidden sm:inline text-neutral-500">Clique nos ícones para inspecionar</span>
            </div>

            {/* Visual SVG Circuit Graphic with Interactive Pins */}
            <div className="relative w-full aspect-[16/9] min-h-[340px] bg-neutral-950/80 rounded-2xl border border-neutral-800/80 p-4 overflow-hidden flex items-center justify-center">
              
              {/* Circuit Street Pattern SVG */}
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-full absolute inset-0 pointer-events-none select-none opacity-85"
              >
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#262626" strokeWidth="0.75" />
                  </pattern>
                </defs>

                <rect width="1000" height="600" fill="url(#grid)" />

                {/* Secondary side streets */}
                <path d="M 120 0 L 120 600" stroke="#1f1f1f" strokeWidth="18" strokeLinecap="round" />
                <path d="M 0 350 L 1000 350" stroke="#1f1f1f" strokeWidth="22" strokeLinecap="round" />
                <path d="M 480 0 L 480 600" stroke="#1f1f1f" strokeWidth="16" strokeLinecap="round" />
                <path d="M 820 0 L 820 600" stroke="#1f1f1f" strokeWidth="16" strokeLinecap="round" />

                {/* Primary Parade Route (Trio Elétrico Avenue) */}
                <path
                  d="M 120 450 C 220 450, 240 330, 360 330 C 480 330, 500 240, 620 240 C 740 240, 780 210, 880 210"
                  fill="none"
                  stroke="#1c1917"
                  strokeWidth="48"
                  strokeLinecap="round"
                />
                
                {/* Glowing Core Route Line */}
                <path
                  d="M 120 450 C 220 450, 240 330, 360 330 C 480 330, 500 240, 620 240 C 740 240, 780 210, 880 210"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="10"
                  strokeDasharray="14 8"
                  strokeLinecap="round"
                />

                {/* Direction Arrows */}
                <text x="140" y="490" fill="#f59e0b" fontSize="14" fontWeight="bold">CONCENTRAÇÃO</text>
                <text x="800" y="180" fill="#10b981" fontSize="14" fontWeight="bold">DISPERSÃO / APOTEOSE</text>
              </svg>

              {/* Interactive Points on Canvas */}
              {filteredPoints.map((point) => {
                const isSelected = selectedPoint.id === point.id;
                return (
                  <button
                    key={point.id}
                    onClick={() => setSelectedPoint(point)}
                    style={{
                      left: `${point.coordinates.x}%`,
                      top: `${point.coordinates.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full border-2 transition-all cursor-pointer shadow-lg z-20 group ${
                      isSelected
                        ? 'scale-125 ring-4 ring-amber-400/30 z-30 ' + getPointColor(point.category)
                        : 'bg-neutral-900 border-neutral-700 hover:scale-110 ' + getPointColor(point.category)
                    }`}
                    title={point.title}
                  >
                    {getPointIcon(point.category)}
                    
                    {/* Tooltip on hover */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-neutral-950 text-white text-[11px] font-semibold px-2 py-1 rounded shadow-md border border-neutral-800 pointer-events-none">
                      {point.title}
                    </span>
                  </button>
                );
              })}

            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-neutral-800 text-center">
              <div className="p-2 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <span className="block text-base font-bold text-white font-mono tabular-nums">3,4 km</span>
                <span className="text-[11px] text-neutral-400">Extensão do Circuito</span>
              </div>
              <div className="p-2 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <span className="block text-base font-bold text-cyan-400 font-mono tabular-nums">8 Pontos</span>
                <span className="text-[11px] text-neutral-400">Hidratação Gratuita</span>
              </div>
              <div className="p-2 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <span className="block text-base font-bold text-rose-400 font-mono tabular-nums">3 Postos</span>
                <span className="text-[11px] text-neutral-400">Ambulatórios Médicos</span>
              </div>
              <div className="p-2 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <span className="block text-base font-bold text-amber-400 font-mono tabular-nums">450+</span>
                <span className="text-[11px] text-neutral-400">Sanitários Químicos</span>
              </div>
            </div>
          </div>

          {/* Point Inspector & Details Card */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                  {selectedPoint.categoryLabel}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-3">
                {selectedPoint.title}
              </h3>

              <div className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-950 p-3 rounded-xl border border-neutral-800 mb-4">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-400 block text-[11px]">Localização exata:</span>
                  <span className="font-semibold text-white">{selectedPoint.location}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm text-neutral-300 leading-relaxed mb-6">
                <p>{selectedPoint.description}</p>
                <div className="p-3 bg-amber-400/10 border border-amber-400/20 rounded-xl text-xs text-amber-300 flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                  <span>
                    Todos os serviços contam com sinalização aérea visível a 50 metros de distância e iluminação noturna reforçada.
                  </span>
                </div>
              </div>
            </div>

            {/* Inspector CTA */}
            <div className="pt-4 border-t border-neutral-800 space-y-2">
              {selectedPoint.category === 'camarote' ? (
                <button
                  onClick={onOpenLeadModal}
                  className="w-full py-3 px-4 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer text-center block"
                >
                  Garantir Ingresso do Camarote
                </button>
              ) : (
                <button
                  onClick={onOpenLeadModal}
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer text-center block"
                >
                  Receber Rota no WhatsApp
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
