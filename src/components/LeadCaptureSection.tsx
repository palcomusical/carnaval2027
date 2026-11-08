import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Building2, Utensils, Camera, User, Phone, Mail, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lead, LeadCategory } from '../types';

interface LeadCaptureSectionProps {
  onLeadCaptured: (lead: Lead) => void;
}

export const LeadCaptureSection: React.FC<LeadCaptureSectionProps> = ({ onLeadCaptured }) => {
  const [activeTab, setActiveTab] = useState<LeadCategory>('foliao');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyOrRole, setCompanyOrRole] = useState('');
  const [blocoPreference, setBlocoPreference] = useState('Bloco do Sol Nascente (Axé)');
  const [ticketCount, setTicketCount] = useState(2);
  const [interestDetails, setInterestDetails] = useState('');
  
  const [submitted, setSubmitted] = useState(false);
  const [protocolNumber, setProtocolNumber] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatPhoneNumber = (value: string) => {
    const raw = value.replace(/\D/g, '');
    if (raw.length <= 2) return raw;
    if (raw.length <= 7) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Por favor, informe seu nome completo.';
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Informe um e-mail válido para receber a confirmação.';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      newErrors.phone = 'Informe um WhatsApp com DDD (pelo menos 10 dígitos).';
    }
    if (activeTab === 'patrocinador' && !companyOrRole.trim()) {
      newErrors.companyOrRole = 'Informe o nome da sua empresa ou marca.';
    }
    if (activeTab === 'gastronomia' && !companyOrRole.trim()) {
      newErrors.companyOrRole = 'Informe o nome do seu food truck ou marca gastronômica.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const generatedProtocol = `FOLIA-${Math.floor(100000 + Math.random() * 900000)}`;
    setProtocolNumber(generatedProtocol);

    const newLead: Lead = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      category: activeTab,
      name,
      email,
      phone,
      companyOrRole: companyOrRole || undefined,
      interestDetails: interestDetails || undefined,
      blocoPreference: activeTab === 'foliao' ? blocoPreference : undefined,
      ticketCount: activeTab === 'foliao' ? ticketCount : undefined,
      createdAt: new Date().toISOString(),
    };

    onLeadCaptured(newLead);
    setSubmitted(true);

    // Fire Confetti celebratory effect
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#EC4899', '#3B82F6', '#FBBF24'],
      });
    } catch {
      // Fallback if canvas is unavailable
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCompanyOrRole('');
    setInterestDetails('');
    setSubmitted(false);
    setErrors({});
  };

  return (
    <section id="captacao-leads" className="py-20 bg-neutral-950 border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
            Cadastros & Inscrições Oficiais
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-4">
            Garanta Sua Vaga no Maior Carnaval de Rua
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Receba alertas de abertura de lotes com antecedência, participe de sorteios de kits abadá exclusivos ou cadastre sua empresa para ativar no circuito.
          </p>
        </div>

        {/* Lead Capture Container */}
        <div className="max-w-4xl mx-auto bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          
          {/* Segmented Tab Controls */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-neutral-950 rounded-2xl mb-8 border border-neutral-800">
            <button
              type="button"
              onClick={() => { setActiveTab('foliao'); resetForm(); }}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'foliao'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Folião VIP</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('patrocinador'); resetForm(); }}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'patrocinador'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>Patrocinadores</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('gastronomia'); resetForm(); }}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'gastronomia'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Utensils className="w-4 h-4 shrink-0" />
              <span>Food Trucks</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('imprensa'); resetForm(); }}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'imprensa'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4 shrink-0" />
              <span>Imprensa</span>
            </button>
          </div>

          {/* Tab Explanatory Kicker */}
          <div className="mb-8 p-4 bg-neutral-950/60 border border-neutral-800/80 rounded-2xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm">
              {activeTab === 'foliao' && (
                <p className="text-neutral-300">
                  <strong className="text-amber-400 font-semibold">Benefícios do Cadastro Folião:</strong> Acesso prioritário ao 1º Lote do Camarote Oficial, concorrer a 50 kits com abadá e copo térmico oficial, e avisos de horários em tempo real no WhatsApp.
                </p>
              )}
              {activeTab === 'patrocinador' && (
                <p className="text-neutral-300">
                  <strong className="text-amber-400 font-semibold">Oportunidade Comercial:</strong> Conecte sua marca a mais de 180.000 pessoas por dia em um dos maiores festivais de rua do país. Receba o Mídia Kit oficial e planos de ativação.
                </p>
              )}
              {activeTab === 'gastronomia' && (
                <p className="text-neutral-300">
                  <strong className="text-amber-400 font-semibold">Credenciamento de Alimentação:</strong> Opere na Vila Gastronômica com infraestrutura completa de ponto de energia, água e sistema cashless de vendas com repasse rápido.
                </p>
              )}
              {activeTab === 'imprensa' && (
                <p className="text-neutral-300">
                  <strong className="text-amber-400 font-semibold">Credenciamento de Cobertura:</strong> Acesso à sala de imprensa climatizada, ponto de recarga de equipamentos, internet fibra de alta velocidade e credencial para trios elétricos.
                </p>
              )}
            </div>
          </div>

          {/* Success State */}
          {submitted ? (
            <div className="py-8 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white font-display mb-2">
                  Cadastro Confirmado com Sucesso!
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base max-w-lg mx-auto">
                  Olá, <strong className="text-white">{name}</strong>! Seus dados foram registrados com o protocolo abaixo. Enviamos a confirmação detalhada para o e-mail <span className="text-amber-400">{email}</span>.
                </p>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-2xl max-w-sm mx-auto">
                <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">
                  Número de Protocolo VIP
                </span>
                <span className="text-2xl font-mono font-bold text-amber-400 tabular-nums">
                  {protocolNumber}
                </span>
                <div className="mt-2 text-xs text-neutral-400 flex items-center justify-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Prioridade Garantida no Lote 1
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer"
                >
                  Novo Cadastro
                </button>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `Já garanti minha vaga na pré-venda oficial do Circuito Folia Brasil 2026 com o Palco Musical! Garanta a sua: ${window.location.href}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  Compartilhar no WhatsApp
                </a>
              </div>
            </div>
          ) : (
            /* Lead Capture Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Nome Completo */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    {activeTab === 'patrocinador' ? 'Nome do Contato' : 'Nome Completo'} *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Camila Ferreira"
                      className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.name ? 'border-red-500 focus:ring-red-500/30' : 'border-neutral-800 focus:border-amber-400 focus:ring-amber-400/20'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* E-mail */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    {activeTab === 'patrocinador' ? 'E-mail Corporativo' : 'E-mail Principal'} *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ex: camila@email.com"
                      className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.email ? 'border-red-500 focus:ring-red-500/30' : 'border-neutral-800 focus:border-amber-400 focus:ring-amber-400/20'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    WhatsApp com DDD *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="(11) 98765-4321"
                      maxLength={15}
                      className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.phone ? 'border-red-500 focus:ring-red-500/30' : 'border-neutral-800 focus:border-amber-400 focus:ring-amber-400/20'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>

                {/* Specific field per active tab */}
                {activeTab === 'foliao' && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Bloco que você mais quer ver
                    </label>
                    <select
                      value={blocoPreference}
                      onChange={(e) => setBlocoPreference(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    >
                      <option value="Bloco do Sol Nascente (Axé)">Bloco do Sol Nascente (Axé & Salvador)</option>
                      <option value="Bateria Furiosa da Alegria (Samba)">Bateria Furiosa da Alegria (Samba & Pagode)</option>
                      <option value="Bloco Tropi-Candeeiro (Frevo)">Bloco Tropi-Candeeiro (Frevo & Marchinhas)</option>
                      <option value="Bloco O Grave Bate Forte (Funk)">Bloco O Grave Bate Forte (Funk & Pop)</option>
                      <option value="Fanfarra Carnavalesca dos Metais">Fanfarra Carnavalesca dos Metais</option>
                      <option value="Super Trio Palco Musical (Terça)">Super Trio Palco Musical (Encerramento)</option>
                    </select>
                  </div>
                )}

                {activeTab === 'patrocinador' && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Empresa / Marca *
                    </label>
                    <input
                      type="text"
                      value={companyOrRole}
                      onChange={(e) => setCompanyOrRole(e.target.value)}
                      placeholder="Ex: Cervejaria Tropical S/A"
                      className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.companyOrRole ? 'border-red-500' : 'border-neutral-800 focus:border-amber-400'
                      }`}
                    />
                    {errors.companyOrRole && <p className="text-xs text-red-400 mt-1">{errors.companyOrRole}</p>}
                  </div>
                )}

                {activeTab === 'gastronomia' && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Nome do Food Truck / Negócio *
                    </label>
                    <input
                      type="text"
                      value={companyOrRole}
                      onChange={(e) => setCompanyOrRole(e.target.value)}
                      placeholder="Ex: Tapioca & Acarajé da Bahia"
                      className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.companyOrRole ? 'border-red-500' : 'border-neutral-800 focus:border-amber-400'
                      }`}
                    />
                    {errors.companyOrRole && <p className="text-xs text-red-400 mt-1">{errors.companyOrRole}</p>}
                  </div>
                )}

                {activeTab === 'imprensa' && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Veículo de Comunicação / Canal
                    </label>
                    <input
                      type="text"
                      value={companyOrRole}
                      onChange={(e) => setCompanyOrRole(e.target.value)}
                      placeholder="Ex: Portal G1 / Canal do Carnaval / Fotógrafo Freelance"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}
              </div>

              {/* Secondary Details */}
              {activeTab === 'foliao' ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-neutral-950/70 border border-neutral-800/80 rounded-2xl">
                  <div>
                    <span className="text-sm font-semibold text-white block">Interesse no Camarote VIP</span>
                    <span className="text-xs text-neutral-400">Quantos amigos você pretende levar?</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {[1, 2, 4, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setTicketCount(num)}
                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                          ticketCount === num
                            ? 'bg-amber-400 text-neutral-950 font-bold'
                            : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    {activeTab === 'patrocinador' ? 'Objetivo de Ativação / Interesse de Patrocínio' : 'Descrição dos Produtos ou Equipamentos'}
                  </label>
                  <textarea
                    rows={2}
                    value={interestDetails}
                    onChange={(e) => setInterestDetails(e.target.value)}
                    placeholder={
                      activeTab === 'patrocinador'
                        ? 'Ex: Desejamos cota de bebidas oficiais e ativação de estande no circuito...'
                        : 'Ex: Atuamos com espetinhos artesanais e chopp com estrutura móvel de 4m...'
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 text-base font-bold text-neutral-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-5 h-5 text-neutral-950" />
                  <span>
                    {activeTab === 'foliao' && 'Confirmar Cadastro e Garantir Pré-Venda'}
                    {activeTab === 'patrocinador' && 'Solicitar Mídia Kit & Proposta de Patrocínio'}
                    {activeTab === 'gastronomia' && 'Enviar Ficha de Credenciamento'}
                    {activeTab === 'imprensa' && 'Solicitar Credenciamento de Imprensa'}
                  </span>
                </button>
                <p className="text-center text-xs text-neutral-500 mt-3">
                  Seus dados estão protegidos. Não enviamos spam. Organização: Palco Musical Entretenimento.
                </p>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};
