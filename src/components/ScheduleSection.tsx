import React, { useState } from 'react';
import { Clock, MapPin, Users, Heart, Sparkles, Filter, ChevronRight, Check } from 'lucide-react';
import { BLOCOS_LIST } from '../data/carnivalData';
import { Bloco, DayOption, GenreOption } from '../types';

interface ScheduleSectionProps {
  onSelectMapPoint?: (pointId: string) => void;
  onOpenLeadModal: () => void;
  blocos?: Bloco[];
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ 
  onSelectMapPoint, 
  onOpenLeadModal,
  blocos = BLOCOS_LIST 
}) => {
  const [selectedDay, setSelectedDay] = useState<DayOption>('todos');
  const [selectedGenre, setSelectedGenre] = useState<GenreOption>('todos');
  const [savedBlocoIds, setSavedBlocoIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('folia_saved_blocos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleSaveBloco = (id: string) => {
    const next = savedBlocoIds.includes(id)
      ? savedBlocoIds.filter((item) => item !== id)
      : [...savedBlocoIds, id];
    setSavedBlocoIds(next);
    try {
      localStorage.setItem('folia_saved_blocos', JSON.stringify(next));
    } catch {
      // storage error fallback
    }
  };

  const filteredBlocos = blocos.filter((bloco) => {
    const matchDay = selectedDay === 'todos' || bloco.day === selectedDay;
    const matchGenre = selectedGenre === 'todos' || bloco.genre === selectedGenre;
    return matchDay && matchGenre;
  });

  return (
    <section id="programacao" className="py-20 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
              Lineup Oficial · Carnaval de Rua 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Programação dos Blocos e Trios
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              12 blocos com as maiores bandas, baterias e trios elétricos do país. Monte sua agenda personalizada para não perder nenhum minuto de folia.
            </p>
          </div>

          {/* User Saved Counter Badge */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400">
              {savedBlocoIds.length > 0 ? (
                <span className="text-amber-400 font-medium">
                  {savedBlocoIds.length} bloco{savedBlocoIds.length > 1 ? 's' : ''} na sua agenda
                </span>
              ) : (
                'Nenhum bloco salvo ainda'
              )}
            </span>
            <button
              onClick={onOpenLeadModal}
              className="text-xs font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Receber Horários no WhatsApp
            </button>
          </div>
        </div>

        {/* Filters Bar: Day Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {[
            { id: 'todos', label: 'Todos os Dias' },
            { id: 'sab', label: 'Sábado (14/02)' },
            { id: 'dom', label: 'Domingo (15/02)' },
            { id: 'seg', label: 'Segunda (16/02)' },
            { id: 'ter', label: 'Terça (17/02)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedDay(item.id as DayOption)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedDay === item.id
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Genre Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs border-b border-neutral-800/80">
          <span className="text-neutral-500 flex items-center gap-1 shrink-0 font-medium mr-1">
            <Filter className="w-3.5 h-3.5" /> Ritmo:
          </span>
          {[
            { id: 'todos', label: 'Todos os Ritmos' },
            { id: 'axe', label: 'Axé & Salvador' },
            { id: 'samba', label: 'Samba & Pagode' },
            { id: 'frevo', label: 'Frevo & Marchinhas' },
            { id: 'funk', label: 'Funk & Pop' },
            { id: 'fanfarra', label: 'Fanfarra' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedGenre(item.id as GenreOption)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedGenre === item.id
                  ? 'bg-neutral-100 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Blocos Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlocos.map((bloco: Bloco) => {
            const isSaved = savedBlocoIds.includes(bloco.id);
            return (
              <div
                key={bloco.id}
                className="bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group hover:shadow-xl"
              >
                {/* Bloco Image Card Header */}
                <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                  <img
                    src={bloco.image}
                    alt={bloco.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                  
                  {/* Top Bar inside card */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-neutral-800">
                      {bloco.dayLabel}
                    </span>
                    <button
                      onClick={() => toggleSaveBloco(bloco.id)}
                      title={isSaved ? 'Remover da minha agenda' : 'Salvar na minha agenda'}
                      className={`p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                        isSaved
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : 'bg-neutral-950/70 text-neutral-400 hover:text-white border border-neutral-800'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-400' : ''}`} />
                    </button>
                  </div>

                  {/* Genre Tag inside image bottom */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-medium text-neutral-300">
                      {bloco.genreLabel}
                    </span>
                  </div>
                </div>

                {/* Bloco Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display mb-1 group-hover:text-amber-400 transition-colors">
                      {bloco.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-400/90 mb-3">
                      Com {bloco.artist}
                    </p>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-4">
                      {bloco.description}
                    </p>

                    {/* Schedule times & Route */}
                    <div className="space-y-2 text-xs text-neutral-300 mb-4 bg-neutral-950/50 p-3 rounded-xl border border-neutral-800/80">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Concentração: <strong className="text-white font-mono">{bloco.timeConcentracao}</strong> · Saída: <strong className="text-white font-mono">{bloco.timeSaida}</strong></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{bloco.percurso}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span className="text-neutral-400">Público esperado: {bloco.expectedCrowd}</span>
                      </div>
                    </div>

                    {/* Bloco Highlights */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {bloco.highlights.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] text-neutral-400 bg-neutral-800/60 px-2 py-0.5 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleSaveBloco(bloco.id)}
                      className={`text-xs font-medium py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-neutral-800 text-emerald-400'
                          : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Salvo na Agenda</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-3.5 h-3.5" />
                          <span>Adicionar à Agenda</span>
                        </>
                      )}
                    </button>

                    <a
                      href="#circuito"
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
                    >
                      <span>Ver no Mapa</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty filter state */}
        {filteredBlocos.length === 0 && (
          <div className="text-center py-12 bg-neutral-900 border border-neutral-800 rounded-2xl">
            <p className="text-neutral-400 text-sm">
              Nenhum bloco encontrado para os filtros selecionados.
            </p>
            <button
              onClick={() => { setSelectedDay('todos'); setSelectedGenre('todos'); }}
              className="mt-3 text-xs font-bold text-amber-400 hover:underline"
            >
              Limpar filtros de busca
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
