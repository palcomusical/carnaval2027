import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2, Ticket, ShieldCheck, Building2, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lead } from '../types';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCaptured: (lead: Lead) => void;
  initialTier?: string | null;
}

export const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({
  isOpen,
  onClose,
  onLeadCaptured,
  initialTier,
}) => {
  const isSponsorFlow = Boolean(initialTier);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [interest, setInterest] = useState(initialTier || 'Camarote VIP & Open Bar');
  const [submitted, setSubmitted] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialTier) {
      setInterest(initialTier);
    }
  }, [initialTier]);

  if (!isOpen) return null;

  const formatPhoneNumber = (value: string) => {
    const raw = value.replace(/\D/g, '');
    if (raw.length <= 2) return raw;
    if (raw.length <= 7) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Por favor preencha todos os campos obrigatórios.');
      return;
    }

    const code = isSponsorFlow
      ? `PROPOSTA-PATROCINIO-${Math.floor(1000 + Math.random() * 9000)}`
      : `VIP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setVoucherCode(code);

    const lead: Lead = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      category: isSponsorFlow ? 'patrocinador' : 'foliao',
      name,
      email,
      phone,
      companyOrRole: isSponsorFlow ? company : undefined,
      interestDetails: interest,
      createdAt: new Date().toISOString(),
    };

    onLeadCaptured(lead);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#10B981', '#3B82F6', '#FBBF24'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white font-display">
                {isSponsorFlow ? 'Solicitação Comercial Enviada!' : 'Vaga na Pré-Venda Confirmada!'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-sm mx-auto">
                {isSponsorFlow ? (
                  <>
                    Olá, <strong>{name}</strong>! O Mídia Kit Comercial e a proposta da cota <strong>{interest}</strong> foram enviados para <span className="text-amber-400">{email}</span>. Nossa gerência comercial entrará em contato via WhatsApp.
                  </>
                ) : (
                  <>
                    Parabéns, <strong>{name}</strong>! Você terá prioridade exclusiva para compra no Lote 0 com desconto de folião cadastrado.
                  </>
                )}
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-2xl max-w-xs mx-auto">
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mb-1">
                {isSponsorFlow ? 'Protocolo de Atendimento Comercial' : 'Seu Cupom de Acesso Antecipado'}
              </span>
              <span className="text-xl font-mono font-bold text-amber-400 tabular-nums">
                {voucherCode}
              </span>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
            >
              Concluir & Voltar ao Site
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{isSponsorFlow ? 'Mídia Kit & Proposta de Patrocínio' : 'Acesso Exclusivo Pré-Carnaval'}</span>
            </div>

            <h3 className="text-2xl font-bold text-white font-display mb-2">
              {isSponsorFlow ? 'Patrocínio Oficial Circuito Folia 2026' : 'Garanta seu Kit Folião & Pré-Venda VIP'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6">
              {isSponsorFlow
                ? 'Receba o Mídia Kit 2026 com tabela de cotas, mapa de ativações e agende uma apresentação com a gerência comercial da Palco Musical.'
                : 'Cadastre-se gratuitamente para receber o primeiro aviso de lote, concorra a 50 kits oficiais com abadá e receba o Guia do Folião no WhatsApp.'}
            </p>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  {isSponsorFlow ? 'Nome do Responsável de Marketing / Diretoria' : 'Seu Nome'} *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isSponsorFlow ? 'Ex: Marcelo Albuquerque' : 'Nome e Sobrenome'}
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {isSponsorFlow && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Empresa / Marca *
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ex: Companhia de Bebidas Brasil"
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  {isSponsorFlow ? 'E-mail Corporativo' : 'Seu Melhor E-mail'} *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isSponsorFlow ? 'marcelo@empresa.com.br' : 'seu@email.com'}
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  WhatsApp com DDD *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                  placeholder="(11) 99999-9999"
                  required
                  maxLength={15}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  {isSponsorFlow ? 'Cota de Interesse Principal' : 'Maior Interesse'}
                </label>
                {isSponsorFlow ? (
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Cota Master · Naming Rights">Cota Master · Naming Rights (Exclusiva)</option>
                    <option value="Cota Ouro · Setor & Palco">Cota Ouro · Setor & Palco</option>
                    <option value="Cota Prata · Ativação & Sampling">Cota Prata · Ativação & Sampling</option>
                    <option value="Cota Produto Oficial · Segmento">Cota Produto Oficial (Monopólio Comercial)</option>
                    <option value="Personalizada / Estudo Sob Medida">Quero um Projeto Especial Customizado</option>
                  </select>
                ) : (
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Camarote VIP & Open Bar">Camarote VIP & Open Bar Exclusivo</option>
                    <option value="Kit Folião Oficial (Abadá + Copo)">Kit Folião Oficial (Abadá + Copo Térmico)</option>
                    <option value="Programação Completa em Tempo Real">Avisos de Horários dos Blocos no Zap</option>
                    <option value="Sorteio de Acessos Gratuitos">Participar dos Sorteios de Brindes</option>
                  </select>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSponsorFlow ? (
                    <>
                      <Download className="w-4 h-4 text-neutral-950" />
                      <span>Receber Mídia Kit & Apresentação Comercial</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4 text-neutral-950" />
                      <span>Cadastrar e Garantir Vantagens</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {isSponsorFlow
                    ? 'Atendimento direto da Palco Musical Entretenimento. Sigilo comercial garantido.'
                    : 'Cadastro 100% seguro. Nenhum dado compartilhado com terceiros.'}
                </span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
