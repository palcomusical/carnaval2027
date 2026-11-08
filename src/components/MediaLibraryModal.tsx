import React, { useState } from 'react';
import { 
  X, 
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
  Filter 
} from 'lucide-react';
import { MediaItem } from '../types';

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItems: MediaItem[];
  onAddMedia: (item: MediaItem) => void;
  onDeleteMedia: (id: string) => void;
  onSelectMedia?: (media: MediaItem) => void;
  selectionTitle?: string;
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onClose,
  mediaItems,
  onAddMedia,
  onDeleteMedia,
  onSelectMedia,
  selectionTitle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);

  // Form for new media
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'image' | 'video'>('image');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState<MediaItem['category']>('background');
  const [newTags, setNewTags] = useState('');

  if (!isOpen) return null;

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

  const filteredMedia = mediaItems.filter((item) => {
    const matchCat = selectedCategory === 'todos' || item.category === selectedCategory || (selectedCategory === 'video' && item.type === 'video');
    const q = searchQuery.toLowerCase();
    const matchSearch = item.title.toLowerCase().includes(q) || item.tags?.some((t) => t.includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/85 backdrop-blur-md">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-5xl h-[88vh] max-h-[850px] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Biblioteca de Mídia Oficial
                </h3>
                {onSelectMedia && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-400 text-neutral-950 rounded uppercase tracking-wider">
                    {selectionTitle || 'Modo Seleção'}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400">
                Imagens em alta definição e vídeos para backgrounds, trios, camarotes e banners.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingNew ? 'Ver Galeria' : 'Adicionar Mídia'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar & Filters (When not adding new) */}
        {!isAddingNew && (
          <div className="px-5 py-3 bg-neutral-950/70 border-b border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            {/* Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {[
                { id: 'todos', label: 'Todas' },
                { id: 'background', label: 'Backgrounds' },
                { id: 'trio', label: 'Trios & Blocos' },
                { id: 'camarote', label: 'Camarotes VIP' },
                { id: 'gastronomia', label: 'Gastronomia' },
                { id: 'video', label: 'Vídeos / Teasers' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-amber-400 text-neutral-950 font-bold'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar por tag ou título..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5">
          {isAddingNew ? (
            /* Formulário de Adicionar Nova Mídia */
            <div className="max-w-xl mx-auto p-6 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Cadastrar Nova Imagem ou Vídeo</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Voltar para galeria
                </button>
              </div>

              <form onSubmit={handleCreateMedia} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Título da Mídia *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Pôr do sol no trio elétrico principal"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">Tipo de Mídia</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as any)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="image">Imagem (JPG, PNG, WebP)</option>
                      <option value="video">Vídeo (MP4, WebM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">Categoria</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="background">Background / Hero</option>
                      <option value="trio">Trio Elétrico / Bloco</option>
                      <option value="camarote">Camarote VIP</option>
                      <option value="gastronomia">Gastronomia</option>
                      <option value="video">Vídeo / Teaser</option>
                      <option value="geral">Geral</option>
                    </select>
                  </div>
                </div>

                {/* Upload or Link */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-neutral-400">Origem da Mídia</label>
                  
                  {/* Local file input */}
                  <div className="p-3 bg-neutral-900/60 border border-dashed border-neutral-700 rounded-xl text-center">
                    <label className="cursor-pointer block">
                      <Upload className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                      <span className="text-xs text-neutral-300 font-semibold block">Fazer upload do seu computador</span>
                      <span className="text-[10px] text-neutral-500 block">Selecione uma imagem ou vídeo local</span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Or URL input */}
                  <div>
                    <span className="text-[11px] text-neutral-500 block my-1">Ou cole o link direto (URL):</span>
                    <input
                      type="url"
                      placeholder="https://exemplo.com/carnaval-foto.jpg ou .mp4"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>

                {/* Preview if URL filled */}
                {newUrl && (
                  <div className="p-2 bg-neutral-900 rounded-xl border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block mb-1">Prévia do Arquivo:</span>
                    <div className="rounded-lg overflow-hidden aspect-video bg-neutral-950 flex items-center justify-center">
                      {newType === 'video' ? (
                        <video src={newUrl} controls className="max-h-40 w-auto" />
                      ) : (
                        <img src={newUrl} alt="Preview" className="max-h-40 w-auto object-contain" />
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Tags (separadas por vírgula)</label>
                  <input
                    type="text"
                    placeholder="carnaval, trio, folia, open-bar"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
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
            /* Grade de Mídias */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.length === 0 ? (
                <div className="col-span-full py-16 text-center text-neutral-500">
                  <ImageIcon className="w-10 h-10 mx-auto mb-2 text-neutral-600" />
                  <p className="text-sm font-semibold text-neutral-400">Nenhuma mídia encontrada com os filtros atuais.</p>
                  <p className="text-xs text-neutral-600 mt-1">Clique em "+ Adicionar Mídia" para incluir fotos e vídeos.</p>
                </div>
              ) : (
                filteredMedia.map((media) => (
                  <div
                    key={media.id}
                    className="group relative bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden flex flex-col hover:border-amber-400/60 transition-all shadow-md"
                  >
                    {/* Media Thumbnail */}
                    <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                      {media.type === 'video' ? (
                        <div className="relative w-full h-full">
                          <video
                            src={media.url}
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
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
                        {media.type === 'video' ? <Video className="w-3 h-3 text-amber-400" /> : <ImageIcon className="w-3 h-3 text-amber-400" />}
                        <span>{media.type}</span>
                      </span>

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2 backdrop-blur-xs">
                        {onSelectMedia ? (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectMedia(media);
                              onClose();
                            }}
                            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-lg cursor-pointer transform scale-95 group-hover:scale-100 transition-transform"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Selecionar</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setPreviewMedia(media)}
                            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Visualizar</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Info */}
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
                          onClick={() => {
                            navigator.clipboard.writeText(media.url);
                            alert('URL copiada para a área de transferência!');
                          }}
                          className="text-[10px] text-amber-400 hover:underline font-mono truncate max-w-[120px] text-left cursor-pointer"
                          title="Clique para copiar URL"
                        >
                          Copiar URL
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Excluir a mídia "${media.title}"?`)) {
                              onDeleteMedia(media.id);
                            }
                          }}
                          className="p-1 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Excluir da biblioteca"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Modal de Pré-visualização Ampliada */}
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
                {onSelectMedia && (
                  <button
                    onClick={() => {
                      onSelectMedia(previewMedia);
                      setPreviewMedia(null);
                      onClose();
                    }}
                    className="px-4 py-1.5 bg-amber-400 text-neutral-950 font-bold rounded-lg cursor-pointer"
                  >
                    Usar esta Mídia
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
