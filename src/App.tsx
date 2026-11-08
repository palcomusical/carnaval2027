import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScheduleSection } from './components/ScheduleSection';
import { CircuitMapSection } from './components/CircuitMapSection';
import { StructureSection } from './components/StructureSection';
import { GastronomySection } from './components/GastronomySection';
import { SponsorshipSection } from './components/SponsorshipSection';
import { FoliaoGuideSection } from './components/FoliaoGuideSection';
import { LeadCaptureSection } from './components/LeadCaptureSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { GeneralAdminPortalModal } from './components/GeneralAdminPortalModal';
import { LeadMagnetModal } from './components/LeadMagnetModal';
import { CommercialPitchDeckModal } from './components/CommercialPitchDeckModal';
import { CarnivalChatbot } from './components/CarnivalChatbot';
import { DEFAULT_BOT_CONFIG, DEFAULT_SITE_SETTINGS } from './data/botAndSettingsData';
import { BLOCOS_LIST, FAQ_LIST } from './data/carnivalData';
import { DEFAULT_PAGE_SECTIONS } from './data/sectionsData';
import { DEFAULT_BANNERS } from './data/bannersData';
import { DEFAULT_MEDIA_ITEMS } from './data/mediaData';
import { DynamicBannerSection } from './components/DynamicBannerSection';
import { CustomSectionRenderer } from './components/CustomSectionRenderer';
import { 
  Lead, 
  BotConfig, 
  SiteSettings, 
  Bloco, 
  FaqItem, 
  PageSectionConfig, 
  DynamicBanner, 
  MediaItem 
} from './types';
import { Ticket, Bell, Sparkles } from 'lucide-react';

const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-001',
    category: 'foliao',
    name: 'Juliana Mendes Rocha',
    email: 'juliana.mrocha@gmail.com',
    phone: '(11) 98765-4321',
    blocoPreference: 'Bloco do Sol Nascente (Axé & Salvador)',
    ticketCount: 4,
    interestDetails: 'Camarote VIP & Open Bar',
    status: 'fechado',
    estimatedValue: 1800,
    notes: 'Pagamento de 4 ingressos VIP confirmado para o Sábado.',
    createdAt: '2026-10-27T14:20:00Z',
  },
  {
    id: 'lead-002',
    category: 'patrocinador',
    name: 'Carlos Eduardo Silveira',
    email: 'carlos.silveira@cervejatropical.com.br',
    phone: '(11) 99123-8899',
    companyOrRole: 'Cervejaria Tropical do Brasil',
    interestDetails: 'Interesse na cota Master de bebidas exclusivas e adesivagem do trio elétrico principal.',
    status: 'proposta_enviada',
    estimatedValue: 350000,
    notes: 'Minuta comercial enviada após reunião com diretor de marketing.',
    createdAt: '2026-10-27T16:45:00Z',
  },
  {
    id: 'lead-003',
    category: 'gastronomia',
    name: 'Mariana Alves Dantas',
    email: 'mariana@acarajedaalegria.com.br',
    phone: '(71) 98877-1122',
    companyOrRole: 'Acarajé & Sabores da Bahia',
    interestDetails: 'Food truck com acarajé tradicional, abará e doces baianos com 2 pontos de atendimento.',
    status: 'em_contato',
    estimatedValue: 12000,
    notes: 'Aguardando envio do alvará sanitário e layout do truck.',
    createdAt: '2026-10-28T10:15:00Z',
  },
  {
    id: 'lead-004',
    category: 'imprensa',
    name: 'Rodrigo Fontes',
    email: 'rodrigo@carnavalenfoco.com.br',
    phone: '(21) 97654-3210',
    companyOrRole: 'Portal Carnaval em Foco',
    interestDetails: 'Cobertura fotográfica e transmissão ao vivo no YouTube com equipe de 3 repórteres.',
    status: 'fechado',
    notes: '3 credenciais para os trios elétricos liberadas.',
    createdAt: '2026-10-28T11:30:00Z',
  },
];

export default function App() {
  // Leads Database with LocalStorage
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const stored = localStorage.getItem('folia_leads_db');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  // Bot Config with LocalStorage
  const [botConfig, setBotConfig] = useState<BotConfig>(() => {
    try {
      const stored = localStorage.getItem('folia_bot_config');
      if (stored) {
        return JSON.parse(stored);
      }
      return DEFAULT_BOT_CONFIG;
    } catch {
      return DEFAULT_BOT_CONFIG;
    }
  });

  // Site Settings with LocalStorage
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const stored = localStorage.getItem('folia_site_settings');
      if (stored) {
        return JSON.parse(stored);
      }
      return DEFAULT_SITE_SETTINGS;
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  });

  // Blocos Lineup with LocalStorage
  const [blocos, setBlocos] = useState<Bloco[]>(() => {
    try {
      const stored = localStorage.getItem('folia_blocos_db');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return BLOCOS_LIST;
    } catch {
      return BLOCOS_LIST;
    }
  });

  // FAQs with LocalStorage
  const [faqItems, setFaqItems] = useState<FaqItem[]>(() => {
    try {
      const stored = localStorage.getItem('folia_faqs_db');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return FAQ_LIST;
    } catch {
      return FAQ_LIST;
    }
  });

  // Page Sections with LocalStorage
  const [sections, setSections] = useState<PageSectionConfig[]>(() => {
    try {
      const stored = localStorage.getItem('folia_page_sections');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_PAGE_SECTIONS;
    } catch {
      return DEFAULT_PAGE_SECTIONS;
    }
  });

  // Dynamic Banners with LocalStorage
  const [banners, setBanners] = useState<DynamicBanner[]>(() => {
    try {
      const stored = localStorage.getItem('folia_banners_db');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_BANNERS;
    } catch {
      return DEFAULT_BANNERS;
    }
  });

  // Media Library with LocalStorage
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    try {
      const stored = localStorage.getItem('folia_media_library');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_MEDIA_ITEMS;
    } catch {
      return DEFAULT_MEDIA_ITEMS;
    }
  });

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [selectedSponsorTier, setSelectedSponsorTier] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('folia_leads_db', JSON.stringify(leads));
    } catch {
      // storage quota handling
    }
  }, [leads]);

  const handleLeadCaptured = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
  };

  const handleClearLeads = () => {
    if (window.confirm('Deseja realmente limpar todos os leads captados?')) {
      setLeads([]);
      try {
        localStorage.removeItem('folia_leads_db');
      } catch {
        // ignore
      }
    }
  };

  const handleSaveBotConfig = (newConfig: BotConfig) => {
    setBotConfig(newConfig);
    try {
      localStorage.setItem('folia_bot_config', JSON.stringify(newConfig));
    } catch {
      // storage
    }
  };

  const handleSaveSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    try {
      localStorage.setItem('folia_site_settings', JSON.stringify(newSettings));
    } catch {
      // storage
    }
  };

  const handleSaveBlocos = (newBlocos: Bloco[]) => {
    setBlocos(newBlocos);
    try {
      localStorage.setItem('folia_blocos_db', JSON.stringify(newBlocos));
    } catch {
      // storage
    }
  };

  const handleSaveFaqItems = (newFaqs: FaqItem[]) => {
    setFaqItems(newFaqs);
    try {
      localStorage.setItem('folia_faqs_db', JSON.stringify(newFaqs));
    } catch {
      // storage
    }
  };

  const handleSaveSections = (newSections: PageSectionConfig[]) => {
    setSections(newSections);
    try {
      localStorage.setItem('folia_page_sections', JSON.stringify(newSections));
    } catch {
      // storage
    }
  };

  const handleSaveBanners = (newBanners: DynamicBanner[]) => {
    setBanners(newBanners);
    try {
      localStorage.setItem('folia_banners_db', JSON.stringify(newBanners));
    } catch {
      // storage
    }
  };

  const handleSaveMediaItems = (newItems: MediaItem[]) => {
    setMediaItems(newItems);
    try {
      localStorage.setItem('folia_media_library', JSON.stringify(newItems));
    } catch {
      // storage
    }
  };

  const handleOpenSponsorModal = (tierName: string) => {
    setSelectedSponsorTier(tierName);
    setIsLeadModalOpen(true);
  };

  const handleOpenGeneralLeadModal = () => {
    setSelectedSponsorTier(null);
    setIsLeadModalOpen(true);
  };

  const scrollToSchedule = () => {
    const el = document.getElementById('programacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      
      {/* Notice Alert Banner (Configurable in Admin) */}
      {siteSettings.noticeBannerEnabled && siteSettings.noticeBannerText && (
        <div className="w-full bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 text-yellow-300 border-b border-yellow-400/40 px-4 py-2.5 text-center text-xs font-black flex items-center justify-center gap-2 shadow-sm">
          <Bell className="w-3.5 h-3.5 shrink-0 text-yellow-400 animate-bounce" />
          <span>{siteSettings.noticeBannerText}</span>
          <button
            onClick={handleOpenGeneralLeadModal}
            className="ml-2 px-2.5 py-0.5 rounded-md bg-yellow-400 text-purple-950 font-black hover:bg-yellow-300 cursor-pointer shadow-sm text-[11px]"
          >
            Garantir Vaga →
          </button>
        </div>
      )}

      {/* Top Bar Header */}
      <Header
        onOpenLeadModal={handleOpenGeneralLeadModal}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenDeckModal={() => setIsDeckModalOpen(true)}
        totalLeadsCount={leads.length}
      />

      <main className="flex-1 w-full">
        {[...sections]
          .sort((a, b) => a.order - b.order)
          .map((sec) => {
            if (!sec.enabled) return null;

            const renderInner = () => {
              switch (sec.id) {
                case 'hero':
                  return (
                    <Hero
                      key="hero"
                      siteSettings={siteSettings}
                      onOpenLeadModal={handleOpenGeneralLeadModal}
                      onScrollToSchedule={scrollToSchedule}
                    />
                  );
                case 'banner_top': {
                  const topBanner = banners.find((b) => b.active && (b.position === 'top_hero' || b.position === 'floating_top'));
                  return topBanner ? (
                    <DynamicBannerSection
                      key={`banner-top-${topBanner.id}`}
                      banner={topBanner}
                      onOpenLeadModal={handleOpenGeneralLeadModal}
                      onOpenDeckModal={() => setIsDeckModalOpen(true)}
                      onScrollToSchedule={scrollToSchedule}
                    />
                  ) : null;
                }
                case 'schedule':
                  return (
                    <ScheduleSection
                      key="schedule"
                      blocos={blocos}
                      onOpenLeadModal={handleOpenGeneralLeadModal}
                    />
                  );
                case 'circuit_map':
                  return (
                    <CircuitMapSection
                      key="circuit_map"
                      onOpenLeadModal={handleOpenGeneralLeadModal}
                    />
                  );
                case 'structure':
                  return <StructureSection key="structure" />;
                case 'gastronomy':
                  return (
                    <GastronomySection
                      key="gastronomy"
                      onOpenLeadModal={handleOpenGeneralLeadModal}
                    />
                  );
                case 'sponsorship':
                  return (
                    <SponsorshipSection
                      key="sponsorship"
                      onOpenLeadModalWithTier={handleOpenSponsorModal}
                      onOpenDeckModal={() => setIsDeckModalOpen(true)}
                    />
                  );
                case 'banner_mid': {
                  const midBanner = banners.find((b) => b.active && (b.position === 'after_schedule' || b.position === 'after_sponsorship'));
                  return midBanner ? (
                    <DynamicBannerSection
                      key={`banner-mid-${midBanner.id}`}
                      banner={midBanner}
                      onOpenLeadModal={handleOpenGeneralLeadModal}
                      onOpenDeckModal={() => setIsDeckModalOpen(true)}
                      onScrollToSchedule={scrollToSchedule}
                    />
                  ) : null;
                }
                case 'foliao_guide':
                  return (
                    <FoliaoGuideSection
                      key="foliao_guide"
                      onOpenLeadModal={handleOpenGeneralLeadModal}
                    />
                  );
                case 'lead_capture':
                  return (
                    <LeadCaptureSection
                      key="lead_capture"
                      onLeadCaptured={handleLeadCaptured}
                    />
                  );
                case 'faq':
                  return (
                    <FaqSection
                      key="faq"
                      faqItems={faqItems}
                      onOpenLeadModal={handleOpenGeneralLeadModal}
                    />
                  );
                default:
                  return (
                    <CustomSectionRenderer
                      key={sec.id}
                      section={sec}
                      onOpenLeadModal={handleOpenGeneralLeadModal}
                      onOpenDeckModal={() => setIsDeckModalOpen(true)}
                    />
                  );
              }
            };

            // Custom Background Wrapper if customized in admin
            const hasCustomBg = sec.bgType && sec.bgType !== 'default' && sec.bgValue;

            return (
              <div 
                key={sec.id} 
                className="relative w-full"
                style={{
                  backgroundColor: sec.bgType === 'color' && sec.bgValue ? sec.bgValue : undefined,
                }}
              >
                {sec.bgType === 'image' && sec.bgValue && (
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src={sec.bgValue}
                      alt={sec.name}
                      className="w-full h-full object-cover opacity-20 filter blur-xs"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-neutral-950/70" />
                  </div>
                )}
                {sec.bgType === 'video' && sec.bgValue && (
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <video
                      src={sec.bgValue}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-20 filter blur-xs"
                    />
                    <div className="absolute inset-0 bg-neutral-950/70" />
                  </div>
                )}
                <div className="relative z-10 w-full">
                  {renderInner()}
                </div>
              </div>
            );
          })}
      </main>

      {/* Floating Fast Action on Mobile Viewports */}
      <div className="fixed bottom-4 right-4 z-30 sm:hidden">
        <button
          onClick={handleOpenGeneralLeadModal}
          className="flex items-center gap-2 px-4 py-3 bg-amber-400 text-neutral-950 font-bold text-xs rounded-full shadow-2xl active:scale-95 transition-transform"
        >
          <Ticket className="w-4 h-4 text-neutral-950" />
          <span>Garantir VIP</span>
        </button>
      </div>

      {/* Editable Interactive Chatbot (Google Gemini AI or Rules Mode) */}
      <CarnivalChatbot
        config={botConfig}
        onOpenLeadModal={handleOpenGeneralLeadModal}
        onOpenDeckModal={() => setIsDeckModalOpen(true)}
      />

      {/* Commercial Pitch Deck Modal (Slides) */}
      <CommercialPitchDeckModal
        isOpen={isDeckModalOpen}
        onClose={() => setIsDeckModalOpen(false)}
        onLeadCaptured={handleLeadCaptured}
      />

      {/* Fast Lead Magnet Modal */}
      <LeadMagnetModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedSponsorTier(null);
        }}
        onLeadCaptured={handleLeadCaptured}
        initialTier={selectedSponsorTier}
      />

      {/* Gestor Geral ADM Portal (CRM de Leads + Visual & Seções + Banners & Contagens + Biblioteca de Mídia + Programação & FAQs + Bot & IA) */}
      <GeneralAdminPortalModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        leads={leads}
        onUpdateLead={handleUpdateLead}
        onDeleteLead={handleDeleteLead}
        onClearLeads={handleClearLeads}
        botConfig={botConfig}
        onSaveBotConfig={handleSaveBotConfig}
        siteSettings={siteSettings}
        onSaveSiteSettings={handleSaveSiteSettings}
        blocos={blocos}
        onSaveBlocos={handleSaveBlocos}
        faqItems={faqItems}
        onSaveFaqItems={handleSaveFaqItems}
        sections={sections}
        onSaveSections={handleSaveSections}
        banners={banners}
        onSaveBanners={handleSaveBanners}
        mediaItems={mediaItems}
        onSaveMediaItems={handleSaveMediaItems}
      />

      {/* Institutional Footer */}
      <Footer
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
        onOpenDeckModal={() => setIsDeckModalOpen(true)}
        totalLeadsCount={leads.length}
      />

    </div>
  );
}
