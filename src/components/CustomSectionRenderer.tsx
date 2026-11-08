import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageSectionConfig } from '../types';

interface CustomSectionRendererProps {
  section: PageSectionConfig;
  onOpenLeadModal: () => void;
  onOpenDeckModal: () => void;
}

export const CustomSectionRenderer: React.FC<CustomSectionRendererProps> = ({
  section,
  onOpenLeadModal,
  onOpenDeckModal,
}) => {
  const data = section.customSectionData;
  if (!data || !section.enabled) return null;

  const handleAction = () => {
    if (data.buttonAction === 'open_deck') {
      onOpenDeckModal();
    } else if (data.buttonAction === 'custom_url' && data.buttonUrl) {
      window.location.href = data.buttonUrl;
    } else {
      onOpenLeadModal();
    }
  };

  const hasMedia = Boolean(data.mediaUrl);

  return (
    <section 
      id={section.id} 
      className="relative py-20 overflow-hidden border-b border-neutral-800"
      style={{
        backgroundColor: section.bgType === 'color' && section.bgValue ? section.bgValue : undefined,
      }}
    >
      {/* Background Media if set */}
      {section.bgType === 'image' && section.bgValue && (
        <div className="absolute inset-0 z-0">
          <img
            src={section.bgValue}
            alt={data.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xs" />
        </div>
      )}

      {section.bgType === 'video' && section.bgValue && (
        <div className="absolute inset-0 z-0">
          <video
            src={section.bgValue}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xs" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {data.layoutStyle === 'split' && hasMedia ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              {data.badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  {data.badge}
                </span>
              )}
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
                {data.title}
              </h2>
              {data.subtitle && (
                <h3 className="text-lg text-amber-400 font-semibold">{data.subtitle}</h3>
              )}
              <p className="text-neutral-300 text-base leading-relaxed whitespace-pre-line">
                {data.contentDescription}
              </p>

              {data.features && data.features.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {data.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {data.buttonText && (
                <div className="pt-2">
                  <button
                    onClick={handleAction}
                    className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{data.buttonText}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-950" />
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl relative aspect-video bg-neutral-900">
                {data.mediaType === 'video' ? (
                  <video
                    src={data.mediaUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={data.mediaUrl}
                    alt={data.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {data.badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                {data.badge}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="text-lg text-amber-400 font-semibold">{data.subtitle}</p>
            )}
            <p className="text-neutral-300 text-base leading-relaxed whitespace-pre-line">
              {data.contentDescription}
            </p>

            {hasMedia && (
              <div className="my-8 rounded-2xl overflow-hidden border border-neutral-800 shadow-xl max-w-2xl mx-auto aspect-video bg-neutral-900">
                {data.mediaType === 'video' ? (
                  <video src={data.mediaUrl} controls className="w-full h-full object-cover" />
                ) : (
                  <img src={data.mediaUrl} alt={data.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                )}
              </div>
            )}

            {data.features && data.features.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                {data.features.map((feat, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            )}

            {data.buttonText && (
              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleAction}
                  className="px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 transition-all cursor-pointer"
                >
                  <span>{data.buttonText}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-950" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
