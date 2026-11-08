import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Layout, 
  Image as ImageIcon, 
  Video, 
  Flame, 
  BarChart3, 
  Ticket, 
  ArrowRight,
  Edit3
} from 'lucide-react';
import { DynamicBanner, BannerLayoutType, MediaItem } from '../../types';
import { MediaLibraryModal } from '../MediaLibraryModal';

interface BannersManagerTabProps {
  banners: DynamicBanner[];
  onSaveBanners: (banners: DynamicBanner[]) => void;
  mediaItems: MediaItem[];
  onAddMedia: (item: MediaItem) => void;
  onDeleteMedia: (id: string) => void;
}

export const BannersManagerTab: React.FC<BannersManagerTabProps> = ({
  banners,
  onSaveBanners,
  mediaItems,
  onAddMedia,
  onDeleteMedia,
}) => {
  const [editingBanner, setEditingBanner] = useState<DynamicBanner | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New / Edited Banner form
  const [formBanner, setFormBanner] = useState<DynamicBanner>({
    id: `banner-${Date.now()}`,
    title: 'Novo Banner do Carnaval',
    subtitle: 'Texto explicativo atraente para engajamento do público.',
    badgeText: 'DESTAQUE',
    layout: 'urgent_lote',
    position: 'top_hero',
    active: true,
    bgType: 'gradient',
    bgUrl: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    overlayDarkness: 30,
    countdownEnabled: true,
    countdownTargetDate: '2026-02-14T14:00:00',
    countdownLabel: 'Contagem para a Folia:',
    primaryButtonText: 'Garantir Ingresso VIP',
    primaryButtonAction: 'open_lead_vip',
  });

  const handleStartCreateWithLayout = (layout: BannerLayoutType) => {
    let initial: DynamicBanner = {
      id: `banner-${Date.now()}`,
      title: 'Título do Banner Personalizado',
      subtitle: 'Subtítulo atraente com chamada para ação.',
      badgeText: 'NOVIDADE',
      layout,
      position: 'top_hero',
      active: true,
      bgType: 'gradient',
      bgUrl: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
      overlayDarkness: 40,
      countdownEnabled: false,
      countdownTargetDate: '2026-02-14T14:00:00',
      countdownLabel: 'Tempo Restante:',
      primaryButtonText: 'Acessar Agora',
      primaryButtonAction: 'open_lead_vip',
    };

    if (layout === 'urgent_lote') {
      initial.title = 'Virada de Lote em Breve!';
      initial.subtitle = 'Garanta seu abadá antes do aumento no valor promocional.';
      initial.badgeText = '⚠️ ÚLTIMAS VAGAS';
      initial.countdownEnabled = true;
      initial.countdownLabel = 'Virada de Lote em:';
      initial.primaryButtonText = 'Garantir Lote Atual';
    } else if (layout === 'sponsor_metrics') {
      initial.title = 'Conecte sua Marca a 720 Mil Foliões';
      initial.subtitle = 'Cotas Master com exclusividade, visibilidade em trios elétricos e cobertura em TV e Redes.';
      initial.badgeText = 'OPORTUNIDADE B2B';
      initial.countdownEnabled = true;
      initial.countdownLabel = 'Fechamento de Cotas em:';
      initial.primaryButtonText = 'Baixar Book Comercial (PDF/Slides)';
      initial.primaryButtonAction = 'open_deck';
      initial.metrics = [
        { label: 'Foliões na Avenida', value: '180k/dia' },
        { label: 'Impacto Digital', value: '+14M' },
        { label: 'Trios Elétricos', value: '3 Trios' },
        { label: 'Horas de Festa', value: '40 Horas' },
      ];
    } else if (layout === 'video_bg') {
      initial.title = 'Sinta a Energia ao Vivo no Circuito';
      initial.subtitle = 'O maior carnaval de rua com som de 100 mil watts e segurança de ponta a ponta.';
      initial.badgeText = 'VÍDEO TEASER OFICIAL';
      initial.bgType = 'video';
      initial.bgUrl = 'https://assets.mixkit.co/videos/preview/mixkit-party-crowd-cheering-with-laser-lights-42289-large.mp4';
      initial.primaryButtonText = 'Cadastrar Pré-Venda VIP';
      initial.secondaryButtonText = 'Ver Programação';
      initial.secondaryButtonAction = 'scroll_schedule';
    }

    setFormBanner(initial);
    setIsCreatingNew(true);
    setEditingBanner(null);
  };

  const handleToggleBanner = (id: string) => {
    const updated = banners.map((b) => (b.id === id ? { ...b, active: !b.active } : b));
    onSaveBanners(updated);
  };

  const handleDeleteBanner = (id: string) => {
    if (window.confirm('Deseja excluir este banner?')) {
      const updated = banners.filter((b) => b.id !== id);
      onSaveBanners(updated);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: DynamicBanner[];

    if (editingBanner) {
      updated = banners.map((b) => (b.id === formBanner.id ? formBanner : b));
    } else {
      updated = [formBanner, ...banners];
    }

    onSaveBanners(updated);
    setIsCreatingNew(false);
    setEditingBanner(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Feedback Alert */}
      {saveSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Banners e contagens regressivas atualizados com sucesso no site!</span>
        </div>
      )}

      {/* Top Banner & Fast Actions */}
      <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-display">
              Banners Promocionais & Contagem Regressiva
            </h4>
            <p className="text-xs text-neutral-400">
              Escolha entre 5 layouts pré-formatados ou crie novos banners com contagem regressiva, vídeos ou fotos da biblioteca.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleStartCreateWithLayout('urgent_lote')}
          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-center whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>+ Criar Novo Banner</span>
        </button>
      </div>

      {/* SECTION 1: LAYOUTS PRÉ-FORMATADOS PRONTOS (GALERIA) */}
      {!isCreatingNew && !editingBanner && (
        <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Layouts Pré-Formatados Disponíveis</span>
              </h5>
              <p className="text-xs text-neutral-400 mt-0.5">
                Clique em qualquer modelo abaixo para criar instantaneamente com este formato:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Template 1 */}
            <div 
              onClick={() => handleStartCreateWithLayout('urgent_lote')}
              className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-400/60 transition-all cursor-pointer group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-neutral-950 uppercase">
                  Layout 1
                </span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <h6 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                Virada de Lote com Cronômetro
              </h6>
              <p className="text-[11px] text-neutral-400">
                Alerta de urgência com contagem regressiva ao vivo e botão direto para compra de ingressos/VIP.
              </p>
            </div>

            {/* Template 2 */}
            <div 
              onClick={() => handleStartCreateWithLayout('sponsor_metrics')}
              className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-400/60 transition-all cursor-pointer group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 uppercase border border-blue-500/30">
                  Layout 2
                </span>
                <BarChart3 className="w-4 h-4 text-blue-400" />
              </div>
              <h6 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                Patrocínio B2B com Métricas & Book
              </h6>
              <p className="text-[11px] text-neutral-400">
                Destaque para números de audiência, recall de marcas e botão direto para o Book em Slides.
              </p>
            </div>

            {/* Template 3 */}
            <div 
              onClick={() => handleStartCreateWithLayout('video_bg')}
              className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-400/60 transition-all cursor-pointer group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 uppercase border border-purple-500/30">
                  Layout 3
                </span>
                <Video className="w-4 h-4 text-purple-400" />
              </div>
              <h6 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                Vídeo Teaser Imersivo (Loop)
              </h6>
              <p className="text-[11px] text-neutral-400">
                Vídeo de alta energia tocando ao fundo com botões de chamada e botão de som/mudo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: FORMULÁRIO DE CRIAÇÃO / EDIÇÃO */}
      {(isCreatingNew || editingBanner) && (
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-5 max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{editingBanner ? `Editar Banner: ${formBanner.title}` : 'Criar Novo Banner'}</span>
            </h5>
            <button
              onClick={() => {
                setIsCreatingNew(false);
                setEditingBanner(null);
              }}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSaveForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Layout Pré-Formatado</label>
                <select
                  value={formBanner.layout}
                  onChange={(e) => setFormBanner({ ...formBanner, layout: e.target.value as any })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="urgent_lote">Layout 1: Virada de Lote com Cronômetro</option>
                  <option value="sponsor_metrics">Layout 2: Patrocínio B2B com Métricas</option>
                  <option value="video_bg">Layout 3: Vídeo Teaser Imersivo</option>
                  <option value="countdown_hero">Layout 4: Hero com Contagem e Botões Duplos</option>
                  <option value="split_banner">Layout 5: Split 2 Colunas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Posição na Página</label>
                <select
                  value={formBanner.position}
                  onChange={(e) => setFormBanner({ ...formBanner, position: e.target.value as any })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="floating_top">Faixa Flutuante no Topo (Urgência)</option>
                  <option value="top_hero">Topo (Abaixo do Menu)</option>
                  <option value="after_schedule">Meio (Após a Programação dos Blocos)</option>
                  <option value="after_sponsorship">Meio (Após Cotas de Patrocínio)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Título Principal *</label>
                <input
                  type="text"
                  required
                  value={formBanner.title}
                  onChange={(e) => setFormBanner({ ...formBanner, title: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Selo / Badge</label>
                <input
                  type="text"
                  placeholder="Ex: ÚLTIMO LOTE"
                  value={formBanner.badgeText || ''}
                  onChange={(e) => setFormBanner({ ...formBanner, badgeText: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Subtítulo / Descrição</label>
              <textarea
                rows={2}
                value={formBanner.subtitle}
                onChange={(e) => setFormBanner({ ...formBanner, subtitle: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            {/* BACKGROUND DA MÍDIA */}
            <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Background do Banner</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsMediaPickerOpen(true)}
                  className="px-3 py-1 bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg cursor-pointer"
                >
                  Abrir Biblioteca de Mídia
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Tipo de Fundo</label>
                  <select
                    value={formBanner.bgType}
                    onChange={(e) => setFormBanner({ ...formBanner, bgType: e.target.value as any })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="gradient">Gradiente Dourado</option>
                    <option value="image">Imagem da Biblioteca</option>
                    <option value="video">Vídeo em Loop (MP4)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-neutral-400 mb-1">URL ou Código do Fundo</label>
                  <input
                    type="text"
                    value={formBanner.bgUrl}
                    onChange={(e) => setFormBanner({ ...formBanner, bgUrl: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* CONTAGEM REGRESSIVA (COUNTDOWN) */}
            <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">Contagem Regressiva no Banner</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formBanner.countdownEnabled}
                    onChange={(e) => setFormBanner({ ...formBanner, countdownEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-400"></div>
                </label>
              </div>

              {formBanner.countdownEnabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Data e Hora Alvo *</label>
                    <input
                      type="datetime-local"
                      value={formBanner.countdownTargetDate ? formBanner.countdownTargetDate.slice(0, 16) : '2026-02-14T14:00'}
                      onChange={(e) => setFormBanner({ ...formBanner, countdownTargetDate: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Rótulo do Cronômetro</label>
                    <input
                      type="text"
                      placeholder="Ex: Virada de Lote em:"
                      value={formBanner.countdownLabel || ''}
                      onChange={(e) => setFormBanner({ ...formBanner, countdownLabel: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* BOTÕES DE AÇÃO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Botão Principal (Texto)</label>
                <input
                  type="text"
                  placeholder="Ex: Garantir VIP"
                  value={formBanner.primaryButtonText || ''}
                  onChange={(e) => setFormBanner({ ...formBanner, primaryButtonText: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                />
                <select
                  value={formBanner.primaryButtonAction || 'open_lead_vip'}
                  onChange={(e) => setFormBanner({ ...formBanner, primaryButtonAction: e.target.value as any })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-300 mt-1.5"
                >
                  <option value="open_lead_vip">Abrir Formulário VIP / Ingressos</option>
                  <option value="open_deck">Abrir Book Comercial em Slides</option>
                  <option value="scroll_schedule">Rolar até a Programação dos Blocos</option>
                  <option value="custom_url">Link Externo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Botão Secundário (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Ver Programação"
                  value={formBanner.secondaryButtonText || ''}
                  onChange={(e) => setFormBanner({ ...formBanner, secondaryButtonText: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                />
                <select
                  value={formBanner.secondaryButtonAction || 'scroll_schedule'}
                  onChange={(e) => setFormBanner({ ...formBanner, secondaryButtonAction: e.target.value as any })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-300 mt-1.5"
                >
                  <option value="scroll_schedule">Rolar até a Programação dos Blocos</option>
                  <option value="open_deck">Abrir Book Comercial em Slides</option>
                  <option value="open_lead_vip">Abrir Formulário VIP</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setIsCreatingNew(false);
                  setEditingBanner(null);
                }}
                className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                Salvar e Aplicar Banner
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SECTION 3: LISTA DE BANNERS CADASTRADOS */}
      {!isCreatingNew && !editingBanner && (
        <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-wider text-white">
            Banners Cadastrados no Site ({banners.length})
          </h5>

          <div className="space-y-3">
            {banners.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{b.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 capitalize font-mono">
                      {b.layout.replace('_', ' ')}
                    </span>
                    {b.countdownEnabled && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Contagem Ativa</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-1">{b.subtitle}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleToggleBanner(b.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                      b.active
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    {b.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{b.active ? 'Ativo' : 'Oculto'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setFormBanner(b);
                      setEditingBanner(b);
                      setIsCreatingNew(false);
                    }}
                    className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg cursor-pointer"
                    title="Editar Banner"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteBanner(b.id)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 cursor-pointer"
                    title="Excluir Banner"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaLibraryModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        mediaItems={mediaItems}
        onAddMedia={onAddMedia}
        onDeleteMedia={onDeleteMedia}
        selectionTitle="Escolher Fundo do Banner"
        onSelectMedia={(media) => {
          setFormBanner({
            ...formBanner,
            bgType: media.type,
            bgUrl: media.url,
          });
          setIsMediaPickerOpen(false);
        }}
      />
    </div>
  );
};
