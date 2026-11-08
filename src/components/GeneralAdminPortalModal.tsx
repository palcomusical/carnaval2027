import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Trash2, 
  Filter, 
  UserCheck, 
  Building2, 
  Utensils, 
  Camera, 
  Search, 
  AlertCircle,
  Settings,
  Bot,
  Sliders,
  Sparkles,
  Save,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Phone,
  Mail,
  Plus,
  RefreshCw,
  Bell,
  Clock,
  Layers,
  Users,
  Layout,
  Image as ImageIcon,
  Video
} from 'lucide-react';
import { 
  Lead, 
  LeadCategory, 
  LeadStatus, 
  BotConfig, 
  SiteSettings, 
  Bloco, 
  FaqItem, 
  PageSectionConfig, 
  DynamicBanner, 
  MediaItem 
} from '../types';
import { VisualBuilderTab } from './admin/VisualBuilderTab';
import { BannersManagerTab } from './admin/BannersManagerTab';
import { MediaLibraryTab } from './admin/MediaLibraryTab';

interface GeneralAdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onUpdateLead: (lead: Lead) => void;
  onDeleteLead: (leadId: string) => void;
  onClearLeads: () => void;
  botConfig: BotConfig;
  onSaveBotConfig: (config: BotConfig) => void;
  siteSettings: SiteSettings;
  onSaveSiteSettings: (settings: SiteSettings) => void;
  blocos: Bloco[];
  onSaveBlocos: (blocos: Bloco[]) => void;
  faqItems: FaqItem[];
  onSaveFaqItems: (faq: FaqItem[]) => void;
  sections: PageSectionConfig[];
  onSaveSections: (sections: PageSectionConfig[]) => void;
  banners: DynamicBanner[];
  onSaveBanners: (banners: DynamicBanner[]) => void;
  mediaItems: MediaItem[];
  onSaveMediaItems: (items: MediaItem[]) => void;
}

export const GeneralAdminPortalModal: React.FC<GeneralAdminPortalModalProps> = ({
  isOpen,
  onClose,
  leads,
  onUpdateLead,
  onDeleteLead,
  onClearLeads,
  botConfig,
  onSaveBotConfig,
  siteSettings,
  onSaveSiteSettings,
  blocos,
  onSaveBlocos,
  faqItems,
  onSaveFaqItems,
  sections,
  onSaveSections,
  banners,
  onSaveBanners,
  mediaItems,
  onSaveMediaItems,
}) => {
  // Navigation tabs: 'crm' | 'visual_builder' | 'banners' | 'media_library' | 'conteudos' | 'bot' | 'settings' | 'metrics'
  const [activeTab, setActiveTab] = useState<'crm' | 'visual_builder' | 'banners' | 'media_library' | 'conteudos' | 'bot' | 'settings' | 'metrics'>('crm');

  // Blocos & Content state
  const [blocosList, setBlocosList] = useState(blocos);
  const [editingBloco, setEditingBloco] = useState<import('../types').Bloco | null>(null);
  const [contentSavedSuccess, setContentSavedSuccess] = useState(false);
  const [faqListState, setFaqListState] = useState(faqItems);
  const [editingFaq, setEditingFaq] = useState<import('../types').FaqItem | null>(null);

  // CRM State
  const [crmCategoryFilter, setCrmCategoryFilter] = useState<string>('todos');
  const [crmStatusFilter, setCrmStatusFilter] = useState<string>('todos');
  const [crmSearch, setCrmSearch] = useState('');
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // Bot Config Form State
  const [botForm, setBotForm] = useState<BotConfig>(botConfig);
  const [newQuickLabel, setNewQuickLabel] = useState('');
  const [newQuickAnswer, setNewQuickAnswer] = useState('');
  const [botSavedSuccess, setBotSavedSuccess] = useState(false);

  // Site Settings Form State
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(siteSettings);
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setBlocosList(blocos);
      setFaqListState(faqItems);
      setBotForm(botConfig);
      setSettingsForm(siteSettings);
    }
  }, [isOpen, blocos, faqItems, botConfig, siteSettings]);

  if (!isOpen) return null;

  // CRM Filters
  const filteredLeads = leads.filter((lead) => {
    const matchCat = crmCategoryFilter === 'todos' || lead.category === crmCategoryFilter;
    const matchStatus = crmStatusFilter === 'todos' || (lead.status || 'novo') === crmStatusFilter;
    const searchLow = crmSearch.toLowerCase();
    const matchSearch =
      lead.name.toLowerCase().includes(searchLow) ||
      lead.email.toLowerCase().includes(searchLow) ||
      lead.phone.includes(crmSearch) ||
      (lead.companyOrRole && lead.companyOrRole.toLowerCase().includes(searchLow));
    return matchCat && matchStatus && matchSearch;
  });

  // CRM Metrics
  const totalLeads = leads.length;
  const sponsorLeads = leads.filter((l) => l.category === 'patrocinador');
  const vipLeads = leads.filter((l) => l.category === 'foliao');
  const foodLeads = leads.filter((l) => l.category === 'gastronomia');
  const pressLeads = leads.filter((l) => l.category === 'imprensa');
  const closedLeads = leads.filter((l) => l.status === 'fechado');
  const totalPipelineEstimated = leads.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);

  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = ['ID', 'Categoria', 'Status', 'Nome', 'Email', 'Telefone', 'Empresa/Papel', 'Interesse', 'Valor Estimado', 'Notas', 'Data de Cadastro'];
    const rows = leads.map((l) => [
      l.id,
      l.category,
      l.status || 'novo',
      `"${l.name.replace(/"/g, '""')}"`,
      l.email,
      l.phone,
      `"${(l.companyOrRole || '').replace(/"/g, '""')}"`,
      `"${(l.interestDetails || l.blocoPreference || '').replace(/"/g, '""')}"`,
      l.estimatedValue || 0,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      new Date(l.createdAt).toLocaleString('pt-BR'),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `crm_carnaval_folia_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveBot = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBotConfig(botForm);
    setBotSavedSuccess(true);
    setTimeout(() => setBotSavedSuccess(false), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSiteSettings(settingsForm);
    setSettingsSavedSuccess(true);
    setTimeout(() => setSettingsSavedSuccess(false), 3000);
  };

  const handleAddMedia = (item: MediaItem) => {
    const updated = [item, ...mediaItems];
    onSaveMediaItems(updated);
  };

  const handleDeleteMedia = (id: string) => {
    const updated = mediaItems.filter((m) => m.id !== id);
    onSaveMediaItems(updated);
  };

  const addQuickReply = () => {
    if (!newQuickLabel.trim() || !newQuickAnswer.trim()) return;
    setBotForm((prev) => ({
      ...prev,
      quickReplies: [...prev.quickReplies, { label: newQuickLabel, answer: newQuickAnswer }],
    }));
    setNewQuickLabel('');
    setNewQuickAnswer('');
  };

  const removeQuickReply = (index: number) => {
    setBotForm((prev) => ({
      ...prev,
      quickReplies: prev.quickReplies.filter((_, idx) => idx !== index),
    }));
  };

  const getStatusBadge = (status?: LeadStatus) => {
    switch (status) {
      case 'fechado':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Fechado</span>;
      case 'proposta_enviada':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">Proposta Enviada</span>;
      case 'em_contato':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Em Contato</span>;
      case 'arquivado':
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-800 text-neutral-400">Arquivado</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">Novo</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/85 backdrop-blur-md">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-6xl h-[92vh] max-h-[880px] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Gestão Geral & Painel Administrativo
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-400 text-neutral-950 rounded uppercase tracking-wider">
                  Admin Master
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Gerencie leads, configure o chatbot com IA, edite mensagens automáticas e atualize dados do site.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Fechar painel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Header */}
        <div className="px-5 pt-3 pb-2 bg-neutral-950/70 border-b border-neutral-800 flex items-center justify-between gap-4 overflow-x-auto shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('crm')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'crm'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>CRM Leads ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('visual_builder')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'visual_builder'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>Visual & Seções (Ordem/Fundo)</span>
            </button>

            <button
              onClick={() => setActiveTab('banners')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'banners'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Layout className="w-4 h-4 shrink-0" />
              <span>Banners & Contagens</span>
            </button>

            <button
              onClick={() => setActiveTab('media_library')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'media_library'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <ImageIcon className="w-4 h-4 shrink-0" />
              <span>Biblioteca de Mídia ({mediaItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('conteudos')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'conteudos'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Sliders className="w-4 h-4 shrink-0" />
              <span>Programação & FAQs</span>
            </button>

            <button
              onClick={() => setActiveTab('bot')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'bot'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Bot className="w-4 h-4 shrink-0" />
              <span>Bot & IA</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${botConfig.mode === 'ia' ? 'bg-amber-500/20 text-amber-300' : 'bg-neutral-800 text-neutral-300'}`}>
                {botConfig.mode === 'ia' ? 'IA' : 'FAQ'}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Dados do Site</span>
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'metrics'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>Métricas</span>
            </button>
          </div>

          {activeTab === 'crm' && (
            <button
              onClick={exportToCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>
          )}
        </div>

        {/* Tab 1: CRM & LEAD PIPELINE */}
        {activeTab === 'crm' && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Filter and Quick Stats Bar */}
            <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex flex-wrap gap-3 items-center justify-between shrink-0">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs text-neutral-500 flex items-center gap-1 shrink-0">
                  <Filter className="w-3 h-3" /> Tipo:
                </span>
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'patrocinador', label: `Patrocinadores (${sponsorLeads.length})` },
                  { id: 'foliao', label: `Foliões VIP (${vipLeads.length})` },
                  { id: 'gastronomia', label: `Food Trucks (${foodLeads.length})` },
                  { id: 'imprensa', label: `Imprensa (${pressLeads.length})` },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCrmCategoryFilter(item.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      crmCategoryFilter === item.id
                        ? 'bg-neutral-800 text-white font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={crmStatusFilter}
                  onChange={(e) => setCrmStatusFilter(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
                >
                  <option value="todos">Todos os Status</option>
                  <option value="novo">Novo</option>
                  <option value="em_contato">Em Contato</option>
                  <option value="proposta_enviada">Proposta Enviada</option>
                  <option value="fechado">Fechado</option>
                  <option value="arquivado">Arquivado</option>
                </select>

                <div className="relative w-48 sm:w-56">
                  <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={crmSearch}
                    onChange={(e) => setCrmSearch(e.target.value)}
                    placeholder="Buscar lead..."
                    className="w-full pl-7 pr-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Table or Edit View */}
            <div className="flex-1 overflow-auto p-4">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-16 text-neutral-500 space-y-2">
                  <AlertCircle className="w-8 h-8 mx-auto text-neutral-600" />
                  <p className="text-sm">Nenhum lead encontrado com os filtros selecionados.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-white text-sm">{lead.name}</span>
                          {getStatusBadge(lead.status)}
                          <span className="text-[10px] text-neutral-500 font-mono">
                            {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                          <span className="flex items-center gap-1 text-neutral-300">
                            <Mail className="w-3 h-3 text-amber-400" />
                            {lead.email}
                          </span>
                          <span className="flex items-center gap-1 font-mono text-neutral-300">
                            <Phone className="w-3 h-3 text-amber-400" />
                            {lead.phone}
                          </span>
                          {lead.companyOrRole && (
                            <span className="font-medium text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded">
                              {lead.companyOrRole}
                            </span>
                          )}
                        </div>

                        {(lead.interestDetails || lead.blocoPreference) && (
                          <p className="text-xs text-neutral-400 italic">
                            "{lead.interestDetails || lead.blocoPreference}"
                          </p>
                        )}
                        {lead.notes && (
                          <div className="text-[11px] text-neutral-300 bg-neutral-900 p-2 rounded-lg border border-neutral-800">
                            <strong>Anotação do Atendimento:</strong> {lead.notes}
                          </div>
                        )}
                      </div>

                      {/* CRM Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        {/* Quick Status Select */}
                        <select
                          value={lead.status || 'novo'}
                          onChange={(e) => {
                            onUpdateLead({
                              ...lead,
                              status: e.target.value as LeadStatus,
                            });
                          }}
                          className="bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
                        >
                          <option value="novo">Novo</option>
                          <option value="em_contato">Em Contato</option>
                          <option value="proposta_enviada">Proposta</option>
                          <option value="fechado">Fechado</option>
                          <option value="arquivado">Arquivado</option>
                        </select>

                        <button
                          onClick={() => setEditingLead(lead)}
                          className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer"
                        >
                          Editar / Notas
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Excluir lead de ${lead.name}?`)) {
                              onDeleteLead(lead.id);
                            }
                          }}
                          className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Editing Lead Drawer / Modal */}
            {editingLead && (
              <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-neutral-950/80">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Editar Lead: {editingLead.name}</h4>
                    <button onClick={() => setEditingLead(null)} className="text-neutral-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Status do Funil</label>
                    <select
                      value={editingLead.status || 'novo'}
                      onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value as LeadStatus })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    >
                      <option value="novo">Novo</option>
                      <option value="em_contato">Em Contato</option>
                      <option value="proposta_enviada">Proposta Enviada</option>
                      <option value="fechado">Fechado (Ganho)</option>
                      <option value="arquivado">Arquivado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Valor Estimado do Negócio (R$)</label>
                    <input
                      type="number"
                      value={editingLead.estimatedValue || ''}
                      onChange={(e) => setEditingLead({ ...editingLead, estimatedValue: Number(e.target.value) })}
                      placeholder="Ex: 50000"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Anotações do Vendedor / Histórico</label>
                    <textarea
                      rows={3}
                      value={editingLead.notes || ''}
                      onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                      placeholder="Ex: Cliente interessado na cota Master, pediu desconto para pagamento à vista..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingLead(null)}
                      className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateLead(editingLead);
                        setEditingLead(null);
                      }}
                      className="px-4 py-1.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: VISUAL & SEÇÕES (ORGANIZADOR DE ORDEM E FUNDO) */}
        {activeTab === 'visual_builder' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-5xl mx-auto">
              <VisualBuilderTab
                sections={sections}
                onSaveSections={onSaveSections}
                mediaItems={mediaItems}
                onAddMedia={handleAddMedia}
                onDeleteMedia={handleDeleteMedia}
              />
            </div>
          </div>
        )}

        {/* Tab: BANNERS & CONTAGENS (LAYOUTS PRÉ-FORMATADOS) */}
        {activeTab === 'banners' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-5xl mx-auto">
              <BannersManagerTab
                banners={banners}
                onSaveBanners={onSaveBanners}
                mediaItems={mediaItems}
                onAddMedia={handleAddMedia}
                onDeleteMedia={handleDeleteMedia}
              />
            </div>
          </div>
        )}

        {/* Tab: BIBLIOTECA DE MÍDIA */}
        {activeTab === 'media_library' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-5xl mx-auto">
              <MediaLibraryTab
                mediaItems={mediaItems}
                onAddMedia={handleAddMedia}
                onDeleteMedia={handleDeleteMedia}
                siteSettings={siteSettings}
                onSaveSiteSettings={onSaveSiteSettings}
              />
            </div>
          </div>
        )}

        {/* Tab: GESTÃO DE CONTEÚDOS (BLOCOS, PROGRAMAÇÃO E FAQS) */}
        {activeTab === 'conteudos' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-start gap-3">
                <Layers className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-300">
                  <strong className="text-white block font-semibold mb-0.5">Gestor Geral de Conteúdos do Site</strong>
                  Edite a programação dos blocos, horários, percursos, atrações e adicione ou remova perguntas frequentes (FAQ) exibidas para o público.
                </div>
              </div>

              {contentSavedSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Conteúdos atualizados e sincronizados com sucesso no site!</span>
                </div>
              )}

              {/* SEÇÃO A: BLOCOS DO CARNAVAL */}
              <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">Blocos & Atrações da Programação</h4>
                    <p className="text-xs text-neutral-400">Gerencie todos os blocos exibidos no Lineup Oficial</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newBloco: import('../types').Bloco = {
                        id: `bloco-${Date.now()}`,
                        name: 'Novo Bloco do Carnaval',
                        artist: 'Atração Musical Principal',
                        day: 'sab',
                        dayLabel: 'Sábado · 14/Fev',
                        date: '14 de Fevereiro',
                        timeConcentracao: '14:00',
                        timeSaida: '15:30',
                        percurso: 'Concentração Praça Central → Avenida da Folia',
                        genre: 'axe',
                        genreLabel: 'Axé & Salvador',
                        expectedCrowd: '50.000 pessoas',
                        description: 'Descrição do bloco carnavalesco e energia da banda.',
                        highlights: ['Trio Elétrico', 'Música ao Vivo'],
                        image: '/src/assets/images/hero_carnaval_rua_1793232039440.jpg',
                      };
                      setEditingBloco(newBloco);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Bloco</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {blocosList.map((bloco) => (
                    <div
                      key={bloco.id}
                      className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-white text-sm">{bloco.name}</strong>
                          <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-mono">
                            {bloco.dayLabel} · {bloco.timeConcentracao}
                          </span>
                        </div>
                        <p className="text-neutral-400 text-xs">
                          {bloco.artist} · <span className="text-neutral-500">{bloco.percurso}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => setEditingBloco(bloco)}
                          className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Excluir o bloco ${bloco.name}?`)) {
                              const updated = blocosList.filter((b) => b.id !== bloco.id);
                              setBlocosList(updated);
                              onSaveBlocos(updated);
                              setContentSavedSuccess(true);
                              setTimeout(() => setContentSavedSuccess(false), 3000);
                            }
                          }}
                          className="p-1 text-neutral-500 hover:text-red-400 cursor-pointer"
                          title="Excluir Bloco"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MODAL / DRAWER DE EDIÇÃO DE BLOCO */}
              {editingBloco && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-neutral-950/85">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                      <h4 className="text-sm font-bold text-white">Editar Bloco: {editingBloco.name}</h4>
                      <button onClick={() => setEditingBloco(null)} className="text-neutral-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Nome do Bloco *</label>
                        <input
                          type="text"
                          value={editingBloco.name}
                          onChange={(e) => setEditingBloco({ ...editingBloco, name: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Atração / Artista *</label>
                        <input
                          type="text"
                          value={editingBloco.artist}
                          onChange={(e) => setEditingBloco({ ...editingBloco, artist: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Dia do Carnaval</label>
                        <select
                          value={editingBloco.day}
                          onChange={(e) => {
                            const d = e.target.value as any;
                            const labels: Record<string, string> = {
                              sab: 'Sábado · 14/Fev',
                              dom: 'Domingo · 15/Fev',
                              seg: 'Segunda · 16/Fev',
                              ter: 'Terça · 17/Fev',
                            };
                            setEditingBloco({ ...editingBloco, day: d, dayLabel: labels[d] || 'Dia de Folia' });
                          }}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-1.5 text-xs text-white"
                        >
                          <option value="sab">Sábado (14/02)</option>
                          <option value="dom">Domingo (15/02)</option>
                          <option value="seg">Segunda (16/02)</option>
                          <option value="ter">Terça (17/02)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Concentração</label>
                        <input
                          type="text"
                          value={editingBloco.timeConcentracao}
                          onChange={(e) => setEditingBloco({ ...editingBloco, timeConcentracao: e.target.value })}
                          placeholder="Ex: 14:00"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Saída do Trio</label>
                        <input
                          type="text"
                          value={editingBloco.timeSaida}
                          onChange={(e) => setEditingBloco({ ...editingBloco, timeSaida: e.target.value })}
                          placeholder="Ex: 15:30"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Percurso / Itinerário</label>
                      <input
                        type="text"
                        value={editingBloco.percurso}
                        onChange={(e) => setEditingBloco({ ...editingBloco, percurso: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Descrição</label>
                      <textarea
                        rows={2}
                        value={editingBloco.description}
                        onChange={(e) => setEditingBloco({ ...editingBloco, description: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setEditingBloco(null)}
                        className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const exists = blocosList.some((b) => b.id === editingBloco.id);
                          const updated = exists
                            ? blocosList.map((b) => (b.id === editingBloco.id ? editingBloco : b))
                            : [...blocosList, editingBloco];
                          setBlocosList(updated);
                          onSaveBlocos(updated);
                          setEditingBloco(null);
                          setContentSavedSuccess(true);
                          setTimeout(() => setContentSavedSuccess(false), 3000);
                        }}
                        className="px-4 py-1.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
                      >
                        Salvar Bloco
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SEÇÃO B: PERGUNTAS FREQUENTES (FAQS) */}
              <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">Perguntas Frequentes (FAQ)</h4>
                    <p className="text-xs text-neutral-400">Edite as dúvidas respondidas no acordeon do site</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newFaq: import('../types').FaqItem = {
                        question: 'Nova Pergunta?',
                        answer: 'Resposta detalhada para o público...',
                        category: 'geral',
                      };
                      setEditingFaq(newFaq);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Dúvida</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {faqListState.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <strong className="text-white block font-semibold">{faq.question}</strong>
                        <p className="text-neutral-400 text-xs line-clamp-2">{faq.answer}</p>
                        <span className="text-[10px] text-amber-400/80 uppercase font-mono">Categoria: {faq.category}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setEditingFaq(faq)}
                          className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Excluir esta pergunta frequente?')) {
                              const updated = faqListState.filter((_, idx) => idx !== fIdx);
                              setFaqListState(updated);
                              onSaveFaqItems(updated);
                              setContentSavedSuccess(true);
                              setTimeout(() => setContentSavedSuccess(false), 3000);
                            }
                          }}
                          className="p-1 text-neutral-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MODAL DE EDIÇÃO DE FAQ */}
              {editingFaq && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-neutral-950/85">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                      <h4 className="text-sm font-bold text-white">Editar Pergunta Frequente</h4>
                      <button onClick={() => setEditingFaq(null)} className="text-neutral-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Pergunta *</label>
                      <input
                        type="text"
                        value={editingFaq.question}
                        onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Categoria</label>
                      <select
                        value={editingFaq.category}
                        onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value as any })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-1.5 text-xs text-white"
                      >
                        <option value="geral">Geral & Ingressos</option>
                        <option value="camarote">Camarote VIP</option>
                        <option value="seguranca">Segurança & Revista</option>
                        <option value="transporte">Transporte & Metrô</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Resposta Completa *</label>
                      <textarea
                        rows={3}
                        value={editingFaq.answer}
                        onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setEditingFaq(null)}
                        className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const existsIdx = faqListState.findIndex((f) => f.question === editingFaq.question);
                          let updated: import('../types').FaqItem[];
                          if (existsIdx >= 0) {
                            updated = faqListState.map((f, idx) => (idx === existsIdx ? editingFaq : f));
                          } else {
                            updated = [...faqListState, editingFaq];
                          }
                          setFaqListState(updated);
                          onSaveFaqItems(updated);
                          setEditingFaq(null);
                          setContentSavedSuccess(true);
                          setTimeout(() => setContentSavedSuccess(false), 3000);
                        }}
                        className="px-4 py-1.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
                      >
                        Salvar Dúvida
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Tab 3: CONFIGURAÇÃO DO BOT & ESCOLHA IA / REGRAS */}
        {activeTab === 'bot' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div className="p-4 bg-amber-400/10 border border-amber-400/20 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-300 leading-relaxed">
                  <strong className="text-amber-400 font-semibold block mb-0.5">
                    Controle Total do Assistente Virtual
                  </strong>
                  Você pode alternar a qualquer momento entre o <strong>Modo IA Inteligente (Google Gemini)</strong> ou o <strong>Modo Guiado por Perguntas/Respostas Locais</strong>. O bot é 100% editável: troque nome, mensagem de boas-vindas, tom de voz e botões rápidos.
                </div>
              </div>

              {botSavedSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Configurações do Chatbot salvas com sucesso! O assistente já está atualizado no site.</span>
                </div>
              )}

              <form onSubmit={handleSaveBot} className="space-y-6">
                
                {/* Ativação e Modo */}
                <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Status do Bot no Site</h4>
                      <p className="text-xs text-neutral-400">Ativar ou ocultar o assistente virtual para os visitantes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={botForm.enabled}
                        onChange={(e) => setBotForm({ ...botForm, enabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
                    </label>
                  </div>

                  <div className="pt-3 border-t border-neutral-800">
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Motor do Chatbot: Escolha o Tipo de Inteligência *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setBotForm({ ...botForm, mode: 'ia' })}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          botForm.mode === 'ia'
                            ? 'bg-amber-400/10 border-amber-400 text-white ring-1 ring-amber-400'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-amber-400 mb-1">
                          <Sparkles className="w-4 h-4" />
                          <span>Bot com IA (Google Gemini 3.8 Flash)</span>
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Responde qualquer pergunta em linguagem natural, tira dúvidas complexas sobre os blocos, vende camarotes e entende sinônimos.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBotForm({ ...botForm, mode: 'regras' })}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          botForm.mode === 'regras'
                            ? 'bg-amber-400/10 border-amber-400 text-white ring-1 ring-amber-400'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-blue-400 mb-1">
                          <Bot className="w-4 h-4" />
                          <span>Bot Guiado (Regras & FAQ Local)</span>
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Respostas fixas e controladas baseadas estritamente nas perguntas pré-programadas por você sem uso de inteligência generativa.
                        </p>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Identidade do Bot */}
                <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-4">
                  <h4 className="text-sm font-bold text-white mb-2">Identidade e Mensagem Inicial</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Nome do Assistente</label>
                      <input
                        type="text"
                        value={botForm.name}
                        onChange={(e) => setBotForm({ ...botForm, name: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Ícone do Avatar</label>
                      <select
                        value={botForm.avatarIcon}
                        onChange={(e) => setBotForm({ ...botForm, avatarIcon: e.target.value as any })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value="sparkles">✨ Brilho / IA (Sparkles)</option>
                        <option value="bot">🤖 Robô Oficial (Bot)</option>
                        <option value="music">🎵 Nota Musical (Music)</option>
                        <option value="party">🎉 Confetes & Festa (Party)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Mensagem de Boas-Vindas</label>
                    <textarea
                      rows={2}
                      value={botForm.welcomeMessage}
                      onChange={(e) => setBotForm({ ...botForm, welcomeMessage: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">WhatsApp de Transbordo Humano</label>
                    <input
                      type="text"
                      value={botForm.whatsappContactNumber}
                      onChange={(e) => setBotForm({ ...botForm, whatsappContactNumber: e.target.value })}
                      placeholder="Ex: 5511987654321 (DDI + DDD + Número)"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Prompt da IA (Quando modo IA ativo) */}
                <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Instruções do Sistema / Prompt da IA</span>
                    </h4>
                    <span className="text-[11px] text-amber-400 font-mono">Modo IA Ativo</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Defina o comportamento, tom de voz, regras de negócio e limites do bot ao atender os clientes.
                  </p>
                  <textarea
                    rows={5}
                    value={botForm.systemPrompt}
                    onChange={(e) => setBotForm({ ...botForm, systemPrompt: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-200 font-mono leading-relaxed focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Botões de Respostas Rápidas (FAQ Chips) */}
                <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-4">
                  <h4 className="text-sm font-bold text-white">Perguntas Frequentes & Atalhos Rápidos</h4>
                  <p className="text-xs text-neutral-400">
                    Botões clicáveis sugeridos na janela do chat para o folião tirar dúvidas com 1 clique.
                  </p>

                  <div className="space-y-2">
                    {botForm.quickReplies.map((qr, idx) => (
                      <div key={idx} className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <strong className="text-amber-300 block">{qr.label}</strong>
                          <p className="text-neutral-400 text-[11px]">{qr.answer}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeQuickReply(idx)}
                          className="text-neutral-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 space-y-2">
                    <span className="text-xs font-semibold text-white block">Adicionar Novo Atalho Rápido</span>
                    <input
                      type="text"
                      placeholder="Pergunta / Rótulo do botão (Ex: Onde retirar o abadá?)"
                      value={newQuickLabel}
                      onChange={(e) => setNewQuickLabel(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      placeholder="Resposta automática completa..."
                      value={newQuickAnswer}
                      onChange={(e) => setNewQuickAnswer(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={addQuickReply}
                      disabled={!newQuickLabel.trim() || !newQuickAnswer.trim()}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-xs text-amber-400 font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Inserir Pergunta Rápida</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-neutral-950" />
                    <span>Salvar Configurações do Chatbot</span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* Tab 3: DADOS & AVISOS DO SITE */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-start gap-3">
                <Settings className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-300">
                  <strong className="text-white block font-semibold mb-0.5">Gerenciador de Informações do Site</strong>
                  Atualize textos vitais, status de lotes de ingressos e a barra de comunicados de emergência ou promoções.
                </div>
              </div>

              {settingsSavedSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Configurações do site aplicadas com sucesso!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-5">
                
                {/* Banner de Aviso no Topo */}
                <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Bell className="w-4 h-4 text-amber-400" />
                        <span>Barra de Alerta / Comunicado no Topo</span>
                      </h4>
                      <p className="text-xs text-neutral-400">Exibe uma faixa de urgência ou aviso importante na página</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.noticeBannerEnabled}
                        onChange={(e) => setSettingsForm({ ...settingsForm, noticeBannerEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
                    </label>
                  </div>

                  {settingsForm.noticeBannerEnabled && (
                    <div className="pt-2">
                      <input
                        type="text"
                        value={settingsForm.noticeBannerText}
                        onChange={(e) => setSettingsForm({ ...settingsForm, noticeBannerText: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        placeholder="Texto do alerta (ex: Últimos abadás do 1º Lote...)"
                      />
                    </div>
                  )}
                </div>

                {/* Dados Gerais do Evento */}
                <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-4">
                  <h4 className="text-sm font-bold text-white">Dados da Produção & Local</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Nome Oficial do Evento</label>
                      <input
                        type="text"
                        value={settingsForm.eventName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, eventName: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Empresa Promotora / Realização</label>
                      <input
                        type="text"
                        value={settingsForm.organizer}
                        onChange={(e) => setSettingsForm({ ...settingsForm, organizer: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">E-mail Comercial Oficial</label>
                      <input
                        type="email"
                        value={settingsForm.organizerEmail}
                        onChange={(e) => setSettingsForm({ ...settingsForm, organizerEmail: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Período / Datas Resumidas</label>
                      <input
                        type="text"
                        value={settingsForm.datesSummary}
                        onChange={(e) => setSettingsForm({ ...settingsForm, datesSummary: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Localização do Percurso</label>
                    <input
                      type="text"
                      value={settingsForm.location}
                      onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Lote Atual da Pré-Venda</label>
                      <input
                        type="text"
                        value={settingsForm.vipLote}
                        onChange={(e) => setSettingsForm({ ...settingsForm, vipLote: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Status do Lote</label>
                      <select
                        value={settingsForm.vipLoteStatus}
                        onChange={(e) => setSettingsForm({ ...settingsForm, vipLoteStatus: e.target.value as any })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value="aberto">Aberto / Pré-venda ativa</option>
                        <option value="ultimas_vagas">Últimas Vagas (Urgência)</option>
                        <option value="esgotado">Esgotado</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-neutral-950" />
                    <span>Salvar Dados do Site</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 4: MÉTRICAS GERAIS E CONVERSÃO */}
        {activeTab === 'metrics' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 text-center">
                  <span className="block text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">{totalLeads}</span>
                  <span className="text-xs text-neutral-400">Total de Leads Captados</span>
                </div>
                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 text-center">
                  <span className="block text-2xl sm:text-3xl font-black text-blue-400 font-mono tabular-nums">{sponsorLeads.length}</span>
                  <span className="text-xs text-neutral-400">Marcas / Patrocínios</span>
                </div>
                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 text-center">
                  <span className="block text-2xl sm:text-3xl font-black text-amber-400 font-mono tabular-nums">{vipLeads.length}</span>
                  <span className="text-xs text-neutral-400">Foliões Camarote VIP</span>
                </div>
                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 text-center">
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-400 font-mono tabular-nums">{closedLeads.length}</span>
                  <span className="text-xs text-neutral-400">Negócios Fechados</span>
                </div>
              </div>

              {/* Conversion Pipeline Breakdown */}
              <div className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-4">
                <h4 className="text-sm font-bold text-white font-display">Funil de Atendimento dos Leads</h4>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-neutral-300">Novos (Aguardando Primeiro Contato)</span>
                      <strong className="text-white font-mono">{leads.filter((l) => (l.status || 'novo') === 'novo').length}</strong>
                    </div>
                    <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-yellow-400 h-full"
                        style={{ width: `${totalLeads ? (leads.filter((l) => (l.status || 'novo') === 'novo').length / totalLeads) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-neutral-300">Em Atendimento / Negociação</span>
                      <strong className="text-white font-mono">{leads.filter((l) => l.status === 'em_contato').length}</strong>
                    </div>
                    <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-400 h-full"
                        style={{ width: `${totalLeads ? (leads.filter((l) => l.status === 'em_contato').length / totalLeads) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-neutral-300">Proposta Comercial Enviada</span>
                      <strong className="text-white font-mono">{leads.filter((l) => l.status === 'proposta_enviada').length}</strong>
                    </div>
                    <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-400 h-full"
                        style={{ width: `${totalLeads ? (leads.filter((l) => l.status === 'proposta_enviada').length / totalLeads) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-neutral-300">Contratos Fechados (Cotas / VIPs)</span>
                      <strong className="text-emerald-400 font-mono">{closedLeads.length}</strong>
                    </div>
                    <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-400 h-full"
                        style={{ width: `${totalLeads ? (closedLeads.length / totalLeads) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Modal Bottom Status */}
        <div className="p-3.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Sistema Operacional Online · Banco de Dados Local Sincronizado</span>
          </div>

          <button
            onClick={onClearLeads}
            className="flex items-center gap-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer text-[11px]"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar Leads de Teste</span>
          </button>
        </div>

      </div>
    </div>
  );
};
