export type DayOption = 'todos' | 'sex' | 'sab' | 'dom' | 'seg' | 'ter';
export type GenreOption = 'todos' | 'axe' | 'samba' | 'frevo' | 'funk' | 'fanfarra';

export interface Bloco {
  id: string;
  name: string;
  artist: string;
  day: DayOption;
  dayLabel: string;
  date: string;
  timeConcentracao: string;
  timeSaida: string;
  percurso: string;
  genre: GenreOption;
  genreLabel: string;
  expectedCrowd: string;
  description: string;
  highlights: string[];
  image: string;
}

export type LeadCategory = 'foliao' | 'patrocinador' | 'gastronomia' | 'imprensa';
export type LeadStatus = 'novo' | 'em_contato' | 'proposta_enviada' | 'fechado' | 'arquivado';

export interface Lead {
  id: string;
  category: LeadCategory;
  name: string;
  email: string;
  phone: string;
  companyOrRole?: string;
  interestDetails?: string;
  blocoPreference?: string;
  ticketCount?: number;
  status?: LeadStatus;
  notes?: string;
  estimatedValue?: number;
  createdAt: string;
}

export interface MapPoint {
  id: string;
  title: string;
  category: 'posto-medico' | 'hidratacao' | 'banheiros' | 'alimentacao' | 'seguranca' | 'acessibilidade' | 'camarote' | 'concentracao';
  categoryLabel: string;
  location: string;
  description: string;
  coordinates: { x: number; y: number }; // Percentage 0-100 on the route map
  iconName: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'geral' | 'seguranca' | 'camarote' | 'transporte';
}

export interface QuickReplyOption {
  label: string;
  answer: string;
}

export interface BotConfig {
  enabled: boolean;
  name: string;
  avatarIcon: 'bot' | 'sparkles' | 'music' | 'party';
  welcomeMessage: string;
  mode: 'ia' | 'regras'; // IA via Gemini ou Modo Guiado por Regras / FAQ
  systemPrompt: string;
  quickReplies: QuickReplyOption[];
  whatsappContactNumber: string;
}

export interface SiteSettings {
  eventName: string;
  tagline: string;
  organizer: string;
  organizerEmail: string;
  organizerPhone: string;
  datesSummary: string;
  targetDate: string;
  location: string;
  expectedAttendance: string;
  noticeBannerEnabled: boolean;
  noticeBannerText: string;
  vipLote: string;
  vipLoteStatus: 'aberto' | 'ultimas_vagas' | 'esgotado';
  heroBackgroundUrl?: string;
  heroBackgroundType?: 'image' | 'video';
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  category: 'background' | 'trio' | 'camarote' | 'gastronomia' | 'video' | 'geral';
  thumbnail?: string;
  tags?: string[];
  addedAt: string;
}

export type BannerLayoutType = 
  | 'countdown_hero'     // Hero de impacto com contagem regressiva + botões duplos
  | 'sponsor_metrics'    // Banner B2B de patrocínio com métricas e book comercial
  | 'urgent_lote'        // Alerta de virada de lote com cronômetro de escassez
  | 'video_bg'           // Banner imersivo com vídeo background em loop
  | 'split_banner'       // Split com foto/vídeo na lateral e lista de destaques
  | 'custom_minimal';    // Banner minimalista moderno

export interface DynamicBanner {
  id: string;
  title: string;
  subtitle: string;
  badgeText?: string;
  layout: BannerLayoutType;
  position: 'top_hero' | 'after_schedule' | 'after_sponsorship' | 'floating_top';
  active: boolean;
  bgType: 'image' | 'video' | 'gradient';
  bgUrl: string;
  overlayDarkness?: number; // 0 a 100
  // Contagem Regressiva
  countdownEnabled: boolean;
  countdownTargetDate?: string; // Ex: '2026-02-14T14:00:00'
  countdownLabel?: string;
  // Ações de Botões
  primaryButtonText?: string;
  primaryButtonAction?: 'open_lead_vip' | 'open_deck' | 'scroll_schedule' | 'custom_url';
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonAction?: 'open_lead_vip' | 'open_deck' | 'scroll_schedule' | 'custom_url';
  secondaryButtonUrl?: string;
  // Métricas para banners comerciais B2B
  metrics?: { label: string; value: string }[];
}

export interface CustomSectionData {
  title: string;
  subtitle?: string;
  badge?: string;
  contentDescription: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  layoutStyle: 'cards' | 'split' | 'highlight' | 'video_focus';
  features?: string[];
  buttonText?: string;
  buttonAction?: 'open_lead_vip' | 'open_deck' | 'custom_url';
  buttonUrl?: string;
}

export interface PageSectionConfig {
  id: string;
  name: string;
  category: 'padrao' | 'banner' | 'custom';
  enabled: boolean;
  order: number;
  bgType?: 'default' | 'color' | 'image' | 'video';
  bgValue?: string; // Hex color, CSS gradient ou URL da biblioteca de mídia
  customSectionData?: CustomSectionData;
}
