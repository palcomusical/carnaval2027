import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQ_LIST, EVENT_INFO } from '../data/carnivalData';
import { FaqItem } from '../types';

interface FaqSectionProps {
  onOpenLeadModal: () => void;
  faqItems?: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenLeadModal, faqItems = FAQ_LIST }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const filteredFaq = activeCategory === 'todos'
    ? faqItems
    : faqItems.filter((item) => item.category === activeCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
            Tire Suas Dúvidas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-3">
            Perguntas Frequentes
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Tudo o que você precisa saber sobre ingressos, horários, segurança e funcionamento do circuito.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {[
            { id: 'todos', label: 'Todas as Dúvidas' },
            { id: 'geral', label: 'Geral & Ingressos' },
            { id: 'camarote', label: 'Camarote VIP' },
            { id: 'seguranca', label: 'Segurança & Revista' },
            { id: 'transporte', label: 'Transporte' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveCategory(tab.id); setOpenIndex(0); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === tab.id
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-neutral-900/80 border border-neutral-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white font-display">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-neutral-950 flex items-center justify-center text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-amber-400 text-neutral-950' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra question contact box */}
        <div className="mt-10 p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl text-center space-y-3">
          <p className="text-xs sm:text-sm text-neutral-300">
            Ainda ficou com alguma dúvida sobre o circuito ou parcerias comerciais?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${EVENT_INFO.organizerEmail}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-xl transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>{EVENT_INFO.organizerEmail}</span>
            </a>
            <button
              onClick={onOpenLeadModal}
              className="inline-flex items-center gap-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Falar com a Produção</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
