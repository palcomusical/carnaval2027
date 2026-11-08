import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Download, 
  Calendar, 
  Users, 
  TrendingUp, 
  Crown, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Building2, 
  Mail, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { 
  CARNIVAL_IMAGES, 
  SPONSORSHIP_METRICS, 
  SPONSORSHIP_TIERS, 
  EVENT_INFO 
} from '../data/carnivalData';
import { Lead } from '../types';

interface CommercialPitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCaptured: (lead: Lead) => void;
}

export const CommercialPitchDeckModal: React.FC<CommercialPitchDeckModalProps> = ({
  isOpen,
  onClose,
  onLeadCaptured,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [selectedCota, setSelectedCota] = useState('Cota Master (Naming Rights)');
  const [proposalSent, setProposalSent] = useState(false);

  const totalSlides = 8;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadCompany || !leadEmail || !leadPhone) return;

    const lead: Lead = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      category: 'patrocinador',
      name: leadName,
      companyOrRole: leadCompany,
      email: leadEmail,
      phone: leadPhone,
      interestDetails: `Book Comercial Slide Deck: ${selectedCota}`,
      createdAt: new Date().toISOString(),
    };

    onLeadCaptured(lead);
    setProposalSent(true);
  };

  const renderSlideContent = () => {
    switch (currentSlide) {
      // SLIDE 1: Capa & Abertura
      case 0:
        return (
          <div className="relative h-full flex flex-col justify-between p-6 sm:p-12 text-white overflow-hidden rounded-2xl bg-neutral-950">
            <div className="absolute inset-0 z-0">
              <img
                src={CARNIVAL_IMAGES.patrocinio}
                alt="Circuito Folia Brasil Ativação"
                className="w-full h-full object-cover brightness-[0.4] filter"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-neutral-950/80 px-3 py-1.5 rounded-lg border border-neutral-800">
                Book Comercial Oficial · Edição 2026
              </span>
              <span className="text-xs text-neutral-400">
                Realização: <strong className="text-white">{EVENT_INFO.organizer}</strong>
              </span>
            </div>

            <div className="relative z-10 max-w-2xl my-auto py-8">
              <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4" />
                <span>O Maior Ponto de Encontro da Cultura & Marcas</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-tight mb-4">
                Circuito Folia Brasil 2026
              </h1>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal mb-6">
                Apresentação Comercial, Cotas de Patrocínio, Métricas de Audiência e Formatos de Ativação Experiencial para Grandes Marcas.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-300">
                <span className="bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-lg">
                  📅 13 a 17 de Fevereiro de 2026
                </span>
                <span className="bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-lg">
                  📍 Circuito Oficial · Centro Histórico
                </span>
                <span className="bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-lg text-emerald-400">
                  👥 720.000+ Foliões Confirmados
                </span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-neutral-800/80 text-xs text-neutral-400">
              <span>Palco Musical Entretenimento · Depto Comercial</span>
              <span className="hidden sm:inline">Use as setas do teclado ou os botões para avançar</span>
            </div>
          </div>
        );

      // SLIDE 2: Oportunidade e Cenário de Mercado
      case 1:
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 text-white bg-neutral-950 rounded-2xl overflow-y-auto">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Slide 02 · Cenário & Comportamento do Consumidor
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display mb-3">
                Por Que o Carnaval de Rua é o Melhor Investimento de Marketing?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl leading-relaxed mb-6">
                O Carnaval é a única celebração no calendário brasileiro onde o consumidor está em seu estado de maior abertura emocional, receptivo à experimentação sensorial e gerando conteúdo espontâneo sem parar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-auto">
              <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Conexão Emocional Profunda</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Marcas que participam ativamente da festa não são vistas como invasoras, mas como facilitadoras da alegria. O índice de simpatia de marca cresce até 64% pós-evento.
                </p>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Geração Espontânea de UGC</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Centenas de milhares de fotos, stories e vídeos são gravados em frente a ativações bem cenografadas. Sua marca vira cenário natural da celebração social do público.
                </p>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Experimentação de Massa</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Oportunidade única para degustação e sampling físico (bebidas, snacks, cosméticos, protetor solar, apps) com conversão de prova imediata no calor da multidão.
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl text-xs text-neutral-400 flex items-center justify-between">
              <span>Fonte: Pesquisas de Mercado & Levantamentos Históricos de Ativação no Carnaval de Rua</span>
              <span className="text-amber-400 font-semibold">Circuito Folia 2026</span>
            </div>
          </div>
        );

      // SLIDE 3: O Evento em Números
      case 2:
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 text-white bg-neutral-950 rounded-2xl overflow-y-auto">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Slide 03 · Magnitude & Escala
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display mb-2">
                A Grandeza do Circuito Folia Brasil 2026
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl leading-relaxed mb-6">
                Um megafestival a céu aberto com produção executiva de padrão internacional pela Palco Musical Entretenimento.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-auto">
              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl text-center">
                <span className="block text-3xl sm:text-4xl font-black text-white font-mono tabular-nums mb-1">
                  720.000+
                </span>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">Público Total</span>
                <span className="text-[11px] text-neutral-400">180k foliões em média por dia</span>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl text-center">
                <span className="block text-3xl sm:text-4xl font-black text-amber-400 font-mono tabular-nums mb-1">
                  3,4 km
                </span>
                <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-1">Extensão do Percurso</span>
                <span className="text-[11px] text-neutral-400">Avenidas centrais com visibilidade total</span>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl text-center">
                <span className="block text-3xl sm:text-4xl font-black text-emerald-400 font-mono tabular-nums mb-1">
                  12 Blocos
                </span>
                <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-1">Atrações Principais</span>
                <span className="text-[11px] text-neutral-400">Axé, Samba, Frevo e Pop Urbano</span>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl text-center">
                <span className="block text-3xl sm:text-4xl font-black text-cyan-400 font-mono tabular-nums mb-1">
                  3 Trios
                </span>
                <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-1">Potência Máxima</span>
                <span className="text-[11px] text-neutral-400">100.000 Watts de som por trio</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs text-neutral-300">
              <div className="bg-neutral-900/50 border border-neutral-800/80 p-3 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>600 Agentes de Segurança Privada + PM</span>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800/80 p-3 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>8 Estações Gratuitas de Hidratação</span>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800/80 p-3 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Camarote Oficial Palco Musical Integrado</span>
              </div>
            </div>
          </div>
        );

      // SLIDE 4: Perfil Demográfico do Público
      case 3:
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 text-white bg-neutral-950 rounded-2xl overflow-y-auto">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Slide 04 · Demografia & Audiência
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display mb-2">
                Quem é o Folião do Circuito?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl leading-relaxed mb-6">
                Perfil de alto poder de consumo, digitalmente ativo e concentrado na faixa economicamente produtiva.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-2">Faixa Etária</span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-300">21 a 34 anos:</span>
                    <strong className="text-white font-mono text-sm">48%</strong>
                  </div>
                  <div className="w-full bg-neutral-950 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-400 h-full w-[48%]" />
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-neutral-300">35 a 45 anos:</span>
                    <strong className="text-white font-mono text-sm">26%</strong>
                  </div>
                  <div className="w-full bg-neutral-950 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-300 h-full w-[26%]" />
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-neutral-300">Outras faixas:</span>
                    <strong className="text-white font-mono text-sm">26%</strong>
                  </div>
                  <div className="w-full bg-neutral-950 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-neutral-700 h-full w-[26%]" />
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-2">Poder de Consumo</span>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="block text-2xl font-black text-white font-mono tabular-nums">R$ 185,00</span>
                    <span className="text-neutral-400 text-[11px]">Gasto médio estimado por dia / pessoa</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 text-neutral-300">
                    <strong className="text-white block font-semibold mb-1">74% Classes A, B e C1</strong>
                    Público bancarizado com uso maciço de cartões de aproximação e Pix no evento.
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                <span className="text-xs text-purple-400 font-bold uppercase tracking-wider block mb-2">Comportamento Digital</span>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="block text-2xl font-black text-purple-400 font-mono tabular-nums">14,8 M</span>
                    <span className="text-neutral-400 text-[11px]">Impressões digitais multiplataforma</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 text-neutral-300">
                    <strong className="text-white block font-semibold mb-1">6,5 Horas de Exposição</strong>
                    Permanência média no circuito por folião durante cada dia de evento.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-xs text-neutral-400 flex items-center justify-between">
              <span>Distribuição de Gênero: 53% Feminino · 47% Masculino</span>
              <span className="text-emerald-400 font-semibold">Alta Receptividade de Marca</span>
            </div>
          </div>
        );

      // SLIDE 5: Pontos de Ativação no Mapa do Circuito
      case 4:
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 text-white bg-neutral-950 rounded-2xl overflow-y-auto">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Slide 05 · Mapeamento de Oportunidades
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display mb-2">
                Onde a Sua Marca Irá Brilhar no Circuito?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl leading-relaxed mb-6">
                Mapeamento dos pontos de altíssimo fluxo e permanência onde as cotas oficiais operam.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-auto">
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                    <Crown className="w-4 h-4" />
                    <span>01. Trio Elétrico Principal (Móvel)</span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">
                    A maior peça de comunicação em movimento. Envelopamento 100% dos painéis laterais e traseiro, com telões de LED transmitindo anúncios da marca ao longo de 3,4 km.
                  </p>
                </div>

                <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                    <Building2 className="w-4 h-4" />
                    <span>02. Rooftops & Estandes Experienciais</span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">
                    Espaços de 40m² a 80m² posicionados na altura dos olhos do público na avenida com ativações imersivas, ar-condicionado, photo-opportunity e experimentação.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>03. Pórticos Monumentais de Entrada</span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">
                    Primeiro e último ponto de contato: 100% dos mais de 720.000 foliões obrigatoriamente passam pelos pórticos da marca nas entradas oficiais do circuito.
                  </p>
                </div>

                <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>04. Camarote Oficial Palco Musical</span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">
                    Área VIP de hospitalidade para relacionamento comercial direto com influenciadores, parceiros, diretores e convidados da sua empresa com open bar e buffet.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl text-xs text-neutral-400 flex items-center justify-between">
              <span>Plantas baixas e cotas técnicas de engenharia fornecidas pela produção executiva</span>
              <span className="text-amber-400 font-semibold">100% em Conformidade com Normas</span>
            </div>
          </div>
        );

      // SLIDE 6: Formatos de Ativação em Imagens
      case 5:
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 text-white bg-neutral-950 rounded-2xl overflow-y-auto">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Slide 06 · Entregáveis Experienciais
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display mb-2">
                Formatos de Ativação de Marca
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl leading-relaxed mb-6">
                Como os patrocinadores se conectam aos foliões em momentos reais de alegria.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-auto">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                <div className="h-32 bg-neutral-950 relative overflow-hidden">
                  <img
                    src={CARNIVAL_IMAGES.trio}
                    alt="Trio Elétrico"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Trio Envelopado</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed mb-2">
                      Sua marca guia a multidão com som estrondoso e os maiores cantores do país.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">Máximo Alcance Visual</span>
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                <div className="h-32 bg-neutral-950 relative overflow-hidden">
                  <img
                    src={CARNIVAL_IMAGES.patrocinio}
                    alt="Rooftop de Marca"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Rooftop Experiencial</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed mb-2">
                      Lounge elevado exclusivo para a marca receber convidados e influenciadores.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">Hospitality de Luxo</span>
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                <div className="h-32 bg-neutral-950 relative overflow-hidden">
                  <img
                    src={CARNIVAL_IMAGES.gastronomia}
                    alt="Copos e Bares"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Copos Colecionáveis</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed mb-2">
                      Mais de 100 mil copos reutilizáveis que viram souvenir na casa dos foliões.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">Recall Prolongado</span>
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                <div className="h-32 bg-neutral-950 relative overflow-hidden">
                  <img
                    src={CARNIVAL_IMAGES.bateria}
                    alt="Sampling e Alegria"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Sampling Volante</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed mb-2">
                      Equipes caracterizadas distribuindo brindes, amostras e promovendo a marca.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 font-bold">Contato Direto</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl text-xs text-neutral-400 flex items-center justify-between">
              <span>Projetos 3D e renderizações detalhadas elaboradas sob medida para a sua equipe de marketing</span>
              <span className="text-amber-400 font-semibold">Customização Completa</span>
            </div>
          </div>
        );

      // SLIDE 7: Comparativo de Cotas de Patrocínio
      case 6:
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 text-white bg-neutral-950 rounded-2xl overflow-y-auto">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Slide 07 · Grade Comercial Oficial
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display mb-2">
                Tabela de Cotas & Entregáveis
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl leading-relaxed mb-4">
                Visão comparativa das cotas disponíveis. Todas incluem proteção contratual contra concorrência direta no circuito.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-auto">
              {SPONSORSHIP_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`bg-neutral-900 border rounded-2xl p-4 flex flex-col justify-between text-xs ${
                    tier.highlighted
                      ? 'border-amber-400 ring-1 ring-amber-400/40'
                      : 'border-neutral-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-amber-400 font-bold">{tier.quotaCount}</span>
                      <span className="text-neutral-500">{tier.badge}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2 font-display">
                      {tier.name}
                    </h4>

                    <div className="space-y-1 mb-3 text-[11px] text-neutral-400 bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                      <div>VIP: <strong className="text-white font-mono">{tier.vipPasses} passes</strong></div>
                      <div>Ativação: <strong className="text-white">{tier.activationSpace}</strong></div>
                    </div>

                    <ul className="space-y-1.5 text-[11px] text-neutral-300">
                      {tier.deliverables.slice(0, 4).map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCota(tier.name);
                      setCurrentSlide(7);
                    }}
                    className={`mt-4 w-full py-2 px-2 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
                      tier.highlighted
                        ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300'
                        : 'bg-neutral-800 text-white hover:bg-neutral-700'
                    }`}
                  >
                    Selecionar Esta Cota
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl text-xs text-neutral-400 flex items-center justify-between">
              <span>* Valores sob consulta confidencial com o departamento comercial da Palco Musical</span>
              <button
                onClick={() => setCurrentSlide(7)}
                className="text-amber-400 hover:text-amber-300 font-bold underline"
              >
                Avançar para Proposta Comercial →
              </button>
            </div>
          </div>
        );

      // SLIDE 8: Fechamento & Solicitação de Proposta
      case 7:
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 text-white bg-neutral-950 rounded-2xl overflow-y-auto">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Slide 08 · Próximos Passos
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display mb-2">
                Garanta a Presença da sua Marca em 2026
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl leading-relaxed mb-6">
                As cotas oficiais possuem limite rígido de exclusividade por categoria. Envie os dados abaixo para receber a minuta comercial e agendar reunião com a diretoria.
              </p>
            </div>

            {proposalSent ? (
              <div className="my-auto text-center py-8 bg-neutral-900/80 border border-neutral-800 rounded-3xl p-8 max-w-xl mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Proposta Solicitada com Sucesso!
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Obrigado, <strong className="text-white">{leadName}</strong>! Os detalhes completos da <strong>{selectedCota}</strong> foram encaminhados para a gerência da <strong>{leadCompany}</strong> no e-mail <span className="text-amber-400">{leadEmail}</span>.
                </p>
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-neutral-400">
                  Nosso diretor de contas entrará em contato em menos de 2 horas úteis via WhatsApp ({leadPhone}).
                </div>
                <button
                  onClick={() => setProposalSent(false)}
                  className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-white rounded-xl transition-colors cursor-pointer"
                >
                  Fazer Outra Solicitação
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto">
                <form onSubmit={handleProposalSubmit} className="space-y-3 bg-neutral-900/90 border border-neutral-800 p-6 rounded-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="Ex: Carlos Eduardo"
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                        Empresa / Marca *
                      </label>
                      <input
                        type="text"
                        value={leadCompany}
                        onChange={(e) => setLeadCompany(e.target.value)}
                        placeholder="Ex: Cerveja Brasil S/A"
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                        E-mail Corporativo *
                      </label>
                      <input
                        type="email"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="carlos@empresa.com.br"
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                        WhatsApp com DDD *
                      </label>
                      <input
                        type="tel"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="(11) 98765-4321"
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                      Cota de Interesse Principal
                    </label>
                    <select
                      value={selectedCota}
                      onChange={(e) => setSelectedCota(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Cota Master (Naming Rights)">Cota Master · Naming Rights (Apresenta o Evento)</option>
                      <option value="Cota Ouro · Setor & Palco">Cota Ouro · Setor & Palco (Estande 40m²)</option>
                      <option value="Cota Prata · Ativação & Sampling">Cota Prata · Ativação & Sampling (100k Copos)</option>
                      <option value="Cota Produto Oficial (Monopólio)">Cota Produto Oficial (Bebidas / Fintech / Telecom)</option>
                      <option value="Projeto Especial sob Medida">Projeto Especial sob Medida</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4 text-neutral-950" />
                    <span>Receber Proposta Formal & Agendar Reunião</span>
                  </button>
                </form>

                {/* Direct Contacts Info */}
                <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block">
                      Contato Comercial Direto
                    </span>
                    <h4 className="text-lg font-bold text-white font-display">
                      Palco Musical Entretenimento
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Atendimento exclusivo para agências de publicidade, diretores de marketing e marcas nacionais.
                    </p>

                    <div className="space-y-2.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                        <a href={`mailto:${EVENT_INFO.organizerEmail}`} className="hover:text-white transition-colors">
                          {EVENT_INFO.organizerEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Diretoria de Novos Negócios & Patrocínios</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Atendimento com NDA e sigilo corporativo</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-500">
                    Circuito Folia Brasil 2026 · Todos os direitos reservados.
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl text-xs text-neutral-400 flex items-center justify-between">
              <span>Palco Musical Entretenimento · Produção Oficial</span>
              <button
                onClick={() => setCurrentSlide(0)}
                className="text-amber-400 hover:text-amber-300 font-medium"
              >
                Voltar ao Início da Apresentação ↺
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-neutral-950/90 backdrop-blur-lg">
      <div
        className={`bg-neutral-900 border border-neutral-800 rounded-3xl w-full flex flex-col shadow-2xl transition-all duration-300 overflow-hidden ${
          isFullscreen
            ? 'h-full max-w-none rounded-none border-none p-0'
            : 'max-w-6xl h-[88vh] max-h-[820px]'
        }`}
      >
        {/* Top Control Bar of Presentation Deck */}
        <div className="px-5 py-3.5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold font-display text-white uppercase tracking-wider">
              Pitch Deck Comercial 2026
            </span>
            <span className="text-xs text-neutral-500 hidden sm:inline">·</span>
            <span className="text-xs text-neutral-400 hidden sm:inline">
              Palco Musical Entretenimento
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Slide Index Counter */}
            <div className="text-xs font-mono font-bold text-neutral-300 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800 tabular-nums">
              Slide <span className="text-amber-400">{String(currentSlide + 1).padStart(2, '0')}</span> / {String(totalSlides).padStart(2, '0')}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={prevSlide}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                title="Slide Anterior (Seta Esquerda)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                title="Próximo Slide (Seta Direita)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors hidden sm:inline-flex cursor-pointer"
              title={isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="Fechar Apresentação"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Stage Body */}
        <div className="flex-1 p-2 sm:p-4 bg-neutral-900 overflow-hidden">
          {renderSlideContent()}
        </div>

        {/* Bottom Slide Timeline / Indicator Bar */}
        <div className="px-5 py-3 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-4">
          {/* Thumbnails / Dots indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx
                    ? 'w-8 bg-amber-400'
                    : 'w-2 bg-neutral-800 hover:bg-neutral-600'
                }`}
                title={`Ir para o Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-neutral-500 hidden md:inline">
              Pressione ← ou → para navegar
            </span>
            <button
              onClick={() => {
                window.print();
              }}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-800 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Imprimir / Salvar PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
