import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Volume2, 
  VolumeX, 
  BarChart3, 
  FileText, 
  Flame, 
  ShieldCheck, 
  Ticket 
} from 'lucide-react';
import { DynamicBanner } from '../types';

interface DynamicBannerSectionProps {
  banner: DynamicBanner;
  onOpenLeadModal: () => void;
  onOpenDeckModal: () => void;
  onScrollToSchedule: () => void;
}

export const DynamicBannerSection: React.FC<DynamicBannerSectionProps> = ({
  banner,
  onOpenLeadModal,
  onOpenDeckModal,
  onScrollToSchedule,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate countdown
  useEffect(() => {
    if (!banner.countdownEnabled || !banner.countdownTargetDate) return;

    const target = new Date(banner.countdownTargetDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [banner.countdownEnabled, banner.countdownTargetDate]);

  if (!banner.active) return null;

  const handleAction = (action?: string, url?: string) => {
    switch (action) {
      case 'open_lead_vip':
        onOpenLeadModal();
        break;
      case 'open_deck':
        onOpenDeckModal();
        break;
      case 'scroll_schedule':
        onScrollToSchedule();
        break;
      case 'custom_url':
        if (url) {
          window.location.href = url;
        }
        break;
      default:
        onOpenLeadModal();
    }
  };

  // Render Background
  const renderBackground = () => {
    const opacity = (banner.overlayDarkness ?? 70) / 100;

    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        {banner.bgType === 'video' ? (
          <div className="relative w-full h-full">
            <video
              src={banner.bgUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover object-center scale-[1.02]"
            />
            {/* Audio Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-4 right-4 z-20 p-2 rounded-full bg-neutral-950/80 hover:bg-neutral-900 text-white text-xs flex items-center gap-1.5 backdrop-blur-md border border-neutral-700/80 cursor-pointer shadow-lg transition-transform active:scale-95"
              title={isMuted ? 'Ativar som' : 'Silenciar áudio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              <span className="text-[11px] font-semibold">{isMuted ? 'Mudo' : 'Som Ativo'}</span>
            </button>
          </div>
        ) : banner.bgType === 'image' ? (
          <img
            src={banner.bgUrl}
            alt={banner.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: banner.bgUrl || 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
          />
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-neutral-950"
          style={{ opacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/70" />
      </div>
    );
  };

  // Render Countdown Box
  const renderCountdown = (label?: string) => {
    if (!banner.countdownEnabled) return null;

    return (
      <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-neutral-900/90 border border-neutral-800/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider shrink-0">
          <Clock className="w-4 h-4 animate-pulse" />
          <span>{label || banner.countdownLabel || 'Tempo Restante:'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center bg-neutral-950/80 px-2.5 py-1 rounded-lg border border-neutral-800 min-w-[46px]">
            <span className="text-base sm:text-lg font-black text-white font-mono">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-400">Dias</span>
          </div>
          <span className="text-amber-400 font-bold">:</span>
          <div className="flex flex-col items-center bg-neutral-950/80 px-2.5 py-1 rounded-lg border border-neutral-800 min-w-[46px]">
            <span className="text-base sm:text-lg font-black text-white font-mono">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-400">Horas</span>
          </div>
          <span className="text-amber-400 font-bold">:</span>
          <div className="flex flex-col items-center bg-neutral-950/80 px-2.5 py-1 rounded-lg border border-neutral-800 min-w-[46px]">
            <span className="text-base sm:text-lg font-black text-white font-mono">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-400">Min</span>
          </div>
          <span className="text-amber-400 font-bold">:</span>
          <div className="flex flex-col items-center bg-neutral-950/80 px-2.5 py-1 rounded-lg border border-neutral-800 min-w-[46px]">
            <span className="text-base sm:text-lg font-black text-amber-400 font-mono">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-400">Seg</span>
          </div>
        </div>
      </div>
    );
  };

  // LAYOUT 1: URGENT LOTE (Alerta de virada de lote / Escassez com estilo dinâmico)
  if (banner.layout === 'urgent_lote') {
    return (
      <div className="relative w-full overflow-hidden py-8 sm:py-10 border-y border-amber-500/30">
        {renderBackground()}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              {banner.badgeText && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-400 text-neutral-950 shadow-md">
                  <Flame className="w-3.5 h-3.5 text-neutral-950 fill-neutral-950" />
                  {banner.badgeText}
                </span>
              )}
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                {banner.title}
              </h3>
              <p className="text-sm text-neutral-200 max-w-xl">
                {banner.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              {renderCountdown(banner.countdownLabel)}
              {banner.primaryButtonText && (
                <button
                  onClick={() => handleAction(banner.primaryButtonAction, banner.primaryButtonUrl)}
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Ticket className="w-4 h-4 text-neutral-950" />
                  <span>{banner.primaryButtonText}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-950" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LAYOUT 2: SPONSOR METRICS (Banner Comercial B2B com Métricas e Book)
  if (banner.layout === 'sponsor_metrics') {
    return (
      <div className="relative w-full overflow-hidden py-16 sm:py-20 border-b border-neutral-800">
        {renderBackground()}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              {banner.badgeText && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  <BarChart3 className="w-3.5 h-3.5" />
                  {banner.badgeText}
                </span>
              )}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-[1.1]">
                {banner.title}
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {banner.subtitle}
              </p>

              {renderCountdown(banner.countdownLabel)}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {banner.primaryButtonText && (
                  <button
                    onClick={() => handleAction(banner.primaryButtonAction, banner.primaryButtonUrl)}
                    className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{banner.primaryButtonText}</span>
                  </button>
                )}
                {banner.secondaryButtonText && (
                  <button
                    onClick={() => handleAction(banner.secondaryButtonAction, banner.secondaryButtonUrl)}
                    className="px-6 py-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white font-semibold text-sm border border-neutral-700/80 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{banner.secondaryButtonText}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {banner.metrics && banner.metrics.length > 0 ? (
                banner.metrics.map((metric, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-neutral-900/85 border border-neutral-800 backdrop-blur-md space-y-1">
                    <span className="text-2xl sm:text-3xl font-black text-amber-400 font-display block">
                      {metric.value}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium block">
                      {metric.label}
                    </span>
                  </div>
                ))
              ) : (
                <div className="col-span-2 p-6 rounded-2xl bg-neutral-900/85 border border-neutral-800 backdrop-blur-md">
                  <span className="text-2xl font-bold text-amber-400 block mb-1">Impacto Absoluto</span>
                  <p className="text-xs text-neutral-300">Cotas oficiais com exclusividade de segmento e ativações com o público mais eufórico do país.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LAYOUT 3: VIDEO BACKGROUND (Imersivo com vídeo em loop)
  if (banner.layout === 'video_bg') {
    return (
      <div className="relative w-full overflow-hidden py-20 sm:py-24 border-b border-neutral-800">
        {renderBackground()}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {banner.badgeText && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {banner.badgeText}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-[1.1]">
            {banner.title}
          </h2>
          <p className="text-neutral-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {banner.subtitle}
          </p>

          <div className="flex justify-center">
            {renderCountdown(banner.countdownLabel)}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {banner.primaryButtonText && (
              <button
                onClick={() => handleAction(banner.primaryButtonAction, banner.primaryButtonUrl)}
                className="px-7 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-base flex items-center gap-2 shadow-xl shadow-amber-400/25 active:scale-95 transition-all cursor-pointer"
              >
                <span>{banner.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </button>
            )}
            {banner.secondaryButtonText && (
              <button
                onClick={() => handleAction(banner.secondaryButtonAction, banner.secondaryButtonUrl)}
                className="px-6 py-4 rounded-xl bg-neutral-950/80 hover:bg-neutral-900 text-white font-medium text-base border border-neutral-700/80 backdrop-blur-md active:scale-95 transition-all cursor-pointer"
              >
                <span>{banner.secondaryButtonText}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT / SPLIT / COUNTDOWN_HERO BANNER
  return (
    <div className="relative w-full overflow-hidden py-16 sm:py-20 border-b border-neutral-800">
      {renderBackground()}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-5">
          {banner.badgeText && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              {banner.badgeText}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-[1.1]">
            {banner.title}
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
            {banner.subtitle}
          </p>

          {renderCountdown(banner.countdownLabel)}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {banner.primaryButtonText && (
              <button
                onClick={() => handleAction(banner.primaryButtonAction, banner.primaryButtonUrl)}
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>{banner.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </button>
            )}
            {banner.secondaryButtonText && (
              <button
                onClick={() => handleAction(banner.secondaryButtonAction, banner.secondaryButtonUrl)}
                className="px-6 py-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white font-semibold text-sm border border-neutral-700/80 active:scale-95 transition-all cursor-pointer"
              >
                <span>{banner.secondaryButtonText}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
