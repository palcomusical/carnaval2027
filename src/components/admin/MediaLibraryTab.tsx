import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Video, 
  Plus, 
  Upload, 
  Search, 
  Check, 
  Trash2, 
  ExternalLink, 
  Play, 
  Sparkles, 
  Copy,
  Eye,
  X
} from 'lucide-react';
import { MediaItem, SiteSettings } from '../../types';

interface MediaLibraryTabProps {
  mediaItems: MediaItem[];
  onAddMedia: (item: MediaItem) => void;
  onDeleteMedia: (id: string) => void;
  siteSettings: SiteSettings;
  onSaveSiteSettings: (settings: SiteSettings) => void;
  onSelectForBackground?: (url: string, type: 'image' | 'video') => void;
}

export const MediaLibraryTab: React.FC<MediaLibraryTabProps> = ({
  mediaItems,
  onAddMedia,
  onDeleteMedia,
  siteSettings,
  onSaveSiteSettings,
  onSelectForBackground,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);
  const [copySuccessId, setCopySuccessId] = useState<string | null>(null);

  // New media form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'image' | 'video'>('image');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState<MediaItem['category']>('background');
  const [newTags, setNewTags] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    setNewType(isVideo ? 'video' : 'image');
    if (!newTitle) {
      setNewTitle(file.name.replace(/\.[^/.]+$/, ''));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setNewUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    const newItem: MediaItem = {
      id: `media-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      url: newUrl.trim(),
      category: newCategory,
      tags: newTags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean),
      addedAt: new Date().toISOString(),
    };

    onAddMedia(newItem);
    setIsAddingNew(false);
    setNewTitle('');
    setNewUrl('');
    setNewTags('');
  };

  const handleSetHeroBackground = (media: MediaItem) => {
    onSaveSiteSettings({
      ...siteSettings,
      heroBackgroundUrl: media.url,
      heroBackgroundType: media.type,
    });
    alert(`Mídia "${media.title}" definida como background oficial do Hero!`);
  };

  const handleCopyUrl = (media: MediaItem) => {
    navigator.clipboard.writeText(media.url);
    setCopySuccessId(media.id);
    setTimeout(() => setCopySuccessId(null), 2000);
  };

  const filteredMedia = mediaItems.filter((item) => {
    const matchCat =
      selectedCategory === 'todos' ||
      item.category === selectedCategory ||
      (selectedCategory === 'video' && item.type === 'video');
    const q = searchQuery.toLowerCase();
    const matchSearch = item.title.toLowerCase().includes(q) || item.tags?.some((t) => t.includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Fast Actions */}
      <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-display">
              Biblioteca de Mídia (Imagens & Vídeos)
            </h4>
            <p className="text-xs text-neutral-400">
              Faça upload ou insira URLs de vídeos em loop e fotografias para alterar backgrounds, banners e seções do site.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-center whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>{isAddingNew ? 'Ver Todas as Mídias' : '+ Adicionar Mídia'}</span>
        </button>
      </div>

      {/* Form de Upload/Adicionar Mídia */}
      {isAddingNew ? (
        <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-amber-400" />
              <span>Nova Imagem ou Vídeo para o Site</span>
            </h5>
            <button
              onClick={() => setIsAddingNew(false)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleCreateMedia} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Título da Mídia *</label>
              <input
                type="text"
                required
                placeholder="Ex: Pôr do sol no Trio Trovoada com Confetes"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Tipo de Mídia</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="image">Imagem (JPG, PNG, WebP)</option>
                  <option value="video">Vídeo (MP4, WebM)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Categoria</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="background">Background / Fundo</option>
                  <option value="trio">Trio Elétrico / Bloco</option>
                  <option value="camarote">Camarote VIP</option>
                  <option value="gastronomia">Gastronomia</option>
                  <option value="video">Vídeo Teaser / Aftermovie</option>
                  <option value="geral">Geral</option>
                </select>
              </div>
            </div>

            {/* Local Upload ou URL */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-300">Arquivo ou Link</label>
              <div className="p-4 bg-neutral-900/60 border border-dashed border-neutral-700 rounded-xl text-center">
                <label className="cursor-pointer block">
                  <Upload className="w-6 h-6 text-amber-400 mx-auto mb-1.5" />
                  <span className="text-xs text-neutral-200 font-bold block">Fazer upload de foto ou vídeo do seu computador</span>
                  <span className="text-[11px] text-neutral-500 block">Arquivos locais convertidos instantaneamente para uso no site</span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <span className="text-[11px] text-neutral-400 block my-1">Ou cole uma URL direta da internet:</span>
                <input
                  type="url"
                  placeholder="https://exemplo.com/carnaval.jpg ou .mp4"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>

            {newUrl && (
              <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block mb-1">Prévia:</span>
                <div className="rounded-lg overflow-hidden aspect-video bg-neutral-950 flex items-center justify-center">
                  {newType === 'video' ? (
                    <video src={newUrl} controls className="max-h-36 w-auto" />
                  ) : (
                    <img src={newUrl} alt="Preview" className="max-h-36 w-auto object-contain" />
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Tags (separadas por vírgula)</label>
              <input
                type="text"
                placeholder="carnaval, trio, folia, open-bar"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                Salvar na Biblioteca
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {[
                { id: 'todos', label: 'Todas as Mídias' },
                { id: 'background', label: 'Backgrounds' },
                { id: 'video', label: 'Vídeos / Teasers' },
                { id: 'trio', label: 'Trios & Blocos' },
                { id: 'camarote', label: 'Camarotes VIP' },
                { id: 'gastronomia', label: 'Gastronomia' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-amber-400 text-neutral-950 shadow-sm'
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar por tag ou título..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMedia.map((media) => {
              const isCurrentHero =
                siteSettings.heroBackgroundUrl === media.url ||
                (!siteSettings.heroBackgroundUrl && media.id === 'media-01');

              return (
                <div
                  key={media.id}
                  className={`group relative bg-neutral-950 rounded-2xl border overflow-hidden flex flex-col transition-all shadow-md ${
                    isCurrentHero ? 'border-amber-400 ring-1 ring-amber-400' : 'border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {/* Thumbnail / Video */}
                  <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                    {media.type === 'video' ? (
                      <div className="relative w-full h-full">
                        <video src={media.url} muted playsInline className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shadow-lg">
                            <Play className="w-4 h-4 fill-neutral-950 ml-0.5" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={media.url}
                        alt={media.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Type Badge */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-neutral-950/80 text-white backdrop-blur-xs flex items-center gap-1 border border-neutral-700/80">
                      {media.type === 'video' ? (
                        <Video className="w-3 h-3 text-amber-400" />
                      ) : (
                        <ImageIcon className="w-3 h-3 text-amber-400" />
                      )}
                      <span>{media.type}</span>
                    </span>

                    {isCurrentHero && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-400 text-neutral-950 shadow-md">
                        Hero Ativo
                      </span>
                    )}

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-neutral-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3 backdrop-blur-xs">
                      <button
                        type="button"
                        onClick={() => handleSetHeroBackground(media)}
                        className="w-full py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Definir no Hero</span>
                      </button>

                      {onSelectForBackground && (
                        <button
                          type="button"
                          onClick={() => onSelectForBackground(media.url, media.type)}
                          className="w-full py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                          <span>Usar nesta Seção</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setPreviewMedia(media)}
                        className="w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver em Alta Resolução</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-white truncate" title={media.title}>
                        {media.title}
                      </h5>
                      <span className="text-[10px] text-neutral-400 capitalize block mt-0.5">
                        {media.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-900 mt-2">
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(media)}
                        className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                        title="Copiar link direto"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copySuccessId === media.id ? 'Copiado!' : 'Copiar Link'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Excluir "${media.title}" da biblioteca?`)) {
                            onDeleteMedia(media.id);
                          }
                        }}
                        className="p-1 text-neutral-500 hover:text-red-400 cursor-pointer"
                        title="Excluir da biblioteca"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Preview Modal */}
      {previewMedia && (
        <div className="fixed inset-0 z-80 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-md">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">{previewMedia.title}</h4>
              <button onClick={() => setPreviewMedia(null)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden aspect-video bg-black flex items-center justify-center">
              {previewMedia.type === 'video' ? (
                <video src={previewMedia.url} controls autoPlay className="w-full h-full object-contain" />
              ) : (
                <img src={previewMedia.url} alt={previewMedia.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
              <span className="font-mono truncate max-w-md">{previewMedia.url}</span>
              <button
                onClick={() => {
                  handleSetHeroBackground(previewMedia);
                  setPreviewMedia(null);
                }}
                className="px-4 py-1.5 bg-amber-400 text-neutral-950 font-bold rounded-lg cursor-pointer"
              >
                Definir como Fundo do Hero
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
