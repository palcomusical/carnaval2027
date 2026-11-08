import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Share2, 
  Flame, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Ticket, 
  Music2, 
  Download, 
  Eye, 
  X,
  Users
} from 'lucide-react';
import { CARNIVAL_IMAGES, EVENT_INFO } from '../data/carnivalData';
import { SiteSettings } from '../types';

interface HeroProps {
  onOpenLeadModal: () => void;
  onScrollToSchedule: () => void;
  siteSettings?: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLeadModal, onScrollToSchedule, siteSettings }) => {
  const eventName = siteSettings?.eventName || EVENT_INFO.name;
  const datesSummary = siteSettings?.datesSummary || EVENT_INFO.datesSummary;
  const location = siteSettings?.location || EVENT_INFO.location;
  const targetDateStr = siteSettings?.targetDate || EVENT_INFO.targetDate;

  // Live Attendance Motivation Counter
  const [attendeeCount, setAttendeeCount] = useState(() => {
    try {
      const saved = localStorage.getItem('previa_attendee_count');
      return saved ? Number(saved) : 1420;
    } catch {
      return 1420;
    }
  });

  const [hasConfirmed, setHasConfirmed] = useState(() => {
    try {
      return localStorage.getItem('previa_user_confirmed') === 'true';
    } catch {
      return false;
    }
  });

  const [showConfettiNotice, setShowConfettiNotice] = useState(false);
  const [isFlyerZoomOpen, setIsFlyerZoomOpen] = useState(false);

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const carnivalDate = new Date(targetDateStr).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = carnivalDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const handleConfirmAttendance = () => {
    if (!hasConfirmed) {
      const nextCount = attendeeCount + 1;
      setAttendeeCount(nextCount);
      setHasConfirmed(true);
      setShowConfettiNotice(true);
      try {
        localStorage.setItem('previa_attendee_count', String(nextCount));
        localStorage.setItem('previa_user_confirmed', 'true');
      } catch {
        // quota
      }
      setTimeout(() => setShowConfettiNotice(false), 5000);
    } else {
      setShowConfettiNotice(true);
      setTimeout(() => setShowConfettiNotice(false), 3000);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🎉 BORA PRA MELHOR PRÉVIA DE CARNAVAL DE SATUBINHA - MA!\n\n` +
      `📅 Sábado, 07 de Fevereiro a partir das 19h\n` +
      `📍 Depósito de Bebidas do Marcelo\n` +
      `🔥 Shows com LAYLSON VAQUERAMA & SAUDANY!\n` +
      `🍻 Cerveja gelada a preço de depósito e muito som!\n\n` +
      `Eu já confirmei minha presença! Confirma a sua também aqui: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-amber-400 via-yellow-400 to-amber-500 text-neutral-900 border-b border-purple-900/40">
      
      {/* Decorative Carnival Feathers & Confetti Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-90 overflow-hidden">
        {/* Soft Sunburst Rays and Silk Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-200/50 via-amber-300/30 to-amber-500/50" />
        
        {/* Subtle Confetti Dots Pattern */}
        <div 
          className="absolute inset-0 opacity-25" 
          style={{
            backgroundImage: `radial-gradient(#581C87 1.5px, transparent 1.5px), radial-gradient(#7E22CE 1px, transparent 1px)`,
            backgroundSize: `24px 24px`,
            backgroundPosition: `0 0, 12px 12px`
          }} 
        />

        {/* Top Left Carnival Plumes (Purple Feathers SVG) */}
        <svg 
          className="absolute -top-12 -left-12 w-64 h-64 sm:w-96 sm:h-96 text-purple-900 opacity-90 drop-shadow-xl" 
          viewBox="0 0 200 200" 
          fill="currentColor"
        >
          <path d="M0,0 C50,20 80,70 95,120 C70,105 40,85 10,65 C35,100 65,140 100,160 C75,150 45,130 20,110 C50,145 80,180 120,195 C95,185 70,165 40,145 Z" fill="#581C87" />
          <path d="M0,0 C60,40 110,80 130,140 C105,125 70,105 30,85 C65,120 105,160 145,180 C115,170 85,150 50,130 Z" fill="#7E22CE" opacity="0.8" />
          <path d="M0,0 C70,10 120,50 160,90 C130,80 90,65 50,55 C90,85 130,120 170,150 C140,135 100,115 60,100 Z" fill="#9333EA" opacity="0.6" />
        </svg>

        {/* Top Right Carnival Plumes (Purple Feathers SVG) */}
        <svg 
          className="absolute -top-12 -right-12 w-64 h-64 sm:w-96 sm:h-96 text-purple-900 opacity-90 drop-shadow-xl transform -scale-x-100" 
          viewBox="0 0 200 200" 
          fill="currentColor"
        >
          <path d="M0,0 C50,20 80,70 95,120 C70,105 40,85 10,65 C35,100 65,140 100,160 C75,150 45,130 20,110 C50,145 80,180 120,195 C95,185 70,165 40,145 Z" fill="#581C87" />
          <path d="M0,0 C60,40 110,80 130,140 C105,125 70,105 30,85 C65,120 105,160 145,180 C115,170 85,150 50,130 Z" fill="#7E22CE" opacity="0.8" />
          <path d="M0,0 C70,10 120,50 160,90 C130,80 90,65 50,55 C90,85 130,120 170,150 C140,135 100,115 60,100 Z" fill="#9333EA" opacity="0.6" />
        </svg>

        {/* Decorative Golden Chevrons >>> */}
        <div className="hidden lg:flex flex-col gap-2 absolute left-4 top-1/3 text-amber-600/70 text-2xl font-black select-none">
          <span>&gt;&gt;&gt;&gt;&gt;</span>
        </div>
        <div className="hidden lg:flex flex-col gap-2 absolute right-4 top-1/3 text-amber-600/70 text-2xl font-black select-none">
          <span>&lt;&lt;&lt;&lt;&lt;</span>
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-14 md:pb-24">
        
        {/* Floating Urgency Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900 text-yellow-300 border-2 border-yellow-300 shadow-xl text-xs sm:text-sm font-black uppercase tracking-wider animate-bounce">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>A Prévia Oficial Mais Esperada do Maranhão!</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Explosive Carnival Typography & Action Motivators */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            
            {/* Top Flyer Pill Badges (Time, Date, Location) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-extrabold uppercase">
              <span className="px-3.5 py-1.5 rounded-xl bg-purple-900 text-yellow-300 border-2 border-purple-950 shadow-md flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-yellow-400" />
                A PARTIR DAS 19h
              </span>
              <span className="px-4 py-1.5 rounded-xl bg-purple-950 text-white border-2 border-yellow-300 shadow-md font-mono tracking-widest">
                07 DE FEV
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-yellow-300 text-purple-950 border-2 border-purple-900 shadow-md flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-purple-900" />
                DEPÓSITO DE BEBIDAS DO MARCELO
              </span>
            </div>

            {/* Main Festive Headline matching the attached Flyer */}
            <div className="space-y-1">
              <span className="block text-xl sm:text-2xl md:text-3xl font-black text-purple-950 uppercase tracking-widest drop-shadow-sm font-display">
                A MELHOR PRÉVIA DE
              </span>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-carnaval-3d uppercase tracking-tight leading-[0.9] my-2 select-none">
                CARNAVAL
              </h1>

              <span className="inline-block px-4 py-1.5 rounded-xl bg-purple-900 text-yellow-300 font-black text-base sm:text-xl uppercase tracking-wider shadow-lg border-2 border-yellow-400">
                DE SATUBINHA - MA
              </span>
            </div>

            {/* Attractions Highlight Banner */}
            <div className="p-4 rounded-2xl bg-purple-950/95 border-2 border-yellow-400 shadow-2xl text-white space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-400 flex items-center justify-center lg:justify-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                Atrações Confirmadas no Palco & Paredão
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-lg sm:text-2xl font-black font-display text-white">
                <span className="flex items-center gap-1.5 text-yellow-300 hover:scale-105 transition-transform">
                  🤠 Laylson Vaquerama
                </span>
                <span className="text-purple-400">·</span>
                <span className="flex items-center gap-1.5 text-yellow-300 hover:scale-105 transition-transform">
                  🎶 Saudany
                </span>
                <span className="text-purple-400">·</span>
                <span className="text-sm font-bold text-neutral-300">
                  + Megassom Automotivo
                </span>
              </div>
            </div>

            {/* Motivational Foliômetro (Attendance Proof) */}
            <div className="p-4 rounded-2xl bg-yellow-300/90 border-2 border-purple-900 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-purple-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-900 text-yellow-300 flex items-center justify-center font-black shrink-0 shadow-md">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-center sm:text-left">
                  <span className="block text-base sm:text-lg font-black leading-tight">
                    🔥 +{attendeeCount.toLocaleString('pt-BR')} Foliões Confirmados!
                  </span>
                  <span className="text-xs font-semibold text-purple-900">
                    A galera de Satubinha e toda região já tá confirmada!
                  </span>
                </div>
              </div>

              <button
                onClick={handleConfirmAttendance}
                className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shrink-0 flex items-center gap-1.5 ${
                  hasConfirmed 
                    ? 'bg-emerald-600 text-white border-2 border-emerald-700' 
                    : 'bg-purple-900 hover:bg-purple-800 text-yellow-300 border-2 border-purple-950 active:scale-95'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{hasConfirmed ? 'Presença Confirmada! 🎉' : 'Eu Vou! Confirmar'}</span>
              </button>
            </div>

            {/* Live Countdown Box (Vibrant Carnival Style) */}
            <div className="p-4 rounded-2xl bg-purple-950 border-2 border-yellow-400 shadow-xl text-white">
              <div className="flex items-center justify-between mb-2.5 text-xs uppercase tracking-wider font-bold text-yellow-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />
                  Contagem Regressiva para a Abertura dos Portões
                </span>
                <span className="font-mono text-neutral-300">Sábado · 07/Fev às 19h</span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="bg-purple-900/90 border border-purple-700 rounded-xl p-2 sm:p-2.5 shadow-inner">
                  <span className="block text-2xl sm:text-3xl font-black text-yellow-300 font-mono">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-neutral-300 font-bold uppercase">Dias</span>
                </div>
                <div className="bg-purple-900/90 border border-purple-700 rounded-xl p-2 sm:p-2.5 shadow-inner">
                  <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-neutral-300 font-bold uppercase">Horas</span>
                </div>
                <div className="bg-purple-900/90 border border-purple-700 rounded-xl p-2 sm:p-2.5 shadow-inner">
                  <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-neutral-300 font-bold uppercase">Min</span>
                </div>
                <div className="bg-purple-900/90 border border-purple-700 rounded-xl p-2 sm:p-2.5 shadow-inner">
                  <span className="block text-2xl sm:text-3xl font-black text-amber-400 font-mono animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-neutral-300 font-bold uppercase">Seg</span>
                </div>
              </div>
            </div>

            {/* CTAs: Guaranteed Ticket + WhatsApp Calling */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onOpenLeadModal}
                className="px-7 py-4 bg-purple-950 hover:bg-purple-900 text-yellow-300 hover:text-white font-black text-base uppercase tracking-wider rounded-2xl border-2 border-yellow-300 shadow-2xl active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <Ticket className="w-5 h-5 text-yellow-400 group-hover:rotate-12 transition-transform" />
                <span>Garantir Entrada / VIP Antecipado</span>
                <ArrowRight className="w-5 h-5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl border-2 border-emerald-400 shadow-xl active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                title="Convidar amigos no WhatsApp"
              >
                <Share2 className="w-5 h-5 text-white" />
                <span>Chamar Galera no Zap</span>
              </button>
            </div>

            {/* Quick Motivators Icons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-bold text-purple-950">
              <span className="flex items-center gap-1.5 bg-yellow-300/80 px-2.5 py-1 rounded-lg border border-purple-900/30">
                🍻 Cerveja a Preço de Depósito
              </span>
              <span className="flex items-center gap-1.5 bg-yellow-300/80 px-2.5 py-1 rounded-lg border border-purple-900/30">
                🔊 Paredão de Som Automotivo
              </span>
              <span className="flex items-center gap-1.5 bg-yellow-300/80 px-2.5 py-1 rounded-lg border border-purple-900/30">
                🛡️ Segurança & Ambiente Familiar
              </span>
            </div>

          </div>

          {/* Right Column: Visual Showcase of the Official Flyer Poster */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              
              {/* Outer Golden/Purple Glow effect */}
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-700 via-yellow-400 to-purple-800 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
              
              {/* Flyer Container */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-purple-950 bg-purple-950 shadow-2xl">
                <img
                  src={CARNIVAL_IMAGES.cartazOficial}
                  alt="Cartaz Oficial: A Melhor Prévia de Carnaval com Laylson Vaquerama e Saudany no Depósito de Bebidas do Marcelo"
                  className="w-full h-auto object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />

                {/* Bottom Overlay Action bar */}
                <div className="p-3 bg-purple-950/95 border-t-2 border-yellow-400 flex items-center justify-between gap-2 text-white">
                  <div>
                    <span className="text-[10px] font-bold text-yellow-300 block uppercase">
                      Cartaz Oficial
                    </span>
                    <span className="text-xs font-black text-white block">
                      Satubinha - MA · 07/Fev
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsFlyerZoomOpen(true)}
                      className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-black text-xs rounded-xl flex items-center gap-1 shadow-md cursor-pointer"
                      title="Ver cartaz em tamanho grande"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ampliar</span>
                    </button>
                    <button
                      onClick={handleShareWhatsApp}
                      className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl cursor-pointer"
                      title="Compartilhar no WhatsApp"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Stamp */}
              <div className="absolute -top-4 -right-4 px-3 py-2 rounded-2xl bg-yellow-400 text-purple-950 font-black text-xs uppercase shadow-2xl border-2 border-purple-950 rotate-6 flex items-center gap-1">
                <span>ESTOURO!</span>
                <span>🔥</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Confetti Celebration Banner when attendance is confirmed */}
      {showConfettiNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-purple-950 border-2 border-yellow-300 text-yellow-300 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
          <div>
            <strong className="block text-sm font-black text-white">
              🎉 PRESENÇA CONFIRMADA NA MELHOR PRÉVIA!
            </strong>
            <span className="text-xs text-yellow-300">
              Chame seus amigos no WhatsApp para não perderem essa festa histórica!
            </span>
          </div>
          <button 
            onClick={() => setShowConfettiNotice(false)}
            className="text-white hover:text-yellow-400 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Lightbox / Zoom Modal for Flyer */}
      {isFlyerZoomOpen && (
        <div className="fixed inset-0 z-90 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/90 backdrop-blur-md">
          <div className="relative max-w-lg w-full max-h-[92vh] flex flex-col bg-purple-950 border-4 border-yellow-400 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-3 bg-purple-900 border-b border-purple-800 flex items-center justify-between text-yellow-300">
              <span className="text-xs font-black uppercase tracking-wider">
                Cartaz Oficial · A Melhor Prévia de Carnaval
              </span>
              <button 
                onClick={() => setIsFlyerZoomOpen(false)}
                className="p-1 text-white hover:text-yellow-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-2 bg-neutral-950 flex items-center justify-center">
              <img
                src={CARNIVAL_IMAGES.cartazOficial}
                alt="Cartaz Completo"
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
              />
            </div>

            <div className="p-3 bg-purple-950 border-t border-purple-800 flex items-center justify-between gap-3">
              <span className="text-xs text-neutral-300 font-semibold">
                Satubinha - MA · Depósito do Marcelo
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Enviar no Zap</span>
                </button>
                <button
                  onClick={onOpenLeadModal}
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-black text-xs rounded-xl cursor-pointer"
                >
                  Garantir Ingresso
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signature Curved Purple Wave Divider into the next section */}
      <div className="relative w-full overflow-hidden leading-none z-20">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-12 sm:h-16 text-purple-950 fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>

    </section>
  );
};
