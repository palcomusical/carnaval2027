import React, { useState } from 'react';
import { 
  Layers, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Palette, 
  Image as ImageIcon, 
  Video, 
  CheckCircle2, 
  Sparkles, 
  Edit3,
  Sliders,
  Layout
} from 'lucide-react';
import { PageSectionConfig, MediaItem, CustomSectionData } from '../../types';
import { MediaLibraryModal } from '../MediaLibraryModal';

interface VisualBuilderTabProps {
  sections: PageSectionConfig[];
  onSaveSections: (sections: PageSectionConfig[]) => void;
  mediaItems: MediaItem[];
  onAddMedia: (item: MediaItem) => void;
  onDeleteMedia: (id: string) => void;
}

export const VisualBuilderTab: React.FC<VisualBuilderTabProps> = ({
  sections,
  onSaveSections,
  mediaItems,
  onAddMedia,
  onDeleteMedia,
}) => {
  const [editingSectionBg, setEditingSectionBg] = useState<PageSectionConfig | null>(null);
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [editingCustomSection, setEditingCustomSection] = useState<PageSectionConfig | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'section_bg' | 'custom_media'>('section_bg');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Custom Section Form
  const [customForm, setCustomForm] = useState<CustomSectionData>({
    title: 'Nova Seção Especial do Carnaval',
    subtitle: 'Subtítulo complementar da nova atração',
    badge: 'NOVIDADE 2026',
    contentDescription: 'Descrição detalhada dos atrativos, comodidades ou serviços oferecidos nesta área do circuito.',
    layoutStyle: 'split',
    features: ['Acesso prioritário', 'Espaço climatizado', 'Atendimento exclusivo'],
    buttonText: 'Cadastrar Interesse',
    buttonAction: 'open_lead_vip',
  });
  const [customFeatureInput, setCustomFeatureInput] = useState('');

  // Sorter helpers
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const sorted = [...sections].sort((a, b) => a.order - b.order);
    const temp = sorted[index].order;
    sorted[index].order = sorted[index - 1].order;
    sorted[index - 1].order = temp;
    onSaveSections(sorted);
    triggerSuccess();
  };

  const handleMoveDown = (index: number) => {
    const sorted = [...sections].sort((a, b) => a.order - b.order);
    if (index === sorted.length - 1) return;
    const temp = sorted[index].order;
    sorted[index].order = sorted[index + 1].order;
    sorted[index + 1].order = temp;
    onSaveSections(sorted);
    triggerSuccess();
  };

  const handleToggleSection = (id: string) => {
    const updated = sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s));
    onSaveSections(updated);
    triggerSuccess();
  };

  const handleDeleteSection = (id: string) => {
    if (window.confirm('Excluir esta seção personalizada?')) {
      const updated = sections.filter((s) => s.id !== id);
      onSaveSections(updated);
      triggerSuccess();
    }
  };

  const triggerSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSaveCustomSection = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCustomSection) {
      const updated = sections.map((s) =>
        s.id === editingCustomSection.id
          ? {
              ...s,
              name: customForm.title,
              customSectionData: customForm,
            }
          : s
      );
      onSaveSections(updated);
    } else {
      const newSec: PageSectionConfig = {
        id: `custom-sec-${Date.now()}`,
        name: customForm.title,
        category: 'custom',
        enabled: true,
        order: sections.length + 1,
        bgType: 'default',
        customSectionData: customForm,
      };
      onSaveSections([...sections, newSec]);
    }

    setIsCreatingCustom(false);
    setEditingCustomSection(null);
    triggerSuccess();
  };

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Feedback Alert */}
      {saveSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Ordem e visual das seções atualizados com sucesso no site!</span>
        </div>
      )}

      {/* Top Banner & Fast Actions */}
      <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-display">
              Organizador Visual de Seções da Página
            </h4>
            <p className="text-xs text-neutral-400">
              Troque a ordem das seções (▲ Subir / ▼ Descer), altere cores ou fotos de fundo, oculte seções ou crie novas áreas personalizadas.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setCustomForm({
              title: 'Nova Seção Especial do Carnaval',
              subtitle: 'Subtítulo da atração',
              badge: 'DESTAQUE',
              contentDescription: 'Conteúdo descritivo da nova seção criada pelo gestor.',
              layoutStyle: 'split',
              features: ['Ativação exclusiva', 'Espaço VIP', 'Conforto total'],
              buttonText: 'Garantir Acesso',
              buttonAction: 'open_lead_vip',
            });
            setIsCreatingCustom(true);
            setEditingCustomSection(null);
          }}
          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-center whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>+ Criar Nova Seção</span>
        </button>
      </div>

      {/* FORMULÁRIO DE NOVA SEÇÃO CUSTOMIZADA */}
      {isCreatingCustom && (
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-5 max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{editingCustomSection ? 'Editar Seção Personalizada' : 'Criar Nova Seção no Site'}</span>
            </h5>
            <button
              onClick={() => {
                setIsCreatingCustom(false);
                setEditingCustomSection(null);
              }}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSaveCustomSection} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Título da Seção *</label>
                <input
                  type="text"
                  required
                  value={customForm.title}
                  onChange={(e) => setCustomForm({ ...customForm, title: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Selo / Tag</label>
                <input
                  type="text"
                  placeholder="Ex: NOVIDADE"
                  value={customForm.badge || ''}
                  onChange={(e) => setCustomForm({ ...customForm, badge: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Subtítulo</label>
              <input
                type="text"
                value={customForm.subtitle || ''}
                onChange={(e) => setCustomForm({ ...customForm, subtitle: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Descrição / Texto Completo</label>
              <textarea
                rows={3}
                required
                value={customForm.contentDescription}
                onChange={(e) => setCustomForm({ ...customForm, contentDescription: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            {/* MÍDIA LATERAL */}
            <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Foto ou Vídeo da Seção</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMediaPickerTarget('custom_media');
                    setIsMediaPickerOpen(true);
                  }}
                  className="px-2.5 py-1 bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg cursor-pointer"
                >
                  Escolher na Biblioteca
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <select
                    value={customForm.mediaType || 'image'}
                    onChange={(e) => setCustomForm({ ...customForm, mediaType: e.target.value as any })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-1.5 text-xs text-white"
                  >
                    <option value="image">Imagem</option>
                    <option value="video">Vídeo</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="URL da mídia"
                    value={customForm.mediaUrl || ''}
                    onChange={(e) => setCustomForm({ ...customForm, mediaUrl: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* DIFERENCIAIS */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Itens de Destaque (Checkmarks)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Ex: Barbearia e Maquiagem express"
                  value={customFeatureInput}
                  onChange={(e) => setCustomFeatureInput(e.target.value)}
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customFeatureInput.trim()) {
                      setCustomForm({
                        ...customForm,
                        features: [...(customForm.features || []), customFeatureInput.trim()],
                      });
                      setCustomFeatureInput('');
                    }
                  }}
                  className="px-3 py-1.5 bg-neutral-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Adicionar
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {customForm.features?.map((f, idx) => (
                  <span key={idx} className="px-2 py-1 bg-neutral-900 rounded-lg border border-neutral-800 text-[11px] text-neutral-300 flex items-center gap-1.5">
                    <span>{f}</span>
                    <button
                      type="button"
                      onClick={() => setCustomForm({
                        ...customForm,
                        features: customForm.features?.filter((_, i) => i !== idx),
                      })}
                      className="text-neutral-500 hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* BOTÃO DE AÇÃO */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Texto do Botão</label>
                <input
                  type="text"
                  placeholder="Ex: Saiba Mais"
                  value={customForm.buttonText || ''}
                  onChange={(e) => setCustomForm({ ...customForm, buttonText: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Ação ao Clicar</label>
                <select
                  value={customForm.buttonAction || 'open_lead_vip'}
                  onChange={(e) => setCustomForm({ ...customForm, buttonAction: e.target.value as any })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="open_lead_vip">Abrir Formulário VIP</option>
                  <option value="open_deck">Abrir Book Comercial em Slides</option>
                  <option value="custom_url">Link Externo</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setIsCreatingCustom(false);
                  setEditingCustomSection(null);
                }}
                className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                Salvar Seção
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DRAWER / MODAL DE BACKGROUND DE SEÇÃO */}
      {editingSectionBg && (
        <div className="fixed inset-0 z-80 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <h5 className="text-sm font-bold text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-400" />
                <span>Background da Seção: {editingSectionBg.name}</span>
              </h5>
              <button onClick={() => setEditingSectionBg(null)} className="text-neutral-400 hover:text-white">
                ×
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Tipo de Background</label>
                <select
                  value={editingSectionBg.bgType || 'default'}
                  onChange={(e) => setEditingSectionBg({ ...editingSectionBg, bgType: e.target.value as any })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="default">Padrão Escuro do Site</option>
                  <option value="color">Cor Sólida Personalizada</option>
                  <option value="image">Imagem de Fundo (Biblioteca)</option>
                  <option value="video">Vídeo em Loop (Biblioteca)</option>
                </select>
              </div>

              {editingSectionBg.bgType === 'color' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Código da Cor (Hex ou RGB)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingSectionBg.bgValue || '#0a0a0a'}
                      onChange={(e) => setEditingSectionBg({ ...editingSectionBg, bgValue: e.target.value })}
                      className="w-10 h-8 rounded bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={editingSectionBg.bgValue || '#0a0a0a'}
                      onChange={(e) => setEditingSectionBg({ ...editingSectionBg, bgValue: e.target.value })}
                      className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              )}

              {(editingSectionBg.bgType === 'image' || editingSectionBg.bgType === 'video') && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-neutral-300">URL da Mídia de Fundo</label>
                    <button
                      type="button"
                      onClick={() => {
                        setMediaPickerTarget('section_bg');
                        setIsMediaPickerOpen(true);
                      }}
                      className="text-xs text-amber-400 hover:underline font-bold"
                    >
                      Abrir Biblioteca de Mídia
                    </button>
                  </div>
                  <input
                    type="text"
                    value={editingSectionBg.bgValue || ''}
                    onChange={(e) => setEditingSectionBg({ ...editingSectionBg, bgValue: e.target.value })}
                    placeholder="https://exemplo.com/fundo.jpg"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setEditingSectionBg(null)}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  const updated = sections.map((s) => (s.id === editingSectionBg.id ? editingSectionBg : s));
                  onSaveSections(updated);
                  setEditingSectionBg(null);
                  triggerSuccess();
                }}
                className="px-4 py-1.5 bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg cursor-pointer"
              >
                Aplicar Background
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LISTA COMPLETA DE SEÇÕES COM REORDENAÇÃO (▲/▼) */}
      <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Ordem das Seções na Página ({sortedSections.length})
            </h5>
            <p className="text-xs text-neutral-400 mt-0.5">
              Use os botões de subir (▲) e descer (▼) para trocar seções de lugar. O site atualiza na hora.
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {sortedSections.map((sec, index) => {
            const isFirst = index === 0;
            const isLast = index === sortedSections.length - 1;

            return (
              <div
                key={sec.id}
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  sec.enabled
                    ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                    : 'bg-neutral-950/60 border-neutral-900 opacity-60'
                }`}
              >
                {/* Section Details */}
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-xs font-black text-amber-400 font-mono shrink-0">
                    {index + 1}º
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{sec.name}</span>
                      <span className={`text-[10px] px-2 py-0.2 rounded font-mono ${
                        sec.category === 'custom'
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : sec.category === 'banner'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {sec.category}
                      </span>
                      {sec.bgType && sec.bgType !== 'default' && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono capitalize">
                          fundo: {sec.bgType}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      ID: #{sec.id}
                    </span>
                  </div>
                </div>

                {/* Actions: Reorder + Background + Visibility */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {/* Reorder Buttons */}
                  <div className="flex items-center bg-neutral-950 rounded-lg border border-neutral-800 p-0.5">
                    <button
                      type="button"
                      disabled={isFirst}
                      onClick={() => handleMoveUp(index)}
                      className={`p-1.5 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer ${
                        isFirst ? 'opacity-30 cursor-not-allowed' : 'hover:bg-neutral-800'
                      }`}
                      title="Mover para Cima (▲)"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={isLast}
                      onClick={() => handleMoveDown(index)}
                      className={`p-1.5 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer ${
                        isLast ? 'opacity-30 cursor-not-allowed' : 'hover:bg-neutral-800'
                      }`}
                      title="Mover para Baixo (▼)"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Change Background Button */}
                  <button
                    type="button"
                    onClick={() => setEditingSectionBg(sec)}
                    className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer"
                    title="Mudar Imagem/Cor de Fundo"
                  >
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Fundo</span>
                  </button>

                  {/* Toggle Visibility */}
                  <button
                    type="button"
                    onClick={() => handleToggleSection(sec.id)}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                      sec.enabled
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-neutral-800 text-neutral-500'
                    }`}
                    title={sec.enabled ? 'Seção visível no site' : 'Seção oculta'}
                  >
                    {sec.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* If custom, allow edit / delete */}
                  {sec.category === 'custom' && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          if (sec.customSectionData) {
                            setCustomForm(sec.customSectionData);
                            setEditingCustomSection(sec);
                            setIsCreatingCustom(true);
                          }
                        }}
                        className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg cursor-pointer"
                        title="Editar Conteúdo"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteSection(sec.id)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 cursor-pointer"
                        title="Excluir Seção"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Media Picker Modal */}
      <MediaLibraryModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        mediaItems={mediaItems}
        onAddMedia={onAddMedia}
        onDeleteMedia={onDeleteMedia}
        selectionTitle={mediaPickerTarget === 'section_bg' ? 'Escolher Fundo da Seção' : 'Escolher Imagem/Vídeo da Seção'}
        onSelectMedia={(media) => {
          if (mediaPickerTarget === 'section_bg' && editingSectionBg) {
            setEditingSectionBg({
              ...editingSectionBg,
              bgType: media.type,
              bgValue: media.url,
            });
          } else if (mediaPickerTarget === 'custom_media') {
            setCustomForm({
              ...customForm,
              mediaUrl: media.url,
              mediaType: media.type,
            });
          }
          setIsMediaPickerOpen(false);
        }}
      />
    </div>
  );
};
