import React, { useState } from 'react';
import { X, Download, Trash2, Filter, UserCheck, Building2, Utensils, Camera, Search, AlertCircle } from 'lucide-react';
import { Lead, LeadCategory } from '../types';

interface LeadsAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onClearLeads: () => void;
}

export const LeadsAdminModal: React.FC<LeadsAdminModalProps> = ({
  isOpen,
  onClose,
  leads,
  onClearLeads,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredLeads = leads.filter((lead) => {
    const matchCat = filterCategory === 'todos' || lead.category === filterCategory;
    const matchSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.companyOrRole && lead.companyOrRole.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchSearch;
  });

  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = ['ID', 'Categoria', 'Nome', 'Email', 'Telefone', 'Empresa/Veiculo', 'Preferencia/Interesse', 'Data de Cadastro'];
    const rows = leads.map((l) => [
      l.id,
      l.category,
      `"${l.name.replace(/"/g, '""')}"`,
      l.email,
      l.phone,
      `"${(l.companyOrRole || '').replace(/"/g, '""')}"`,
      `"${(l.interestDetails || l.blocoPreference || '').replace(/"/g, '""')}"`,
      new Date(l.createdAt).toLocaleString('pt-BR'),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_carnaval_folia_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryBadge = (category: LeadCategory) => {
    switch (category) {
      case 'foliao':
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md"><UserCheck className="w-3 h-3" /> Folião VIP</span>;
      case 'patrocinador':
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-md"><Building2 className="w-3 h-3" /> Patrocinador</span>;
      case 'gastronomia':
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-md"><Utensils className="w-3 h-3" /> Food Truck</span>;
      case 'imprensa':
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-md"><Camera className="w-3 h-3" /> Imprensa</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white font-display">
                Painel do Organizador · Leads Captados
              </h3>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-neutral-950 tabular-nums">
                {leads.length} leads
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Contatos registrados em tempo real para pré-venda, patrocínios, praça de alimentação e imprensa.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 bg-neutral-950/60 border-b border-neutral-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-neutral-500 flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" /> Filtrar:
            </span>
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'foliao', label: 'Foliões' },
              { id: 'patrocinador', label: 'Patrocinadores' },
              { id: 'gastronomia', label: 'Food Trucks' },
              { id: 'imprensa', label: 'Imprensa' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, email ou tel..."
              className="w-full pl-8 pr-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Leads Table */}
        <div className="flex-1 overflow-auto p-4">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-16 text-neutral-500 space-y-2">
              <AlertCircle className="w-8 h-8 mx-auto text-neutral-600" />
              <p className="text-sm">Nenhum lead encontrado com os filtros atuais.</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] font-semibold border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Nome / Responsável</th>
                  <th className="py-3 px-4">Contato (Email & WhatsApp)</th>
                  <th className="py-3 px-4">Empresa / Detalhes</th>
                  <th className="py-3 px-4">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">
                      {getCategoryBadge(lead.category)}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                      {lead.name}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap space-y-0.5">
                      <div className="text-neutral-200">{lead.email}</div>
                      <div className="text-neutral-400 font-mono text-[11px] tabular-nums">{lead.phone}</div>
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate">
                      {lead.companyOrRole && (
                        <span className="block font-medium text-amber-400">{lead.companyOrRole}</span>
                      )}
                      {lead.blocoPreference && (
                        <span className="text-neutral-400 block text-[11px]">Interesse: {lead.blocoPreference} ({lead.ticketCount} ingressos)</span>
                      )}
                      {lead.interestDetails && (
                        <span className="text-neutral-400 block text-[11px] truncate">{lead.interestDetails}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-neutral-500 whitespace-nowrap font-mono tabular-nums text-[11px]">
                      {new Date(lead.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <button
            onClick={onClearLeads}
            className="flex items-center gap-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar banco de testes local</span>
          </button>

          <span>Armazenamento local persistente ativo</span>
        </div>

      </div>
    </div>
  );
};
